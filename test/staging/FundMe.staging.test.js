const { getNamedAccounts, ethers, network } = require("hardhat")
const { assert } = require("chai")
const { deploymentChains } = require("../../helper-hardhat-config")

deploymentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("1")

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              // 这里不需要部署，因为在阶段测试中，假设已经部署在测试网上了
              fundMe = await ethers.getContract("FundMe", deployer)
              // 也不需要mock，因为测试网上有
          })

          it("allows people to fund and withdraw", async function () {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert(endingBalance.toString(), "0")
          })
      })
