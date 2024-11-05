const url = 'https://data.cityofnewyork.us/resource/k397-673e.json?$limit=10000&$offset=0';
const tableBody = document.getElementById('tableBody');
const people_data = localStorage.getItem("OpenNYC_Data"); //localstorage
let people_data_object = null;//localstorage object
if (people_data) { //if this exists
    people_data_object = JSON.parse(people_data) //then create the object value
}
async function fetchData() {
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json();
        sortBySalary(data);
        return data
    }
    return [];
}
if (!people_data_object) {
    fetchData()
        .then((data) => {
            localStorage.setItem("OpenNYC_Data", JSON.stringify(data))
            //add expiry date 24hrs after this is loaded
            sortBySalary(data);
        })
}
else {
    sortBySalary(people_data_object);
}

function sortBySalary() {
    document.getElementById("tableBody").innerHTML = "";
    const sortedData = people_data_object.sort((a, b) => b.base_salary - a.base_salary);
    sortedData.forEach(item => {
        appendToTable(item);
    });
}

function appendToTable(object) {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${object.first_name || 'N/A'}</td>
    <td>${object.title_description || 'N/A'}</td>
    <td>${object.base_salary || 'N/A'}</td>
    <td>${object.agency_name || 'N/A'}</td>
`;
    tableBody.appendChild(row);
}
//Function to sort by name
//Just need to pass a value
function sortByLastName() {
    console.log(people_data_object);
    document.getElementById("tableBody").innerHTML = "";
    //.sort((a, b) => return a.salary - b.salary)
    people_data_object.forEach(item => {
        if (item.last_name[0] == 'A') {
            appendToTable(item);
        }
    })
}

function sortByFirstName() {
    document.getElementById("tableBody").innerHTML = "";
    //.sort((a, b) => return a.salary - b.salary)
    people_data_object.forEach(item => {
        if (item.first_name[0] == 'A') {
            appendToTable(item);
        }
    })
}
//sorts table by only showing People who are salaried
function sortByAnnual() {
    document.getElementById("tableBody").innerHTML = "";
    document.getElementById("variable").innerHTML = "Annual Salary";
    people_data_object.forEach(item => {
        if (item.pay_basis == 'per Annum') {
            appendToTable(item);
        }
    })
}

//sorts table by only showing people who work hourly
function sortByHourly() {
    document.getElementById("tableBody").innerHTML = "";
    document.getElementById("variable").innerHTML = "Hourly Rate";
    //.sort((a, b) => return a.salary - b.salary)
    people_data_object.forEach(item => {
        if (item.pay_basis == 'per Hour') {
            appendToTable(item);
        }
    })
}

function FilterByBorough(boroughName) {
    document.getElementById("tableBody").innerHTML = "";
    console.log(boroughName);
        people_data_object.forEach(person => {
                if (person.work_location_borough === boroughName) {
                    appendToTable(person)
                    console.log(person);
                }
            })
}

let brooklyn = document.querySelector('.Brooklyn');
let queens = document.querySelector('.Queens');
let manhattan = document.querySelector('.Manhattan');
let bronx = document.querySelector('.Bronx');
let statenIsland = document.querySelector('.StatenIsland');
let borough = "";
Loop through each button and add the event listener

brooklyn.addEventListener("click", () => {
    FilterByBorough('BROOKLYN');

})

queens.addEventListener("click", () => {
    FilterByBorough('QUEENS');
})

manhattan.addEventListener("click", () => {
    FilterByBorough('MANHATTAN');
})

bronx.addEventListener("click", () => {
    FilterByBorough('BRONX');
})

statenIsland.addEventListener("click", () => {
    FilterByBorough('STATEN ISLAND');
})

// let buttons = document.querySelectorAll('button')

// buttons.forEach(button => {
//     button.addEventListener("click", () => {
//         document.getElementById("tableBody").innerHTML = "";
//         if (button.getElementsByClassName(".Brooklyn")) {
//             borough = "BROOKLYN";
//         }
//         else if (button.getElementsByClassName(".Queens")) {
//             borough = "QUEENS";
//         }
//         else if (button.getElementsByClassName(".Manhattan")) {
//             borough = "MANHATTAN";
//         }
//         else if (button.getElementsByClassName(".Bronx")) {
//             borough = "BRONX";
//         }
//         else {
//             borough = "STATEN ISLAND";
//         }
//         FilterByBorough(borough);
//     });
// });
