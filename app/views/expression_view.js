var ExpressionView = Class.create({
	initialize: function() {
		this.renders = expressionViewRenders
		this.container = new Element('div');
		this.currentDraggables = [];
		this.currentDroppableKeys = [];
	},
	
	setController: function(controller) {
		controller.setView(this);
	},
	
	/* Re-renders the expression using JsMath */
	render: function() {
		this.draggablesToRender = [];
		this.droppablesToRender = [];
		
		this.container.innerHTML = this.expressionPartToTex(this.controller.expression);
		this.container.addClassName('math');
		this._removeDraggables();
		this._removeDroppables();
		jsMath.ProcessElement(this.container);
		jsMath.Synchronize(this._initializeDraggables.bind(this));
		jsMath.Synchronize(this._initializeDroppables.bind(this));
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
	
	  var counter = -1; // becomes 0 before first use	
	  function addNextDroppableTo(view) {
		  counter += 1;
		  droppableId = expressionList.uniqueId + '_space_' + counter;
		  view.droppablesToRender.push({
			  id: droppableId,
			  droppable: {
				  object: expressionList,
				  position: counter
				}
			});
			return '\\cssId{' + droppableId + '}{.}';
		}
	
	  expressionList.entries.each((function(expressionPart) {
		  tex += addNextDroppableTo(this);
	    tex += this.expressionPartToTex(expressionPart);
		}).bind(this));
	  tex += addNextDroppableTo(this);
		
		return tex;
	},
	
	symbolToTex: function(symbol) {
    var tex = '';
	  tex = '\\cssId{' + symbol.uniqueId + '}{' + symbol.symbol;
		tex += '^{' + this.expressionPartToTex(symbol.superScript) + '}'
		tex += '_{' + this.expressionPartToTex(symbol.subScript) + '}'
		tex += '}'
		
	  this.draggablesToRender.push({
		  id: symbol.uniqueId,
		  draggable: { 
			  object: symbol
		  }
		});
		
	  return tex;
	},
	
	_removeDraggables: function() {
	  this.currentDraggables.each(function(draggable) {
			draggable.destroy();
		});
		this.currentDraggables = [];
	},
	
	_initializeDraggables: function() {
	  this.draggablesToRender.each((function(options) {
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
	
	_initializeDroppables: function() {
	  this.droppablesToRender.each((function(options) {
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
	    $(options.id).addClassName('droppable');
		}).bind(this));
	}
});