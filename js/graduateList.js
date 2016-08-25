function getData(){
	var csvData = new Array();
    var data = new XMLHttpRequest();
    data.open("GET", "/resource/userlist.csv", false);
    data.send("");
    var LF = String.fromCharCode(10);
    var lines = data.responseText.split(LF);
    for (var i = 0; i < lines.length; ++i) {
        var cells = lines[i].split(",");
        csvData.push(cells);
    }
    return csvData;
}

window.onload = function(){
	var members = getData();
	console.log(members);

	var table = document.getElementById('memberlist');
	for (var i = 1; i < members.length; ++i){
		var contents = "<tr>"+
							"<td>"+members[i][0]+"</td>"+
							"<td>"+members[i][1]+"</td>"+
							"<td>"+members[i][2]+"</td>"+
							"<td>"+members[i][3]+"</td>"+
							"<td>"+members[i][4]+"</td>"+
							"<td>"+members[i][5]+"</td>"+
							"<td>"+members[i][6]+"</td>"+
							"<td>"+
									"<form action=\"../view/edit_info.html\">"+
										"<button type=\"submit\">編集</button>"+
									"</form>"+
							"</td>"+
						"</tr>";
		table.innerHTML += contents;
	}
};