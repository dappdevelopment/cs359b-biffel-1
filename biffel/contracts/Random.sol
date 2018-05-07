/*
Modified from https://github.com/oraclize/ethereum-examples/blob/master/solidity/random-datasource/randomExample.sol
*/

pragma solidity ^0.4.21;

import "github.com/oraclize/ethereum-api/oraclizeAPI.sol";

contract RandomNumber is usingOraclize{

	event randomNumberGenerated(uint)

	function RandomNumber() {
        oraclize_setProof(proofType_Ledger); // sets the Ledger authenticity proof in the constructor
        update();
    }

	// function generateNumber(uint numSlots) public view returns (uint winningSlot){
 //        newOraclizeQuery("Oraclize query was sent, standing by for the answer..");
 //        entropy = oraclize_query("URL", "xml(https://www.fueleconomy.gov/ws/rest/fuelprices).fuelPrices.diesel");

 //        return uint(keccak256(entropy)%numSlots)
 //    }

    function __callback(bytes32 _queryId, string _result, bytes _proof){
    	if (msg.sender != oraclize_cbAddress()) throw;
        
        if (oraclize_randomDS_proofVerify__returnCode(_queryId, _result, _proof) != 0) {
            // proof has failed
        } else {
            // proof has succeeded
            
            newRandomNumber_bytes(bytes(_result)); // resulting random bytes
            
            // convert to uint
            uint maxRange = 2**(8* 7);
            uint randomNumber = uint(sha3(_result)) % maxRange; 
            newRandomNumber_uint(randomNumber); 

    }

    function update() payable {
        uint N = 7; // number of random bytes we want the datasource to return
        uint delay = 0; // number of seconds to wait before the execution takes place
        uint callbackGas = 200000; // amount of gas we want Oraclize to set for the callback function
        bytes32 queryId = oraclize_newRandomDSQuery(delay, N, callbackGas); // this function internally generates the correct oraclize_query and returns its queryId
    }
}
    