$(document).on("click", ".trWikki", async function () {
  $(".loader").show();
  const nameCountry = $(this).attr("name");
  const wiki = await $.get(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${nameCountry}`
  );
  $(".loader").hide();
  bootbox.alert(wiki.extract_html);
});

$(document).on("click", "#btnBorder", async function () {
  console.log("entraste");
  let borders = [];
  let flag = false;

  $(".myTable tr").each(function () {
    let objeto = [];
    console.log(this);
    if (!$(this).is(":hidden")) {
      let name = $(this).attr("name");
      let code = $(this).attr("code");
      objeto.code = code;
      objeto.name = name;

      //console.log(code)
      if (flag) {
        borders.push(objeto);
      }
    }

    flag = true;
  });
  console.log(borders);
  await Promise.all(
    borders.map(async (border) => {
      try {
        const response = await $.get(
          `https://restcountries.com/v3.1/alpha/${border.code}`
        );
        border.translations = response[0].translations.spa.official;
        border.map = response[0].maps.googleMaps;
        const latlng = response[0].latlng;
        border.lat = latlng[0];
        border.lng = latlng[1];
      } catch (error) {}
      return border;
    })
  );
  console.log(borders);
  writeTableBorder(borders);
});
$(document).on("click", ".trTableBorder", async function () {
  const lat = $(this).attr("lat");
  const lng = $(this).attr("lng");
  console.log(lat, lng);
  bootbox.alert({
    message: `<div id="maps"style="width: auto; height: 550px; position: relative; overflow: hidden;"></div>`,
    size: "large",
    title: "mapa",
  });
  initMap(lat, lng);
});

$(document).on("click", ".btnLanguages", async function () {
  const languages = $(this).attr("languages");
  let li = "";
  let flag = false;

  languages.split(",").forEach((language) => {
    li += `<li>${language}</li>`;
  });
  //console.log(languages);
  //languages.map(async (language)=>{
  //console.log("ji");
  //});
  bootbox.alert({
    message: `<ul><li>${li}</li></ul>`,
    size: "small",
    title: "mapa",
  });
});

$(document).on("keypress", "#inputFilter", function () {
  console.log("entraste");
  let filter = $("#inputFilter").val().toLowerCase();
  let selectFilter = $("#selectFilter").val();
  var header = Array();
  let contador = 0;
  $(".myTable tr th").each(function (i, v) {
    if ($(this).attr("filter") === "yes") {
      header[contador] = $(this).attr("field");
      contador++;
    }
  });
  console.log(header);

  if (filter.length > 1) {
    let countries2 = [];
    countries.map((country) => {
      header.map((cheader) => {
        if (country[cheader] === undefined || country[cheader] === null) {
          console.log("entraste al indefinido" + cheader);
          return;
        }
      });
      if (selectFilter === "noselected") {
        console.log("entraste al noselected");
        let flag = false;
        header.map((cheader) => {
          if (flag === false) {
            console.log(country[cheader]);
            if (country[cheader].toString().toLowerCase().includes(filter)) {
              countries2.push(country);
              flag = true;
            }
          }
        });
      } else {
        const newCountries = country[selectFilter]
          .toString()
          .toLowerCase()
          .includes(filter);
        if (newCountries) {
          countries2.push(country);
          return country;
        }
      }
    });
    //    countries=countries2;
    console.log(countries);
    $(".myTable").remove();
    writeTableCountries(countries2);
  }
});

function initMap(lat, lng) {
  console.log(lat, lng);
  map = new google.maps.Map(document.getElementById("maps"), {
    center: { lat: parseInt(lat), lng: parseInt(lng) },
    zoom: 4,
  });
}
