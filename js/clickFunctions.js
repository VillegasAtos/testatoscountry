
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
     //const response = await axios.get(`https://restcountries.com/v3.1/alpha/${border.code}`);
      return border;
    })
  );
  console.log(borders);
  writeTableBorder(borders);
});

$(document).on("click", ".trTableBorder", async function () {
  alert("entraste");

});