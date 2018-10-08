$(function() {

	'use strict';

	robotservice.robotuserid='<%=request.getSession().getAttribute("userid")%>';
	robotservice.robotdisplayname='<%=request.getSession().getAttribute("displayname")%>';
	robotservice.robotusername='<%=request.getSession().getAttribute("username")%>';
	robotservice.baseurl='../../../';

	var checkrs = function(data){
		var bresult = false;

		if (data == null){
			return bresult;
		}
		if(data.rs == null ){
			return bresult;
		}
		if(data.rs.length < 1){
			return bresult;
		}
		return true;
	}

	function refreshdata(){
		robotservice.callrobotservice("localrbs","GetSummary",{"areaid":12},createTiles,this,false);

		robotservice.callrobotservice("localrbs","GetSummaryError",{"areaid":12},createHoriTab,this,false);

		robotservice.callrobotservice("localrbs","GetAlarmRate",{"yname":2017},createColumns,this,false);

		robotservice.callrobotservice("localrbs","GetChangeRate",{"yname":2017},createChangeRate,this,false);

		robotservice.callrobotservice("localrbs","GetAccuInfo",{"yname":2017},createAccuInfo,this,false);

		robotservice.callrobotservice("localrbs","GetMonthlyCost",{"yname":2017},createAreas,this,false);

		robotservice.callrobotservice("localrbs","GetCurrentSpark",{"mname":201707},createCurrentSpark,this,false);
	}

	/* 顶部文字标签  pnl 01 */
	function createTiles(data, callobj) {
		if(!checkrs(data))
			return;

		var obj = "";
    	for (var i = 0; i < data.rs.length; i++) {
            var itemobj = data.rs[i];
            obj += (createTile(itemobj.c,itemobj.i, itemobj.a, itemobj.v, itemobj.u));
        }

	    $('#pnl01').append(obj);
	}

	/* 横向数据表 pnl 0111 */
	function createHoriTab(data, callobj) {
		if(!checkrs(data))
			return;

		var rows = [];
		for (var i = 0; i < data.rs.length; i++) {
            var itemobj = data.rs[i];
            var av = itemobj.v;
            var at = "n";
            if(av.indexOf("%") > -1){
            	at = "p";
            	av = av.replace(/%/, "");
            }
            var aobj = {sCapt: itemobj.a ,sVal: av,sValtype: at};
            rows.push(aobj);
        }

		$("#pnl201").append(renderHoriTab(rows));
	};

	/* 右侧小柱图 pnl 0112  */
	function createColumns(data, callobj){
		if(!checkrs(data))
			return;

		var arX = [];
		var arY1 = [];
		var arY2 = [];
		for (var i = 0; i < data.rs.length; i++) {
            var itemobj = data.rs[i];
            arX.push(itemobj.x);
            arY1.push(itemobj.y1);
            arY2.push(itemobj.y2);
        }

		var areaChartData = {
			labels: arX,
			datasets: [
				_.extend({label: "故障率",data: arY1}, serStyle_1),
				_.extend({label: "服务时长",data: arY2}, serStyle_2),
				]
		};
		var barChartCanvas = $("#barChart").get(0).getContext("2d");
		var barChart = new Chart(barChartCanvas);
		var barChartData = areaChartData;
		bcOptions2.datasetFill = false;
		barChart.Bar(barChartData, bcOptions2);
	}

	/* 变化率进度条 pnl 0202 */
	function createChangeRate(data, callobj){
		if(!checkrs(data))
			return;

		var obj = "";

		for (var i = 0; i < data.rs.length; i++) {
            var itemobj = data.rs[i];

            obj += (createExtProcess(itemobj.c, itemobj.a, itemobj.v));
        }

		$("#pnl302").append(obj);
	}

	/* 趋势下方统计 pnl 0211 */
	function createAccuInfo(data, callobj){
		if(!checkrs(data))
			return;

		var obj = "";

		for (var i = 0; i < data.rs.length; i++) {
            var itemobj = data.rs[i];
            obj += (createRateLabel(itemobj.a, itemobj.v +' ' + itemobj.u, itemobj.cr));
        }

		$("#pnl412").append(obj);
	}

	/* 底侧area图  pnl 0201*/
	function createAreas(data, callobj){
		if(!checkrs(data))
			return;

		var arX = [];
		var arY1 = [];
		var arY2 = [];
		for (var i = 0; i < data.rs.length; i++) {
            var itemobj = data.rs[i];
            arX.push(itemobj.x);
            arY1.push(itemobj.y1);
            arY2.push(itemobj.y2);
        }

		var salesChartData = {
			labels: arX,
			datasets: [
				_.extend({
					label: "用电",
					data: arY1
				}, serStyle_1),
				_.extend({
					label: "节能",
					data: arY2
				}, serStyle_2)
			]
		};
		var salesChartCanvas = $("#salesChart").get(0).getContext("2d");
		var salesChart = new Chart(salesChartCanvas);
		salesChart.Line(salesChartData, acOptions1);
	}

	/* 地图右侧小指标 pnl 0111 */
	function createCurrentSpark(data, callobj){
		var obj = "";

		for (var i = 0; i < data.rs.length; i++) {
            var itemobj = data.rs[i];
            obj += (createSpark(itemobj.a + ' (' +itemobj.u+')',itemobj.v, itemobj.sr, (i==(data.rs.length-1))));
        }

		$('#pnl212').append(obj);

		renderSpark();
	}

	refreshdata();

	/* 地图  pnl 0101*/
	var plants = [
	    {name: 'p1', coords: [60, 110], status: 'on'},
	    {name: 'p2', coords: [260, 95], status: 'on', offsets: [0, 2]},
	    {name: 'p3', coords: [434, 95], status: 'off', offsets: [0, -2]},
	    {name: 'p4', coords: [634, 110], status: 'repair', offsets: [0, 2]},
	  ];

	var enabledRegions = ['mo', 'fl', 'or'];

	$('#world-map-markers').vectorMap({
		map: 'mall',
		backgroundColor: '#eee',
		markers: plants.map(function(h){ return {name: h.name, coords: h.coords} }),
		labels: {
              markers: {
                render: function(index){
                  return plants[index].name;
                },
                offsets: function(index){
                  var offset = plants[index]['offsets'] || [0, 0];
                  return [offset[0] - 7, offset[1] + 3];
                }
              }
          },
		regionStyle: {
	      initial: {
	        fill: '#4B94C0'
	      },
	      selected: {
	        fill: '#F4A582'
	      }
	    },
		series: {
            markers: [{
              attribute: 'image',
              scale: {
                'on': '../../img/icon-np-1.png',
                'off': '../../img/icon-np-2.png',
                'repair': '../../img/icon-np-3.png'
              },
              values: plants.reduce(function(p, c, i){ p[i] = c.status; return p }, {}),
              legend: {
                horizontal: true,
                title: '设备状态',
                labelRender: function(v){
                  return {
                    on: '亮灯',
                    off: '关闭',
                    repair: '检修'
                  }[v];
                }
              }
            }]
          },
          onMarkerTipShow: function(event, label, index){
              label.html(
                '<b>'+plants[index].name+'</b><br/>'+
                '<b>status: </b>'+plants[index].status
              );
            },
		onRegionTipShow: function(e, el, code){
		  if (el.html() === '') {
		    e.preventDefault();
		  }else{
			  //el.html(el.html()+' (GDP - '+plants[code]+')');
		  }
		},
		onRegionClick: function(e, code){
			alert(e + ":" + code);
		},
		onMarkerClick: function(e, code){
			alert(e + ":" + code);
		}
	});

	/* SPARK 强制渲染	 */
	var renderSpark = function(){
		$('.sparkbar').each(function() {
			var $this = $(this);
			$this.sparkline('html', {
				type: 'bar',
				height: $this.data('height') ? $this.data('height') : '30',
				barColor: $this.data('color')
			});
		});
		$('.sparkpie').each(function() {
			var $this = $(this);
			$this.sparkline('html', {
				type: 'pie',
				height: $this.data('height') ? $this.data('height') : '90',
				sliceColors: $this.data('color')
			});
		});
		$('.sparkline').each(function() {
			var $this = $(this);
			$this.sparkline('html', {
				type: 'line',
				height: $this.data('height') ? $this.data('height') : '90',
				width: '100%',
				lineColor: $this.data('linecolor'),
				fillColor: $this.data('fillcolor'),
				spotColor: $this.data('spotcolor')
			});
		});
	}

});
