var ExpressionView = Class.create({
	initialize: function() {
		this.renderers = []; // Will be populated by the controller
		this.container = new Element('div');
		this.currentClickables = [];
	},
	
	setController: function(controller) {
		controller.setView(this);
	},
	
	/* Re-renders the expression using JsMath */
	render: function() {
		this.callback('beforeExpressionToTex', this.controller.expression);
		this.container.innerHTML = this.expressionPartToTex(this.controller.expression);
		this.callback('afterExpressionToTex', this.controller.expression);
		
		this.container.addClassName('math');
		
		this.callback('beforeJsMathRender');
		jsMath.ProcessElement(this.container);
		this.callback('afterJsMathRender');
	},
	
	callback: function() {
		var args = Array.prototype.slice.call(arguments);
		var name = args.reverse().pop();
		args.reverse();
		this.renderers.each(function(renderer) {
			if (renderer[name] != undefined) {
			  renderer[name].apply(renderer, args)
			}
		});
	},
	
	expressionPartToTex: function(expressionPart) {
		if (expressionPart instanceof ExpressionList) {
			return this.expressionListToTex(expressionPart)
		} else if (expressionPart instanceof Symbol) {
			return this.symbolToTex(expressionPart)
		}
		throw('unknown part of expression');
	},
	
	expressionListToTex: function(expressionList) {
	  var tex = '';
	
	  var counter = 0;
	  var spaceId = expressionList.uniqueId + '_space_' + counter;	
	  expressionList.entries.each((function(expressionPart) {
		  tex += '\\cssId{' + spaceId + '}{.}';
	    tex += this.expressionPartToTex(expressionPart);
	    counter++;
	    spaceId = expressionList.uniqueId + '_space_' + counter;
		}).bind(this));
	  tex += '\\cssId{' + spaceId + '}{.}';
		
		this.callback('afterExpressionListToTex', expressionList);
		
		return tex;
	},
	
	symbolToTex: function(symbol) {
    var tex = '';
	  tex = '\\cssId{' + symbol.uniqueId + '}{{' + symbol.symbol + '}';
		tex += '^{' + this.expressionPartToTex(symbol.superScript) + '}'
		tex += '_{' + this.expressionPartToTex(symbol.subScript) + '}'
		tex += '}'
		
		this.callback('afterSymbolToTex', symbol);
		
	  return tex;
	}
});