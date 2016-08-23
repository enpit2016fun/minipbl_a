function getData(path, conditions){
	var csvData = new Array();
	var data = new XMLHttpRequest();
	data.open("GET", path, false);
	data.send("");

	var LF = String.fromCharCode(10);
	var lines = data.responseText.split(LF);
	for (var i = 0; i < lines.length;++i) {
		var cells = lines[i].split(",");
		if(i == 0) continue;
		else if(parseInt(cells[1]) < "limitYear" ) continue;
		else if(conditions["SendFarResident"] == "No" && cells[3] == "遠方") continue;
		else if(conditions["SendNurseryBrotherExist"] == "No" && cells[3] == "有") continue;
		else csvData.push(cells);
	}

	return csvData;
}

function listupMember(conditions){
	var memberList = [];

	var data = getData("/resource/userlist.csv", conditions);
	memberList = data;

	return memberList;
}

window.onload = function(){
	var today = new Date();
	var limitYear = today.getFullYear();;
	var conditions={"SendFarResident": "No", "SendNurseryBrotherExist": "No", "limitYear": limitYear}
	var members = listupMember(conditions);

	console.log(members);
};