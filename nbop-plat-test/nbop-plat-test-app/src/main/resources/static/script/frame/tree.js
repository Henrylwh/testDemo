function handleClick(view, record, item, index, e,obj) {
    
	if (record.data.leaf) {
		var activatepanel = record.data.id.substring(0, record.data.id.indexOf('_'));
		//alert(activatepanel);
		if (activatepanel == 'book') {
			var content_panel = Ext.getCmp('center-panel');  
			var tabTmp = Ext.getCmp('bookPanel');  
		    if (tabTmp == null) {  
		    	launchbookGrid();
		    	tabs.add(book);
		    }
		    tabs.setActiveTab('bookPanel');
		}
	}
}

/*
var tree =Ext.create('Ext.tree.Panel',{
			id : 'tree',
			xtype : 'treepanel',
			loader : new Ext.tree.TreeLoader({
						dataUrl : '/dev/front/script/tree.json'
					}),
			rootVisible : false
		});

var root = new Ext.tree.AsyncTreeNode();

tree.setRootNode(root);
*/

var treeStore = Ext.create('Ext.data.TreeStore', {
    proxy: {
        type: 'ajax',
        url: '/dev/front/script/tree.json'
    },
    fields: ['text', 'id', 'leaf', 'icon']
});

var tree = Ext.create('Ext.tree.Panel', {
    store: treeStore,
    border: false,  //边框
    renderTo: Ext.getBody(),
    enableDD: true,
    rootVisible: false,  //隐藏根节点
    useArrows:true, //树节点使用箭头
    containerScroll: true,
    collapsible: false,
    autoScroll: false, 
    listeners:{itemclick:handleClick}   
    //singleExpand:true   //展示单个子节点，其它的子节点合并。
});         

tree.expandAll();

//tree.on('click', handleClick);

var westTree = {
	region : "west",
	width : 200,
	title : "选择功能",
	items : [tree]
}
