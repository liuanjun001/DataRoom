var RobotDeviceStateStaticGrid=Object.create(RobotBaseGrid);
RobotDeviceStateStaticGrid.compentname="RobotDeviceStateStaticGrid";
RobotDeviceStateStaticGrid.classname="RTWarnService";
RobotDeviceStateStaticGrid.functionname="QueryDeviceStateStatic";
RobotDeviceStateStaticGrid.fielddisplay=["设备类型","设备数","离线数","告警数量"];
RobotDeviceStateStaticGrid.columns=[{"data":"devicetype"},{"data":"devicecn"},{"data":"offlinecn"},{"data":"warncn"}];
RobotDeviceStateStaticGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"设备运行状态",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
reportname:"Warnreport",value:"com.robot.module.monitor.warn.RobotDeviceStateStaticGrid",
cls:RobotDeviceStateStaticGrid});

var RobotTop10FreqWarnGrid=Object.create(RobotBaseGrid);
RobotTop10FreqWarnGrid.compentname="RobotTop10FreqWarnGrid";
RobotTop10FreqWarnGrid.classname="RTWarnService";
RobotTop10FreqWarnGrid.functionname="QueryTop10FreqWarn";
RobotTop10FreqWarnGrid.fielddisplay=["区域","监控点","数量"];
RobotTop10FreqWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
RobotTop10FreqWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"近7日频繁告警Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
reportname:"Warnreport",value:"com.robot.module.monitor.warn.RobotTop10FreqWarnGrid",
cls:RobotTop10FreqWarnGrid});


//var RobotTop10FreqhighttemplateWarnGrid=Object.create(RobotBaseGrid);
//RobotTop10FreqhighttemplateWarnGrid.compentname="RobotTop10FreqhighttemplateWarnGrid";
//RobotTop10FreqhighttemplateWarnGrid.classname="RTWarnService";
//RobotTop10FreqhighttemplateWarnGrid.functionname="QueryTop10FreqhighttemplateWarn";
//RobotTop10FreqhighttemplateWarnGrid.fielddisplay=["区域","监控点","数量"];
//RobotTop10FreqhighttemplateWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotTop10FreqhighttemplateWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"近7日频繁高温告警Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
//reportname:"highttemplateWarnreport",value:"com.robot.module.monitor.highttemplateWarn.RobotTop10FreqhighttemplateWarnGrid",
//cls:RobotTop10FreqhighttemplateWarnGrid});


var RobotTop10FreqtroubleWarnGrid=Object.create(RobotBaseGrid);
RobotTop10FreqtroubleWarnGrid.compentname="RobotTop10FreqtroubleWarnGrid";
RobotTop10FreqtroubleWarnGrid.classname="RTWarnService";
RobotTop10FreqtroubleWarnGrid.functionname="QueryTop10FreqtroubleWarn";
RobotTop10FreqtroubleWarnGrid.fielddisplay=["区域","监控点","数量"];
RobotTop10FreqtroubleWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
RobotTop10FreqtroubleWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"近7日频繁故障Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
reportname:"troubleWarnreport",value:"com.robot.module.monitor.troubleWarn.RobotTop10FreqtroubleWarnGrid",
cls:RobotTop10FreqtroubleWarnGrid});

//
//var RobotTop10FreqLowerBatteryWarnGrid=Object.create(RobotBaseGrid);
//RobotTop10FreqLowerBatteryWarnGrid.compentname="RobotTop10FreqLowerBatteryWarnGrid";
//RobotTop10FreqLowerBatteryWarnGrid.classname="RTWarnService";
//RobotTop10FreqLowerBatteryWarnGrid.functionname="QueryTop10FreqLowerBatteryWarn";
//RobotTop10FreqLowerBatteryWarnGrid.fielddisplay=["区域","监控点","数量"];
//RobotTop10FreqLowerBatteryWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotTop10FreqLowerBatteryWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"近7日频繁低电压Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
//reportname:"LowerBatteryWarnreport",value:"com.robot.module.monitor.LowerBatteryWarn.RobotTop10FreqLowerBatteryWarnGrid",
//cls:RobotTop10FreqLowerBatteryWarnGrid});


//var RobotTop10FreqPowerDownWarnGrid=Object.create(RobotBaseGrid);
//RobotTop10FreqPowerDownWarnGrid.compentname="RobotTop10FreqPowerDownWarnGrid";
//RobotTop10FreqPowerDownWarnGrid.classname="RTWarnService";
//RobotTop10FreqPowerDownWarnGrid.functionname="QueryTop10FreqPowerDownWarn";
//RobotTop10FreqPowerDownWarnGrid.fielddisplay=["区域","监控点","数量"];
//RobotTop10FreqPowerDownWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotTop10FreqPowerDownWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"近7日频繁停电告警Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
//reportname:"PowerDownWarnreport",value:"com.robot.module.monitor.PowerDownWarn.RobotTop10FreqPowerDownWarnGrid",
//cls:RobotTop10FreqPowerDownWarnGrid});


//var RobotTop10FreqbatterydischargeGrid=Object.create(RobotBaseGrid);
//RobotTop10FreqbatterydischargeGrid.compentname="RobotTop10FreqbatterydischargeGrid";
//RobotTop10FreqbatterydischargeGrid.classname="RTWarnService";
//RobotTop10FreqbatterydischargeGrid.functionname="QueryTop10Freqbatterydischarge";
//RobotTop10FreqbatterydischargeGrid.fielddisplay=["区域","监控点","数量"];
//RobotTop10FreqbatterydischargeGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotTop10FreqbatterydischargeGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"近7日频繁放电Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
//reportname:"batterydeschargereport",value:"com.robot.module.monitor.warn.RobotTop10FreqbatterydischargeGrid",
//cls:RobotTop10FreqbatterydischargeGrid});


//var RobotTop10FreqgeneratorGrid=Object.create(RobotBaseGrid);
//RobotTop10FreqgeneratorGrid.compentname="RobotTop10FreqgeneratorGrid";
//RobotTop10FreqgeneratorGrid.classname="RTWarnService";
//RobotTop10FreqgeneratorGrid.functionname="QueryTop10Freqgenerator";
//RobotTop10FreqgeneratorGrid.fielddisplay=["区域","监控点","数量"];
//RobotTop10FreqgeneratorGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotTop10FreqgeneratorGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"近7日频繁发电Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
//reportname:"generatorreport",value:"com.robot.module.monitor.warn.RobotTop10FreqgeneratorGrid",
//cls:RobotTop10FreqgeneratorGrid});


var RobotTop10LongWarnGrid=Object.create(RobotBaseGrid);
RobotTop10LongWarnGrid.compentname="RobotTop10LongWarnGrid";
RobotTop10LongWarnGrid.classname="RTWarnService";
RobotTop10LongWarnGrid.functionname="QueryTop10LongWarn";
RobotTop10LongWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
RobotTop10LongWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
RobotTop10LongWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"近7日告警时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
reportname:"Warnreport",value:"com.robot.module.monitor.warn.RobotTop10LongWarnGrid",
cls:RobotTop10LongWarnGrid});


//
//var RobotTop10LonghighttemplateWarnGrid=Object.create(RobotBaseGrid);
//RobotTop10LonghighttemplateWarnGrid.compentname="RobotTop10LonghighttemplateWarnGrid";
//RobotTop10LonghighttemplateWarnGrid.classname="RTWarnService";
//RobotTop10LonghighttemplateWarnGrid.functionname="QueryTop10LonghighttemplateWarn";
//RobotTop10LonghighttemplateWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotTop10LonghighttemplateWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotTop10LonghighttemplateWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"近7日高温告警时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
//reportname:"highttemplateWarnreport",value:"com.robot.module.monitor.highttemplateWarn.RobotTop10LonghighttemplateWarnGrid",
//cls:RobotTop10LonghighttemplateWarnGrid});


var RobotTop10LongtroubleWarnGrid=Object.create(RobotBaseGrid);
RobotTop10LongtroubleWarnGrid.compentname="RobotTop10LongtroubleWarnGrid";
RobotTop10LongtroubleWarnGrid.classname="RTWarnService";
RobotTop10LongtroubleWarnGrid.functionname="QueryTop10LongtroubleWarn";
RobotTop10LongtroubleWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
RobotTop10LongtroubleWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
RobotTop10LongtroubleWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"近7日故障时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
reportname:"troubleWarnreport",value:"com.robot.module.monitor.troubleWarn.RobotTop10LongtroubleWarnGrid",
cls:RobotTop10LongtroubleWarnGrid});


//var RobotTop10LongLowerBatteryWarnGrid=Object.create(RobotBaseGrid);
//RobotTop10LongLowerBatteryWarnGrid.compentname="RobotTop10LongLowerBatteryWarnGrid";
//RobotTop10LongLowerBatteryWarnGrid.classname="RTWarnService";
//RobotTop10LongLowerBatteryWarnGrid.functionname="QueryTop10LongLowerBatteryWarn";
//RobotTop10LongLowerBatteryWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotTop10LongLowerBatteryWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotTop10LongLowerBatteryWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"近7日低电压时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
//reportname:"LowerBatteryWarnreport",value:"com.robot.module.monitor.LowerBatteryWarn.RobotTop10LongLowerBatteryWarnGrid",
//cls:RobotTop10LongLowerBatteryWarnGrid});


//var RobotTop10LongPowerDownWarnGrid=Object.create(RobotBaseGrid);
//RobotTop10LongPowerDownWarnGrid.compentname="RobotTop10LongPowerDownWarnGrid";
//RobotTop10LongPowerDownWarnGrid.classname="RTWarnService";
//RobotTop10LongPowerDownWarnGrid.functionname="QueryTop10LongPowerDownWarn";
//RobotTop10LongPowerDownWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotTop10LongPowerDownWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotTop10LongPowerDownWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"近7日停电告警时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
//reportname:"PowerDownWarnreport",value:"com.robot.module.monitor.PowerDownWarn.RobotTop10LongPowerDownWarnGrid",
//cls:RobotTop10LongPowerDownWarnGrid});


//var RobotTop10LongbatterydischargeGrid=Object.create(RobotBaseGrid);
//RobotTop10LongbatterydischargeGrid.compentname="RobotTop10LongbatterydischargeGrid";
//RobotTop10LongbatterydischargeGrid.classname="RTWarnService";
//RobotTop10LongbatterydischargeGrid.functionname="QueryTop10Longbatterydischarge";
//RobotTop10LongbatterydischargeGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotTop10LongbatterydischargeGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotTop10LongbatterydischargeGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"近7日放电时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
//reportname:"batterydeschargereport",value:"com.robot.module.monitor.warn.RobotTop10LongbatterydischargeGrid",
//cls:RobotTop10LongbatterydischargeGrid});


