var ExpressionController = Class.create({
	initialize: function() {
		this.eventChain = mainEventChain.collect((function(eventHandler) {
		  return new eventHandler(this);
		}).bind(this));
	},
	
	setExpression: function(expression) {
		this.expression = expression;
	},
	
	setView: function(view) {
		this.view = view;
		view.controller = this;
	},
	
	callback: function() {
		var args = Array.prototype.slice.call(arguments);
		var name = args.reverse().pop();
		args.reverse();
		this.eventChain.each(function(eventHandler) {
			if (eventHandler[name] != undefined) {
			  eventHandler[name].apply(eventHandler, args)
			}
		});
		this.renderIfRequired();
	},
	
	renderIfRequired: function() {
	  if (this.renderRequired == true) {
		  this.view.render();
		}
		this.renderRequired = false;
	}
});