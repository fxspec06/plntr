/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "plntr.Editor",
	kind: "FittableRows",
	classes: "creator",
	events: {
		onClose: ""
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
			{name: "createButton", kind: "onyx.Button", content: "Create", onclick: "confirm", classes: "onyx-groupbox-header"},
			{name: "cancelCreate", kind: "onyx.Button", content: "Cancel", onclick: "cancel", style: "color:red;", classes: "onyx-groupbox-header"}
		]}
	],
	create: function(){
		this.inherited(arguments);
	},
	confirm: function(inSender, inEvent){
		this.$.pane.$.slider.add(function(confirm){
			if(confirm){
				this.reset();
				this.doClose();
			} else {
				window.alert("ERROR!!!");
			}
		}.bind(this));
	},
	cancel: function(inSender, inEvent){
		this.reset();
		this.doClose();
	},
	typeChanged: function(){
		this.reset();
		this.setHeader("Create " + this.type.split(".")[0]);
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
		this.$.pane.createComponents([
			{name: "slider", kind: this.type}
		]);
		this.$.pane.render();
	}
});