//var RobotTop10LonggeneratorGrid=Object.create(RobotBaseGrid);
//RobotTop10LonggeneratorGrid.compentname="RobotTop10LonggeneratorGrid";
//RobotTop10LonggeneratorGrid.classname="RTWarnService";
//RobotTop10LonggeneratorGrid.functionname="QueryTop10Longgenerator";
//RobotTop10LonggeneratorGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotTop10LonggeneratorGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotTop10LonggeneratorGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"近7日发电时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
//reportname:"generatorreport",value:"com.robot.module.monitor.warn.RobotTop10LonggeneratorGrid",
//cls:RobotTop10LonggeneratorGrid});
//////////////////////////////////////
var RobotTimeAreaWarn=Object.create(RobotBaseTimeAreaChart);
RobotTimeAreaWarn.compentname="RobotTimeAreaWarn";
RobotTimeAreaWarn.classname="RTWarnService";
RobotTimeAreaWarn.functionname="QueryTimeAreaWarn";

RobotMyHome.compentlib.push({compentname:"近7日告警时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
reportname:"Warnreport",value:"com.robot.module.monitor.warn.RobotTimeAreaWarn",
cls:RobotTimeAreaWarn});

//var RobotTimeAreahighttemplateWarn=Object.create(RobotBaseTimeAreaChart);
//RobotTimeAreahighttemplateWarn.compentname="RobotTimeAreahighttemplateWarn";
//RobotTimeAreahighttemplateWarn.classname="RTWarnService";
//RobotTimeAreahighttemplateWarn.functionname="QueryTimeAreahighttemplateWarn";
//
//RobotMyHome.compentlib.push({compentname:"近7日高温时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
//reportname:"highttemplateWarnreport",value:"com.robot.module.monitor.warn.RobotTimeAreahighttemplateWarn",
//cls:RobotTimeAreahighttemplateWarn});

var RobotTimeAreatroubleWarn=Object.create(RobotBaseTimeAreaChart);
RobotTimeAreatroubleWarn.compentname="RobotTimeAreatroubleWarn";
RobotTimeAreatroubleWarn.classname="RTWarnService";
RobotTimeAreatroubleWarn.functionname="QueryTimeAreatroubleWarn";

RobotMyHome.compentlib.push({compentname:"近7日故障时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
reportname:"troubleWarnreport",value:"com.robot.module.monitor.warn.RobotTimeAreatroubleWarn",
cls:RobotTimeAreatroubleWarn});

//var RobotTimeAreaLowerBatteryWarn=Object.create(RobotBaseTimeAreaChart);
//RobotTimeAreaLowerBatteryWarn.compentname="RobotTimeAreaLowerBatteryWarn";
//RobotTimeAreaLowerBatteryWarn.classname="RTWarnService";
//RobotTimeAreaLowerBatteryWarn.functionname="QueryTimeAreaLowerBatteryWarn";
//
//RobotMyHome.compentlib.push({compentname:"近7日低电压时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
//reportname:"LowerBatteryWarnreport",value:"com.robot.module.monitor.warn.RobotTimeAreaLowerBatteryWarn",
//cls:RobotTimeAreaLowerBatteryWarn});

//var RobotTimeAreaPowerDownWarn=Object.create(RobotBaseTimeAreaChart);
//RobotTimeAreaPowerDownWarn.compentname="RobotTimeAreaPowerDownWarn";
//RobotTimeAreaPowerDownWarn.classname="RTWarnService";
//RobotTimeAreaPowerDownWarn.functionname="QueryTimeAreaPowerDownWarn";
//
//RobotMyHome.compentlib.push({compentname:"近7日停电时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
//reportname:"PowerDownWarnreport",value:"com.robot.module.monitor.warn.RobotTimeAreaPowerDownWarn",
//cls:RobotTimeAreaPowerDownWarn});

//var RobotTimeAreabatterydischarge=Object.create(RobotBaseTimeAreaChart);
//RobotTimeAreabatterydischarge.compentname="RobotTimeAreabatterydischarge";
//RobotTimeAreabatterydischarge.classname="RTWarnService";
//RobotTimeAreabatterydischarge.functionname="QueryTimeAreabatterydischarge";
//
//RobotMyHome.compentlib.push({compentname:"近7日放电时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
//reportname:"batterydischargereport",value:"com.robot.module.monitor.warn.RobotTimeAreabatterydischarge",
//cls:RobotTimeAreabatterydischarge});

//var RobotTimeAreagenerator=Object.create(RobotBaseTimeAreaChart);
//RobotTimeAreagenerator.compentname="RobotTimeAreagenerator";
//RobotTimeAreagenerator.classname="RTWarnService";
//RobotTimeAreagenerator.functionname="QueryTimeAreagenerator";
//
//RobotMyHome.compentlib.push({compentname:"近7日发电时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
//reportname:"generatorreport",value:"com.robot.module.monitor.warn.RobotTimeAreagenerator",
//cls:RobotTimeAreagenerator});
///////////////////////////////////
var RobotAreaWarn=Object.create(RobotBaseAreaChart);
RobotAreaWarn.compentname="RobotAreaWarn";
RobotAreaWarn.classname="RTWarnService";
RobotAreaWarn.functionname="QueryAreaWarn";

RobotMyHome.compentlib.push({compentname:"近7日告警区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
reportname:"Warnreport",value:"com.robot.module.monitor.warn.RobotAreaWarn",
cls:RobotAreaWarn});

//var RobotAreahighttemplateWarn=Object.create(RobotBaseAreaChart);
//RobotAreahighttemplateWarn.compentname="RobotAreahighttemplateWarn";
//RobotAreahighttemplateWarn.classname="RTWarnService";
//RobotAreahighttemplateWarn.functionname="QueryAreahighttemplateWarn";
//
//RobotMyHome.compentlib.push({compentname:"近7日高温区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
//reportname:"highttemplateWarnreport",value:"com.robot.module.monitor.warn.RobotAreahighttemplateWarn",
//cls:RobotAreahighttemplateWarn});

var RobotAreatroubleWarn=Object.create(RobotBaseAreaChart);
RobotAreatroubleWarn.compentname="RobotAreatroubleWarn";
RobotAreatroubleWarn.classname="RTWarnService";
RobotAreatroubleWarn.functionname="QueryAreatroubleWarn";

RobotMyHome.compentlib.push({compentname:"近7日故障区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
reportname:"troubleWarnreport",value:"com.robot.module.monitor.warn.RobotAreatroubleWarn",
cls:RobotAreatroubleWarn});

//var RobotAreaLowerBatteryWarn=Object.create(RobotBaseAreaChart);
//RobotAreaLowerBatteryWarn.compentname="RobotAreaLowerBatteryWarn";
//RobotAreaLowerBatteryWarn.classname="RTWarnService";
//RobotAreaLowerBatteryWarn.functionname="QueryAreaLowerBatteryWarn";
//
//RobotMyHome.compentlib.push({compentname:"近7日低电压区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
//reportname:"LowerBatteryWarnreport",value:"com.robot.module.monitor.warn.RobotAreaLowerBatteryWarn",
//cls:RobotAreaLowerBatteryWarn});

//var RobotAreaPowerDownWarn=Object.create(RobotBaseAreaChart);
//RobotAreaPowerDownWarn.compentname="RobotAreaPowerDownWarn";
//RobotAreaPowerDownWarn.classname="RTWarnService";
//RobotAreaPowerDownWarn.functionname="QueryAreaPowerDownWarn";
//
//RobotMyHome.compentlib.push({compentname:"近7日停电区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
//reportname:"PowerDownWarnreport",value:"com.robot.module.monitor.warn.RobotAreaPowerDownWarn",
//cls:RobotAreaPowerDownWarn});

//var RobotAreabatterydischarge=Object.create(RobotBaseAreaChart);
//RobotAreabatterydischarge.compentname="RobotAreabatterydischarge";
//RobotAreabatterydischarge.classname="RTWarnService";
//RobotAreabatterydischarge.functionname="QueryAreabatterydischarge";
//
//RobotMyHome.compentlib.push({compentname:"近7日放电区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
//reportname:"batterydischargereport",value:"com.robot.module.monitor.warn.RobotAreabatterydischarge",
//cls:RobotAreabatterydischarge});

//var RobotAreagenerator=Object.create(RobotBaseAreaChart);
//RobotAreagenerator.compentname="RobotAreagenerator";
//RobotAreagenerator.classname="RTWarnService";
//RobotAreagenerator.functionname="QueryAreagenerator";
//
//RobotMyHome.compentlib.push({compentname:"近7日发电区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"day",
//reportname:"generatorreport",value:"com.robot.module.monitor.warn.RobotAreagenerator",
//cls:RobotAreagenerator});
//////////////////////////////////////
var RobotWeekTop10FreqWarnGrid=Object.create(RobotBaseGrid);
RobotWeekTop10FreqWarnGrid.compentname="RobotWeekTop10FreqWarnGrid";
RobotWeekTop10FreqWarnGrid.classname="RTWarnService";
RobotWeekTop10FreqWarnGrid.functionname="QueryWeekTop10FreqWarn";
RobotWeekTop10FreqWarnGrid.fielddisplay=["区域","监控点","数量"];
RobotWeekTop10FreqWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
RobotWeekTop10FreqWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"上周频繁告警Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
reportname:"WarnWeekreport",value:"com.robot.module.monitor.warn.RobotWeekTop10FreqWarnGrid",
cls:RobotWeekTop10FreqWarnGrid});

//
//var RobotWeekTop10FreqhighttemplateWarnGrid=Object.create(RobotBaseGrid);
//RobotWeekTop10FreqhighttemplateWarnGrid.compentname="RobotWeekTop10FreqhighttemplateWarnGrid";
//RobotWeekTop10FreqhighttemplateWarnGrid.classname="RTWarnService";
//RobotWeekTop10FreqhighttemplateWarnGrid.functionname="QueryWeekTop10FreqhighttemplateWarn";
//RobotWeekTop10FreqhighttemplateWarnGrid.fielddisplay=["区域","监控点","数量"];
//RobotWeekTop10FreqhighttemplateWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotWeekTop10FreqhighttemplateWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上周频繁高温告警Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
//reportname:"highttemplateWarnWeekreport",value:"com.robot.module.monitor.highttemplateWarn.RobotWeekTop10FreqhighttemplateWarnGrid",
//cls:RobotWeekTop10FreqhighttemplateWarnGrid});


