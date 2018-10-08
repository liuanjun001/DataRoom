/**
 * 
 */

/* 常用的area图样式定义 */
var acOptions1 = {
		// Boolean - If we should show the scale at all
		showScale : true,
		// Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : false,
		// String - Colour of the grid lines
		scaleGridLineColor : "rgba(0,0,0,.05)",
		// Number - Width of the grid lines
		scaleGridLineWidth : 1,
		// Boolean - Whether to show horizontal lines (except X axis)
		scaleShowHorizontalLines : true,
		// Boolean - Whether to show vertical lines (except Y axis)
		scaleShowVerticalLines : true,
		// Boolean - Whether the line is curved between points
		bezierCurve : true,
		// Number - Tension of the bezier curve between points
		bezierCurveTension : 0.3,
		// Boolean - Whether to show a dot for each point
		pointDot : false,
		// Number - Radius of each point dot in pixels
		pointDotRadius : 4,
		// Number - Pixel width of point dot stroke
		pointDotStrokeWidth : 1,
		// Number - amount extra to add to the radius to cater for hit detection
		// outside the drawn point
		pointHitDetectionRadius : 20,
		// Boolean - Whether to show a stroke for datasets
		datasetStroke : true,
		// Number - Pixel width of dataset stroke
		datasetStrokeWidth : 2,
		// Boolean - Whether to fill the dataset with a color
		datasetFill : true,
		// String - A legend template
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%=datasets[i].label%></li><%}%></ul>",
		// Boolean - whether to maintain the starting aspect ratio or not when
		// responsive, if set to false, will take up entire container
		maintainAspectRatio : true,
		// Boolean - whether to make the chart responsive to window resizing
		responsive : true
	};

/* 常用的柱图样式定义 */
var bcOptions2 = {
		// Boolean - Whether the scale should start at zero, or an order of
		// magnitude down from the lowest value
		scaleBeginAtZero: true,
		// Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines: true,
		scaleGridLineColor: "rgba(0,0,0,.05)",
		// Number - Width of the grid lines
		scaleGridLineWidth: 1,
		// Boolean - Whether to show horizontal lines (except X axis)
		scaleShowHorizontalLines: true,
		// Boolean - Whether to show vertical lines (except Y axis)
		scaleShowVerticalLines: true,
		// Boolean - If there is a stroke on each bar
		barShowStroke: true,
		// Number - Pixel width of the bar stroke
		barStrokeWidth: 2,
		// Number - Spacing between each of the X value sets
		barValueSpacing: 5,
		// Number - Spacing between data sets within X values
		barDatasetSpacing: 1,
		// String - A legend template
		legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
		// Boolean - whether to make the chart responsive
		responsive: true,
		maintainAspectRatio: true
	};

/* bar序列样式1 */
var serStyle_1 = {
	fillColor : "rgb(210, 214, 222)",
	strokeColor : "rgb(210, 214, 222)",
	pointColor : "rgb(210, 214, 222)",
	pointStrokeColor : "#c1c7d1",
	pointHighlightFill : "#fff",
	pointHighlightStroke : "rgb(220,220,220)"
};

/* bar序列样式2 */
var serStyle_2 = {
	fillColor : "rgba(60,141,188,0.9)",
	strokeColor : "rgba(60,141,188,0.8)",
	pointColor : "#3b8bba",
	pointStrokeColor : "rgba(60,141,188,1)",
	pointHighlightFill : "#fff",
	pointHighlightStroke : "rgba(60,141,188,1)"
};

var serStyle_3 = {
	fillColor: "#00a65a",
	strokeColor: "#00a65a",
	pointColor: "#00a65a",
	pointStrokeColor: "#c1c7d1",
	pointHighlightFill: "#fff",
	pointHighlightStroke: "rgba(220,220,220,1)"
}
var serStyle_4 = {
	fillColor: "rgba(60,141,188,0.9)",
	strokeColor: "rgba(60,141,188,0.8)",
	pointColor: "#3b8bba",
	pointStrokeColor: "rgba(60,141,188,1)",
	pointHighlightFill: "#fff",
	pointHighlightStroke: "rgba(60,141,188,1)"
}

