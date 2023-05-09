$(document).ready(function () {

  let cryptoParking;
  let userAccount;
  let metaMask = false;

  $("#noMeta1").hide();
  $("#noMetaLog").hide();

  function startApp() {
    let cryptoParkingAddress = "0xAc37Dd3A1DF7A21cf44Ae5AF6a66A6Cf4dF822E1";  //contract address
    cryptoParking = new web3js.eth.Contract(abiCrypto, cryptoParkingAddress); //creating object of contract for calling functions

    let accountInterval = setInterval(function () {
      userAccount = web3.eth.defaultAccount;
    }, 100);


  }


  function createParkingSlot(coordinateX, coordinateY) {
    // This is going to take a while, so update the UI to let the user know
    // the transaction has been sent
    $("#txStatus").text("Creating new slot on the blockchain. This may take a while...");
    // Send the tx to our contract:
    return cryptoParking.methods.createParkingSlot(coordinateX, coordinateY)
      .send({from: userAccount})
      .on("receipt", function (receipt) {
        $("#txStatus").text("Successfully created!");
      })
      .on("error", function (error) {
        // Do something to alert the user their transaction has failed
        $("#txStatus").text(error);
        let err = error.toString();
        if(err === 'Error: No "from" address specified in neither the given options, nor the default options.') {
          $("#noMetaLog").show();
        }
      });
  }


  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
    metaMask = true;
  } else {
    $("#noMeta1").show();
    // Handle the case where the user doesn't have Metamask installed
    // Probably show them a message prompting them to install Metamask
  }
  // Now you can start your app & access web3 freely:
  if (metaMask === true) {
    startApp();
    $("#btnCreate").click(function () {
      $("#container").hide();
      $("#noMetaLog").hide();
      let x = parseInt(document.getElementById('x').value);
      let y = parseInt(document.getElementById('y').value);
      createParkingSlot(x, y).then(function (result) {
        let id = result.events.NewParkingSlot.returnValues.slotId;
        console.log(id);
        $("#container").show();
        let app = `<h2 id="app">You have created new cryptoSlot with ID: `+ id + ` ,you need to input this id into set up form of bollard!</h2>`;
        $("#jumbo").append(app);
      });
    });
  }
});
