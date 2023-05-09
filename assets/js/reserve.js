$(document).ready(function () {

  let cryptoParking;
  let userAccount;
  let metaMask = false;

  function startApp() {
    let cryptoParkingAddress = "0xAc37Dd3A1DF7A21cf44Ae5AF6a66A6Cf4dF822E1";  //contract address
    cryptoParking = new web3js.eth.Contract(abiCrypto, cryptoParkingAddress); //creating object of contract for calling functions

    setInterval(function () {
      userAccount = web3.eth.defaultAccount;
      addDropLift();
    }, 100);

    getReservationArray(function (data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i][1] > (new Date()) / 1000) {
          let app = `
        <tr>
          <td>` + fromTimestamp(data[i][0]) + `</td>
          <td>` + fromTimestamp(data[i][1]) + `</td>
        </tr>`;
          $("#tableBody").append(app);
        }
      }

    });
  }

  function getSlotDetails(id) {
    return cryptoParking.methods.parkings(id).call();
  }

  function getReservationsInit(id, index) {
    return cryptoParking.methods.getReservationsInit(id, index).call();
  }

  function getReservationsDura(id, index) {
    return cryptoParking.methods.getReservationsDura(id, index).call();
  }

  function getReservationsOwner(id, index) {
    return cryptoParking.methods.getReservationsOwner(id, index).call();
  }

  function reserveParkingSlot(id, init, dura) {
    // This is going to take a while, so update the UI to let the user know
    // the transaction has been sent
    $("#txStatus").text("Reserving slot on the blockchain. This may take a while...");
    // Send the tx to our contract:
    return cryptoParking.methods.reserve(id, init, dura)
      .send({from: userAccount})
      .on("receipt", function (receipt) {
        $("#txStatus").text("Successfully reserved!");
        location.reload();
      })
      .on("error", function (error) {
        // Do something to alert the user their transaction has failed
        $("#txStatus").text(error);
        let err = error.toString();
        if (err === 'Error: No "from" address specified in neither the given options, nor the default options.') {
          $("#noMetaLog").show();
        }
      });
  }

  function requireDrop(id) {
    $("#txStatus").text("Droping bollard. This may take a while...");
    // Send the tx to our contract:
    return cryptoParking.methods.requireDrop(id)
      .send({from: userAccount})
      .on("receipt", function (receipt) {
        $("#txStatus").text("Successfully dropped!");
      })
      .on("error", function (error) {
        // Do something to alert the user their transaction has failed
        $("#txStatus").text(error);
        let err = error.toString();
        if (err === 'Error: No "from" address specified in neither the given options, nor the default options.') {
          $("#noMetaLog").show();
        }
      });
  }

  function requireLift(id) {
    $("#txStatus").text("Lifting bollard. This may take a while...");
    // Send the tx to our contract:
    return cryptoParking.methods.requireLift(id)
      .send({from: userAccount})
      .on("receipt", function (receipt) {
        $("#txStatus").text("Successfully lifted!");
      })
      .on("error", function (error) {
        // Do something to alert the user their transaction has failed
        $("#txStatus").text(error);
        let err = error.toString();
        if (err === 'Error: No "from" address specified in neither the given options, nor the default options.') {
          $("#noMetaLog").show();
        }
      });
  }

  function getReservationArray(cb) {
    let id = getSlotId();
    getSlotDetails(id).then(async function (obj) {
      let len = obj.reservationsSize;
      let arr = [];
      for (let i = 0; i < len; i++) {
        arr[i] = [];
        let init;
        await getReservationsInit(id, i).then(function (data) {
          init = data;
          arr[i][0] = data;
        });
        await getReservationsDura(id, i).then(function (data) {
          arr[i][1] = (parseInt(init) + parseInt(data)).toString();
        });
        await getReservationsOwner(id, i).then(function (data) {
          arr[i][2] = data;
        });
      }
      return cb(arr);
    });
  }

  function addDropLift() {
    let id = getSlotId();
    getSlotDetails(id).then(async function (obj) {
      let occ = obj.occupancy;
      console.log((new Date()) / 1000)
      getReservationArray(function (arr) {
        for (let i = 0; i < arr.length; i++) {
          if (((arr[i][0] <= (new Date()) / 1000) && (arr[i][1] >= (new Date()) / 1000)) && ((arr[i][2]).toLowerCase() === userAccount)) {
            if (occ) {
              $("#btnDrop").show();
              $("#btnLift").hide();
            } else {
              $("#btnLift").show();
              $("#btnDrop").hide();
            }
          }
        }
      });
    });
  }

  function reservationCheck(initial, final, cb) {
    getReservationArray(function (data) {
      for (let i = 0; i < data.length; i++) {
        if ((initial > data[i][0] && initial < data[i][1]) || (initial < data[i][0] && final > data[i][0])) {
          return cb(false);
        }
      }
      return cb(true);
    });

  }


  $('#datetimepicker1').datetimepicker({
    minDate: new Date(),
    format: 'DD/MM/YYYY HH:mm'
  });


  $('#datetimepicker2').datetimepicker({
    minDate: new Date(),
    format: 'DD/MM/YYYY HH:mm'
  });


  function toTimestamp(strDate) {
    let datum = Date.parse(strDate);
    return datum / 1000;
  }

  function fromTimestamp(strDate) {
    let datum = new Date(strDate * 1000);
    let year = datum.getFullYear();
    let month = datum.getMonth() + 1;
    let day = datum.getDate();
    let hour = datum.getHours();
    let minute = datum.getMinutes();
    return day + "/" + month + "/" + year + " " + hour + ":" + minute;
  }

  function getSlotId() {
    return $("#idSlot").data("slotid");
  }


  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
    metaMask = true;
  } else {
    $("#noMeta").show();
    // Handle the case where the user doesn't have Metamask installed
    // Probably show them a message prompting them to install Metamask
  }

  // Now you can start your app & access web3 freely:
  if (metaMask === true) {
    startApp();

    $("#btnReserve").click(function () {

      $("#dateInvalid").hide();
      $("#resInvalid").hide();
      $("#noMetaLog").hide();

      let date1 = $("#datetimepicker1").data("datetimepicker").date();
      let dateTS1 = toTimestamp(date1["_d"]);

      let date2 = $("#datetimepicker2").data("datetimepicker").date();
      let dateTS2 = toTimestamp(date2["_d"]);

      let duration = dateTS2 - dateTS1;

      if (dateTS1 > dateTS2) {
        $("#dateInvalid").show();
      } else reservationCheck(dateTS1, dateTS2, function (result) {
        if (result) {
          let id = getSlotId();
          reserveParkingSlot(id, dateTS1, duration, userAccount);
        } else {
          $("#resInvalid").show();
        }
      });

    });


    $("#btnDrop").click(function () {
      let id = getSlotId();
      requireDrop(id);
    });

    $("#btnLift").click(function () {
      let id = getSlotId();
      requireLift(id);
    });


  }


});
