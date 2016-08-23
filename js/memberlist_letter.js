function getData(path, conditions){
	var csvData = new Array();
	var data = new XMLHttpRequest();
	data.open("GET", path, false);
	data.send("");

	var LF = String.fromCharCode(10);
	var lines = data.responseText.split(LF);
	for (var i = 0; i < lines.length; ++i) {
		var cells = lines[i].split(",");
		if(i == 0) continue;
		if(parseInt(cells[1]) < conditions["limitYear"] ) continue;
		if(conditions["SendFarResident"] == "No" && cells[3] == "遠方") continue;
		if(conditions["SendNurseryBrotherExist"] == "No" && cells[6] == "有") continue;
		csvData.push(cells);
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
	var limitYear = today.getFullYear()-6;
	var conditions={"SendFarResident": "Yes", "SendNurseryBrotherExist": "No", "limitYear": limitYear}
	var members = listupMember(conditions);

	var table = document.getElementById('memberlist');
	for (var i = 0; i < members.length; ++i){
		var contents = "\
			<tr>\
				<td>#NAME#</td>\
				<td>#PLACE#</td>\
			</tr>";
		contents = contents.replace( /#NAME#/g , members[i][0]);
		contents = contents.replace( /#PLACE#/g , members[i][2]);
		table.innerHTML += contents;
	}

	console.log(members);
};