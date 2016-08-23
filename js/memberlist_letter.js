var targetuser_list = [];

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
	var data = getData("/resource/userlist.csv", conditions);

	var tmp = data;
	var motherlist = new Array();
	for (var i = 0; i < tmp.length; ++i){
		motherlist.push(tmp[i][4]);
	}
	motherlist = motherlist.filter(function (x, i, self) {
		return self.indexOf(x) === i;
	});
	console.log(motherlist);

	memberList = new Array();
	for(var i = 0; i < motherlist.length; ++i){
		var namelist = new Array();
		var place = ""
		for(var j = 0; j < tmp.length; ++j){
			if(tmp[j][4] == motherlist[i]){
				namelist.push(tmp[j][0]);
				place = tmp[j][2];
			}
		}
		memberList.push({"namelist":namelist, "place":place});
	}

	return memberList;
}

window.onload = function(){
	var today = new Date();
	var limitYear = today.getFullYear()-6;
	var conditions={"SendFarResident": "Yes", "SendNurseryBrotherExist": "No", "limitYear": limitYear}
	var members = listupMember(conditions);

	var table = document.getElementById('memberlist');
	for (var i = 0; i < members.length; ++i){
		name_contents = "";
		for (var j = 0; j < members[i]["namelist"].length; ++j){
			name_contents += memberList[i]["namelist"][j];
			if(j != members[i]["namelist"].length - 1)
				name_contents += "<br>";
		}

		var contents = "\
			<tr>\
				<td>#NAME#</td>\
				<td>#PLACE#</td>\
			</tr>";
		contents = contents.replace( /#NAME#/g , name_contents);
		contents = contents.replace( /#PLACE#/g , members[i]["place"]);
		table.innerHTML += contents;
	}

	console.log(members);
};