var RobotWeekTop10FreqtroubleWarnGrid=Object.create(RobotBaseGrid);
RobotWeekTop10FreqtroubleWarnGrid.compentname="RobotWeekTop10FreqtroubleWarnGrid";
RobotWeekTop10FreqtroubleWarnGrid.classname="RTWarnService";
RobotWeekTop10FreqtroubleWarnGrid.functionname="QueryWeekTop10FreqtroubleWarn";
RobotWeekTop10FreqtroubleWarnGrid.fielddisplay=["区域","监控点","数量"];
RobotWeekTop10FreqtroubleWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
RobotWeekTop10FreqtroubleWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"上周频繁故障Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
reportname:"troubleWarnWeekreport",value:"com.robot.module.monitor.troubleWarn.RobotWeekTop10FreqtroubleWarnGrid",
cls:RobotWeekTop10FreqtroubleWarnGrid});


//var RobotWeekTop10FreqLowerBatteryWarnGrid=Object.create(RobotBaseGrid);
//RobotWeekTop10FreqLowerBatteryWarnGrid.compentname="RobotWeekTop10FreqLowerBatteryWarnGrid";
//RobotWeekTop10FreqLowerBatteryWarnGrid.classname="RTWarnService";
//RobotWeekTop10FreqLowerBatteryWarnGrid.functionname="QueryWeekTop10FreqLowerBatteryWarn";
//RobotWeekTop10FreqLowerBatteryWarnGrid.fielddisplay=["区域","监控点","数量"];
//RobotWeekTop10FreqLowerBatteryWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotWeekTop10FreqLowerBatteryWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上周频繁低电压Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
//reportname:"LowerBatteryWarnWeekreport",value:"com.robot.module.monitor.LowerBatteryWarn.RobotWeekTop10FreqLowerBatteryWarnGrid",
//cls:RobotWeekTop10FreqLowerBatteryWarnGrid});


//var RobotWeekTop10FreqPowerDownWarnGrid=Object.create(RobotBaseGrid);
//RobotWeekTop10FreqPowerDownWarnGrid.compentname="RobotWeekTop10FreqPowerDownWarnGrid";
//RobotWeekTop10FreqPowerDownWarnGrid.classname="RTWarnService";
//RobotWeekTop10FreqPowerDownWarnGrid.functionname="QueryWeekTop10FreqPowerDownWarn";
//RobotWeekTop10FreqPowerDownWarnGrid.fielddisplay=["区域","监控点","数量"];
//RobotWeekTop10FreqPowerDownWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotWeekTop10FreqPowerDownWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上周频繁停电告警Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
//reportname:"PowerDownWarnWeekreport",value:"com.robot.module.monitor.PowerDownWarn.RobotWeekTop10FreqPowerDownWarnGrid",
//cls:RobotWeekTop10FreqPowerDownWarnGrid});


//var RobotWeekTop10FreqbatterydischargeGrid=Object.create(RobotBaseGrid);
//RobotWeekTop10FreqbatterydischargeGrid.compentname="RobotWeekTop10FreqbatterydischargeGrid";
//RobotWeekTop10FreqbatterydischargeGrid.classname="RTWarnService";
//RobotWeekTop10FreqbatterydischargeGrid.functionname="QueryWeekTop10Freqbatterydischarge";
//RobotWeekTop10FreqbatterydischargeGrid.fielddisplay=["区域","监控点","数量"];
//RobotWeekTop10FreqbatterydischargeGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotWeekTop10FreqbatterydischargeGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上周频繁放电Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
//reportname:"batterydeschargeWeekreport",value:"com.robot.module.monitor.warn.RobotWeekTop10FreqbatterydischargeGrid",
//cls:RobotWeekTop10FreqbatterydischargeGrid});


//var RobotWeekTop10FreqgeneratorGrid=Object.create(RobotBaseGrid);
//RobotWeekTop10FreqgeneratorGrid.compentname="RobotWeekTop10FreqgeneratorGrid";
//RobotWeekTop10FreqgeneratorGrid.classname="RTWarnService";
//RobotWeekTop10FreqgeneratorGrid.functionname="QueryWeekTop10Freqgenerator";
//RobotWeekTop10FreqgeneratorGrid.fielddisplay=["区域","监控点","数量"];
//RobotWeekTop10FreqgeneratorGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotWeekTop10FreqgeneratorGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上周频繁发电Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
//reportname:"generatorWeekreport",value:"com.robot.module.monitor.warn.RobotWeekTop10FreqgeneratorGrid",
//cls:RobotWeekTop10FreqgeneratorGrid});


var RobotWeekTop10LongWarnGrid=Object.create(RobotBaseGrid);
RobotWeekTop10LongWarnGrid.compentname="RobotWeekTop10LongWarnGrid";
RobotWeekTop10LongWarnGrid.classname="RTWarnService";
RobotWeekTop10LongWarnGrid.functionname="QueryWeekTop10LongWarn";
RobotWeekTop10LongWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
RobotWeekTop10LongWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
RobotWeekTop10LongWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"上周告警时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
reportname:"WarnWeekreport",value:"com.robot.module.monitor.warn.RobotWeekTop10LongWarnGrid",
cls:RobotWeekTop10LongWarnGrid});


//var RobotWeekTop10LonghighttemplateWarnGrid=Object.create(RobotBaseGrid);
//RobotWeekTop10LonghighttemplateWarnGrid.compentname="RobotWeekTop10LonghighttemplateWarnGrid";
//RobotWeekTop10LonghighttemplateWarnGrid.classname="RTWarnService";
//RobotWeekTop10LonghighttemplateWarnGrid.functionname="QueryWeekTop10LonghighttemplateWarn";
//RobotWeekTop10LonghighttemplateWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotWeekTop10LonghighttemplateWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotWeekTop10LonghighttemplateWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上周高温告警时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
//reportname:"highttemplateWarnWeekreport",value:"com.robot.module.monitor.highttemplateWarn.RobotWeekTop10LonghighttemplateWarnGrid",
//cls:RobotWeekTop10LonghighttemplateWarnGrid});



var RobotWeekTop10LongtroubleWarnGrid=Object.create(RobotBaseGrid);
RobotWeekTop10LongtroubleWarnGrid.compentname="RobotWeekTop10LongtroubleWarnGrid";
RobotWeekTop10LongtroubleWarnGrid.classname="RTWarnService";
RobotWeekTop10LongtroubleWarnGrid.functionname="QueryWeekTop10LongtroubleWarn";
RobotWeekTop10LongtroubleWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
RobotWeekTop10LongtroubleWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
RobotWeekTop10LongtroubleWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"上周故障时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
reportname:"troubleWarnWeekreport",value:"com.robot.module.monitor.troubleWarn.RobotWeekTop10LongtroubleWarnGrid",
cls:RobotWeekTop10LongtroubleWarnGrid});


//
//var RobotWeekTop10LongLowerBatteryWarnGrid=Object.create(RobotBaseGrid);
//RobotWeekTop10LongLowerBatteryWarnGrid.compentname="RobotWeekTop10LongLowerBatteryWarnGrid";
//RobotWeekTop10LongLowerBatteryWarnGrid.classname="RTWarnService";
//RobotWeekTop10LongLowerBatteryWarnGrid.functionname="QueryWeekTop10LongLowerBatteryWarn";
//RobotWeekTop10LongLowerBatteryWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotWeekTop10LongLowerBatteryWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotWeekTop10LongLowerBatteryWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上周低电压时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
//reportname:"LowerBatteryWarnWeekreport",value:"com.robot.module.monitor.LowerBatteryWarn.RobotWeekTop10LongLowerBatteryWarnGrid",
//cls:RobotWeekTop10LongLowerBatteryWarnGrid});


//var RobotWeekTop10LongPowerDownWarnGrid=Object.create(RobotBaseGrid);
//RobotWeekTop10LongPowerDownWarnGrid.compentname="RobotWeekTop10LongPowerDownWarnGrid";
//RobotWeekTop10LongPowerDownWarnGrid.classname="RTWarnService";
//RobotWeekTop10LongPowerDownWarnGrid.functionname="QueryWeekTop10LongPowerDownWarn";
//RobotWeekTop10LongPowerDownWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotWeekTop10LongPowerDownWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotWeekTop10LongPowerDownWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上周停电告警时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
//reportname:"PowerDownWarnWeekreport",value:"com.robot.module.monitor.PowerDownWarn.RobotWeekTop10LongPowerDownWarnGrid",
//cls:RobotWeekTop10LongPowerDownWarnGrid});

//
//var RobotWeekTop10LongbatterydischargeGrid=Object.create(RobotBaseGrid);
//RobotWeekTop10LongbatterydischargeGrid.compentname="RobotWeekTop10LongbatterydischargeGrid";
//RobotWeekTop10LongbatterydischargeGrid.classname="RTWarnService";
//RobotWeekTop10LongbatterydischargeGrid.functionname="QueryWeekTop10Longbatterydischarge";
//RobotWeekTop10LongbatterydischargeGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotWeekTop10LongbatterydischargeGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotWeekTop10LongbatterydischargeGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上周放电时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
//reportname:"batterydeschargeWeekreport",value:"com.robot.module.monitor.warn.RobotWeekTop10LongbatterydischargeGrid",
//cls:RobotWeekTop10LongbatterydischargeGrid});


//var RobotWeekTop10LonggeneratorGrid=Object.create(RobotBaseGrid);
//RobotWeekTop10LonggeneratorGrid.compentname="RobotWeekTop10LonggeneratorGrid";
//RobotWeekTop10LonggeneratorGrid.classname="RTWarnService";
//RobotWeekTop10LonggeneratorGrid.functionname="QueryWeekTop10Longgenerator";
//RobotWeekTop10LonggeneratorGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotWeekTop10LonggeneratorGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotWeekTop10LonggeneratorGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上周发电时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"week",
//reportname:"generatorWeekreport",value:"com.robot.module.monitor.warn.RobotWeekTop10LonggeneratorGrid",
//cls:RobotWeekTop10LonggeneratorGrid});
///////
var RobotWeekTimeAreaWarn=Object.create(RobotBaseTimeAreaChart);
RobotWeekTimeAreaWarn.compentname="RobotWeekTimeAreaWarn";
RobotWeekTimeAreaWarn.classname="RTWarnService";
RobotWeekTimeAreaWarn.functionname="QueryWeekTimeAreaWarn";

