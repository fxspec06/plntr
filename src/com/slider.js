/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "plntr.Slider",
	kind: "FittableRows",
	classes: "slider",
	events: {
		onSlide: ""
	},
	published: {
		type: "",
		header: ""
	},
	components: [
		{kind: "onyx.Toolbar", components: [
			{name: "header", kind: "onyx.GroupboxHeader"}
		]},
		
		{kind: "Scroller", fit: true, components: [
			{name: "pane"}
		]},
		
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Grabber", onclick: "doSlide"},
			{kind: "onyx.Button", content: "Delete", classes: "onyx-button-negative", onclick: "_delete"}
		]}
	],
	create: function(){
		this.inherited(arguments);
	},
	typeChanged: function(){
		this.reset();
	},
	headerChanged: function(){
		this.$.header.setContent(this.header);
	},
	load: function(object){
		this.reset();
		this.setHeader(object.name);
		this.$.pane.$.slider.load(object);
		this.$.pane.render();
	},
	reset: function(){
		var _components = this.$.pane.getComponents();
		for(var _x in _components){
			_components[_x].destroy();
		}
		if(!this.type){return;}
		this.$.pane.createComponents([
			{name: "slider", kind: this.type}
		]);
		this.$.pane.render();
	},
	_delete: function(inSender, inEvent){
		this.make(function(confirm){
			if(confirm){
				this.setHeader(null);
				this.setType(null);
				this.reset();
				this.doSlide();
				_plntr.refreshYard();
			} else {
				window.alert("ERROR!!!");
			}
		}.bind(this));
	},
	make: function(callback){
		var _s = this.$.pane.$.slider;
		try {
			
			var _name = _s[this.type.split(".")[0]].name;
			var _type = this.type.split(".")[0] + "s";
			
			console.log("Deleting " + this.type.split(".")[0] + " '" + _name + "' from " + _type + "...");
			
			_plntr.storage[_type][_name] = null;
			
			delete _plntr.storage[_type][_name];
			
			_plntr.saveStorage();
			
			console.log(_plntr.storage);
			
			callback(true);
			return;
		} catch(e) {
			console.error("ERROR DELETING!!! DATA MAY BE CORRUPTED!!!");
			console.error(e);
			console.error(e.message);
			callback(false);
			return;
		}
		//fallthrough
		callback(false);
	}
});