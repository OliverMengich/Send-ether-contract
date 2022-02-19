// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract sendEthcontract {
    function transfer(address payable to,uint value)
        public
        returns (bool,bytes memory)
    {
        (bool sent,bytes memory data) = to.call{value: value}("ether");
        return (sent,data);
    }
}