RobotMyHome.compentlib.push({compentname:"上周告警时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
reportname:"Warnreport",value:"com.robot.module.monitor.warn.RobotWeekTimeAreaWarn",
cls:RobotWeekTimeAreaWarn});
//
//var RobotWeekTimeAreahighttemplateWarn=Object.create(RobotBaseTimeAreaChart);
//RobotWeekTimeAreahighttemplateWarn.compentname="RobotWeekTimeAreahighttemplateWarn";
//RobotWeekTimeAreahighttemplateWarn.classname="RTWarnService";
//RobotWeekTimeAreahighttemplateWarn.functionname="QueryWeekTimeAreahighttemplateWarn";
//
//RobotMyHome.compentlib.push({compentname:"上周高温时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
//reportname:"highttemplateWarnreport",value:"com.robot.module.monitor.warn.RobotWeekTimeAreahighttemplateWarn",
//cls:RobotWeekTimeAreahighttemplateWarn});

var RobotWeekTimeAreatroubleWarn=Object.create(RobotBaseTimeAreaChart);
RobotWeekTimeAreatroubleWarn.compentname="RobotWeekTimeAreatroubleWarn";
RobotWeekTimeAreatroubleWarn.classname="RTWarnService";
RobotWeekTimeAreatroubleWarn.functionname="QueryWeekTimeAreatroubleWarn";

RobotMyHome.compentlib.push({compentname:"上周故障时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
reportname:"troubleWarnreport",value:"com.robot.module.monitor.warn.RobotWeekTimeAreatroubleWarn",
cls:RobotWeekTimeAreatroubleWarn});

//var RobotWeekTimeAreaLowerBatteryWarn=Object.create(RobotBaseTimeAreaChart);
//RobotWeekTimeAreaLowerBatteryWarn.compentname="RobotWeekTimeAreaLowerBatteryWarn";
//RobotWeekTimeAreaLowerBatteryWarn.classname="RTWarnService";
//RobotWeekTimeAreaLowerBatteryWarn.functionname="QueryWeekTimeAreaLowerBatteryWarn";
//
//RobotMyHome.compentlib.push({compentname:"上周低电压时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
//reportname:"LowerBatteryWarnreport",value:"com.robot.module.monitor.warn.RobotWeekTimeAreaLowerBatteryWarn",
//cls:RobotWeekTimeAreaLowerBatteryWarn});

//var RobotWeekTimeAreaPowerDownWarn=Object.create(RobotBaseTimeAreaChart);
//RobotWeekTimeAreaPowerDownWarn.compentname="RobotWeekTimeAreaPowerDownWarn";
//RobotWeekTimeAreaPowerDownWarn.classname="RTWarnService";
//RobotWeekTimeAreaPowerDownWarn.functionname="QueryWeekTimeAreaPowerDownWarn";
//
//RobotMyHome.compentlib.push({compentname:"上周停电时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
//reportname:"PowerDownWarnreport",value:"com.robot.module.monitor.warn.RobotWeekTimeAreaPowerDownWarn",
//cls:RobotWeekTimeAreaPowerDownWarn});

//var RobotWeekTimeAreabatterydischarge=Object.create(RobotBaseTimeAreaChart);
//RobotWeekTimeAreabatterydischarge.compentname="RobotWeekTimeAreabatterydischarge";
//RobotWeekTimeAreabatterydischarge.classname="RTWarnService";
//RobotWeekTimeAreabatterydischarge.functionname="QueryWeekTimeAreabatterydischarge";
//
//RobotMyHome.compentlib.push({compentname:"上周放电时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
//reportname:"batterydischargereport",value:"com.robot.module.monitor.warn.RobotWeekTimeAreabatterydischarge",
//cls:RobotWeekTimeAreabatterydischarge});

//var RobotWeekTimeAreagenerator=Object.create(RobotBaseTimeAreaChart);
//RobotWeekTimeAreagenerator.compentname="RobotWeekTimeAreagenerator";
//RobotWeekTimeAreagenerator.classname="RTWarnService";
//RobotWeekTimeAreagenerator.functionname="QueryWeekTimeAreagenerator";
//
//RobotMyHome.compentlib.push({compentname:"上周发电时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
//reportname:"generatorreport",value:"com.robot.module.monitor.warn.RobotWeekTimeAreagenerator",
//cls:RobotWeekTimeAreagenerator});
//////////////
var RobotWeekAreaWarn=Object.create(RobotBaseAreaChart);
RobotWeekAreaWarn.compentname="RobotWeekAreaWarn";
RobotWeekAreaWarn.classname="RTWarnService";
RobotWeekAreaWarn.functionname="QueryWeekAreaWarn";

RobotMyHome.compentlib.push({compentname:"上周告警区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
reportname:"Warnreport",value:"com.robot.module.monitor.warn.RobotWeekAreaWarn",
cls:RobotWeekAreaWarn});

//var RobotWeekAreahighttemplateWarn=Object.create(RobotBaseAreaChart);
//RobotWeekAreahighttemplateWarn.compentname="RobotWeekAreahighttemplateWarn";
//RobotWeekAreahighttemplateWarn.classname="RTWarnService";
//RobotWeekAreahighttemplateWarn.functionname="QueryWeekAreahighttemplateWarn";
//
//RobotMyHome.compentlib.push({compentname:"上周高温区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
//reportname:"highttemplateWarnreport",value:"com.robot.module.monitor.warn.RobotWeekAreahighttemplateWarn",
//cls:RobotWeekAreahighttemplateWarn});

var RobotWeekAreatroubleWarn=Object.create(RobotBaseAreaChart);
RobotWeekAreatroubleWarn.compentname="RobotWeekAreatroubleWarn";
RobotWeekAreatroubleWarn.classname="RTWarnService";
RobotWeekAreatroubleWarn.functionname="QueryWeekAreatroubleWarn";

RobotMyHome.compentlib.push({compentname:"上周故障区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
reportname:"troubleWarnreport",value:"com.robot.module.monitor.warn.RobotWeekAreatroubleWarn",
cls:RobotWeekAreatroubleWarn});

//var RobotWeekAreaLowerBatteryWarn=Object.create(RobotBaseAreaChart);
//RobotWeekAreaLowerBatteryWarn.compentname="RobotWeekAreaLowerBatteryWarn";
//RobotWeekAreaLowerBatteryWarn.classname="RTWarnService";
//RobotWeekAreaLowerBatteryWarn.functionname="QueryWeekAreaLowerBatteryWarn";
//
//RobotMyHome.compentlib.push({compentname:"上周低电压区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
//reportname:"LowerBatteryWarnreport",value:"com.robot.module.monitor.warn.RobotWeekAreaLowerBatteryWarn",
//cls:RobotWeekAreaLowerBatteryWarn});

//var RobotWeekAreaPowerDownWarn=Object.create(RobotBaseAreaChart);
//RobotWeekAreaPowerDownWarn.compentname="RobotWeekAreaPowerDownWarn";
//RobotWeekAreaPowerDownWarn.classname="RTWarnService";
//RobotWeekAreaPowerDownWarn.functionname="QueryWeekAreaPowerDownWarn";
//
//RobotMyHome.compentlib.push({compentname:"上周停电区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
//reportname:"PowerDownWarnreport",value:"com.robot.module.monitor.warn.RobotWeekAreaPowerDownWarn",
//cls:RobotWeekAreaPowerDownWarn});

//var RobotWeekAreabatterydischarge=Object.create(RobotBaseAreaChart);
//RobotWeekAreabatterydischarge.compentname="RobotWeekAreabatterydischarge";
//RobotWeekAreabatterydischarge.classname="RTWarnService";
//RobotWeekAreabatterydischarge.functionname="QueryWeekAreabatterydischarge";
//
//RobotMyHome.compentlib.push({compentname:"上周放电区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
//reportname:"batterydischargereport",value:"com.robot.module.monitor.warn.RobotWeekAreabatterydischarge",
//cls:RobotWeekAreabatterydischarge});

//var RobotWeekAreagenerator=Object.create(RobotBaseAreaChart);
//RobotWeekAreagenerator.compentname="RobotWeekAreagenerator";
//RobotWeekAreagenerator.classname="RTWarnService";
//RobotWeekAreagenerator.functionname="QueryWeekAreagenerator";
//
//RobotMyHome.compentlib.push({compentname:"上周发电区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"",
//reportname:"generatorreport",value:"com.robot.module.monitor.warn.RobotWeekAreagenerator",
//cls:RobotWeekAreagenerator});
/////////////////////////

var RobotMonthTop10FreqWarnGrid=Object.create(RobotBaseGrid);
RobotMonthTop10FreqWarnGrid.compentname="RobotMonthTop10FreqWarnGrid";
RobotMonthTop10FreqWarnGrid.classname="RTWarnService";
RobotMonthTop10FreqWarnGrid.functionname="QueryMonthTop10FreqWarn";
RobotMonthTop10FreqWarnGrid.fielddisplay=["区域","监控点","数量"];
RobotMonthTop10FreqWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
RobotMonthTop10FreqWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"上月频繁告警Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
reportname:"WarnMonthreport",value:"com.robot.module.monitor.warn.RobotMonthTop10FreqWarnGrid",
cls:RobotMonthTop10FreqWarnGrid});


//var RobotMonthTop10FreqhighttemplateWarnGrid=Object.create(RobotBaseGrid);
//RobotMonthTop10FreqhighttemplateWarnGrid.compentname="RobotMonthTop10FreqhighttemplateWarnGrid";
//RobotMonthTop10FreqhighttemplateWarnGrid.classname="RTWarnService";
//RobotMonthTop10FreqhighttemplateWarnGrid.functionname="QueryMonthTop10FreqhighttemplateWarn";
//RobotMonthTop10FreqhighttemplateWarnGrid.fielddisplay=["区域","监控点","数量"];
//RobotMonthTop10FreqhighttemplateWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotMonthTop10FreqhighttemplateWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上月频繁高温告警Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"highttemplateWarnMonthreport",value:"com.robot.module.monitor.highttemplateWarn.RobotMonthTop10FreqhighttemplateWarnGrid",
//cls:RobotMonthTop10FreqhighttemplateWarnGrid});


var RobotMonthTop10FreqtroubleWarnGrid=Object.create(RobotBaseGrid);
RobotMonthTop10FreqtroubleWarnGrid.compentname="RobotMonthTop10FreqtroubleWarnGrid";
RobotMonthTop10FreqtroubleWarnGrid.classname="RTWarnService";
RobotMonthTop10FreqtroubleWarnGrid.functionname="QueryMonthTop10FreqtroubleWarn";
RobotMonthTop10FreqtroubleWarnGrid.fielddisplay=["区域","监控点","数量"];
RobotMonthTop10FreqtroubleWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
RobotMonthTop10FreqtroubleWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"上月频繁故障Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
reportname:"troubleWarnMonthreport",value:"com.robot.module.monitor.troubleWarn.RobotMonthTop10FreqtroubleWarnGrid",
cls:RobotMonthTop10FreqtroubleWarnGrid});


