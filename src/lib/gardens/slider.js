/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "garden.Slider",
	kind: "onyx.Groupbox",
	defaultKind: "onyx.GroupboxHeader",
	classes: "slider",
	published: {
		garden: ""
	},
	components: [
		
		//name
		{content: "Name"},
		{name: "name", classes: "no2"},
		
		//location
		{content: "Location"},
		{name: "location", classes: "no2"},
		
		//description
		{content: "Description"},
		{name: "description", classes: "no2"},
		
		//size
		{content: "Size"},
		{name: "size", classes: "no2"},
		
		//water
		{content: "Rainwater"},
		{name: "water", classes: "no2"},
		
		//sunlight
		{content: "Sunlight"},
		{name: "sunlight", classes: "no2"},
		
		//temperature
		{content: "Temperature"},
		{name: "temp", classes: "no2"}
	],
	create: function(){
		this.inherited(arguments);
	},
	load: function(gardenObject){
		this.setGarden(gardenObject);
	},
	gardenChanged: function(){
		var _g = this.garden.published;
		for(var _p in _g){
			if(this.$[_p]){
				this.$[_p].setContent(this.garden[_p]);
			}
		}
	}
});