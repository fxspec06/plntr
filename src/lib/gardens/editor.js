/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "garden.Editor",
	kind: "onyx.Groupbox",
	defaultKind: "onyx.GroupboxHeader",
	components: [
		
		//name
		{content: "Name"},
		{kind: "onyx.InputDecorator", components: [
			{name: "name", kind: "onyx.Input"},
		]},
		
		//location
		{content: "Location"},
		{kind: "onyx.InputDecorator", components: [
			{name: "location", kind: "onyx.Input"},
		]},
		
		//description
		{content: "Description"},
		{kind: "onyx.InputDecorator", components: [
			{name: "description", kind: "onyx.TextArea"},
		]},
		
		//size
		{content: "Size"},
		{kind: "enyo.GroupItem", components: [
			{name: "size", kind: "Group", classes: "tools group", defaultKind: "onyx.Button", highlander: true, components: [
				{content: "Small", style:"width:33%", active: true, classes: "onyx-affirmative"},
				{content: "Medium", style:"width:33%", classes: "onyx-negative"},
				{content: "Large", style:"width:33%", classes: "onyx-blue"}
			]}
		]},
		
		//water
		{content: "Rainwater"},
		{kind: "enyo.GroupItem", components: [
			{name: "water", kind: "onyx.Slider", value: 50},
		]},
		
		//sunlight
		{content: "Sunlight"},
		{kind: "enyo.GroupItem", components: [
			{name: "sunlight", kind: "onyx.Slider", value: 50}
		]},
		
		//temperature
		{content: "Temperature"},
		{kind: "enyo.GroupItem", components: [
			{name: "temp", kind: "onyx.Slider", value: 50}
		]}
		
	],
	create: function(){
		this.inherited(arguments);
	},
	add: function(callback){
		//required
		callback(this.make());
	},
	make: function(){
		try {
			console.log(localStorage["plntr"]);
		
			var _g = this.$;
			
			var _name = _g.name.getValue();
			var _size = _g.size.getActive().content.toLowerCase();
			var _sunlight = _g.sunlight.getValue();
			var _water = _g.water.getValue();
			var _temp = _g.temp.getValue();
			var _location = _g.location.getValue();
			var _description = _g.description.getValue();
			
			
			_plntr.storage.gardens[_name] = {};
			_plntr.storage.gardens[_name].size = _size;
			_plntr.storage.gardens[_name].name = _name;
			_plntr.storage.gardens[_name].water = _water;
			_plntr.storage.gardens[_name].temp = _temp;
			_plntr.storage.gardens[_name].location = _location;
			_plntr.storage.gardens[_name].description = _description;
			_plntr.storage.gardens[_name].sunlight = _sunlight;
			
			
			
			_plntr.saveStorage();
			console.log(_plntr.storage);
			
			return true;
		} catch(e) {
			console.error("ERROR CREATING!!! DATA MAY BE CORRUPTED!!!");
			console.error(e);
			console.error(e.message);
			return false;
		}
		//fallthrough
		return false;
	}
});