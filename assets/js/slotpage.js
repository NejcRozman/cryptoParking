$(document).ready(function () {

  let cryptoParking;
  let userAccount;
  let metaMask = false;

  function startApp() {
    let cryptoParkingAddress = "0xAc37Dd3A1DF7A21cf44Ae5AF6a66A6Cf4dF822E1";  //contract address
    cryptoParking = new web3js.eth.Contract(abiCrypto, cryptoParkingAddress); //creating object of contract for calling functions

    let accountInterval = setInterval(function () {
      userAccount = web3.eth.defaultAccount;
    }, 100);

    getSlotLength().then(function (len) {
      for (let i = 0; i < len; i++) {
        getSlotDetails(i).then(function (result) {
          addCard(result);
        });
      }
    });

  }

  function getSlotDetails(id) {
    return cryptoParking.methods.parkings(id).call();
  }

  function getSlotLength() {
    return cryptoParking.methods.getParkings().call();
  }

  function getAddress(id) {
    return cryptoParking.methods.slotToOwner(id).call()
  }

  function addCard(data) {
    let occ;
    if (data.occupancy === true) {
      occ = "Not occupied";
    } else {
      occ = "Occupied";
    }

    getAddress(data.id).then(function (add) {
      let app = `
    <div class="card card-custom mx-2 mb-3" style="max-width: 300px">
      <div class="card-body">
        <h5 class="card-title">CryptoSlot ` + data.id + `</h5>
        <p class="card-text">Coordinate X: ` + data.coordinateX + `</p>
        <p class="card-text">Coordinate Y: ` + data.coordinateY + `</p>
        <p class="card-text" id="appRow">Occupancy: ` + occ + `</p>
        <p class="card-text"><small class="text-muted">The owner of the slot:` + add + `</small></p>
        <a class="btn btn-success" href="/user/reserve?slotid=` + data.id + `">Reserve</a>
        <a class="btn btn-primary collapse" id="dropButton">Drop</a>
        <a class="btn btn-warning collapse" id="liftButton">Lift</a>

      </div>
    </div>
      `;
      $("#cardRow").append(app);
    });

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


  }


});