/* 创建spark 文字标签 
 * createSpark('Visits',8390, '90,70,90,70,75,80,70',false);
 * */
var createSpark = function(scapt, svc, svs, bIslast){
	var sobj = '<div class="description-block '+(bIslast?'':'margin-bottom')+'">';
	sobj += '<div class="sparkbar pad" data-color="#fff">'+svs+'</div>';
	sobj += '<h5 class="description-header">'+svc+'</h5>';
	sobj += '<span class="description-text">'+scapt+'</span>';
	sobj += '</div>'
	return sobj;
}

/* 同比 
 * createRateLabel('累计用电', '35,210.43 kWh', -17);
 * */
var createRateLabel = function(scapt, sval, srate){
	var sobj = '<div class="col-sm-2 col-xs-6">';
	sobj += '<div class="description-block border-right">';
	var sdir = srate > 0 ? 'up' : 'down';
	var scolor = srate > 0 ?'green':'red';
	sobj += '<span class="description-percentage text-'+scolor+'"><iclass="fa fa-caret-'+sdir+'"></i> '+Math.abs(srate)+'%</span>';
	sobj += '<h5 class="description-header">'+sval+'</h5>';
	sobj += '<span class="description-text">'+scapt+'</span>';
	sobj += '</div>';
	sobj += '</div>';
	return sobj;
}


/* 进度条 
 * createExtProcess('aqua', '规模', '160/200')
 * */
var createExtProcess = function(scolor, scapt, sval){
	var arval = sval.split('/');
	if(arval.length < 2)
		return ;
	var arN = arval[0] / arval[1];
	
	var sobj = '<div class="progress-group">';
	sobj += '<span class="progress-text">'+scapt+'</span>';
	sobj += '<span class="progress-number"><b>'+arval[0]+'</b>/'+arval[1]+'</span>';
	sobj += '<div class="progress sm">';
	sobj += '<div class="progress-bar progress-bar-'+scolor+'" style="width: '+(arN*100)+'%"></div>';
	sobj += '</div>';
	sobj += '</div>';
	return sobj;
};


/* 文字图标块 */
var createTile = function(scolor, cicon, scapt, snumber, sunit) {
	var sobj = "<div class='col-md-2 col-sm-6 col-xs-12'>";
	sobj += '<div class="info-box">';
	sobj += ('<span class="info-box-icon bg-'
			+ (scolor == null ? 'aqua' : scolor) + '"><i class="'
			+ (cicon == null ? 'ion ion-ios-gear-outline' : cicon) + '"></i></span>');
	sobj += '<div class="info-box-content">';
	sobj += '<span class="info-box-text">' + scapt + '</span>';
	sobj += '<span class="info-box-number">' + snumber + '<small>' + sunit
			+ '</small></span>';
	sobj += '</div>';
	sobj += '</div>';
	sobj += '</div>'
	return sobj;
};

/* 数据行 */
var renderHoriRow = function(rowobj, bFirst) {
	var sCapt = rowobj.sCapt;
	var sVal = rowobj.sVal;
	var sValtype = rowobj.sValtype;

	var sObj = '<tr>';
	sObj += '<th' + (bFirst ? ' style="width:40%"' : '') + '>' + sCapt + '</th>';
	sObj += '<td>';
	if (sValtype == 'n') {
		sObj += '<span class="badge bg-red">' + sVal + '</span>';
	} else if (sValtype == 'p') {
		sObj += '<div class="progress progress-xs progress-striped active"><div class="progress-bar progress-bar-primary" style="width: '
				+ sVal + '%">' + sVal + '</div></div>';
	} else {
		sObj += sVal;
	}
	sObj += '</td>';
	sObj += '</tr>';
	return sObj;
}

/* 横向数据表 */
var renderHoriTab = function(rows) {
	var sObj = '<table class="table table-bordered" style="margin-bottom:0px;">';
	var i=0;
	rows.forEach(function(arow) {
		sObj += renderHoriRow(arow, (i==0));
		i++;
	});
	sObj += '</table>';
	return sObj;
}