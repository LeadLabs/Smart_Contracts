pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IWETH is IERC20 {
  function withdraw(uint256 amount) external;

  function deposit() external payable;
}
