

var RobotTimeRang={
	id:'',
	starttime:'',
	endtime:'',
	val:function(){
		return {"starttime":this.starttime,"endtime":this.endtime};
	},
	getHtml:function(item){
		var ret="<div id='reporttimerange' class='pull-left dateRange' style='width:330px'>"+  
"                        <i class='glyphicon glyphicon-calendar fa fa-calendar'></i>"+  
"                        <span id='searchDateRange'></span>  "+
"                        <b class='caret'></b>  "+
"                    </div> ";
return ret;

	},
	refresh:function(){
		if(RobotTimeRang.starttime==''){
			RobotTimeRang.starttime=moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
		}
		if (RobotTimeRang.endtime=='') {
		RobotTimeRang.endtime=moment().format('YYYY-MM-DD HH:mm:ss');	
		}
		
	$('#reporttimerange span').html( RobotTimeRang.starttime+ ' - ' + RobotTimeRang.endtime);
		
					$('#reporttimerange').daterangepicker(
							{
								// startDate: moment().startOf('day'),
								//endDate: moment(),
								//minDate: '01/01/2012',	//最小时间
								maxDate : moment(), //最大时间 
//								dateLimit : {
//									days : 30
//								}, //起止时间的最大间隔
                                linkedCalendars:false,
								showDropdowns : true,
								showWeekNumbers : false, //是否显示第几周
								timePicker : true, //是否显示小时和分钟
								timePickerIncrement : 1, //时间的增量，单位为分钟
								timePicker24Hour: true,
								timePicker12Hour : false, //是否使用12小时制来显示时间
								ranges : {
									//'最近1小时': [moment().subtract('hours',1), moment()],
									'今日': [moment().startOf('day'), moment()],
				                    '昨日': [moment().subtract(1,'days').startOf('day'), moment().subtract(1,'days').endOf('day')],
				                    '最近7日': [moment().subtract(6,'days'), moment()],
				                    '最近30日': [moment().subtract(29,'days'), moment()]
								},
								opens : 'right', //日期选择框的弹出位置
								buttonClasses : [ 'btn btn-default' ],
								applyClass : 'btn-small btn-primary blue',
								cancelClass : 'btn-small',
								format : 'YYYY-MM-DD HH:mm:ss', //控件中from和to 显示的日期格式
								separator : ' to ',
								locale : {
									applyLabel : '确定',
									cancelLabel : '取消',
									fromLabel : '起始时间',
									toLabel : '结束时间',
									customRangeLabel : '自定义',
									daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],
									monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',
											'七月', '八月', '九月', '十月', '十一月', '十二月' ],
									firstDay : 1
								}
							}, function(start, end, label) {//格式化日期显示框
				                RobotTimeRang.starttime=start.format('YYYY-MM-DD HH:mm:ss');
				                RobotTimeRang.endtime=end.format('YYYY-MM-DD HH:mm:ss');
			                 	$('#reporttimerange span').html(start.format('YYYY-MM-DD HH:mm:ss') + ' - ' + end.format('YYYY-MM-DD HH:mm:ss'));
			               });		
			               
	}
}
