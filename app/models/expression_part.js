var ExpressionPart = Class.create(ExpressionPart, {
	initialize: function(entries) {
	  this.uniqueId = getUniqueId();
	  idToObjectDictionary[this.uniqueId] = this;
	},
	
	removeFromParent: function() {
	  if (this.parent != undefined)
		  this.parent.removeChild(this);
	}
});