/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "template.Slider",
	kind: "onyx.Groupbox",
	defaultKind: "onyx.GroupboxHeader",
	classes: "slider",
	published: {
		/*
		 * Add any objects
		 * that you will need
		 * 
		 * For example:
		 * garden: {}
		 */
		
		template: {}
	},
	components: [
		/*
		 * When adding an item,
		 * make sure the NAME matches
		 * the property name in both
		 * the OBJECT constructor (object.js)
		 * and the editor
		 */
		
		//template
		{content: "TEMPLATE"},
		{name: "name", classes: "no2"}
		
	],
	create: function(){
		this.inherited(arguments);
	},
	load: function(templateObject){
		this.setTemplate(templateObject);
	},
	templateChanged: function(){
		var _g = this.template.published;
		for(var _p in _g){
			if(this.$[_p]){
				this.$[_p].setContent(this.template[_p]);
			}
		}
	}
});