let countryList=[]
let isFetchCompleted = false;
let index = 0;
function loadJson(){
    let body="";
    let dataRow = document.getElementById('dataRow');

    fetch("https://restcountries.com/v3.1/all")
    .then(res=>res.json())
    .then(dataList=>{
        isFetchCompleted = true;
        countryList=dataList;
        
        let body="";
        let dataRow = document.getElementById('dataRow');
        countryList.forEach(element=>{
            body+=`<div id="countryCard" class="mb-2 d-flex justify-content-center col-lg-4 col-sm-6"><div class="card" style="width: 18rem;">
                      <img src="${element.flags.png}" class="card-img-top" alt="country-flags">
                      <div class="card-body">
                        <h5 id="title-${index}" class="card-title">${element.name.common}</h5>
                        <p class="card-text">${element.name.official}</p>
                        <input type="hidden" id="area-${index}" value="${element.area}">
                        <input type="hidden" id="startOfWeek-${index}" value="${element.startOfWeek}">
                        <input type="hidden" id="subregion-${index}" value="${element.subregion}">
                        <input type="hidden" id="capital-${index}" value="${element.capital}">
                        <input type="hidden" id="region-${index}" value="${element.region}">
                        <input type="hidden" id="population-${index}" value="${element.population}">
                        <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="showModel(${index++})">More Info</a>
                      </div>
                    </div>
                </div>`;
        })
        dataRow.innerHTML = body;
        whenFetchCompleted(dataList);

    })
}
loadJson();


function whenFetchCompleted(dataList){
    countryList=dataList;
    
}
function showModel(index){
    let exampleModalLabel = document.getElementById('exampleModalLabel');
    let cardTitle = document.getElementById("title-"+index);
    let modalBody = document.getElementById("modal-body");
    exampleModalLabel.innerText=cardTitle.innerText;
    modalBody.innerHTML=`
        <p>Area : ${document.getElementById("area-"+index).value}</p>
        <p>Start Of Week : ${document.getElementById("startOfWeek-"+index).value}</p>
        <p>Region : ${document.getElementById("region-"+index).value}</p>
        <p>Subregion : ${document.getElementById("subregion-"+index).value}</p>
        <p>Capital : ${document.getElementById("capital-"+index).value}</p>
        <p>Population : ${document.getElementById("population-"+index).value}</p>

        `;
}

function search(){
    let searchInput = document.getElementById('searchInput').value;
    let searchOutput = document.getElementById('searchOutput');
    let searchOutputBody = "";
    fetch(`https://restcountries.com/v3.1/name/${searchInput}`).then(res=>res.json())
    .then(data=>{
        console.log(data);
        searchOutput.classList.add("border");
        searchOutput.innerHTML=`<table class="table">
                                  <tbody>
                                    <tr>
                                      <th scope="row">Name</th>
                                      <td>${data[0].name.official}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Flag</th>
                                      <td><img src="${data[0].flags.png}" alt=""></td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Capital</th>
                                      <td>${data[0].capital}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Reagion</th>
                                      <td>${data[0].region}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Sub Reagion</th>
                                      <td>${data[0].subregion}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Area</th>
                                      <td>${data[0].area}</td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Map</th>
                                      <td><a href="${data[0].maps.googleMaps}" target="_blank" class="link-secondary">Map</a></td>
                                    </tr>
                                    <tr>
                                      <th scope="row">Population</th>
                                      <td>${data[0].population}</td>
                                    </tr>
                                  </tbody>
                                </table>`;

    })
}