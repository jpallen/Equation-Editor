var ClickablesRenderer = Class.create({
	initialize: function() {
		this.currentClickables = [];
	},
	
	beforeExpressionToTex: function(expression) {
		this.clickablesToRender = [];
	},
	
	afterExpressionListToTex: function(expressionList) {
		for (var i = 0; i <= expressionList.entries.size(); i++) {
			this.clickablesToRender.push({
				id: expressionList.uniqueId + '_space_' + i,
				clickable: {
				  object: expressionList,
				  position: i	
				}
			});
		}
	},
	
	afterSymbolToTex: function(symbol) {
	  this.clickablesToRender.push({
		  id: symbol.uniqueId,
		  clickable: { 
			  object: symbol
		  }
		});
	},
	
	beforeJsMathRender: function() {
		this._removeClickables();
	},
	
	afterJsMathRender: function() {
		jsMath.Synchronize(this._initializeClickables.bind(this));
	},
	
	_removeClickables: function() {
		// Remove clickables?
	},
	
	_initializeClickables: function() {
		this.clickablesToRender.each((function(options) {
			$(options.id).observe('click', (function(event) {
		    	this.parentView.controller.callback(
				    'onClick',
				    event,
				    options.clickable
			    )
			  }).bind(this)
			);
		}).bind(this));
	}
});