//var RobotMonthTop10FreqLowerBatteryWarnGrid=Object.create(RobotBaseGrid);
//RobotMonthTop10FreqLowerBatteryWarnGrid.compentname="RobotMonthTop10FreqLowerBatteryWarnGrid";
//RobotMonthTop10FreqLowerBatteryWarnGrid.classname="RTWarnService";
//RobotMonthTop10FreqLowerBatteryWarnGrid.functionname="QueryMonthTop10FreqLowerBatteryWarn";
//RobotMonthTop10FreqLowerBatteryWarnGrid.fielddisplay=["区域","监控点","数量"];
//RobotMonthTop10FreqLowerBatteryWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotMonthTop10FreqLowerBatteryWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上月频繁低电压Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"LowerBatteryWarnMonthreport",value:"com.robot.module.monitor.LowerBatteryWarn.RobotMonthTop10FreqLowerBatteryWarnGrid",
//cls:RobotMonthTop10FreqLowerBatteryWarnGrid});



//var RobotMonthTop10FreqPowerDownWarnGrid=Object.create(RobotBaseGrid);
//RobotMonthTop10FreqPowerDownWarnGrid.compentname="RobotMonthTop10FreqPowerDownWarnGrid";
//RobotMonthTop10FreqPowerDownWarnGrid.classname="RTWarnService";
//RobotMonthTop10FreqPowerDownWarnGrid.functionname="QueryMonthTop10FreqPowerDownWarn";
//RobotMonthTop10FreqPowerDownWarnGrid.fielddisplay=["区域","监控点","数量"];
//RobotMonthTop10FreqPowerDownWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotMonthTop10FreqPowerDownWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上月频繁停电告警Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"PowerDownWarnMonthreport",value:"com.robot.module.monitor.PowerDownWarn.RobotMonthTop10FreqPowerDownWarnGrid",
//cls:RobotMonthTop10FreqPowerDownWarnGrid});


//var RobotMonthTop10FreqbatterydischargeGrid=Object.create(RobotBaseGrid);
//RobotMonthTop10FreqbatterydischargeGrid.compentname="RobotMonthTop10FreqbatterydischargeGrid";
//RobotMonthTop10FreqbatterydischargeGrid.classname="RTWarnService";
//RobotMonthTop10FreqbatterydischargeGrid.functionname="QueryMonthTop10Freqbatterydischarge";
//RobotMonthTop10FreqbatterydischargeGrid.fielddisplay=["区域","监控点","数量"];
//RobotMonthTop10FreqbatterydischargeGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotMonthTop10FreqbatterydischargeGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上月频繁放电Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"batterydeschargeMonthreport",value:"com.robot.module.monitor.warn.RobotMonthTop10FreqbatterydischargeGrid",
//cls:RobotMonthTop10FreqbatterydischargeGrid});



//var RobotMonthTop10FreqgeneratorGrid=Object.create(RobotBaseGrid);
//RobotMonthTop10FreqgeneratorGrid.compentname="RobotMonthTop10FreqgeneratorGrid";
//RobotMonthTop10FreqgeneratorGrid.classname="RTWarnService";
//RobotMonthTop10FreqgeneratorGrid.functionname="QueryMonthTop10Freqgenerator";
//RobotMonthTop10FreqgeneratorGrid.fielddisplay=["区域","监控点","数量"];
//RobotMonthTop10FreqgeneratorGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//RobotMonthTop10FreqgeneratorGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上月频繁发电Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"generatorMonthreport",value:"com.robot.module.monitor.warn.RobotMonthTop10FreqgeneratorGrid",
//cls:RobotMonthTop10FreqgeneratorGrid});


var RobotMonthTop10LongWarnGrid=Object.create(RobotBaseGrid);
RobotMonthTop10LongWarnGrid.compentname="RobotMonthTop10LongWarnGrid";
RobotMonthTop10LongWarnGrid.classname="RTWarnService";
RobotMonthTop10LongWarnGrid.functionname="QueryMonthTop10LongWarn";
RobotMonthTop10LongWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
RobotMonthTop10LongWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
RobotMonthTop10LongWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"上月告警时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
reportname:"WarnMonthreport",value:"com.robot.module.monitor.warn.RobotMonthTop10LongWarnGrid",
cls:RobotMonthTop10LongWarnGrid});


//var RobotMonthTop10LonghighttemplateWarnGrid=Object.create(RobotBaseGrid);
//RobotMonthTop10LonghighttemplateWarnGrid.compentname="RobotMonthTop10LonghighttemplateWarnGrid";
//RobotMonthTop10LonghighttemplateWarnGrid.classname="RTWarnService";
//RobotMonthTop10LonghighttemplateWarnGrid.functionname="QueryMonthTop10LonghighttemplateWarn";
//RobotMonthTop10LonghighttemplateWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotMonthTop10LonghighttemplateWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotMonthTop10LonghighttemplateWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上月高温告警时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"highttemplateWarnMonthreport",value:"com.robot.module.monitor.highttemplateWarn.RobotMonthTop10LonghighttemplateWarnGrid",
//cls:RobotMonthTop10LonghighttemplateWarnGrid});


var RobotMonthTop10LongtroubleWarnGrid=Object.create(RobotBaseGrid);
RobotMonthTop10LongtroubleWarnGrid.compentname="RobotMonthTop10LongtroubleWarnGrid";
RobotMonthTop10LongtroubleWarnGrid.classname="RTWarnService";
RobotMonthTop10LongtroubleWarnGrid.functionname="QueryMonthTop10LongtroubleWarn";
RobotMonthTop10LongtroubleWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
RobotMonthTop10LongtroubleWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
RobotMonthTop10LongtroubleWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"上月故障时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
reportname:"troubleWarnMonthreport",value:"com.robot.module.monitor.troubleWarn.RobotMonthTop10LongtroubleWarnGrid",
cls:RobotMonthTop10LongtroubleWarnGrid});

//
//var RobotMonthTop10LongLowerBatteryWarnGrid=Object.create(RobotBaseGrid);
//RobotMonthTop10LongLowerBatteryWarnGrid.compentname="RobotMonthTop10LongLowerBatteryWarnGrid";
//RobotMonthTop10LongLowerBatteryWarnGrid.classname="RTWarnService";
//RobotMonthTop10LongLowerBatteryWarnGrid.functionname="QueryMonthTop10LongLowerBatteryWarn";
//RobotMonthTop10LongLowerBatteryWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotMonthTop10LongLowerBatteryWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotMonthTop10LongLowerBatteryWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上月低电压时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"LowerBatteryWarnMonthreport",value:"com.robot.module.monitor.LowerBatteryWarn.RobotMonthTop10LongLowerBatteryWarnGrid",
//cls:RobotMonthTop10LongLowerBatteryWarnGrid});


//var RobotMonthTop10LongPowerDownWarnGrid=Object.create(RobotBaseGrid);
//RobotMonthTop10LongPowerDownWarnGrid.compentname="RobotMonthTop10LongPowerDownWarnGrid";
//RobotMonthTop10LongPowerDownWarnGrid.classname="RTWarnService";
//RobotMonthTop10LongPowerDownWarnGrid.functionname="QueryMonthTop10LongPowerDownWarn";
//RobotMonthTop10LongPowerDownWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotMonthTop10LongPowerDownWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotMonthTop10LongPowerDownWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上月停电告警时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"PowerDownWarnMonthreport",value:"com.robot.module.monitor.PowerDownWarn.RobotMonthTop10LongPowerDownWarnGrid",
//cls:RobotMonthTop10LongPowerDownWarnGrid});


//var RobotMonthTop10LongbatterydischargeGrid=Object.create(RobotBaseGrid);
//RobotMonthTop10LongbatterydischargeGrid.compentname="RobotMonthTop10LongbatterydischargeGrid";
//RobotMonthTop10LongbatterydischargeGrid.classname="RTWarnService";
//RobotMonthTop10LongbatterydischargeGrid.functionname="QueryMonthTop10Longbatterydischarge";
//RobotMonthTop10LongbatterydischargeGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotMonthTop10LongbatterydischargeGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotMonthTop10LongbatterydischargeGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上月放电时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"batterydeschargeMonthreport",value:"com.robot.module.monitor.warn.RobotMonthTop10LongbatterydischargeGrid",
//cls:RobotMonthTop10LongbatterydischargeGrid});
//

//var RobotMonthTop10LonggeneratorGrid=Object.create(RobotBaseGrid);
//RobotMonthTop10LonggeneratorGrid.compentname="RobotMonthTop10LonggeneratorGrid";
//RobotMonthTop10LonggeneratorGrid.classname="RTWarnService";
//RobotMonthTop10LonggeneratorGrid.functionname="QueryMonthTop10Longgenerator";
//RobotMonthTop10LonggeneratorGrid.fielddisplay=["区域","监控点","时间","时长"];
//RobotMonthTop10LonggeneratorGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//RobotMonthTop10LonggeneratorGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"上月发电时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"generatorMonthreport",value:"com.robot.module.monitor.warn.RobotMonthTop10LonggeneratorGrid",
//cls:RobotMonthTop10LonggeneratorGrid});
//////////////////////
var RobotMonthTimeAreaWarn=Object.create(RobotBaseTimeAreaChart);
RobotMonthTimeAreaWarn.compentname="RobotMonthTimeAreaWarn";
RobotMonthTimeAreaWarn.classname="RTWarnService";
RobotMonthTimeAreaWarn.functionname="QueryMonthTimeAreaWarn";

RobotMyHome.compentlib.push({compentname:"上月告警时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
reportname:"Warnreport",value:"com.robot.module.monitor.warn.RobotMonthTimeAreaWarn",
cls:RobotMonthTimeAreaWarn});

//var RobotMonthTimeAreahighttemplateWarn=Object.create(RobotBaseTimeAreaChart);
//RobotMonthTimeAreahighttemplateWarn.compentname="RobotMonthTimeAreahighttemplateWarn";
//RobotMonthTimeAreahighttemplateWarn.classname="RTWarnService";
//RobotMonthTimeAreahighttemplateWarn.functionname="QueryMonthTimeAreahighttemplateWarn";
//
//RobotMyHome.compentlib.push({compentname:"上月高温时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"highttemplateWarnreport",value:"com.robot.module.monitor.warn.RobotMonthTimeAreahighttemplateWarn",
//cls:RobotMonthTimeAreahighttemplateWarn});

var RobotMonthTimeAreatroubleWarn=Object.create(RobotBaseTimeAreaChart);
RobotMonthTimeAreatroubleWarn.compentname="RobotMonthTimeAreatroubleWarn";
RobotMonthTimeAreatroubleWarn.classname="RTWarnService";
RobotMonthTimeAreatroubleWarn.functionname="QueryMonthTimeAreatroubleWarn";

