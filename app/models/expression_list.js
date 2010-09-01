var ExpressionList = Class.create(ExpressionPart, {
	initialize: function($super, entries) {
	  this.entries = entries;
	  this.entries.each((function(entry) {
		  entry.parent = this;
		}).bind(this));
	  $super();
	},
	
	removeChild: function(child) {
		this.entries = this.entries.reject(function(entry) {
		  return entry == child;
		});
	},
	
	addEntry: function(entry, position) {
	  this.entries.splice(position, 0, entry);	
	}
});