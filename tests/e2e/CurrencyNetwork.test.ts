import 'mocha'
import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'

import { TLNetwork } from '../../src/TLNetwork'
import { config, user1 } from '../Fixtures'

chai.use(chaiAsPromised)

describe('e2e', () => {
  describe('CurrencyNetwork', () => {
    const { expect } = chai
    const { currencyNetwork } = new TLNetwork(config)
    let networks
    const notRegisteredAddress = '0xf8E191d2cd72Ff35CB8F012685A29B31996614EA'

    before(async () => {
      networks = await currencyNetwork.getAll()
    })

    describe('#getAll()', () => {
      it('should return array of networks', () => {
        expect(networks).to.be.an('array')
      })

      it('should return registered networks', () => {
        expect(networks).to.have.length.above(0, 'No registered networks')
        expect(networks[0]).to.include.all.keys('name', 'abbreviation', 'address')
        expect(networks[0].name).to.be.a('string')
        expect(networks[0].abbreviation).to.be.a('string')
        expect(networks[0].address).to.be.a('string').and.to.have.length(42)
      })
    })

    describe('#getInfo()', () => {
      it('should return detailed information of specific currency network', async () => {
        const networkInfoKeys = [
          'name',
          'abbreviation',
          'address',
          'numUsers',
          'decimals',
          'defaultInterestRate',
          'interestRateDecimals',
          'customInterestRatesAllowed'
        ]
        const networkInfo = await currencyNetwork.getInfo(networks[0].address)
        expect(networkInfo).to.have.all.keys(networkInfoKeys)
        expect(networkInfo.abbreviation).to.be.a('string')
        expect(networkInfo.address).to.be.a('string').and.to.have.length(42)
        expect(networkInfo.decimals).to.be.a('number')
        expect(networkInfo.name).to.be.a('string')
        expect(networkInfo.numUsers).to.be.a('number')
        expect(networkInfo.defaultInterestRate).to.have.all.keys('decimals', 'value', 'raw')
        expect(networkInfo.customInterestRatesAllowed).to.be.a('boolean')
        expect(networkInfo.interestRateDecimals).to.be.a('number')
      })
    })

    describe('#getUsers()', () => {
      it('should return all user addresses of specific currency network', () => {
        expect(currencyNetwork.getUsers(networks[0].address)).to.eventually.be.an('array')
      })
    })

    describe('#getUserOverview()', () => {
      it('should return overview of user in currency network context', async () => {
        const overview = await currencyNetwork.getUserOverview(
          networks[0].address,
          user1.address
        )
        const { balance, given, received, leftGiven, leftReceived } = overview
        expect(overview).to.have.all.keys('balance', 'given', 'received', 'leftGiven', 'leftReceived')
        expect(balance).to.have.all.keys('decimals', 'raw', 'value')
        expect(given).to.have.all.keys('decimals', 'raw', 'value')
        expect(received).to.have.all.keys('decimals', 'raw', 'value')
        expect(leftGiven).to.have.all.keys('decimals', 'raw', 'value')
        expect(leftReceived).to.have.all.keys('decimals', 'raw', 'value')
      })
    })

    describe('#getDecimals()', () => {
      it('should return decimals from relay server', async () => {
        const decimalsObject = await currencyNetwork.getDecimals(networks[0].address)
        expect(decimalsObject).to.have.all.keys('networkDecimals', 'interestRateDecimals')
        expect(decimalsObject.networkDecimals).to.be.a('number')
        expect(decimalsObject.interestRateDecimals).to.be.a('number')
      })

      it('should return provided decimals', async () => {
        const decimalsObject = await currencyNetwork.getDecimals(
          networks[0].address,
          {
            networkDecimals: 2,
            interestRateDecimals: 3
          }
        )
        expect(decimalsObject).to.have.all.keys('networkDecimals', 'interestRateDecimals')
        expect(decimalsObject.networkDecimals).to.equal(2)
        expect(decimalsObject.interestRateDecimals).to.equal(3)
      })

      it('should throw error', async () => {
        const errMsg = [
          `${notRegisteredAddress} seems not to be a network address.`,
          'Decimals have to be explicit.'
        ].join(' ')
        await expect(currencyNetwork.getDecimals(notRegisteredAddress))
          .to.be.rejectedWith(errMsg)
      })
    })
  })
})
