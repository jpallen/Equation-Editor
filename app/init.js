var uniqueId = 0;

function getUniqueId() {
  uniqueId += 1;
  return String(uniqueId);	
}

var idToObjectDictionary = {};

var mainEventChain = [
  new BasicLogic()
]

var view = new ExpressionView();
var controller = new ExpressionController();
view.setController(controller);

var expression = new ExpressionList([
	new Symbol('a'),
	new Symbol('b'),
	new Symbol('\\int'),
	new Symbol('d\\phi'),
	new Symbol('x')
]);
controller.setExpression(expression);

document.observe('dom:loaded', function() {
	document.body.insert(view.container);
	view.render();
});