var DragAndDropController = Class.create({
	initialize: function(controller) {
		this.controller = controller;
	},
	
	/* 
	 * _draggable_ and _droppable_ are hashes with an _object_ attribute which
	 * is an instance of the symbol/expression they are part of. They may also
	 * contain other properties depending on the type of object they are.
	 * E.g.
	 *   an expression list droppable will also have a position attribute of where it
	 *   was dropped. 
	*/
	onDrop: function(event, droppedObject, receivingObject) {
	  if (receivingObject.object instanceof ExpressionList) {
		  /* move dropped expression into new position in expression list */			
		  var position = receivingObject.position;
		  var droppedObject = droppedObject.object;
		  var receivingObject = receivingObject.object;
		  if (droppedObject.parent == receivingObject) {
			  // We compensate here for the fact that removing an object
			  // from the expression list will mess up the indices used to 
			  // put the object back in.
			  if (receivingObject.entries.indexOf(droppedObject) < position) {
				  position -= 1;
				}
			}
			droppedObject.removeFromParent();
      receivingObject.addEntry(droppedObject, position);

      this.controller.renderRequired = true;
		}
	}
});