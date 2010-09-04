var uniqueId = 0;

function getUniqueId() {
  uniqueId += 1;
  return String(uniqueId);	
}

var idToObjectDictionary = {};

var modules = [
	{
		name: 'Clickables',
		view: ClickablesRenderer
	},
  {
	  name: 'Drag and Drop',
	  view: DragAndDropRenderer,
	  controller: DragAndDropController
	},
	{
		name: 'Text Input',
		view: TextInputRenderer,
		controller: TextInputController
	}
]

var mainEventChain = [
  DragAndDropController,
  TextInputController
]

var expressionViewRenders = [
  ClickablesRenderer,
  DragAndDropRenderer,
  TextInputRenderer
]

var controller = new ExpressionController();

var expression = new ExpressionList([
	new Symbol('a'),
	new Symbol('b'),
	new Symbol('\\int'),
	new Symbol('d\\phi'),
	new Symbol('x'),
	new Symbol('f^{abc}{}_d')
]);
controller.setExpression(expression);

document.observe('dom:loaded', function() {
	document.body.insert(controller.view.container);
	controller.view.render();
});