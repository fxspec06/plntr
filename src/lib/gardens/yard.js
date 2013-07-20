/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "garden.Yard",
	events: {
		onLoadSlider: "",
	},
	components: [
		{name: "gardens", kind: "Repeater", onSetupRow: "load", ontap: "select", components: [
		    {name: "item", classes: "menu garden", kind: "ToolDecorator", components: [
				{name: "image", style: "background-color: transparent;", kind: "Image"},
				{name: "title", style: "background-color: transparent;", classes: "menu onyx-groupbox-header"}
			]}
		]}
	],
	create: function(){
		this.inherited(arguments);
		this.gardenIndex = 0;
	},
	refresh: function(){
		this.garden = new garden.Object();
		this.gardens = [];
		for(var i in _plntr.storage.gardens){
			this.gardens.push(_plntr.storage.gardens[i].name);
		}
		this.$.gardens.setRows(this.gardens.length);
		this.$.gardens.build();
		this.$.gardens.render();
	},
	load: function(inSender, inEvent){
		var index = inEvent.index;
	    var rowControl = inEvent.row;
	    //rowControl.$.image.setSrc(this.imageSources[index]);
	    rowControl.$.title.setContent(this.gardens[index]);
	    this.menuIndex == index ?
				rowControl.$.item.addClass("selected") :
				rowControl.$.item.removeClass("selected");
	},
	select: function(inSender, inEvent) {
		var o = inEvent.originator.owner;
		if("rowIndex" in o) {
			var gardenIndex = o.rowIndex;
			this.gardenIndex = gardenIndex;
			for(var x in this.gardens) {
				this.gardenIndex == x ? 
					this.$.gardens.children[x].$.item.addClass("selected") : 
					this.$.gardens.children[x].$.item.removeClass("selected");
			}
			this.garden.setName(this.gardens[this.gardenIndex]);
			_plntr.garden = this.garden;
			this.doLoadSlider("garden");
		}
	}
});