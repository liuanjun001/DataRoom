var RobotConditionTree={
	id:1,
	contiontree:null,
	contiontreedata:null,
	init:function(content){
	var str='<ul id="contiontree'+this.id+'"  ></ul>';
	content.append(str);
	this.contiontree=$("#contiontree"+this.id);
	  this.contiontree.tree({
          checkbox:true,
          onClick:function(node){
          	for (var i = 0; i < RobotAreaStationTree.listenObjs.length; i++) {
          		
          		  if(node.node_type=="s"){
          		  	try{
          		  	  RobotAreaStationTree.listenObjs[i].refreshstation(node.node_id,node.node_name);	
          		  	}catch(e){
          		  		//TODO handle the exception
          		  	}
        
          }else    if(node.node_type=="a"){
          	try{
           RobotAreaStationTree.listenObjs[i].refresharea(node.node_id,node.node_name);
           }catch(e){
          		  		//TODO handle the exception
          		  	}
          }
          	}
        
          
          }
       
        });
        this.refreshcontiontree();
	},
	refreshcontiontree:function(){
		robotservice.callrobotservice("RTWarnService","getConditionTree",{modulename:"WarnWindowModule",user_id:robotservice.userid},this.showcontiontree,this,true);
	},
	showcontiontree:function(data,callobj){
		        callobj.copytree(data);
        	callobj.contiontreedata=data;
        	callobj.contiontree.tree({"data":callobj.contiontreedata});
	},
	copytree:	function (data){
        	for(var i=0;data!=null&&i<data.length;i++){
        	data[i].text=data[i].conditionname;
        	

        	    this.copytree(data[i].children);

        	  }
        },
	
}
