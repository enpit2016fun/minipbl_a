 var number = 3;
 function addItem(){
 number ++;
 var elem = document.createElement('li');
 elem.id = 'item' + number;
 var caption = document.createTextNode('リスト'+number);
 elem.appendChild(caption);
 document.getElementById('list').appendChild(elem);
 }
 function delItem(){
 if(number == 0){
 alert('削除できる項目がありません');
 return false;
 }
 var elem = document.getElementById('item'+number);
 document.getElementById('list').removeChild(elem);
 number--;
 }
