/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "garden.Object",
	kind: enyo.Object,
    published: {
		name: "",
		numPlants: 0,
		location: "",
		description: "",
		plants: {},
		size: 0,
		sunlight: 0,
		water: 0,
		temp: 0
    },
	nameChanged: function(inOldValue){
		var _g = _plntr.storage.gardens[this.name];
		if(!_g){
			_plntr.storage.gardens[this.name] = _g = this.published;
			_plntr.storage.gardens[this.name].name = this.name;
			_plntr.saveStorage();
		}
		this.numPlants = _g.numPlants;
		this.plants = _g.plants;
		this.size = _g.size;
		this.sunlight = _g.sunlight;
		this.water = _g.water;
		this.temp = _g.temp;
		this.location = _g.location;
		this.description = _g.description;
	}
});