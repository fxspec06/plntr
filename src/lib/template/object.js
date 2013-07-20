/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "template.Object",
	kind: enyo.Object,
	/*
	 * Creates an object
	 * 
	 * Initiate the object:
	 * var newTemplate = new template.Object();
	 * newTemplate.setTemplate("my template's name");
	 * 
	 * Object properties can be accessed
	 * via object.property:
	 * 
	 * newTemlate.getProperty();
	 * newTemplate.property;
	 */
    published: {
		name: ""
    },
	nameChanged: function(inOldValue){
		var _g = _plntr.storage.templates[this.name];
		if(!_g){
			_plntr.storage.templates[this.name] = _g = this.published;
			_plntr.storage.templates[this.name].name = this.name;
			_plntr.saveStorage();
		}
		this.name = _g.name;
	}
});