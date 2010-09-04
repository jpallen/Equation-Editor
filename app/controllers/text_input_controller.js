var TextInputController = Class.create({
	initialize: function() {
		this.textInput = null
	},
	
	onClick: function(event, clickable) {
		if (clickable.object instanceof ExpressionList) {
		  /* move dropped expression into new position in expression list */
			this.textInput = {
			  expressionList: clickable.object,
			  position: clickable.position,
			  value: ''
			}
			this.parentController.renderRequired = true;
		}
	},
	
	onBodyClick: function(event) {
		
	},
	
	onTextInputChange: function(event) {
		var commands = this.view.textBox.value.split(' ');
		if (commands.size() > 1) {
			var lastCommand = commands.pop();			
			console.log(commands, lastCommand);
			commands.each((function(command) {
				this.textInput.expressionList.addEntry(new Symbol(command), this.textInput.position);
				this.textInput.position++;
			}).bind(this));
			this.textInput.value = lastCommand;
			this.parentController.renderRequired = true;
		}
	}
});