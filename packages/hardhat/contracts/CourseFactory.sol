// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

import './Course.sol';


// 大学工厂创建大学
contract CourseFactory is Ownable {

    using SafeMath for uint256;
    using SafeERC20 for IERC20;

    struct Parameters {
        address owner;
        string title;
        string url;
        string author;
        address authorAddr;
    }

    // id => 大学地址
    mapping(uint256 => address) public idToCourse;
    Parameters[] public allCourse;

    Parameters public parameters;

    constructor() public { }

    function createCourse(
        string calldata _title,
        string calldata _url,
        string calldata _author
    )
        external
    {
        allCourse.push(Parameters({
            owner: msg.sender,
            title: _title,
            url: _url,
            author: _author,
            authorAddr: msg.sender
        }));

        idToCourse[allCourse.length - 1] = deploy(_title, _url, _author, msg.sender);
    }

    function courseLength() external view returns (uint) {
        return allCourse.length;
    }

    function donate(uint _id, address _erc20, uint _amount) external {
        IERC20(_erc20).safeTransferFrom(msg.sender, address(this), _amount); 
        IERC20(_erc20).safeTransfer(idToCourse[_id], _amount);
    }

    function deploy(
        string calldata _title,
        string calldata _url,
        string calldata _author,
        address _authorAddr
    ) internal returns (address course) {
        parameters = Parameters({
            owner: address(this), 
            title: _title, 
            url: _url,
            author: _author,
            authorAddr: _authorAddr
        });
        course = address(
            new Course{
                salt: keccak256(abi.encode(address(this), _title, _url, _author, _authorAddr))
            }()
        );
        delete parameters;
    }
}
