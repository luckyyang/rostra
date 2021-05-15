const { ethers } = require("hardhat");

describe("TokenCenter Contract", function() {

  beforeEach(async function() {
    [owner, alice, bob, miner1, miner2] = await ethers.getSigners();

    // WETH
    WETH = await ethers.getContractFactory("MockERC20");
    weth = await WETH.deploy(owner, 'WETH', ethers.utils.parseEther("1000000000000"));
    await weth.deployed();
  });

  it('创建大学', async function() {
    UniFactory = await ethers.getContractFactory('UniversityFactory');
    uniFactory = await UniFactory.deploy();

    await uniFactory.createUniversity('test', 'test');

    r = await uniFactory.idToUniversity(0);
    console.log(r);

    r = await uniFactory.allUniversity(0);
    console.log(r);

    console.log(await uniFactory.universityLength());
  });

  it('创建课程', async function() {
    UniFactory = await ethers.getContractFactory('CourseFactory');
    uniFactory = await UniFactory.deploy();

    await uniFactory.createCourse(
      'Hekesong', 
      'http:.//baidu.com',
      'song'
    );

    r = await uniFactory.idToCourse(0);
    console.log(r);

    r = await uniFactory.allCourse(0);
    console.log(r);

    console.log(await uniFactory.courseLength());
  });

  it('捐赠测试', async function() {
    await weth.transfer(alice.address, ethers.utils.parseEther('20'));

    UniFactory = await ethers.getContractFactory('UniversityFactory');
    uniFactory = await UniFactory.deploy();

    await uniFactory.createUniversity('test', 'test');

    r = await uniFactory.idToUniversity(0);
    console.log(r);

    r = await uniFactory.allUniversity(0);
    console.log(r);

    console.log(await uniFactory.universityLength());

    addr = await uniFactory.idToUniversity(0);
    console.log(addr);

    University = await ethers.getContractFactory("University");
    university = await University.attach(addr);

    await university.connect(alice).createDonate(0, 16);
    await weth.approve(university.address, ethers.utils.parseEther('10'));
    await university.connect(owner).donate(0, weth.address, ethers.utils.parseEther('10'));
    r = await university.idToAllDonate(0);
    console.log(r / 1e18 + '');

    await weth.approve(university.address, ethers.utils.parseEther('10'));
    await weth.approve(university.address, ethers.utils.parseEther('10'));
    await weth.approve(university.address, ethers.utils.parseEther('10'));
    await weth.approve(university.address, ethers.utils.parseEther('10'));

    await university.connect(alice).withdrawDonate(0, weth.address);
    console.log((await weth.balanceOf(owner.address)) / 1e18);

    r = await university.idToAllDonate(0);
    console.log(r / 1e18 + '');

    r = await university.donates(0);
    console.log(r.amount);
  });
});