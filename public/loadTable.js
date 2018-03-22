function loadTable(method, urlSuffix, data){
	var req = new XMLHttpRequest();
	if(urlSuffix){	
		req.open(method, '/' + urlSuffix, true);
	}
	else{
		req.open(method, '/', true);
	}
	if(method !== "GET"){
		req.setRequestHeader('Content-Type', 'application/json');
	}
	req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			var dataTable = document.getElementsByTagName("table")[1];
			dataTable.removeChild(dataTable.childNodes[1]);
			var tableBody = document.createElement("tbody");
			dataTable.appendChild(tableBody);
			response.forEach(function(row, i){
				var currentRow = document.createElement("tr");
				tableBody.appendChild(currentRow);
				for(var attribute in row){
					if(attribute !== 'id'){
						var currentDataCell = document.createElement("td");
						currentRow.appendChild(currentDataCell);
						if(attribute === 'date'){
							row[attribute] = new Date(row[attribute]);
							row[attribute] = row[attribute].toJSON();
							row[attribute] = String(row[attribute]).substring(0, 10);
						}
						if(attribute === 'lbs'){
							if(row[attribute] === 0){
								row[attribute] = 'kgs';
							}
							else{
								row[attribute] = 'lbs';
							}
						}
						currentDataCell.textContent = row[attribute];
					}
				}
				var updateLink = document.createElement("a");
				currentRow.appendChild(updateLink);
				updateLink.setAttribute("href", "/update" + "?id=" + response[i].id + "&" +
															 "name=" + response[i].name + "&" +
															 "reps=" + response[i].reps + "&" +
															 "weight=" + response[i].weight + "&" +
															 "date=" + response[i].date + "&" +
															 "lbs=" + response[i].lbs);
				updateButton = document.createElement("button");
				updateButton.setAttribute("style", "margin-left:5px;margin-bottom:2px;margin-top:2px");
				updateLink.appendChild(updateButton);
				updateButton.textContent = "Update";
				
				var deleteButton = document.createElement("button");
				deleteButton.setAttribute("style", "margin-left:5px");
				currentRow.appendChild(deleteButton);
				deleteButton.textContent = "Delete";
				deleteButton.addEventListener("click", loadTable.bind(null, "GET", "delete/" + response[i].id));
			});
		}
		else{
			console.log("Error: " + req.status + " " + req.statusText);
		}
	});
	if(method === "GET"){
		req.send(null);
	}
	else{
		req.send(JSON.stringify(data));
	}
}
