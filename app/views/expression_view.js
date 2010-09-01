var ExpressionView = Class.create({
	initialize: function() {
		this.container = new Element('div');
		this.currentDraggables = [];
		this.currentDroppableKeys = [];
	},
	
	setController: function(controller) {
		controller.setView(this);
	},
	
	/* Re-renders the expression using JsMath */
	render: function() {
		var expression = this._formatExpressionPart(this.controller.expression);
		
		this.container.innerHTML = expression.tex;
		this.container.addClassName('math');
		this._removeDraggables();
		this._removeDroppables();
		jsMath.ProcessElement(this.container);
		jsMath.Synchronize(this._initializeDraggables.bind(this, expression.draggables));
		jsMath.Synchronize(this._initializeDroppables.bind(this, expression.droppables));
	},
	
	_formatExpressionPart: function(expressionPart) {
		if (expressionPart instanceof ExpressionList) {
			return this._formatExpressionList(expressionPart)
		} else if (expressionPart instanceof Symbol) {
			return this._formatSymbol(expressionPart)
		}
		throw('unknown part of expression');
	},
	
	_formatExpressionList: function(expressionList) {
	  var formattedExpression = this._blankFormattedExpression();
	
	  var counter = -1; // becomes 0 before first use	
	  function addNextDroppableTo(formattedExpression) {
		  counter += 1;
		  droppableId = expressionList.uniqueId + '_droppable_' + counter;
		  formattedExpression.droppables.push({
			  id: droppableId,
			  droppable: {
				  object: expressionList,
				  position: counter
				}
			});
			formattedExpression.tex += '\\cssId{' + droppableId + '}{.}';
		}
	
	  expressionList.entries.each((function(expressionPart) {
		  var formattedExpressionPart = this._formatExpressionPart(expressionPart);
		  addNextDroppableTo(formattedExpression);
		  formattedExpression.tex += formattedExpressionPart.tex;
		
		  formattedExpression.draggables = formattedExpression.draggables.concat(formattedExpressionPart.draggables);
		  formattedExpression.droppables = formattedExpression.droppables.concat(formattedExpressionPart.droppables);
		}).bind(this));
		
	  addNextDroppableTo(formattedExpression);
		
		return formattedExpression;
	},
	
	_formatSymbol: function(symbol) {
	  var formattedExpression = this._blankFormattedExpression();
	  formattedExpression.tex = '\\cssId{' + symbol.uniqueId + '}{' + symbol.symbol + '}';
	  formattedExpression.draggables.push({
		  id: symbol.uniqueId,
		  draggable: { 
			  object: symbol
		  }
		});
	  return formattedExpression;
	},
	
	_blankFormattedExpression: function() {
		return { tex: '', draggables: [], droppables: [] };
	},
	
	_removeDraggables: function() {
	  this.currentDraggables.each(function(draggable) {
			draggable.destroy();
		});
		this.currentDraggables = [];
	},
	
	_initializeDraggables: function(draggables) {
		console.log(draggables);
	  draggables.each((function(options) {
  	  this.currentDraggables.push(
	      new Draggable(options.id, {
	      	revert: true
		    })
	    );
		}).bind(this));
	},
	
	_removeDroppables: function() {
	  this.currentDroppableKeys.each(function(key) {
			Droppables.remove(key);
		});
		this.currentDroppableKeys = [];
	},
	
	_initializeDroppables: function(droppables) {
	  droppables.each((function(options) {
  	  this.currentDroppableKeys.push(options.id)
	    Droppables.add(options.id, {
		    hoverclass: 'droppable_hover',
		    onDrop: (function(draggableElement, droppableElement, event) {
			    this.controller.onDrop(
				    event,
				    { object: idToObjectDictionary[draggableElement.id] }, 
				    options.droppable
			    )
			  }).bind(this)
	    });
		}).bind(this));
	}
});