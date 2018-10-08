 $(window).load(function() {
	var rbvideo=$(".RobotVideo");
	for(var i=0;i<rbvideo.length;i++){
	$(rbvideo[i]).html('<embed play="true" swliveconnect="true" id="swf_video'+i+'" src="'+RobotComm.baseurl+'videoplay/videoplay.swf" quality="high" bgcolor="#FFFFFF" width="100%" height="100%" type="application/x-shockwave-flash" swliveconnect="true" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"/>');
	rbvideo[i].dataset.swfid="swf_video"+i;
	rbvideo[i].playVideo=function(liveurl){
	console.log(this,liveurl);
	var callobj=this;
	 var mov= $("#"+this.dataset.swfid)[0];
	 var pos=liveurl.lastIndexOf("/");
	 try{
	 mov.playVideo(liveurl.substr(0,pos+1),liveurl.substr(pos+1));
	 isplay=true;
	 }catch(err){
	 setTimeout(function(){
	 callobj.playVideo(liveurl);
	 },"5000");
	 }
	 
  
	  } ;
	}
});