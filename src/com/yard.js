/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "plntr.Yard",
	published: {
		type: "",
		index: 0,
		object: {},
		classes: ""
	},
	events: {
		onLoadSlider: "",
	},
	components: [
		{name: "yard", kind: "Repeater", onSetupRow: "load", ontap: "select", components: [
		    {name: "item", classes: "menu garden", kind: "ToolDecorator", components: [
				{name: "image", style: "background-color: transparent;", kind: "Image"},
				{name: "title", style: "background-color: transparent;", classes: "menu onyx-groupbox-header"}
			]}
		]}
	],
	create: function(){
		this.inherited(arguments);
	},
	typeChanged: function(inOldValue){
		this.object = eval("new " + this.type + ".Object()");
		this.setIndex(0);
	},
	refresh: function(){
		this.objectChanged();
	},
	indexChanged: function(inOldValue){
		this.objectChanged();
	},
	objectChanged: function(inOldValue){
		var _type = this.type + "s";
		this.yard = [];
		for(var i in _plntr.storage[_type]){
			this.yard.push(_plntr.storage[_type][i].name);
		}
		this.$.yard.setRows(this.yard.length);
		this.$.yard.build();
		this.$.yard.render();
	},
	load: function(inSender, inEvent){
		var index = inEvent.index;
	    var _row = inEvent.row;
	    //_row.$.image.setSrc(this.imageSources[index]);
	    _row.$.title.setContent(this.yard[index]);
	    this.index == index ?
				_row.$.item.addClass("selected") :
				_row.$.item.removeClass("selected");
	},
	select: function(inSender, inEvent) {
		var _o = inEvent.originator.owner;
		if("rowIndex" in _o) {
			var _index = _o.rowIndex;
			this.setIndex(_index);
			for(var x in this.gardens) {
				this.index == x ? 
					this.$.yard.children[x].$.item.addClass("selected") : 
					this.$.yard.children[x].$.item.removeClass("selected");
			}
			this.object.setName(this.yard[this.index]);
			_plntr[this.type] = this.object;
			this.doLoadSlider(this.type);
		}
	}
});