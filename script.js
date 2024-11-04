const url = 'https://data.cityofnewyork.us/resource/k397-673e.json?$limit=10&$offset=0';
const tableBody = document.getElementById('tableBody');

async function fetchData() {
    const response = await fetch(url)
    if (response.ok) {
        const data = await response.json();
        return data
    }
    return [];
    
}

fetchData()
    .then((data) => {
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.employee_name || 'N/A'}</td>
                <td>${item.job_title || 'N/A'}</td>
                <td>${item.annual_salary || 'N/A'}</td>
                <td>${item.agency || 'N/A'}</td>
            `;
            tableBody.appendChild(row);
        });
    })
