pragma solidity ^0.4.19;

contract ParkingSystem {
  
    
    event NewParkingSlot(uint slotId, uint coordinateX, uint coordinateY); //event that get trigered when created new parking slot and communicate to front-end app
    event NewReservation(uint parkingId, uint numberOfReservation, uint initTime, uint duraTime);
    
    struct Reservation {
        uint initTime;
        uint duraTime;
        address reservationOwner;
    }
    
    
    struct ParkingSlot {
        uint coordinateX;
        uint coordinateY;
        uint id;
        bool occupancy;
        mapping(uint => Reservation) reservations;
        uint reservationsSize;
    }
    
    ParkingSlot[] public parkings; //Array of parking slots
    
    mapping (uint => address) public slotToOwner; //tracks address that owns parking slots
    mapping(address => uint) ownerSlotCount; //keep track of how many parking slots owner has
    
    function createParkingSlot(uint _coordinateX, uint _coordinateY) external {
        uint id = parkings.push(ParkingSlot(_coordinateX, _coordinateY, 0, true, 0)) - 1;
        parkings[id].id = id;
        slotToOwner[id]=msg.sender;
        ownerSlotCount[msg.sender]++;
        emit NewParkingSlot(id, _coordinateX, _coordinateY);
    }
    
    function getParkings() external view returns (uint) {
        return parkings.length;
    }
    
    function getReservationsInit(uint _parkingId, uint _index) external view returns (uint){
        ParkingSlot storage desiredParkingSlot = parkings[_parkingId];
        return desiredParkingSlot.reservations[_index].initTime;
    }
    
    function getReservationsDura(uint _parkingId, uint _index) external view returns (uint){
        ParkingSlot storage desiredParkingSlot = parkings[_parkingId];
        return desiredParkingSlot.reservations[_index].duraTime;
    }
    
    function getReservationsOwner(uint _parkingId, uint _index) external view returns (address){
        ParkingSlot storage desiredParkingSlot = parkings[_parkingId];
        return desiredParkingSlot.reservations[_index].reservationOwner;
    }
    
    
    function getSlotsByOwner(address _owner) external view returns(uint[]) {
        uint[] memory result = new uint[](ownerSlotCount[_owner]);
        uint counter = 0;
        for (uint i = 0; i < parkings.length; i++) {
          if (slotToOwner[i] == _owner) {
            result[counter] = i;
            counter++;
          }
        }
        return result;
    }
    
    function _isReady(ParkingSlot storage _desiredParkingSlot, uint _initTime, uint _duraTime) private view returns(bool) {
        for (uint i = 0; i < _desiredParkingSlot.reservationsSize; i++) {
            if(_desiredParkingSlot.reservations[i].initTime<=_initTime) {
                if(_desiredParkingSlot.reservations[i].initTime + _desiredParkingSlot.reservations[i].duraTime > _initTime){
                    return false;
                }
            } else {
                if(_initTime + _duraTime >= _desiredParkingSlot.reservations[i].initTime) {
                    return false;
                } 
            }
        }
        return true;
    }
    
    function reserve(uint _parkingId, uint _initTime, uint _duraTime) external returns (bool) {
        ParkingSlot storage desiredParkingSlot = parkings[_parkingId]; //Pointer to the parking slot we want to reserve
        if(_isReady(desiredParkingSlot, _initTime, _duraTime)){
            uint time = now;
            bool rewrite = false;
            if(desiredParkingSlot.reservationsSize > 0) {
                for (uint i = 0; i < desiredParkingSlot.reservationsSize; i++) {
                    if(desiredParkingSlot.reservations[i].initTime + desiredParkingSlot.reservations[i].duraTime < time){
                        if(rewrite == false){
                            desiredParkingSlot.reservations[i].initTime = _initTime;
                            desiredParkingSlot.reservations[i].duraTime = _duraTime;
                            desiredParkingSlot.reservations[i].reservationOwner = msg.sender;
                            rewrite = true;
                        }
                    }
                }
            }
            
            if(rewrite == false) {
                desiredParkingSlot.reservations[desiredParkingSlot.reservationsSize] = (Reservation(_initTime, _duraTime, msg.sender));
                desiredParkingSlot.reservationsSize++;
            }
            
            emit NewReservation(_parkingId, desiredParkingSlot.reservationsSize, _initTime, _duraTime);
            return true;
        }
        else {
            return false;
        }
    }
    
    function requireDrop(uint _parkingId) external returns (bool) {
        ParkingSlot storage desiredParkingSlot = parkings[_parkingId];
        for (uint i = 0; i < desiredParkingSlot.reservationsSize; i++) {
            if(msg.sender == desiredParkingSlot.reservations[i].reservationOwner) {
                if(now > desiredParkingSlot.reservations[i].initTime) {
                    if(now < desiredParkingSlot.reservations[i].initTime + desiredParkingSlot.reservations[i].duraTime) {
                        require(desiredParkingSlot.occupancy);
                        desiredParkingSlot.occupancy = false;
                        return true;
                    }
                }
            }
        }
        
    }
    
    function requireLift(uint _parkingId) external returns (bool) {
        ParkingSlot storage desiredParkingSlot = parkings[_parkingId];
        for (uint i = 0; i < desiredParkingSlot.reservationsSize; i++) {
            if(msg.sender == desiredParkingSlot.reservations[i].reservationOwner) {
                if(now > desiredParkingSlot.reservations[i].initTime) {
                    if(now < desiredParkingSlot.reservations[i].initTime + desiredParkingSlot.reservations[i].duraTime) {
                        require(desiredParkingSlot.occupancy == false);
                        desiredParkingSlot.occupancy = true;
                        return true;
                    }
                }
            }
        }
        
    }

    function getSlotState(uint _parkingId) external view returns (bool) {
        ParkingSlot storage desiredParkingSlot = parkings[_parkingId];
        return desiredParkingSlot.occupancy;
    }
}