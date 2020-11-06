var selectedRow = null

function onFormSubmit() {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    
}

function readFormData() {
    var formData = {};
    formData["id"] = document.getElementById("id").value;
    formData["username"] = document.getElementById("username").value;
    formData["email"] = document.getElementById("email").value;
    return formData;
}
//fetch();
function insertNewRecord(data) {
    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    fetch('https://my-json-server.typicode.com/vbrgr/mobigesture/users', {
  method: 'POST',
  body: JSON.stringify({
      id:data.id,
      username:data.username,
      email:data.email  
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = json.id;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = json.username;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = json.email;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
  })
}
fetchall();
function fetchall(){

    fetch('https://my-json-server.typicode.com/vbrgr/mobigesture/users')
    .then((response) => response.json())
     .then((json) => {  for (let index = 0; index < json.length; index++) {
        var table = document.getElementById("table").getElementsByTagName('tbody')[0];
        var newRow = table.insertRow(table.length);
        const element = json[index];        
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = element.id;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = element.username;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = element.email;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
    } 
    }) 
    
}
function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("username").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
}
function updateRecord(formData) {
    fetch('https://my-json-server.typicode.com/vbrgr/mobigesture/users/'+formData.id, {
  method: 'PUT',
  body: JSON.stringify({
    id: formData.id,
    username: formData.username,
    email: formData.email,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((res) =>{
    console.log(res);
    selectedRow.cells[0].innerHTML = res.id;
    selectedRow.cells[1].innerHTML = res.username;
    selectedRow.cells[2].innerHTML = res.email; 
  })
    
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("table").deleteRow(row.rowIndex);
        resetForm();
    }
}

