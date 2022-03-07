//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract PetPark {
    uint256 constant MALE = 0;
    uint256 constant FEMALE = 1;

    uint256 constant NONE = 0;
    uint256 constant FISH = 1;
    uint256 constant CAT = 2;
    uint256 constant DOG = 3;
    uint256 constant RABBIT = 4;
    uint256 constant PARROT = 5;

    address owner;

    mapping(uint256 => uint256) public animalCounts; // animalType => animalCount
    mapping(address => uint256) public borrowerAnimal; // borower => animalType

    mapping(address => BorrowerInfo) borrowerInfo;

    struct BorrowerInfo {
        uint256 age;
        uint256 gender;
    }

    event Added(uint256 animalType, uint256 animalCount);
    event Borrowed(uint256 animalType);
    event Returned(uint256 animalType);

    constructor() {
        owner = msg.sender;
    }

    function add(uint256 animalType, uint256 count) public onlyOwner {
        require(isValidAnimalType(animalType), "Invalid animal");

        animalCounts[animalType] += count;
        emit Added(animalType, animalCounts[animalType]);
    }

    function borrow(
        uint256 age,
        uint256 gender,
        uint256 animalType
    ) public {
        require(age != 0, "Invalid Age");
        require(isValidAnimalType(animalType), "Invalid animal type");
        require(animalCounts[animalType] > 0, "Selected animal not available");

        checkBorrower(age, gender, animalType);
        animalCounts[animalType] -= 1;
        borrowerAnimal[msg.sender] = animalType;
        emit Borrowed(animalType);
    }

    function giveBackAnimal() public {
        uint256 borrowedAnimalType = borrowerAnimal[msg.sender];
        require(borrowedAnimalType != 0, "No borrowed pets");

        animalCounts[borrowedAnimalType] += 1;
        borrowerAnimal[msg.sender] = 0;
        emit Returned(borrowedAnimalType);
    }

    function checkBorrower(
        uint256 age,
        uint256 gender,
        uint256 animalType
    ) private {
        if (borrowerInfo[msg.sender].age != 0) {
            require(borrowerInfo[msg.sender].age == age, "Invalid Age");
            require(
                borrowerInfo[msg.sender].gender == gender,
                "Invalid Gender"
            );
        }

        require(borrowerAnimal[msg.sender] == 0, "Already adopted a pet");

        if (gender == MALE) {
            require(
                animalType == FISH || animalType == DOG,
                "Invalid animal for men"
            );
        }
        if (gender == FEMALE) {
            require(
                gender == FEMALE && (animalType == CAT && age >= 40),
                "Invalid animal for women under 40"
            );
        }

        borrowerInfo[msg.sender] = BorrowerInfo(age, gender);
    }

    function isValidAnimalType(uint256 animalType) private pure returns (bool) {
        return animalType > 0 && animalType < 6;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not an owner");
        _;
    }
}
