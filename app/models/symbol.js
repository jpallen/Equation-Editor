var Symbol = Class.create({
  initialize: function(symbol) {
	  this.symbol = symbol;
	  this.uniqueId = getUniqueId();
  }
});