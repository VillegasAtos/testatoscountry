//FRONTEND POINT 1
const getCountries = async () => {
  countries = await $.get("https://restcountries.com/v3.1/all");
  countries.sort((a, b) => a.name.official.localeCompare(b.name.official));
  countries.map((country) => {
    country.name = country.name.official;
    if(country.capital===undefined){
      country.capital="No capital";
    }
    if(country.languages===undefined){
      country.languages="No languages";
    }
  });
  $(".loader").hide();
  return countries;
};

const writeTableCountries = (countries) => {
  let html = ` <div class="panel">
    </div>
            <table class="table table-striped myTable" id="countryTable">
                <thead>
                    <tr name='hi' code='hi'> 
                        <th scope="col" field="name" filter="yes">Official name</th>
                        <th scope="col" field="capital" filter="yes">Capital</th>
                        <th scope="col" field="region" filter="yes">Region</th>
                        <th scope="col" field="language" filter="no">Language </th>
                        <th scope="col" field="population" filter="yes">Population</th>
                        <th scope="col" field="flag" filter="no">Flag </th>
                    </tr>
                </thead>
                <tbody>`;

  countries.map((country) => {
    if (country.languages === undefined) {
      country.languages = "No languages";
    } else {
      country.languages = Object.values(country.languages);
    }
    html += `<tr class="trWikki" name='${country.name}' code='${country.cca3}'>
                            <td>${country.name}</td>
                            <td>${country.capital}</td>
                            <td>${country.region}</td>
                            <td>                            
                                <a href='#' class="btnLanguages" languages="${country.languages}">View languages</a>
                            </td>
                            <td>${country.population}</td>
                            <td><img src=${country.flags.png} alt="" width="70" height="35" /></td>
                        </tr>`;
  });
  html += `
                </tbody>
                   </table>
                `;
  $("#root").append(html);
  let options = {
    numberPerPage: 5, //Cantidad de datos por pagina
    goBar: true, //Barra donde puedes digitar el numero de la pagina al que quiere ir
    pageCounter: true, //Contador de paginas, en cual estas, de cuantas paginas
  };
  try {
    paginate.init(".myTable", options);
  } catch (error) {}
};

const writeButtonBorder = () => {
  let html = `
    <button id="btnBorder">border</button>
  `;
  $("#root").append(html);

  return null;
};
const writeTableBorder = (borders) => {
  let html = ` <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Border</th>
                        <th>Translations</th>
                    </tr>
                </thead>
                <tbody>`;
  borders.map(
    (border, index) =>
      (html += `
                        <tr class="trTableBorder"lat='${border.lat}' lng='${border.lng}'>
                            <td>${border.name}</td>
                            <td>${border.translations}</td>
                        </tr>`)
  );
  html += `
                </tbody>
            </table>`;
  $(".table-bordered").remove();
  $("#root").append(html);
};

const writeFilter = () => {
  let html = `<div class="input-group mb-3 ">
  <select id="selectFilter" class="form-select" aria-label="Default select example mx-2">
  <option selected value="noselected">Open this select menu</option>
  <option value="name" secondfilter="official">Official Name</option>
  <option value="capital">Capital</option>
  <option value="region">Region</option>
  <option value="population">Population</option>
</select>
  <span class=" input-group-text" id="basic-addon1">Search</span>
  <input id="inputFilter" type="text" class="form-control" placeholder="Search" >
</div>`;
  $("#root").append(html);
};
