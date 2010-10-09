dojo.require("dijit.layout.LayoutContainer");
dojo.require("dijit.Toolbar");
dojo.require("dijit.layout.SplitContainer");
dojo.require("dijit.layout.AccordionContainer");
dojo.require("dijit.layout.AccordionPane");
dojo.require("dijit.layout.ContentPane");
dojo.require("dojox.grid.DataGrid");
dojo.require("dojo.data.ItemFileWriteStore");
dojo.require("dojo.date.locale");
dojo.require("dojo.date.stamp");
dojo.require("dijit.Tooltip");

var old = "";
dojo.addOnLoad(function(){ 
	var client=new Faye.Client("/faye"); 
	var subscription = client.subscribe("/msg",function(msg){ 
		if (msg.type === "news") {
			old = dijit.byId('news_content').attr('content') + "<br/>";
			dijit.byId('news_content').attr('content',old + msg.text);		
		};
	
	});
});


var onJobQueClick = function(cell) {
	var item = cell.grid.getItem(cell.rowIndex);
	sender = this.store.getValue(item,"sender"),
	label = this.store.getValue(item,"label"),
	
	sent=this.store.getValue(item,"sent"),
	text=this.store.getValue(item,"text"),
	outmsg="<span class='messageHeader'>From: "+sender+"<br>"+"Subject: "+label+"<br>"+"Date: "+sent+"<br><br></span>"+text;
	dijit.byId("message").setContent(outmsg);
	

};

