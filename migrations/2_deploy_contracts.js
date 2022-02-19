const sendEthcontract = artifacts.require("sendEthcontract");

module.exports = function (deployer) {
  deployer.deploy(sendEthcontract);
};
