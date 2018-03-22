function addRow(loadTable){
	var addButton = document.getElementById("addRow");
	addButton.addEventListener("click", function(){
		var dataContent = [document.getElementById("name"),
						   document.getElementById("reps"),
						   document.getElementById("weight"),
					       document.getElementById("date")];
		var blankDataItem = false;
		dataContent.forEach(function(item){
			if(item.value === ''){
				var itemName = String(item.getAttribute("name"));
				alert('Row cannot be added with blank ' + itemName + '.');
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
		if(!blankDataItem){
			var data = { name:   dataContent[0].value,
						 reps:   dataContent[1].value,
						 weight: dataContent[2].value,
						 date:   dataContent[3].value,
						 lbs:    unit};
			loadTable("POST", "added", data);
		}
	});
};