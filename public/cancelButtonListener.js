function cancelButtonListener(){
	var cancelButton = document.getElementById("cancel");
	cancelButton.addEventListener("click", function(){
		window.location.replace('/cancel');
	});
}