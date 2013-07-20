/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "plant.Object",
	kind: enyo.Object,
	/*
	 * Creates an object
	 * 
	 * Initiate the object:
	 * var newPlant = new plant.Object();
	 * newPlant.setPlant("my plant's name");
	 * 
	 * Object properties can be accessed
	 * via object.property:
	 * 
	 * newPlant.getProperty();
	 * newPlant.property;
	 */
    published: {
		name: ""
    },
	nameChanged: function(inOldValue){
		var _g = _plntr.storage.plants[this.name];
		if(!_g){
			_plntr.storage.plants[this.name] = _g = this.published;
			_plntr.storage.plants[this.name].name = this.name;
			_plntr.saveStorage();
		}
		this.name = _g.name;
	}
});