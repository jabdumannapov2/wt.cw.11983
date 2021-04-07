var occupations = [];
var statuses = [];
var action = '';
var employee_id = '';

window.onload = function(){
    occupations = JSON.parse(window.occupations.replace(/&quot;/g,'"'));
    statuses = JSON.parse(window.statuses.replace(/&quot;/g,'"'));
    populateSelectpickers();

    if(action=='edit' && employee_id){
        populateEditingEmployeeData(employee_id);
        document.getElementById('add').innerHTML = 'edit'
    }else{
        document.getElementById('add').innerHTML = 'add'
    }

};

var button = document.getElementById("add");
button.addEventListener("click",function(e){
    if(action && action == 'edit')
        edit();
    else
        add();
    
}, false);

function populateSelectpickers(){

    if(occupations && occupations.length){
        for (var i = 0; i < occupations.length; i++) {
            var option = document.createElement("option");
            option.value = occupations[i].id;
            option.text = occupations[i].name;
            document
                    .getElementById('occupation')
                        .appendChild(option);
        }
    }

    if(statuses && statuses.length){
        for (var i = 0; i < statuses.length; i++) {
            var option = document.createElement("option");
            option.value = statuses[i].id;
            option.text = statuses[i].name;
            document
                    .getElementById('status')
                        .appendChild(option);
        }
    }

}

function getOccupationNameById(id){
    var occupation;
    for (occupation of occupations){
        if(occupation.id == id){
            occupation = occupation;
            break;
        }
    }
    return occupation.name;
}

function getStatusNameById(id){
    var status;
    for (status of statuses){
        if(status.id == id){
            status = status;
            break;
        }
    }
    return status.name;
}

async function add(){
    let employee = {
        name: document.getElementById('name').value,
        dob: document.getElementById('dob').value,
        occupation: document.getElementById('occupation').value,
        status: document.getElementById('status').value,
        other: document.getElementById('other').value
    };
    
    let response = await fetch('/api/v1/employee/add/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(employee)
    });
      
    let result = await response.json();
    
    if(result && result.id){
        alert('Employee has been successfully added!');
        location.href = '/';
    }else{
        alert('Try again')
    }

}

async function edit(){
    let employee = {
        name: document.getElementById('name').value,
        dob: document.getElementById('dob').value,
        occupation: document.getElementById('occupation').value,
        status: document.getElementById('status').value,
        other: document.getElementById('other').value,
        id: employee_id
    };
    
    let response = await fetch('/api/v1/employee/update/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(employee)
    });
      
    let result = await response.json();
    
    if(result && result.success){
        alert('Employee has been successfully edited!');
        location.href = '/';
    }else{
        alert('Try again')
    }

}

function populateEditingEmployeeData(id){

    let url = "/api/v1/employee/getById?id=" + id;

    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            var employee = data;
            if(employee && employee[0] && employee[0].id){
                employee = employee[0];
                document.getElementById('name').value = employee.name;
                document.getElementById('dob').value = employee.dob;
                document.getElementById('occupation').value = employee.occupation_id;
                document.getElementById('status').value = employee.status_id;
                document.getElementById('other').value = employee.other;
            }
        
        })
        .catch(function(error) {
            alert(error);
        });

}