var ExpressionController = Class.create({
	initialize: function() {
		this.view = new ExpressionView();
		this.view.controller = this;
		this.subControllers = [];
		modules.each((function(module) {
			var renderer = null;
			var controller = null
			if (module.view != undefined) {
			  renderer = new module.view;
			  renderer.parentView = this.view;
			  console.log(renderer.parentView);
			  this.view.renderers.push(renderer);
			}
			if (module.controller != undefined) {
			  controller = new module.controller;
			  controller.parentController = this;
			  this.subControllers.push(controller);
			}
			if (renderer != null && controller != null) {
			  controller.view = renderer;
			  renderer.controller = controller;	
			}
		  return controller;
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
		this.subControllers.each(function(controller) {
			if (controller[name] != undefined) {
			  controller[name].apply(controller, args)
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