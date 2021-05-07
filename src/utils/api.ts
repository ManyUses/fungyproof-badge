import axios from 'axios'
import Web3 from 'web3'

const ENV = process.env.NODE_ENV
const ENDPOINT = ENV === 'production' ? 'https://fungyproof.com/api' : 'http://localhost:8080/api'

/**
 * Grade an NFT
 *
 * @param data
 * @returns
 */
export const gradeNFT = (data: any, network = 1) =>
  axios.post(`${ENDPOINT}/grade?network=${network}`, data, { timeout: 15000 })

/**
 * Certify an NFT
 *
 * @param address
 * @param data NFT cert params
 * @param provider
 */
export const certifyNFT = async(
  params: {
    contract: string
    tokenId: string
    signature?: string
  },
  address?: string,
  provider?: any,
  network = 1
) => {
  // get signature
  if (provider && address) {
    params.signature = await new Promise((resolve, reject) => {
      const w3 = new Web3(provider)
      w3.eth.personal.sign(
        w3.utils.fromUtf8(`I'm proving I own ${params.contract} ${params.tokenId}`),
        address,
        '', // TODO password?
        (err, sig) => {
          if (err) return reject(err)
          resolve(sig)
        })
    })
  }

  const { data } = await axios.post(`${ENDPOINT}/certificate?network=${network}`, params, { timeout: 15000 })

  return data
}
