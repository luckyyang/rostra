// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

import './University.sol';

// 大学工厂创建大学
contract UniversityFactory is Ownable {

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    struct Parameters {
        address owner;
        string name;
        string introduce;
    }

    // id => 大学地址
    mapping(uint => address) public idToUniversity;
    mapping(address => uint) public addrToUniversity;
    Parameters[] public allUniversity;

    Parameters public parameters;

    constructor() public { }

    function createUniversity(
        string calldata _name,
        string calldata _introduce
    )
        external
    {
        allUniversity.push(Parameters({
            owner: msg.sender,
            name: _name,
            introduce: _introduce
        }));

        address addr = deploy(_name, _introduce);
        idToUniversity[allUniversity.length - 1] = addr;
        addrToUniversity[addr] = allUniversity.length - 1;
    }

    function universityLength() external view returns (uint) {
        return allUniversity.length;
    }

    function donate(uint _id, address _erc20, uint _amount) external {
        IERC20(_erc20).safeTransferFrom(msg.sender, address(this), _amount);
        IERC20(_erc20).safeTransfer(idToUniversity[_id], _amount);
    }

    function deploy(
        string calldata _name,
        string calldata _introduce
    ) internal returns (address university) {
        parameters = Parameters({ owner: address(this), name: _name, introduce: _introduce});
        university = address(new University{salt: keccak256(abi.encode(address(this), _name, _introduce))}());
        delete parameters;
    }
}
