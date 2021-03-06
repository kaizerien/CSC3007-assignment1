const api_url = 
      "https://api.data.gov.sg/v1/environment/psi";
  
async function getapi(url) {
    
    const response = await fetch(url);
    
    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}

getapi(api_url);
  
function hideloader() {
    document.getElementById('loading').style.display = 'none';
}

function show(data) {
    console.log(data.items[0].update_timestamp)
    let tab = 
        `<tr>
          <th>Metrics</th>
          <th>National</th>
          <th>Central</th>
          <th>West</th>
          <th>East</th>
          <th>North</th>
          <th>South</th>
         </tr>`;
    
    for (var r in data.items[0].readings) {
        if (!data.items[0].readings.hasOwnProperty(r)) {
            continue;
        }
        tab += `<tr>
    <td>${r} </td>
    <td>${data.items[0].readings[r].national} </td>
    <td>${data.items[0].readings[r].central}</td>
    <td>${data.items[0].readings[r].west}</td> 
    <td>${data.items[0].readings[r].east}</td>
    <td>${data.items[0].readings[r].north}</td>
    <td>${data.items[0].readings[r].south}</td>        
</tr>`;
    }
    document.getElementById("PSI").innerHTML = tab;
    document.getElementById("timestamp").innerHTML = dayjs(data.items[0].update_timestamp).format('DD MMM YYYY HH:mm');
}
