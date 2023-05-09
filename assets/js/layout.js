$(document).ready(function () {

  $("#logIn").click(function () {

    $("#noLogEmail").hide();
    $("#noLogPass").hide();

    let email = $("#emailInput").val();
    let pass = $("#passwordInput").val();

    if (email === "") {
      $("#noLogEmail").show();
    } else if (pass === "") {
      $("#noLogPass").show();
    } else {

      let data = $('#formLogIn').serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});

      io.socket.get('/session/create?' + jQuery.param(data), function (resp) {
        if (resp === "The email address not found.") {
          $("#invalidEmail").show();
        } else if (resp === "Pasword missmatch!") {
          $("#invalidPass").show();
        } else if (resp === "admin") {
          window.location.replace('/user');
        } else if (resp !== null) {
          location.reload();
          // window.location.replace('/user/show?id='+resp);
        }
      });

      $("#emailInput").click(function () {
        $("#invalidEmail").hide();
      });

      $("#passwordInput").click(function () {
        $("#invalidPass").hide();
      });
    }
  })
})
