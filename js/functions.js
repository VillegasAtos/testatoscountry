//FRONTEND POINT 1
const getCountries = async () => {
  const countries = await $.get("https://restcountries.com/v3.1/all");
  // console.log(countries);
  
  $(".loader").hide();
  return countries;
};

const writeTableCountries = (countries) => {
  // $("#root").html(`
  console.log(countries);
  let html = `
            <table class="table table-striped">
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
      (html += `
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
                            <td><button class="btn btn-primary btn-sm" id="btnWiki" name=${country.name.common} >Wikki</button></td>
                        </tr>`)
  );
  html += `
                </tbody>
                </table>
                `;
  $("#root").html(html);
};