RobotMyHome.compentlib.push({compentname:"上月故障时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
reportname:"troubleWarnreport",value:"com.robot.module.monitor.warn.RobotMonthTimeAreatroubleWarn",
cls:RobotMonthTimeAreatroubleWarn});

//var RobotMonthTimeAreaLowerBatteryWarn=Object.create(RobotBaseTimeAreaChart);
//RobotMonthTimeAreaLowerBatteryWarn.compentname="RobotMonthTimeAreaLowerBatteryWarn";
//RobotMonthTimeAreaLowerBatteryWarn.classname="RTWarnService";
//RobotMonthTimeAreaLowerBatteryWarn.functionname="QueryMonthTimeAreaLowerBatteryWarn";
//
//RobotMyHome.compentlib.push({compentname:"上月低电压时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"LowerBatteryWarnreport",value:"com.robot.module.monitor.warn.RobotMonthTimeAreaLowerBatteryWarn",
//cls:RobotMonthTimeAreaLowerBatteryWarn});

//var RobotMonthTimeAreaPowerDownWarn=Object.create(RobotBaseTimeAreaChart);
//RobotMonthTimeAreaPowerDownWarn.compentname="RobotMonthTimeAreaPowerDownWarn";
//RobotMonthTimeAreaPowerDownWarn.classname="RTWarnService";
//RobotMonthTimeAreaPowerDownWarn.functionname="QueryMonthTimeAreaPowerDownWarn";
//
//RobotMyHome.compentlib.push({compentname:"上月停电时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"PowerDownWarnreport",value:"com.robot.module.monitor.warn.RobotMonthTimeAreaPowerDownWarn",
//cls:RobotMonthTimeAreaPowerDownWarn});

//var RobotMonthTimeAreabatterydischarge=Object.create(RobotBaseTimeAreaChart);
//RobotMonthTimeAreabatterydischarge.compentname="RobotMonthTimeAreabatterydischarge";
//RobotMonthTimeAreabatterydischarge.classname="RTWarnService";
//RobotMonthTimeAreabatterydischarge.functionname="QueryMonthTimeAreabatterydischarge";
//
//RobotMyHome.compentlib.push({compentname:"上月放电时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"batterydischargereport",value:"com.robot.module.monitor.warn.RobotMonthTimeAreabatterydischarge",
//cls:RobotMonthTimeAreabatterydischarge});
//
//var RobotMonthTimeAreagenerator=Object.create(RobotBaseTimeAreaChart);
//RobotMonthTimeAreagenerator.compentname="RobotMonthTimeAreagenerator";
//RobotMonthTimeAreagenerator.classname="RTWarnService";
//RobotMonthTimeAreagenerator.functionname="QueryMonthTimeAreagenerator";
//
//RobotMyHome.compentlib.push({compentname:"上月发电时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"generatorreport",value:"com.robot.module.monitor.warn.RobotMonthTimeAreagenerator",
//cls:RobotMonthTimeAreagenerator});
//////
var RobotMonthAreaWarn=Object.create(RobotBaseAreaChart);
RobotMonthAreaWarn.compentname="RobotMonthAreaWarn";
RobotMonthAreaWarn.classname="RTWarnService";
RobotMonthAreaWarn.functionname="QueryMonthAreaWarn";

RobotMyHome.compentlib.push({compentname:"上月告警区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
reportname:"Warnreport",value:"com.robot.module.monitor.warn.RobotMonthAreaWarn",
cls:RobotMonthAreaWarn});

//var RobotMonthAreahighttemplateWarn=Object.create(RobotBaseAreaChart);
//RobotMonthAreahighttemplateWarn.compentname="RobotMonthAreahighttemplateWarn";
//RobotMonthAreahighttemplateWarn.classname="RTWarnService";
//RobotMonthAreahighttemplateWarn.functionname="QueryMonthAreahighttemplateWarn";
//
//RobotMyHome.compentlib.push({compentname:"上月高温区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"highttemplateWarnreport",value:"com.robot.module.monitor.warn.RobotMonthAreahighttemplateWarn",
//cls:RobotMonthAreahighttemplateWarn});

var RobotMonthAreatroubleWarn=Object.create(RobotBaseAreaChart);
RobotMonthAreatroubleWarn.compentname="RobotMonthAreatroubleWarn";
RobotMonthAreatroubleWarn.classname="RTWarnService";
RobotMonthAreatroubleWarn.functionname="QueryMonthAreatroubleWarn";

RobotMyHome.compentlib.push({compentname:"上月故障区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
reportname:"troubleWarnreport",value:"com.robot.module.monitor.warn.RobotMonthAreatroubleWarn",
cls:RobotMonthAreatroubleWarn});
//
//var RobotMonthAreaLowerBatteryWarn=Object.create(RobotBaseAreaChart);
//RobotMonthAreaLowerBatteryWarn.compentname="RobotMonthAreaLowerBatteryWarn";
//RobotMonthAreaLowerBatteryWarn.classname="RTWarnService";
//RobotMonthAreaLowerBatteryWarn.functionname="QueryMonthAreaLowerBatteryWarn";
//
//RobotMyHome.compentlib.push({compentname:"上月低电压区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"LowerBatteryWarnreport",value:"com.robot.module.monitor.warn.RobotMonthAreaLowerBatteryWarn",
//cls:RobotMonthAreaLowerBatteryWarn});

//var RobotMonthAreaPowerDownWarn=Object.create(RobotBaseAreaChart);
//RobotMonthAreaPowerDownWarn.compentname="RobotMonthAreaPowerDownWarn";
//RobotMonthAreaPowerDownWarn.classname="RTWarnService";
//RobotMonthAreaPowerDownWarn.functionname="QueryMonthAreaPowerDownWarn";
//
//RobotMyHome.compentlib.push({compentname:"上月停电区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"PowerDownWarnreport",value:"com.robot.module.monitor.warn.RobotMonthAreaPowerDownWarn",
//cls:RobotMonthAreaPowerDownWarn});

//var RobotMonthAreabatterydischarge=Object.create(RobotBaseAreaChart);
//RobotMonthAreabatterydischarge.compentname="RobotMonthAreabatterydischarge";
//RobotMonthAreabatterydischarge.classname="RTWarnService";
//RobotMonthAreabatterydischarge.functionname="QueryMonthAreabatterydischarge";
//
//RobotMyHome.compentlib.push({compentname:"上月放电区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"batterydischargereport",value:"com.robot.module.monitor.warn.RobotMonthAreabatterydischarge",
//cls:RobotMonthAreabatterydischarge});

//var RobotMonthAreagenerator=Object.create(RobotBaseAreaChart);
//RobotMonthAreagenerator.compentname="RobotMonthAreagenerator";
//RobotMonthAreagenerator.classname="RTWarnService";
//RobotMonthAreagenerator.functionname="QueryMonthAreagenerator";
//
//RobotMyHome.compentlib.push({compentname:"上月发电区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"generatorreport",value:"com.robot.module.monitor.warn.RobotMonthAreagenerator",
//cls:RobotMonthAreagenerator});
///////
var Robot90dayTop10FreqWarnGrid=Object.create(RobotBaseGrid);
Robot90dayTop10FreqWarnGrid.compentname="Robot90dayTop10FreqWarnGrid";
Robot90dayTop10FreqWarnGrid.classname="RTWarnService";
Robot90dayTop10FreqWarnGrid.functionname="Query90dayTop10FreqWarn";
Robot90dayTop10FreqWarnGrid.fielddisplay=["区域","监控点","数量"];
Robot90dayTop10FreqWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
Robot90dayTop10FreqWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"90天频繁告警Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
reportname:"Warn90dayreport",value:"com.robot.module.monitor.warn.Robot90dayTop10FreqWarnGrid",
cls:Robot90dayTop10FreqWarnGrid});


//var Robot90dayTop10FreqhighttemplateWarnGrid=Object.create(RobotBaseGrid);
//Robot90dayTop10FreqhighttemplateWarnGrid.compentname="Robot90dayTop10FreqhighttemplateWarnGrid";
//Robot90dayTop10FreqhighttemplateWarnGrid.classname="RTWarnService";
//Robot90dayTop10FreqhighttemplateWarnGrid.functionname="Query90dayTop10FreqhighttemplateWarn";
//Robot90dayTop10FreqhighttemplateWarnGrid.fielddisplay=["区域","监控点","数量"];
//Robot90dayTop10FreqhighttemplateWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//Robot90dayTop10FreqhighttemplateWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"90天频繁高温告警Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"highttemplateWarn90dayreport",value:"com.robot.module.monitor.highttemplateWarn.Robot90dayTop10FreqhighttemplateWarnGrid",
//cls:Robot90dayTop10FreqhighttemplateWarnGrid});


var Robot90dayTop10FreqtroubleWarnGrid=Object.create(RobotBaseGrid);
Robot90dayTop10FreqtroubleWarnGrid.compentname="Robot90dayTop10FreqtroubleWarnGrid";
Robot90dayTop10FreqtroubleWarnGrid.classname="RTWarnService";
Robot90dayTop10FreqtroubleWarnGrid.functionname="Query90dayTop10FreqtroubleWarn";
Robot90dayTop10FreqtroubleWarnGrid.fielddisplay=["区域","监控点","数量"];
Robot90dayTop10FreqtroubleWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
Robot90dayTop10FreqtroubleWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"90天频繁故障Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
reportname:"troubleWarn90dayreport",value:"com.robot.module.monitor.troubleWarn.Robot90dayTop10FreqtroubleWarnGrid",
cls:Robot90dayTop10FreqtroubleWarnGrid});


//var Robot90dayTop10FreqLowerBatteryWarnGrid=Object.create(RobotBaseGrid);
//Robot90dayTop10FreqLowerBatteryWarnGrid.compentname="Robot90dayTop10FreqLowerBatteryWarnGrid";
//Robot90dayTop10FreqLowerBatteryWarnGrid.classname="RTWarnService";
//Robot90dayTop10FreqLowerBatteryWarnGrid.functionname="Query90dayTop10FreqLowerBatteryWarn";
//Robot90dayTop10FreqLowerBatteryWarnGrid.fielddisplay=["区域","监控点","数量"];
//Robot90dayTop10FreqLowerBatteryWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//Robot90dayTop10FreqLowerBatteryWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"90天频繁低电压Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"LowerBatteryWarn90dayreport",value:"com.robot.module.monitor.LowerBatteryWarn.Robot90dayTop10FreqLowerBatteryWarnGrid",
//cls:Robot90dayTop10FreqLowerBatteryWarnGrid});


