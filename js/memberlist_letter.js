var targetuser_list = [];

function GetQueryString() {
	if (1 < document.location.search.length) {
		// 最初の1文字 (?記号) を除いた文字列を取得する
		var query = document.location.search.substring(1);

		// クエリの区切り記号 (&) で文字列を配列に分割する
		var parameters = query.split('&');

		var result = new Object();
		for (var i = 0; i < parameters.length; i++) {
			// パラメータ名とパラメータ値に分割する
			var element = parameters[i].split('=');

			var paramName = decodeURIComponent(element[0]);
			var paramValue = decodeURIComponent(element[1]);

			// パラメータ名をキーとして連想配列に追加する
			result[paramName] = decodeURIComponent(paramValue);
		}
		return result;
	}
	return null;
}

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
		if(typeof conditions["SendFarResident"] === "undefined" && cells[3] == "遠方") continue;
		if(typeof conditions["SendNurseryBrotherExist"] === "undefined" && cells[6] == "有") continue;
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

	memberList = new Array();
	for(var i = 0; i < motherlist.length; ++i){
		var namelist = new Array();
		var place = "";
		var far = "";
		var brother = "";
		for(var j = 0; j < tmp.length; ++j){
			if(tmp[j][4] == motherlist[i]){
				namelist.push(tmp[j][0]);
				place = tmp[j][2];
				far = tmp[j][3];
				brother = tmp[j][6];
			}
		}
		memberList.push({"namelist":namelist, "place":place, "far": far, "brother": brother});
	}

	return memberList;
}

window.onload = function(){
	var today = new Date();
	var limitYear = today.getFullYear()-6;
	var param = GetQueryString();
	var conditions={"SendFarResident": param['far'], "SendNurseryBrotherExist": param['brother'], "limitYear": limitYear}
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
				<td>#FAR#</td>\
				<td>#BROTHER#</td>\
			</tr>";
		contents = contents.replace( /#NAME#/g , name_contents);
		contents = contents.replace( /#PLACE#/g , members[i]["place"]);
		contents = contents.replace( /#FAR#/g , members[i]["far"]);
		contents = contents.replace( /#BROTHER#/g , members[i]["brother"]);
		table.innerHTML += contents;
	}
};