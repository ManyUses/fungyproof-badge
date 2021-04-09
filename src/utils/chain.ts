import chains from '@/utils/chains.json'

const ENV = process.env.VUE_NODE_ENV

/**
 * Get chain data
 *
 * @param chainId hex chain id
 */
export const getChain = (chainId: string) => {
  const cid = parseInt(chainId?.replace('0x', ''), 16)
  return (chains as any)?.[cid]
}
