var Symbol = Class.create(ExpressionPart, {
  initialize: function($super, symbol) {
	  this.symbol = symbol;
	  $super();
  }
});