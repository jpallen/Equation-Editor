var Symbol = Class.create(ExpressionPart, {
  initialize: function($super, symbol) {
	  this.symbol = symbol;
	  this.subScript = new ExpressionList();
	  this.subScript.parent = this;
	  this.superScript = new ExpressionList();
	  this.superScript.parent = this;
	  $super();
  }
});