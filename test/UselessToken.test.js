const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('UselessToken', function () {

  var useless;
  var owner, signer1, signer2, signer3;

  before(async function () {
    const Useless = await ethers.getContractFactory('UselessToken');
    useless = await Useless.deploy();
    [owner, signer1, signer2, signer3] = await ethers.getSigners();
  })



  it('anyone can mint', async function () {
    const amount = ethers.BigNumber.from(1000);

    const balanceBefore = await useless.balanceOf(signer1.address);
    const totalSupplyBefore = await useless.totalSupply();

    await useless.connect(signer1).mint(amount);

    const balanceAfter = await useless.balanceOf(signer1.address);
    const totalSupplyAfter = await useless.totalSupply();

    expect(balanceAfter.sub(balanceBefore)).to.eql(amount);
    expect(totalSupplyAfter.sub(totalSupplyBefore)).to.eql(amount);
  });



  it('anyone can burn', async function () {
    const amount = ethers.BigNumber.from(1000);
    // we need some amount of tokens to burn them
    // expect mint to work
    await useless.mint(amount);

    const balanceBefore = await useless.balanceOf(signer1.address);
    const totalSupplyBefore = await useless.totalSupply();

    await useless.connect(signer1).burn(amount);

    const balanceAfter = await useless.balanceOf(signer1.address);
    const totalSupplyAfter = await useless.totalSupply();

    expect(balanceBefore.sub(balanceAfter)).to.eql(amount);
    expect(totalSupplyBefore.sub(totalSupplyAfter)).to.eql(amount);
  });



  it('sending exactly 5 useless tokens will not decrease senders balance', async function () {
    // 5 useless tokens
    const amount = ethers.BigNumber.from('5000000000000000000');
    // expect mint to work
    await useless.mint(amount);

    const ownerBalanceBefore = await useless.balanceOf(owner.address);
    const recipientBalanceBefore = await useless.balanceOf(signer2.address);
    const totalSupplyBefore = await useless.totalSupply();

    await useless.transfer(signer2.address, amount);

    const ownerBalanceAfter = await useless.balanceOf(owner.address);
    const recipientBalanceAfter = await useless.balanceOf(signer2.address);
    const totalSupplyAfter = await useless.totalSupply();

    expect(ownerBalanceAfter).to.eql(ownerBalanceBefore);
    expect(recipientBalanceAfter.sub(recipientBalanceBefore)).to.eql(amount);
    expect(totalSupplyAfter.sub(totalSupplyBefore)).to.eql(amount);
  })



  it('trying to send 5 tokens without having them should fail', async function () {
    // 5 useless tokens
    const amount = ethers.BigNumber.from('5000000000000000000');

    try {
      await useless.connect(signer3).transfer(signer2.address, amount);

      expect(false, 'this test should fail').to.be.true

    } catch (error) {

      expect(error.message).to.contain('You still need 5 tokens to send them')

    }
  })



  it('transfer of other amounts should work as usual', async function () {
    // 5 useless tokens
    const amount = ethers.BigNumber.from(1000);
    // expect mint to work
    await useless.mint(amount);

    const ownerBalanceBefore = await useless.balanceOf(owner.address);
    const recipientBalanceBefore = await useless.balanceOf(signer2.address);
    const totalSupplyBefore = await useless.totalSupply();

    await useless.transfer(signer2.address, amount);

    const ownerBalanceAfter = await useless.balanceOf(owner.address);
    const recipientBalanceAfter = await useless.balanceOf(signer2.address);
    const totalSupplyAfter = await useless.totalSupply();

    expect(ownerBalanceBefore.sub(ownerBalanceAfter)).to.eql(amount);
    expect(recipientBalanceAfter.sub(recipientBalanceBefore)).to.eql(amount);
    expect(totalSupplyAfter).to.eql(totalSupplyBefore);
  })
});
