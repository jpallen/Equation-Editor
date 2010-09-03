var DragAndDropRenderer = Class.create({
	initialize: function(view) {
		this.view = view;
		this.currentDraggables = [];
		this.currentDroppableKeys = [];
	},
	
	beforeExpressionToTex: function(expression) {
		this.droppablesToRender = [];
		this.draggablesToRender = [];
	},
	
	afterExpressionListToTex: function(expressionList) {
		var counter = 0;
	  var spaceId = expressionList.uniqueId + '_space_' + counter;	
	  expressionList.entries.each((function(expressionPart) {
		  this.droppablesToRender.push({
			  id: spaceId,
			  droppable: {
				  object: expressionList,
				  position: counter
				}
			});
	    counter++;
	    spaceId = expressionList.uniqueId + '_space_' + counter;
		}).bind(this));
		this.droppablesToRender.push({
		  id: spaceId,
		  droppable: {
			  object: expressionList,
			  position: counter
			}
		});
	},
	
	afterSymbolToTex: function(symbol) {
	  this.draggablesToRender.push({
		  id: symbol.uniqueId,
		  draggable: { 
			  object: symbol
		  }
		});
	},
	
	beforeJsMathRender: function() {
		this._removeDraggables();
		this._removeDroppables();	
	},
	
	afterJsMathRender: function() {
		jsMath.Synchronize(this._initializeDraggables.bind(this));
		jsMath.Synchronize(this._initializeDroppables.bind(this));
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
			    this.view.controller.callback(
				    'onDrop',
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