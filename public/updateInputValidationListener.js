function updateInputValidationListener(){
	var updateButton = document.getElementById("Update Row");
	updateButton.addEventListener("click", function(){
		var dataContent = [document.getElementById("name"),
						   document.getElementById("reps"),
						   document.getElementById("weight"),
					       document.getElementById("date")];
		var blankDataItem = false;
		dataContent.forEach(function(item){
			if(item.value === ''){
				var itemName = String(item.getAttribute("name"));
				alert('Row cannot be updated with blank ' + itemName + '.');
				blankDataItem = true;
			}
		});
		var unit;
		if(document.getElementById("lbs").checked){
			dataContent.push(document.getElementById("lbs"));
			unit = 1;
		}
		else if(document.getElementById("kgs").checked){
			dataContent.push(document.getElementById("kgs"));
			unit = 0;
		}
		if(!dataContent[4]){
			alert('Row cannot be added with blank units.');
			blankDataItem = true;
		}
		if(blankDataItem){
			event.preventDefault();
		}
	});
};