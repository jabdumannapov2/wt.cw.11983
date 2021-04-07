var occupations = [];
var statuses = [];

window.onload = function(){
    occupations = JSON.parse(window.occupations.replace(/&quot;/g,'"'));
    statuses = JSON.parse(window.statuses.replace(/&quot;/g,'"'));

    populateTable();

};

function populateTable(){

    let url = "/api/v1/employee/getAll";

    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            let employees = data;
            console.log(employees);
            return employees.map(function(employee) {
                let id = employee.id;
                let name = employee.name;
                let occupation = getOccupationNameById(employee.occupation_id);
                let status = getStatusNameById(employee.status_id);
                let other = employee.other;
                let dob = employee.dob;
                
                var table = document.getElementById('employeesTable').getElementsByTagName('tbody')[0];
                
                var newrow = table.insertRow();
                newrow.innerHTML = 
                `
                <td>
                    ${id}
                </td>
                <td>
                    ${name}
                </td>
                <td>
                    ${dob}
                </td>
                <td>
                    ${occupation}
                </td>
                <td>
                    ${status}
                </td>
                <td>
                    ${other}
                </td>                
                <td>
                    <button data-id="${id}"><a href="/edit/${id}" style="text-decoration: none;">edit</a></button>
                    <span>&nbsp;</span>
                    <button data-id="${id}" onclick="del(this);">delete</button>
                </td>
                `;
            })
        })
        .catch(function(error) {
            alert(error);
        });

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

function del(d){
    let id = d.getAttribute('data-id');
    if (confirm('Are you sure to delete this user?')) {

        let url = "/api/v1/employee/delete/" + id;

        fetch(url)
            .then((resp) => resp.json())
            .then(function(data) {
                if(data && data.success)
                    alert("You have successfully deleted an employee with id: " + id);
                    location.href = '/';
            })
            .catch(function(error) {
                console.log(error)
            });
    }

}
