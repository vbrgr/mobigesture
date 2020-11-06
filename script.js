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
    formData["userid"] = document.getElementById("userid").value;
    formData["username"] = document.getElementById("username").value;
    formData["email"] = document.getElementById("email").value;
    return formData;
}
//fetch();
function insertNewRecord(data) {
    var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json))
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.userid;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.username;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.email;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}
function fetch(){
var table = document.getElementById("table").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    fetch('https://my-json-server.typicode.com/vbrgr/mobigesture/users')
    .then((response) => response.json())
    .then((json) => { for (let index = 0; index < json.length; index++) {
        const element = json[index];        
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = element.userid;
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
    document.getElementById("userid").value = "";
    document.getElementById("username").value = "";
    document.getElementById("email").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("userid").value = selectedRow.cells[0].innerHTML;
    document.getElementById("username").value = selectedRow.cells[1].innerHTML;
    document.getElementById("email").value = selectedRow.cells[2].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.userid;
    selectedRow.cells[1].innerHTML = formData.username;
    selectedRow.cells[2].innerHTML = formData.email;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("table").deleteRow(row.rowIndex);
        resetForm();
    }
}

