var ExpressionController = Class.create({
	setExpression: function(expression) {
		this.expression = expression;
	},
	
	setView: function(view) {
		this.view = view;
		view.controller = this;
	},
});