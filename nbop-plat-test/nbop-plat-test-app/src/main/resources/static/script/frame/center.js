var start = {
	id : 'start-panel',
	title : '欢迎使用',
	layout : 'fit',
	autoHeight: true,
	border: false,
	bodyStyle : 'border:25px',
	closable:false,
	html : '<img src="/images/bg.jpg"/>'
};


//var tabs = new Ext.TabPanel();
var tabs =Ext.create("Ext.tab.Panel");

tabs.add(start);
tabs.setActiveTab('start-panel');
	



var content = {
	id : 'center-panel',
	region : 'center',
	items: [tabs]
};




