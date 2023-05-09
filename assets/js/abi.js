let abiCrypto  = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "parkingId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "numberOfReservation",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "initTime",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "duraTime",
        "type": "uint256"
      }
    ],
    "name": "NewReservation",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_coordinateX",
        "type": "uint256"
      },
      {
        "name": "_coordinateY",
        "type": "uint256"
      }
    ],
    "name": "createParkingSlot",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "slotId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "coordinateX",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "coordinateY",
        "type": "uint256"
      }
    ],
    "name": "NewParkingSlot",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_parkingId",
        "type": "uint256"
      }
    ],
    "name": "requireDrop",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_parkingId",
        "type": "uint256"
      }
    ],
    "name": "requireLift",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_parkingId",
        "type": "uint256"
      },
      {
        "name": "_initTime",
        "type": "uint256"
      },
      {
        "name": "_duraTime",
        "type": "uint256"
      }
    ],
    "name": "reserve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getParkings",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_parkingId",
        "type": "uint256"
      },
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getReservationsDura",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_parkingId",
        "type": "uint256"
      },
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getReservationsInit",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_parkingId",
        "type": "uint256"
      },
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getReservationsOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "getSlotsByOwner",
    "outputs": [
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_parkingId",
        "type": "uint256"
      }
    ],
    "name": "getSlotState",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "parkings",
    "outputs": [
      {
        "name": "coordinateX",
        "type": "uint256"
      },
      {
        "name": "coordinateY",
        "type": "uint256"
      },
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "occupancy",
        "type": "bool"
      },
      {
        "name": "reservationsSize",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "slotToOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
