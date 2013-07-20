/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "plntr",
	kind: "FittableRows",
	flex: 1,
	style: "background-color:forestgreen;",
	components: [
		{name: "layout3", kind: "FittableColumns", classes: "enyo-fit", components: [
			{kind: "onyx.Toolbar", style: "width: 200px", components: [
				{kind: "onyx.GroupboxHeader", content: "p l n t r"},
				{tag: "br"},
				{name: "menu", kind: "enyo.List", rows: 10, rowsPerPage: 10, classes: "enyo-fit list", onSetupRow: "loadMainMenu", ontap: "select", components: [
				    {tag: "br"},
				    {name: "item", classes: "menu", kind: "ToolDecorator", components: [
						{name: "image", style: "background-color: transparent;", kind: "Image"},
						{name: "title", style: "background-color: transparent;", classes: "menu onyx-groupbox-header"}
					]}
				]}
			]},
			{kind: "FittableRows", fit: true, components: [
				{kind: "onyx.Toolbar", components: [
					{name: "header", kind: "onyx.GroupboxHeader", content: "P l a n t s"}
				]},
				{name: "yard", kind: "Scroller", fit: true, components: [
					{name: "plntr.Yard", kind: "plntr.Yard", onLoadSlider: "loadSlider"},
					//{name: "garden.Yard", kind: "garden.Yard", showing: false, onLoadSlider: "loadSlider"},
					//{name: "template.Yard", kind: "template.Yard", showing: true, onLoadSlider: "loadSlider"},
					/*{kind: "plants", showing: false, onLoadSlider: "loadSlider"},
					{kind: "buds", showing: false, onLoadSlider: "loadSlider"},
					{kind: "seeds", showing: false, onLoadSlider: "loadSlider"}*/
				]},
				{style: "position: relative; box-shadow: 0 -6px 6px rgba(0,0,0,0.3);"},
				{kind: "onyx.Toolbar", components: [
					{name: "addNew", kind: "onyx.Button", content: "New Plant", onclick: "addNew", classes: "onyx-groupbox-header"}
				]}
			]}
		]},
		{name: "slider", kind: "onyx.Slideable", classes: "enyo-fit", onAnimateFinish: "slideComplete", draggable: false, unit: "px", components: [
			{name: "plntr.Slider", kind: "plntr.Slider", onSlide: "slideSlider"}
		]},
		{name: "editor", kind: "onyx.Slideable", classes: "enyo-fit", axis: 'v', onAnimateFinish: "", draggable: false, min: -100, max: 0, value: -100, unit: "%", components: [
			{name: "plntr.Editor", kind: "plntr.Editor", onClose: "closeEditor"}
		]}
	],
	published: {
		icon: "plntr.png",
		handle: "",
		text: ""
	},
	create: function() {
		this.setupStorage();
		this.inherited(arguments);
		
		this.menuIndex = 0;
		
		this.menu = ["Gardens", /*"Templates", */"Plants"/*, "Buds", "Seeds"*/];
		
		this.$.menu.reset();
		this.$.menu.setRows(this.menu.length);
		this.$.menu.reset();
		this.selectMenu(0);
		
		this.$.slider.setMin(window.innerWidth - 300);
		this.$.slider.setMax(window.innerWidth - 35);
		this.$.slider.setValue(window.innerWidth - 35);
		
		
		//this.$["plntr.Yard"].setType("garden");
	},
	setupStorage: function(){
		this.storage = {
			yards: {},
			gardens: {},
			templates: {},
			plants: {},
			seeds: {},
			buds: {},
			preferences: {}
		}
		if(!localStorage["plntr"]){
			console.log("resetting local storage");
			this.saveStorage();
		} else {
			console.log("loading...");
			console.log(localStorage["plntr"]);
			var storage = JSON.parse(localStorage.plntr);
			for(var i in storage){
				try{
					this.storage[i] = storage[i];
				} catch (e){
					console.error("ERROR LOADING STORAGE OBJECT...");
					console.error(e);
					console.error(e.message);
					continue;
				}
			}
		}
	},
	saveStorage: function(){
		console.log("saving...");
		localStorage.plntr = JSON.stringify(this.storage);
		//console.log(localStorage["plntr"]);
	},
	loadMainMenu: function(inSender, inEvent){
		var index = inEvent.index;
	    //var rowControl = inEvent.row;
	    //rowControl.$.image.setSrc(this.imageSources[index]);
	    this.$.title.setContent(this.menu[index]);
	    
	    this.menuIndex == index ?
				this.$.item.addClass("selected") :
				this.$.item.removeClass("selected");
	},
	select: function(inSender, inEvent){
		if ("rowIndex" in inEvent) {
			this.selectMenu(inEvent.rowIndex);
		}
	},
	selectMenu: function(menuIndex){
		this.menuIndex = menuIndex;
		this.$.menu.reset();
		
		var header = this.formatHeader(this.menu[this.menuIndex]);
		this.$.header.setContent(header);
		
		this.$.addNew.setContent("New " + this.singlify(this.menu[this.menuIndex]));
		
		this.refreshYard();
	},
	singlify: function(plural){
		return plural.substr(0, plural.length - 1);
	},
	refreshYard: function(){
		var grass = this.$.yard.children[0].children;
		for(var nole in grass){
			if("refresh" in grass[nole] && typeof _plntr != "undefined"){
				grass[nole].setType(this.singlify(this.menu[this.menuIndex]).toLowerCase());
				grass[nole].refresh();
			}
			//grass[nole].setShowing(false);
		}
		//this.$.yard.children[0].children[this.menuIndex].setShowing(true);
		
	},
	formatHeader: function(header){
		for(var i = 1; i < header.length; i++){
			header = header.substr(0, i) + " " + header.substr(i);
			i = i + 1;
		}
		return header;
	},
	slideComplete: function(one, two){
		console.log("slideComplete");
	},
	loadSlider: function(inEvent, type){
		var _slide = this.$["plntr.Slider"];
		_slide.setType(type + ".Slider");
		_slide.load(_plntr[type]);
	},
	slideSlider: function(inSender, inEvent){
		this.$.slider.toggleMinMax();
	},
	closeEditor: function(inSender, inEvent){
		this.refreshYard();
		this.$.editor.toggleMinMax();
	},
	addNew: function(inSender, inEvent){
		var grass = this.$.yard.children[0].children;
		for(var nole in grass){
			if(grass[nole].showing){
				var type = grass[nole].type.split(".")[0];
				this.$["plntr.Editor"].setType(type + ".Editor");
				this.closeEditor();
			}
		}
	}
});