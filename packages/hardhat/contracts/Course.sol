// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

interface ICourseFactory {
    function parameters()
        external
        view
        returns (
            address owner,
            string calldata title,
            string calldata url,
            string calldata author,
            address authorAddr
        );

    function addrToCourse(address) external view returns (uint);
}

contract Course is Ownable {

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address factory;

    address courseOwner;
    string title;
    string url;
    string author;
    address authorAddr;

    struct Donate {
        uint startBlockNumber;
        uint endBlockNumber;
    }

    Donate[] public donates;
    uint public allDonate;
    uint public allMatchDonation;

    mapping(uint => uint) public idToAllDonate;

    constructor() public {
        (factory, title, url, author, authorAddr) = ICourseFactory(msg.sender).parameters();
    }

    function createDonate(
        uint _startBlockNumber, 
        uint _endBlockNumber
    )
        external
    {
        donates.push(Donate({
            startBlockNumber: _startBlockNumber,
            endBlockNumber: _endBlockNumber
        }));
    }

    function donate(uint _id, address _erc20, uint _amount) external {
        require(block.number < donates[_id].endBlockNumber, 'donate has over');
        IERC20(_erc20).safeTransferFrom(msg.sender, address(this), _amount);

        uint uniId = ICourseFactory(factory).addrToCourse(address(this));
        idToAllDonate[uniId] = idToAllDonate[uniId].add(_amount);
    }
}
