/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "plant.Slider",
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
		
		plant: {}
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
		{content: "PLANT NAME"},
		{name: "name", classes: "no2"}
		
	],
	create: function(){
		this.inherited(arguments);
	},
	load: function(plantObject){
		this.setPlant(plantObject);
	},
	plantChanged: function(){
		var _g = this.plant.published;
		for(var _p in _g){
			if(this.$[_p]){
				this.$[_p].setContent(this.plant[_p]);
			}
		}
	}
});