//var Robot90dayTop10FreqPowerDownWarnGrid=Object.create(RobotBaseGrid);
//Robot90dayTop10FreqPowerDownWarnGrid.compentname="Robot90dayTop10FreqPowerDownWarnGrid";
//Robot90dayTop10FreqPowerDownWarnGrid.classname="RTWarnService";
//Robot90dayTop10FreqPowerDownWarnGrid.functionname="Query90dayTop10FreqPowerDownWarn";
//Robot90dayTop10FreqPowerDownWarnGrid.fielddisplay=["区域","监控点","数量"];
//Robot90dayTop10FreqPowerDownWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//Robot90dayTop10FreqPowerDownWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"90天频繁停电告警Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"PowerDownWarn90dayreport",value:"com.robot.module.monitor.PowerDownWarn.Robot90dayTop10FreqPowerDownWarnGrid",
//cls:Robot90dayTop10FreqPowerDownWarnGrid});


//var Robot90dayTop10FreqbatterydischargeGrid=Object.create(RobotBaseGrid);
//Robot90dayTop10FreqbatterydischargeGrid.compentname="Robot90dayTop10FreqbatterydischargeGrid";
//Robot90dayTop10FreqbatterydischargeGrid.classname="RTWarnService";
//Robot90dayTop10FreqbatterydischargeGrid.functionname="Query90dayTop10Freqbatterydischarge";
//Robot90dayTop10FreqbatterydischargeGrid.fielddisplay=["区域","监控点","数量"];
//Robot90dayTop10FreqbatterydischargeGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//Robot90dayTop10FreqbatterydischargeGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"90天频繁放电Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"batterydescharge90dayreport",value:"com.robot.module.monitor.warn.Robot90dayTop10FreqbatterydischargeGrid",
//cls:Robot90dayTop10FreqbatterydischargeGrid});

//
//var Robot90dayTop10FreqgeneratorGrid=Object.create(RobotBaseGrid);
//Robot90dayTop10FreqgeneratorGrid.compentname="Robot90dayTop10FreqgeneratorGrid";
//Robot90dayTop10FreqgeneratorGrid.classname="RTWarnService";
//Robot90dayTop10FreqgeneratorGrid.functionname="Query90dayTop10Freqgenerator";
//Robot90dayTop10FreqgeneratorGrid.fielddisplay=["区域","监控点","数量"];
//Robot90dayTop10FreqgeneratorGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"cn"}];
//Robot90dayTop10FreqgeneratorGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"90天频繁发电Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"generator90dayreport",value:"com.robot.module.monitor.warn.Robot90dayTop10FreqgeneratorGrid",
//cls:Robot90dayTop10FreqgeneratorGrid});


var Robot90dayTop10LongWarnGrid=Object.create(RobotBaseGrid);
Robot90dayTop10LongWarnGrid.compentname="Robot90dayTop10LongWarnGrid";
Robot90dayTop10LongWarnGrid.classname="RTWarnService";
Robot90dayTop10LongWarnGrid.functionname="Query90dayTop10LongWarn";
Robot90dayTop10LongWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
Robot90dayTop10LongWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
Robot90dayTop10LongWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"90天告警时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
reportname:"Warn90dayreport",value:"com.robot.module.monitor.warn.Robot90dayTop10LongWarnGrid",
cls:Robot90dayTop10LongWarnGrid});


//var Robot90dayTop10LonghighttemplateWarnGrid=Object.create(RobotBaseGrid);
//Robot90dayTop10LonghighttemplateWarnGrid.compentname="Robot90dayTop10LonghighttemplateWarnGrid";
//Robot90dayTop10LonghighttemplateWarnGrid.classname="RTWarnService";
//Robot90dayTop10LonghighttemplateWarnGrid.functionname="Query90dayTop10LonghighttemplateWarn";
//Robot90dayTop10LonghighttemplateWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
//Robot90dayTop10LonghighttemplateWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//Robot90dayTop10LonghighttemplateWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"90天高温告警时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"highttemplateWarn90dayreport",value:"com.robot.module.monitor.highttemplateWarn.Robot90dayTop10LonghighttemplateWarnGrid",
//cls:Robot90dayTop10LonghighttemplateWarnGrid});


var Robot90dayTop10LongtroubleWarnGrid=Object.create(RobotBaseGrid);
Robot90dayTop10LongtroubleWarnGrid.compentname="Robot90dayTop10LongtroubleWarnGrid";
Robot90dayTop10LongtroubleWarnGrid.classname="RTWarnService";
Robot90dayTop10LongtroubleWarnGrid.functionname="Query90dayTop10LongtroubleWarn";
Robot90dayTop10LongtroubleWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
Robot90dayTop10LongtroubleWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
Robot90dayTop10LongtroubleWarnGrid.columnDefs=[{targets:[null]}];
RobotMyHome.compentlib.push({compentname:"90天故障时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
reportname:"troubleWarn90dayreport",value:"com.robot.module.monitor.troubleWarn.Robot90dayTop10LongtroubleWarnGrid",
cls:Robot90dayTop10LongtroubleWarnGrid});

//
//var Robot90dayTop10LongLowerBatteryWarnGrid=Object.create(RobotBaseGrid);
//Robot90dayTop10LongLowerBatteryWarnGrid.compentname="Robot90dayTop10LongLowerBatteryWarnGrid";
//Robot90dayTop10LongLowerBatteryWarnGrid.classname="RTWarnService";
//Robot90dayTop10LongLowerBatteryWarnGrid.functionname="Query90dayTop10LongLowerBatteryWarn";
//Robot90dayTop10LongLowerBatteryWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
//Robot90dayTop10LongLowerBatteryWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//Robot90dayTop10LongLowerBatteryWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"90天低电压时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"LowerBatteryWarn90dayreport",value:"com.robot.module.monitor.LowerBatteryWarn.Robot90dayTop10LongLowerBatteryWarnGrid",
//cls:Robot90dayTop10LongLowerBatteryWarnGrid});


//var Robot90dayTop10LongPowerDownWarnGrid=Object.create(RobotBaseGrid);
//Robot90dayTop10LongPowerDownWarnGrid.compentname="Robot90dayTop10LongPowerDownWarnGrid";
//Robot90dayTop10LongPowerDownWarnGrid.classname="RTWarnService";
//Robot90dayTop10LongPowerDownWarnGrid.functionname="Query90dayTop10LongPowerDownWarn";
//Robot90dayTop10LongPowerDownWarnGrid.fielddisplay=["区域","监控点","时间","时长"];
//Robot90dayTop10LongPowerDownWarnGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//Robot90dayTop10LongPowerDownWarnGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"90天停电告警时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"PowerDownWarn90dayreport",value:"com.robot.module.monitor.PowerDownWarn.Robot90dayTop10LongPowerDownWarnGrid",
//cls:Robot90dayTop10LongPowerDownWarnGrid});

//
//var Robot90dayTop10LongbatterydischargeGrid=Object.create(RobotBaseGrid);
//Robot90dayTop10LongbatterydischargeGrid.compentname="Robot90dayTop10LongbatterydischargeGrid";
//Robot90dayTop10LongbatterydischargeGrid.classname="RTWarnService";
//Robot90dayTop10LongbatterydischargeGrid.functionname="Query90dayTop10Longbatterydischarge";
//Robot90dayTop10LongbatterydischargeGrid.fielddisplay=["区域","监控点","时间","时长"];
//Robot90dayTop10LongbatterydischargeGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//Robot90dayTop10LongbatterydischargeGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"90天放电时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"batterydescharge90dayreport",value:"com.robot.module.monitor.warn.Robot90dayTop10LongbatterydischargeGrid",
//cls:Robot90dayTop10LongbatterydischargeGrid});


//var Robot90dayTop10LonggeneratorGrid=Object.create(RobotBaseGrid);
//Robot90dayTop10LonggeneratorGrid.compentname="Robot90dayTop10LonggeneratorGrid";
//Robot90dayTop10LonggeneratorGrid.classname="RTWarnService";
//Robot90dayTop10LonggeneratorGrid.functionname="Query90dayTop10Longgenerator";
//Robot90dayTop10LonggeneratorGrid.fielddisplay=["区域","监控点","时间","时长"];
//Robot90dayTop10LonggeneratorGrid.columns=[{"data":"areaname"},{"data":"stationname"},{"data":"startuptime"},{"data":"durtime"}];
//Robot90dayTop10LonggeneratorGrid.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"90天发电时长Top10",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"month",
//reportname:"generator90dayreport",value:"com.robot.module.monitor.warn.Robot90dayTop10LonggeneratorGrid",
//cls:Robot90dayTop10LonggeneratorGrid});

var Robot90dayTimeAreaWarn=Object.create(RobotBaseTimeAreaChart);
Robot90dayTimeAreaWarn.compentname="Robot90dayTimeAreaWarn";
Robot90dayTimeAreaWarn.classname="RTWarnService";
Robot90dayTimeAreaWarn.functionname="Query90dayTimeAreaWarn";

RobotMyHome.compentlib.push({compentname:"90天告警时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
reportname:"Warnreport",value:"com.robot.module.monitor.warn.Robot90dayTimeAreaWarn",
cls:Robot90dayTimeAreaWarn});
//
//var Robot90dayTimeAreahighttemplateWarn=Object.create(RobotBaseTimeAreaChart);
//Robot90dayTimeAreahighttemplateWarn.compentname="Robot90dayTimeAreahighttemplateWarn";
//Robot90dayTimeAreahighttemplateWarn.classname="RTWarnService";
//Robot90dayTimeAreahighttemplateWarn.functionname="Query90dayTimeAreahighttemplateWarn";
//
//RobotMyHome.compentlib.push({compentname:"90天高温时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"highttemplateWarnreport",value:"com.robot.module.monitor.warn.Robot90dayTimeAreahighttemplateWarn",
//cls:Robot90dayTimeAreahighttemplateWarn});

var Robot90dayTimeAreatroubleWarn=Object.create(RobotBaseTimeAreaChart);
Robot90dayTimeAreatroubleWarn.compentname="Robot90dayTimeAreatroubleWarn";
Robot90dayTimeAreatroubleWarn.classname="RTWarnService";
Robot90dayTimeAreatroubleWarn.functionname="Query90dayTimeAreatroubleWarn";

RobotMyHome.compentlib.push({compentname:"90天故障时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
reportname:"troubleWarnreport",value:"com.robot.module.monitor.warn.Robot90dayTimeAreatroubleWarn",
cls:Robot90dayTimeAreatroubleWarn});

