$(document).on("click", ".trWikki", async function () {
    $(".loader").show();
    const nameCountry=$(this).attr("name");
    const wiki = await $.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${nameCountry}`);
    $(".loader").hide();
  bootbox.alert(wiki.extract_html)
});
