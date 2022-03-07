pragma solidity ^0.8.4;

// Unoptimized 52715
// Memory Counter 49268
// Extract length 49263
// Use calldata instead of memory 47412

contract Example2 {
    uint256 public counter;

    function incrementBy(uint256[] calldata arr) public {
        uint256 memoryCounter = counter;
        uint256 length = arr.length;
        for (uint256 idx = 0; idx < length; idx++) {
            memoryCounter += arr[idx];
        }
        counter = memoryCounter;
    }
}
