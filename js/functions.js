//FRONTEND POINT 1
const getCountries = async () => {
  const countries = await $.get("https://restcountries.com/v3.1/all");
  countries.sort((a, b) => a.name.official.localeCompare(b.name.official));
  $(".loader").hide();
  return countries;
};

const writeTableCountries = (countries) => {
 
  let html = ` <div class="panel">
        <div class="body">
            <div class="input-group">
                <label for="searchBox">Filtrar</label>
                <input type="search" id="searchBox" placeholder="Filtrar...">
            </div>
        </div>
    </div>
            <table class="table table-striped myTable" id="countryTable">
                <thead>
                    <tr>
                      
                        <th scope="col">Official name</th>
                        <th scope="col">Capital</th>
                        <th scope="col">Region</th>
                        <th scope="col">Language </th>
                        <th scope="col">Population</th>
                        <th scope="col">Flag </th>
                        <th scope="col">Wiki</th>
                    </tr>
                </thead>
                <tbody>`;

  countries.map(
    (country) =>
      (html += `<tr class="trWikki" name=${country.name.common}>
                            <input type="hidden" value=${country.cca3} />
                            <td>${country.name.official}</td>
                            <td>${country.capital}</td>
                            <td>${country.region}</td>
                            <td>{
                            }
                                <a href='' onClick={(e) => getLanguages(e, hasValue(country, 'languages') ? Object.values(country.languages) : 'No language')}>View languages</a>
                            </td>
                            <td>${country.population}</td>
                            <td><img src=${country.flags.png} alt="" width="70" height="35" /></td>
                        </tr>`)
  );
  html += `
                </tbody>
                   </table>
                `;
  $("#root").append(html);
     let options = {
        numberPerPage:5, //Cantidad de datos por pagina
        goBar:true, //Barra donde puedes digitar el numero de la pagina al que quiere ir
        pageCounter:true, //Contador de paginas, en cual estas, de cuantas paginas
    };

    let filterOptions = {
        el:'#searchBox' //Caja de texto para filtrar, puede ser una clase o un ID
    };
       paginate.init('.myTable',options,filterOptions);
};

