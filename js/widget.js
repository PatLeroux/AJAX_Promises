function getJSON(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = handleResponse;
        xhr.send();

        function handleResponse() {
            if (xhr.readyState === 4)
                if (xhr.status === 200) {
                    var employees = JSON.parse(xhr.responseText);
                    resolve(employees);
                } else {
                    reject(this.statusText)
                }
        };

    });
};

var ajaxPromise = getJSON('./data/employees.json');


function generateListItems(employees) {
    var statusHTML = '';
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].inoffice) {
            statusHTML += '<li class="in">';
        } else {
            statusHTML += '<li class="out">';
        }
        statusHTML += employees[i].name;
        statusHTML += '</li>';
    }
    return statusHTML;

}

function generateUnorderedList(listItems) {
    return '<ul class="bulleted">' + listItems + '</ul>';
};

function addEmployeesToPage(unorderedList) {
    document.getElementById('employeeList').innerHTML = unorderedList;
};

ajaxPromise
    .then(generateListItems)
    .then(generateUnorderedList)
    .then(addEmployeesToPage)
    .catch(function() {
        console.log(e);
    });