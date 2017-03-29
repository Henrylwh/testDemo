//不加这一句界面的图标会不正常，可能是上网去找这些图片了
Ext.BLANK_IMAGE_URL = '/images/s.gif';

Ext.QuickTips.init();

Ext.onReady(launchFrame);

var gbodyWidth;
var gbodyHeight;



function launchFrame() {
	
	gbodyWidth=Ext.getBody().getWidth()*0.9;
	gbodyHeight = Ext.getBody().getHeight()*0.9;

	var viewport = new Ext.Viewport({
				layout : {
					type : 'border',
					padding : 0
				},
				defaults : {
					collapsible : true,
					split : true
				},
				items : [{
							id:'north-panel',
							region : "north",
							height : 100,
							title : '测试项目',
							collapsible: true,
							collapsed : true,
							html : '<img src="/images/teamtitle.png"/>'
						}, content, westTree]
			});
}
