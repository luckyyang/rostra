// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

interface IUniversityFactory {
    function parameters()
        external
        view
        returns (
            address factory,
            string calldata name,
            string calldata introduce
        );

    function addrToUniversity(address) external view returns (uint);
}

// 大学合约
contract University is Ownable {

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    address public factory;
    string public name;
    string public introduce;

    struct Donate {
        uint startBlockNumber;
        uint endBlockNumber;
    }

    Donate[] public donates;
    uint public allDonate;
    uint public allMatchDonation;

    mapping(uint => uint) public idToAllDonate;

    constructor() public {
        (factory, name, introduce) = IUniversityFactory(msg.sender).parameters();
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

        uint uniId = IUniversityFactory(factory).addrToUniversity(address(this));
        idToAllDonate[uniId] = idToAllDonate[uniId].add(_amount);
    }
}
