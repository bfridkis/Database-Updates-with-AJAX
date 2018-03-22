function resetForm(){
	var resetButton = document.getElementsByClassName("reset")[0];
	resetButton.addEventListener("click", function(){
		var inputs = document.getElementsByClassName("resettableInput");
		for(var i = 0; i < inputs.length; i++){
			inputs[i].value = '';
		}
		var radioButtons = document.getElementsByClassName("resettableRadioButtons");
		for(var i = 0; i < radioButtons.length; i++){
			radioButtons[i].checked = false;
		}
	
		event.preventDefault();
	});
}