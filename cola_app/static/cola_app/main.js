$(document).ready(function () {
  $("#city, #street").prop("disabled", true);

  $("#country").on("input", function () {
    const country = $(this).val();
    if (country.length >= 1) {
      $.ajax({
        url: getCitiesUrl,
        data: { country: country },
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
          const city = $("#city");
          city.autocomplete({ source: data.cities });
          city.prop("disabled", false);
        },
      });
    }
  });

  $("#city").on("input", function () {
    const city = $(this).val();
    const country = $("#country").val();
    if (city.length >= 2) {
      $.ajax({
        url: getStreetsUrl,
        data: { city: city, country: country },
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
          const street = $("#street");
          street.autocomplete({ source: data.streets });
          street.prop("disabled", false);
        },
      });
    }
  });
});
