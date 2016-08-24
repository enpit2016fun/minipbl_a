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