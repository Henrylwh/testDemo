var book_grid;
var book_grid_store;
var book;
var bookPageSize =1;

function add_book() {

	var input_form = new Ext.form.FormPanel({
		id : 'input_form',
		defaultType : 'textfield',
		allowBlank: false,
		labelWidth : 150,
		buttonAlign : 'left',
		width : 600,
		url : '/test/book/addBook',
		title : '请输入数据，然后点击提交按钮保存',
		frame : true,
		items : [
				{
					xtype:'numberfield',
					allowDecimals:false,//只能是整数
					minValue:0, //不能是负数
					fieldLabel : '编号',
					allowBlank : false,
					name : 'id',
					width : 300
				},
				{
					fieldLabel : '书名',
					allowBlank : false,
					name : 'name',
					width : 300
				},
				{
					fieldLabel : '作者',
					allowBlank : false,
					name : 'author',
					width : 300
				},
				{
					xtype:'numberfield',
					allowDecimals:false,//只能是整数
					minValue:0, //不能是负数
					fieldLabel : '发行年份',
					allowBlank : false,
					name : 'year',
					width : 300
				},
				{
					xtype : 'textarea',
					fieldLabel : '摘要',
					allowBlank : false,
					name : 'digest',
					width : 700,
					height : 400,
	         		readOnly: false 
				}
				],
		buttons : [{
			text : '提交',
			handler : function() {
				var thisForm = input_form.getForm();
				var bookValues = thisForm.getValues();
				console.log(bookValues);
				if(thisForm.isValid()){
					Ext.Ajax.request({
						url : '/test/book/addBook',
						params : {
							bookValues : Ext.JSON.encode(bookValues)
						},
						success : function(resp,opts) {
							var respText = Ext.JSON.decode(resp.responseText);
							if(respText.success == true)
							{
								Ext.Msg.alert('信息框', '添加书籍成功');
								Ext.getCmp('input_form').getForm().reset();
								Ext.getCmp('book_grid').getStore().reload();
								Ext.getCmp('book_grid').getSelectionModel().deselectAll();
								//添加成功后，关闭窗口
								add_win.close();
							}
							else if(respText.success==undefined || respText.success==false)
							{
								Ext.Msg.show({
									title : '操作失败',
									msg : "errorNo:"+respText.errorNo+",errorInfo:"+respText.errorInfo,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							}
							else if(respText.success==undefined)
							{
								Ext.Msg.alert('操作失败', "您的操作报错，请联系管理员！");
							}
							
						},
						failure : function(resp,opts) {
							var respText = Ext.JSON.decode(resp.responseText); 
							if(respText.success==undefined || respText.success==false)
							{
								Ext.Msg.show({
									title : '操作失败',
									msg : "errorNo:"+respText.errorNo+",errorInfo:"+respText.errorInfo,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							}
							else if(respText.success==undefined)
							{
								Ext.Msg.alert('操作失败', "您的操作报错，请联系管理员！");
							}
							else
							{
								Ext.Msg.alert('操作失败', "您的操作报错，请联系管理员！");
							}
						}
					});
					/*
					input_form.getForm().submit({
						params: {  userValues },  
			            waitMsg: '正在处理',  
			            waitTitle: '请等待', 
						success : function(input_form, action) {
							if(action.result.success==undefined || action.result.success==false)
							{
								Ext.Msg.show({
									title : '操作失败',
									msg : "errorNo:"+action.result.errorNo+",errorInfo:"+action.result.errorInfo,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							}
							else
							{
								Ext.Msg.alert('信息框', '添加书籍成功');
								Ext.getCmp('input_form').getForm().reset();
								Ext.getCmp('book_grid').getStore().reload();
								Ext.getCmp('book_grid').getSelectionModel().deselectAll();
								//添加成功后，关闭窗口
								add_win.close();
							}
							
						},
						failure : function(form, action) {// 分两种处理
							if(action.result.success==undefined || action.result.success==false)
							{
								Ext.Msg.show({
									title : '操作失败',
									msg : "errorNo:"+action.result.errorNo+",errorInfo:"+action.result.errorInfo,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							}
							else if(action.result.success==undefined)
							{
								Ext.Msg.alert('操作失败', "您的操作报错，请联系管理员！");
							}
							else
							{
								Ext.Msg.alert('操作失败', "您的操作报错，请联系管理员！");
							}
						}
					});*/
				}
			}
		}, {
			text : '重置',
			handler : function() {
				input_form.getForm().reset();
			}
		}]
	});

	var add_win = new Ext.Window({
		title : '添加book',
		width : 600,
		//height : 700,
		resizable : true,
		autoHeight : true,
		modal : true,
		//closeAction : 'hide',
		items : [input_form]
	});

	add_win.show();
};

function delete_book() {
	var record = book_grid.getSelectionModel().getSelection()[0];
	if(!record)
	{
		Ext.Msg.alert("提示框", "你还没有选择记录");
		return;
	}
	if (record) {
		Ext.Msg.show({
			title : '警告提示',
			msg : '请谨慎操作，你真的要删除吗？',
			buttons : Ext.Msg.YESNO,
			icon : Ext.Msg.WARNING,
			fn : function(btn1) {
				if (btn1 == 'yes') {
					Ext.Ajax.request({
						url : '/test/book/deleteBook',
						params : {
							idString : Ext.JSON.encode({id:55})  //Ext.JSON.encode({id:record.get('id')})
						},
						success : function(resp,opts) {
							var respText = Ext.JSON.decode(resp.responseText);
							if(respText.success == true)
							{
								Ext.Msg.alert('操作成功！', "删除书籍成功！");
								book_grid.getStore().remove(record);
								book_grid_store.reload({params : {
									start : 0,
									limit : bookPageSize
								}});
								Ext.getCmp('book_grid').getSelectionModel().deselectAll();
							}
							else if(respText.success==undefined || respText.success==false)
							{
								Ext.Msg.show({
									title : '操作失败',
									msg : "errorNo:"+respText.errorNo+",errorInfo:"+respText.errorInfo,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							}
							else if(respText.success==undefined)
							{
								Ext.Msg.alert('操作失败', "您的操作报错，请联系管理员！");
							}
							
						},
						failure : function(resp,opts) {
							var respText = Ext.JSON.decode(resp.responseText); 
							if(respText.success==undefined || respText.success==false)
							{
								Ext.Msg.show({
									title : '操作失败',
									msg : "errorNo:"+respText.errorNo+",errorInfo:"+respText.errorInfo,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							}
							else if(respText.success==undefined)
							{
								Ext.Msg.alert('操作失败', "您的操作报错，请联系管理员！");
							}
							else
							{
								Ext.Msg.alert('操作失败', "您的操作报错，请联系管理员！");
							}
						}
					});
				}
			}
		});
	} else {
		Ext.Msg.alert("提示框", "你还没有选择记录");
	}
}

function edit_book(record) {
	var record = book_grid.getSelectionModel().getSelection()[0];

	if(!record)
	{
		Ext.Msg.alert("提示框", "你还没有选择记录");
		return;
	}

	var input_form = new Ext.form.FormPanel({
		id : 'input_form',
		defaultType : 'textfield',
		allowBlank: false,
		labelWidth : 150,
		buttonAlign : 'left',
		width : 600,
		url : '/test/book/updateBook',
		title : '请输入数据，然后点击提交按钮保存',
		frame : true,
		items : [
					{
						xtype:'numberfield',
						allowDecimals:false,//只能是整数
						minValue:0, //不能是负数
						fieldLabel : '编号',
						allowBlank : false,
						name : 'id',
						value:record.get("id"),
						width : 300,
		         		readOnly: false
					},
					{
						fieldLabel : '书名',
						allowBlank : false,
						name : 'name',
						value:record.get("name"),
						width : 300
					},
					{
						fieldLabel : '作者',
						allowBlank : false,
						name : 'author',
						value:record.get("author"),
						width : 300
					},
					{
						xtype:'numberfield',
						allowDecimals:false,//只能是整数
						minValue:0, //不能是负数
						fieldLabel : '发行年份',
						allowBlank : false,
						name : 'year',
						value:record.get("year"),
						width : 300
					},
					{
						xtype : 'textarea',
						fieldLabel : '摘要',
						allowBlank : false,
						name : 'digest',
						width : 700,
						height : 400,
						value:record.get("digest"),
		         		readOnly: false 
					}],
		buttons : [{
			text : '提交',
			handler : function() {
				var thisForm = input_form.getForm();
				var bookValues = thisForm.getValues();
				console.log(bookValues);
				if(thisForm.isValid()){
					Ext.Ajax.request({
						url : '/test/book/updateBook',
						params : {
							bookValues : Ext.JSON.encode(bookValues)
						},
						success : function(resp,opts) {
							var respText = Ext.JSON.decode(resp.responseText);
							if(respText.success == true)
							{
								Ext.Msg.alert('信息框', '更新成功');
								Ext.getCmp('input_form').getForm().reset();
								Ext.getCmp('book_grid').getStore().reload();
								Ext.getCmp('book_grid').getSelectionModel().deselectAll();
								//更新成功后，关闭窗口
								edit_win.close();
							}
							else if(respText.success==undefined || respText.success==false)
							{
								Ext.Msg.show({
									title : '操作失败',
									msg : "errorNo:"+respText.errorNo+",errorInfo:"+respText.errorInfo,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							}
							else if(respText.success==undefined)
							{
								Ext.Msg.alert('操作失败', "您的操作报错，请联系管理员！");
							}
							
						},
						failure : function(resp,opts) {
							var respText = Ext.JSON.decode(resp.responseText); 
							if(respText.success==undefined || respText.success==false)
							{
								Ext.Msg.show({
									title : '操作失败',
									msg : "errorNo:"+respText.errorNo+",errorInfo:"+respText.errorInfo,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							}
							else if(respText.success==undefined)
							{
								Ext.Msg.alert('操作失败', "您的操作报错，请联系管理员！");
							}
							else
							{
								Ext.Msg.alert('操作失败', "您的操作报错，请联系管理员！");
							}
						}
					});
					/*
					input_form.getForm().submit({
						success : function(input_form, action) {
							Ext.Msg.alert('信息框', '更新成功');
							Ext.getCmp('input_form').getForm().reset();
							Ext.getCmp('book_grid').getStore().reload();
							Ext.getCmp('book_grid').getSelectionModel().deselectAll();
							//更新成功后，关闭窗口
							edit_win.close();
						},
						failure : function(form, action) {// 分两种处理
							if(action.result.success==undefined || action.result.success==false)
							{
								//Ext.Msg.alert('操作失败', "errorNo:"+action.result.errorNo+",errorInfo:"+action.result.errorInfo);
								Ext.Msg.show({
									title : '操作失败',
									msg : "errorNo:"+action.result.errorNo+",errorInfo:"+action.result.errorInfo,
									buttons : Ext.Msg.OK,
									icon : Ext.Msg.INFO
								});
							}
							else if(action.result.success==undefined)
							{
								Ext.Msg.alert('操作失败', "您的操作报错，请联系管理员！");
							}
							else
							{
								Ext.Msg.alert('操作失败', "您的操作报错，请联系管理员！");
							}
						}
					});
					*/
				}
			}
		}]
	});

	var edit_win = new Ext.Window({
		title : '编辑book',
		width : 600,
		//height : 700,
		resizable : true,
		autoHeight : true,
		modal : true,
		//closeAction : 'hide',
		items : [input_form]
	});
	
	edit_win.show();
}

function search_book() {
	
	book_grid_store.reload({params : {
					start : 0,
					limit : bookPageSize
				}});
	Ext.getCmp('book_grid').getSelectionModel().deselectAll();
			
}

var book_grid_tbar = [{
			text : '添加',
			cls : 'x-btn-text-icon',
			handler : add_book,
			icon : '/images/add.gif'
		}, {
			text : '删除',
			cls : 'x-btn-text-icon',
			handler : delete_book,
			icon : '/images/delete.gif'
		}, {
			text : '修改',
			cls : 'x-btn-text-icon',
			handler : edit_book,
			icon : '/images/edit.gif'
		}, {
			text : '刷新',
			cls : 'x-btn-text-icon',
			handler : search_book,
			icon : '/images/search.gif'
		}];
		
function launchbookGrid() {

	cm = [Ext.create('Ext.grid.RowNumberer',{text : '行号', width : 80}),
          {header : '编号',dataIndex : 'id',width : 100}, 
          {header : '书名',dataIndex : 'name',width : 300}, 
          {header : '作者',dataIndex : 'author',width : 200},
          {header : '发行年份',dataIndex : 'year',width : 100}, 
          {header : '摘要',dataIndex : 'digest',width : 200}
         ];
			
			
	Ext.define('book', {  
        extend: 'Ext.data.Model',  
        fields: [  
                 {name : 'id',type : 'string'}, 
                 {name : 'name',type : 'string'}, 
                 {name : 'author',type : 'string'},
                 {name : 'year',type : 'string'}, 
                 {name : 'digest',type : 'string'}  
        ]  
    });  

	book_grid_store = Ext.create('Ext.data.Store',{
				model: book,  
				pageSize:bookPageSize ,
				proxy : new Ext.data.HttpProxy({
							getMethod: function(){ return 'POST'; },//亮点，设置请求方式,默认为GET
							url : '/test/book/getBookList',
							reader: {  
					            type: 'json',  
					            root: 'root',  
					            totalProperty: 'totalProperty'  
					        }  
						})
			});

	book_grid = Ext.create('Ext.grid.Panel',{
				id : 'book_grid',
				store : book_grid_store,
				renderTo: Ext.getBody(),
				//cm:cm,
				columns : cm,
				//autoHeight : true,
				height: 800,
				autoScroll:true, 
				stripeRows:true, //斑马线效果  
				singleSelect : true,
				/*
				sm : new Ext.grid.RowSelectionModel({
							singleSelect : true
						}),
				*/
				loadMask : {
					msg : '正在加载数据，请稍侯……'
				},
				viewConfig : {
					forceFit : true,
					emptyText: "<div>查询结果为空！</div>"
				},
				tbar : book_grid_tbar,
				bbar : new Ext.PagingToolbar({
							pageSize : bookPageSize,
							store : book_grid_store,
							displayInfo : true,
							displayMsg : '显示第{0}条到{1}记录，一共{2}条',
							emptyMsg : '没有记录'
						}),
				listeners:{
							'itemdblclick' : function(dataview,record, item, index, e){
			                    edit_book();
			                    
							}
						}				
			});

	book_grid_store.load({
				params : {
					start : 0,
					limit : bookPageSize
				}
			});
	
	/*
	book_grid.addListener('itemclick',itemclick); //添加触发的函
	function itemclick(view, record, item, index, e) {     
    } ;
	*/
    
	book = {
			id : 'bookPanel',
			title : '图书管理',
			items:[book_grid],
			closable : true
		};
}
