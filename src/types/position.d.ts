import { BigNumber } from '@ethersproject/bignumber'

export interface PositionDetails {
  owner: string
  tokenId: BigNumber
  token0: string
  token1: string
  fee: number
  tickLower: number
  tickUpper: number
  liquidity: BigNumber
  processed: BigNumber
  tokensOwed0: BigNumber
  tokensOwed1: BigNumber
}
