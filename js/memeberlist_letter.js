function csv2Array(filePath){
	var csvData = new Array();
	var data = new XMLHttpRequest();
	data.open("GET", filePath, false);
	data.send(null);

	var LF = String.fromCharCode(10);
	var lines = data.responseText.split(LF);
	for (var i = 0; i < lines.length;++i) {
		var cells = lines[i].split(",");
		if( cells.length != 1 ) {
			csvData.push(cells);
		}
	}
	return csvData;
}

function myFunc(conditions){
	var memberList = [];

	var data = csv2Array("../resource/userlist.csv");
	memberList = data;

	return memberList;
}

window.onload = function(){
	var limitYear = Date().getFullYear();;
	var conditions={"SendFarResident": 0, "SendNurseryBrotherExist": 0, "limitYear": limitYear}
	var members = listupMember(conditions);

	console.log(members);
};