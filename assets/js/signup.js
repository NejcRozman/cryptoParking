$(document).ready(function () {

  $("#btn").click(function () {

    $("#created").hide();
    $("#noName").hide();
    $("#noEmail").hide();
    $("#noPass1").hide();
    $("#noPass2").hide();


    let name = $("#name").val();
    let email = $("#email").val();
    let pass1 = $("#pass1").val();
    let pass2 = $("#pass2").val();

    if (name === "") {
      $("#noName").show();
    } else if (email === "") {
      $("#noEmail").show();
    } else if (pass1 === "") {
      $("#noPass1").show();
    } else if (pass2 === "") {
      $("#noPass2").show();
    } else {

      //Takes parameters from form and edit them in correct form
      let data = $('#form').serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});

      if (pass1 !== pass2) {
        $("#alert").show();
      } else {
        io.socket.get('/user/create?' + jQuery.param(data), function (resp) {
          if (resp == "User created!") {
            $("#created").show();
          } else if (resp == "emailAlreadyInUse") {
            $("#invalidEmail").show();
          }
        });
      }

      $("#pass1").click(function () {
        $("#alert").hide();
      });

      $("#pass2").click(function () {
        $("#alert").hide();
      });

      $("#email").click(function () {
        $("#invalidEmail").hide();
      });
    }
  })

})






