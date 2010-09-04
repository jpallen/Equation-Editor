var TextInputRenderer = Class.create({
	afterJsMathRender: function() {
		if (this.controller.textInput != null) {
			var position = this.controller.textInput.position;
	    var element = $(this.controller.textInput.expressionList.idForPosition(position));
	    this.textBox = new Element('input', {type: 'text'});
	    this.textBox.value = this.controller.textInput.value;
	    this.textBox.observe('keyup', (function(event) {
		    	this.parentView.controller.callback(
				    'onTextInputChange',
				    event
			    )
			  }).bind(this)
		  );
	
	    element.update(this.textBox);
	    this.textBox.focus();
    }
	}
});