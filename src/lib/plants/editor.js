/*
 * Copyright 2012 fxspec06 (Bryan Leasot)
 * Not for distribution
 * 
 */
enyo.kind({
	name: "plant.Editor",
	kind: "onyx.Groupbox",
	defaultKind: "onyx.GroupboxHeader",
	components: [
		
		//name
		{content: "PLANT NAME"},
		{kind: "onyx.InputDecorator", components: [
			{name: "name", kind: "onyx.Input"}
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
			
			_plntr.storage.plants[_name] = {};
			_plntr.storage.plants[_name].name = _name;
			
			_plntr.saveStorage();
			
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