//var Robot90dayTimeAreaLowerBatteryWarn=Object.create(RobotBaseTimeAreaChart);
//Robot90dayTimeAreaLowerBatteryWarn.compentname="Robot90dayTimeAreaLowerBatteryWarn";
//Robot90dayTimeAreaLowerBatteryWarn.classname="RTWarnService";
//Robot90dayTimeAreaLowerBatteryWarn.functionname="Query90dayTimeAreaLowerBatteryWarn";
//
//RobotMyHome.compentlib.push({compentname:"90天低电压时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"LowerBatteryWarnreport",value:"com.robot.module.monitor.warn.Robot90dayTimeAreaLowerBatteryWarn",
//cls:Robot90dayTimeAreaLowerBatteryWarn});

//var Robot90dayTimeAreaPowerDownWarn=Object.create(RobotBaseTimeAreaChart);
//Robot90dayTimeAreaPowerDownWarn.compentname="Robot90dayTimeAreaPowerDownWarn";
//Robot90dayTimeAreaPowerDownWarn.classname="RTWarnService";
//Robot90dayTimeAreaPowerDownWarn.functionname="Query90dayTimeAreaPowerDownWarn";
//
//RobotMyHome.compentlib.push({compentname:"90天停电时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"PowerDownWarnreport",value:"com.robot.module.monitor.warn.Robot90dayTimeAreaPowerDownWarn",
//cls:Robot90dayTimeAreaPowerDownWarn});

//var Robot90dayTimeAreabatterydischarge=Object.create(RobotBaseTimeAreaChart);
//Robot90dayTimeAreabatterydischarge.compentname="Robot90dayTimeAreabatterydischarge";
//Robot90dayTimeAreabatterydischarge.classname="RTWarnService";
//Robot90dayTimeAreabatterydischarge.functionname="Query90dayTimeAreabatterydischarge";
//
//RobotMyHome.compentlib.push({compentname:"90天放电时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"batterydischargereport",value:"com.robot.module.monitor.warn.Robot90dayTimeAreabatterydischarge",
//cls:Robot90dayTimeAreabatterydischarge});

//var Robot90dayTimeAreagenerator=Object.create(RobotBaseTimeAreaChart);
//Robot90dayTimeAreagenerator.compentname="Robot90dayTimeAreagenerator";
//Robot90dayTimeAreagenerator.classname="RTWarnService";
//Robot90dayTimeAreagenerator.functionname="Query90dayTimeAreagenerator";
//
//RobotMyHome.compentlib.push({compentname:"90天发电时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"generatorreport",value:"com.robot.module.monitor.warn.Robot90dayTimeAreagenerator",
//cls:Robot90dayTimeAreagenerator});

var Robot90dayAreaWarn=Object.create(RobotBaseAreaChart);
Robot90dayAreaWarn.compentname="Robot90dayAreaWarn";
Robot90dayAreaWarn.classname="RTWarnService";
Robot90dayAreaWarn.functionname="Query90dayAreaWarn";

RobotMyHome.compentlib.push({compentname:"90天告警区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
reportname:"Warnreport",value:"com.robot.module.monitor.warn.Robot90dayAreaWarn",
cls:Robot90dayAreaWarn});

//var Robot90dayAreahighttemplateWarn=Object.create(RobotBaseAreaChart);
//Robot90dayAreahighttemplateWarn.compentname="Robot90dayAreahighttemplateWarn";
//Robot90dayAreahighttemplateWarn.classname="RTWarnService";
//Robot90dayAreahighttemplateWarn.functionname="Query90dayAreahighttemplateWarn";
//
//RobotMyHome.compentlib.push({compentname:"90天高温区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"highttemplateWarnreport",value:"com.robot.module.monitor.warn.Robot90dayAreahighttemplateWarn",
//cls:Robot90dayAreahighttemplateWarn});

var Robot90dayAreatroubleWarn=Object.create(RobotBaseAreaChart);
Robot90dayAreatroubleWarn.compentname="Robot90dayAreatroubleWarn";
Robot90dayAreatroubleWarn.classname="RTWarnService";
Robot90dayAreatroubleWarn.functionname="Query90dayAreatroubleWarn";

RobotMyHome.compentlib.push({compentname:"90天故障区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
reportname:"troubleWarnreport",value:"com.robot.module.monitor.warn.Robot90dayAreatroubleWarn",
cls:Robot90dayAreatroubleWarn});

//var Robot90dayAreaLowerBatteryWarn=Object.create(RobotBaseAreaChart);
//Robot90dayAreaLowerBatteryWarn.compentname="Robot90dayAreaLowerBatteryWarn";
//Robot90dayAreaLowerBatteryWarn.classname="RTWarnService";
//Robot90dayAreaLowerBatteryWarn.functionname="Query90dayAreaLowerBatteryWarn";
//
//RobotMyHome.compentlib.push({compentname:"90天低电压区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"LowerBatteryWarnreport",value:"com.robot.module.monitor.warn.Robot90dayAreaLowerBatteryWarn",
//cls:Robot90dayAreaLowerBatteryWarn});

//var Robot90dayAreaPowerDownWarn=Object.create(RobotBaseAreaChart);
//Robot90dayAreaPowerDownWarn.compentname="Robot90dayAreaPowerDownWarn";
//Robot90dayAreaPowerDownWarn.classname="RTWarnService";
//Robot90dayAreaPowerDownWarn.functionname="Query90dayAreaPowerDownWarn";
//
//RobotMyHome.compentlib.push({compentname:"90天停电区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"PowerDownWarnreport",value:"com.robot.module.monitor.warn.Robot90dayAreaPowerDownWarn",
//cls:Robot90dayAreaPowerDownWarn});

//var Robot90dayAreabatterydischarge=Object.create(RobotBaseAreaChart);
//Robot90dayAreabatterydischarge.compentname="Robot90dayAreabatterydischarge";
//Robot90dayAreabatterydischarge.classname="RTWarnService";
//Robot90dayAreabatterydischarge.functionname="Query90dayAreabatterydischarge";
//
//RobotMyHome.compentlib.push({compentname:"90天放电区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"batterydischargereport",value:"com.robot.module.monitor.warn.Robot90dayAreabatterydischarge",
//cls:Robot90dayAreabatterydischarge});

//var Robot90dayAreagenerator=Object.create(RobotBaseAreaChart);
//Robot90dayAreagenerator.compentname="Robot90dayAreagenerator";
//Robot90dayAreagenerator.classname="RTWarnService";
//Robot90dayAreagenerator.functionname="Query90dayAreagenerator";
//
//RobotMyHome.compentlib.push({compentname:"90天发电区域分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"generatorreport",value:"com.robot.module.monitor.warn.Robot90dayAreagenerator",
//cls:Robot90dayAreagenerator});
//
//var RobotCSC90dayTimeAreagenerator=Object.create(RobotBaseTimeAreaChart);
//RobotCSC90dayTimeAreagenerator.compentname="Robot90dayTimeAreagenerator";
//RobotCSC90dayTimeAreagenerator.classname="PowerManagerService";
//RobotCSC90dayTimeAreagenerator.functionname="QueryCSC90dayTimeAreaGenerator";
//
//RobotMyHome.compentlib.push({compentname:"90天发电时长分布分析",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"small",counttype:"month",
//reportname:"generatorreport",value:"com.robot.module.monitor.warn.Robot90CSCdayTimeAreagenerator",
//cls:RobotCSC90dayTimeAreagenerator});
//var RobotNear10Generator=Object.create(RobotBaseGrid);
//RobotNear10Generator.compentname="RobotNear10Generator";
//RobotNear10Generator.classname="PowerManagerService";
//RobotNear10Generator.functionname="QueryCSCNear10Generator";
//RobotNear10Generator.fielddisplay=["监控点","开始时间","结束时间","负载电流"];
//RobotNear10Generator.columns=[{"data":"stationname"},{"data":"startuptime"},{"data":"enduptime"},{"data":"loadcurren"}];
//RobotNear10Generator.columnDefs=[{targets:[null]}];
//RobotMyHome.compentlib.push({compentname:"最近发电记录",icon:"assets/myhome/grid.png",type:"grid",sizetype:"small",counttype:"day",
//reportname:"Warnreport",value:"com.robot.module.monitor.warn.RobotNear10Generator",
//cls:RobotNear10Generator});

var RobotVideoMonitor=Object.create(RobotTitleInfo);
RobotVideoMonitor.compentname="RobotVideoMonitor";
RobotVideoMonitor.classname="RTWarnService";
RobotVideoMonitor.functionname="Query90dayAreatroubleWarn";
RobotVideoMonitor.title="视频监控模块，展示视频，可以切换多屏";
RobotMyHome.compentlib.push({compentname:"视频监控",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"big",counttype:"day",
reportname:"RobotVideoMonitor",value:"com.robot.module.monitor.RobotVideoMonitor",
cls:RobotVideoMonitor});


var  RobotMonitorPMCompent=Object.create(RobotMonitorSingnalCompent);
RobotMonitorPMCompent.id="1";
RobotMonitorPMCompent.deviceid="-1";
RobotMonitorPMCompent.targetnames=["PM2.5","PM10"];
RobotMonitorPMCompent.targetcodes=["0523140","0523150"];
RobotMyHome.compentlib.push({compentname:"PM2.5/PM10实时监测",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"big",counttype:"day",
	reportname:"SignalMonitor",value:"com.robot.module.monitor.RobotMonitorPMCompent",
	cls:RobotMonitorPMCompent});

var  RobotMonitorVoiceCompent=Object.create(RobotMonitorSingnalCompent);
RobotMonitorVoiceCompent.id="2";
RobotMonitorVoiceCompent.deviceid="-1";
RobotMonitorVoiceCompent.targetnames=["噪音"];
RobotMonitorVoiceCompent.targetcodes=["0523130"];
RobotMyHome.compentlib.push({compentname:"噪音实时监测",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"big",counttype:"day",
	reportname:"SignalMonitor",value:"com.robot.module.monitor.RobotMonitorVoiceCompent",
	cls:RobotMonitorVoiceCompent});
var  RobotBaseMonitorSingnalCompent=Object.create(RobotMonitorSingnalCompent);

RobotMyHome.compentlib.push({compentname:"通用指标实时监测",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"big",counttype:"day",
	reportname:"SignalMonitor",value:"com.robot.module.monitor.RobotBaseMonitorSingnalCompent",
	cls:RobotBaseMonitorSingnalCompent});

RobotMyHome.compentlib.push({compentname:"地图监控",icon:"assets/myhome/arealinechart.png",type:"chart",sizetype:"big",counttype:"day",
	reportname:"RobotBaiduMapMonitor",value:"com.robot.module.monitor.RobotBaiduMapMonitor",
	cls:RobotBaiduMapMonitor});
