window.onload = function(){
	var today = new Date();
	var endYear = today.getFullYear();
	var startYear = 1990;

	var select = document.getElementById('yearList');
	for (var i = endYear; i >= startYear; --i){
		contents = "<option value='"+i+"'>"+i+"</option>";
		select.innerHTML += contents;
	}
};

function store(){
	window.location.href = "../view/graduateList.html";
}

function back(){
	window.location.href = "../view/graduateList.html";
}