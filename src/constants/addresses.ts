import { FACTORY_ADDRESS as V2_FACTORY_ADDRESS } from '@uniswap/v2-sdk'
import { FACTORY_ADDRESS as V3_FACTORY_ADDRESS } from '@uniswap/v3-sdk'

import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')
export const MULTICALL_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984', [
    SupportedChainId.OPTIMISTIC_KOVAN,
    SupportedChainId.OPTIMISM,
    SupportedChainId.POLYGON_MUMBAI,
    SupportedChainId.POLYGON,
  ]),
  [SupportedChainId.ARBITRUM_ONE]: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
  [SupportedChainId.ARBITRUM_RINKEBY]: '0xa501c031958F579dB7676fF1CE78AD305794d579',
}
export const V2_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V2_FACTORY_ADDRESS)
export const V2_ROUTER_ADDRESS: AddressMap = constructSameAddressMap('0x1111111254fb6c44bAC0beD2854e76F90643097d')
export const INCH_ROUTER_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1111111254fb6c44bAC0beD2854e76F90643097d', [
    SupportedChainId.OPTIMISTIC_KOVAN,
    SupportedChainId.POLYGON_MUMBAI,
    SupportedChainId.POLYGON,
  ]),
  [SupportedChainId.OPTIMISM]: '0x1111111254760f7ab3f16433eea9304126dcd199',
  [SupportedChainId.ARBITRUM_ONE]: '0x1111111254fb6c44bac0bed2854e76f90643097d',
  [SupportedChainId.ARBITRUM_RINKEBY]: '0xa501c031958F579dB7676fF1CE78AD305794d579',
}

/**
 * The oldest V0 governance address
 */
export const GOVERNANCE_ALPHA_V0_ADDRESSES: AddressMap = constructSameAddressMap(
  '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'
)
/**
 * The older V1 governance address
 */
export const GOVERNANCE_ALPHA_V1_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6',
}
/**
 * The latest governor bravo that is currently admin of timelock
 */
export const GOVERNANCE_BRAVO_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x408ED6354d4973f66138C91495F2f2FCbd8724C3',
}

export const TREASURY_FEE_ADDRESS: AddressMap = {
  [SupportedChainId.KOVAN]: '0x9aE8F90f58a6bc41B469b386a0A49eBb94897fAE',
}

export const STAKING_ADDRESS: AddressMap = {
  [SupportedChainId.KOVAN]: '0x24C2F4d4e81620dBbC46E02d3DAc9A9c095DcF8C',
}

export const STAKING_DISTRIBUTOR_ADDRESS: AddressMap = {
  [SupportedChainId.KOVAN]: '0xa6b19D85a221d5C063b62570457c1171068ba9fd',
}

export const TIMELOCK_ADDRESS: AddressMap = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')

export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = constructSameAddressMap(V3_FACTORY_ADDRESS, [
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.POLYGON,
])
export const QUOTER_ADDRESSES: AddressMap = constructSameAddressMap('0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6', [
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.POLYGON,
])
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = constructSameAddressMap(
  '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  [
    SupportedChainId.OPTIMISM,
    SupportedChainId.OPTIMISTIC_KOVAN,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.ARBITRUM_RINKEBY,
    SupportedChainId.POLYGON_MUMBAI,
    SupportedChainId.POLYGON,
  ]
)
export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.ROPSTEN]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.RINKEBY]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}
export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}
export const SWAP_ROUTER_ADDRESSES: AddressMap = constructSameAddressMap('0xE592427A0AEce92De3Edee1F18E0157C05861564', [
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
])
export const LO_MANAGER_ADDRESSES: AddressMap = {
  [SupportedChainId.KOVAN]: '0x66E15bb53c9C5fB1B9Aa19D84920A3965cEad8a7',
  [SupportedChainId.OPTIMISTIC_KOVAN]: '0x6bC9BFfF3CD847Fd1e061E3B275901b930872B4B',
  [SupportedChainId.OPTIMISM]: '0x7314Af7D05e054E96c44D7923E68d66475FfaAb8',
  [SupportedChainId.ARBITRUM_RINKEBY]: '0xf10A3841bc1ccEAe1DC162e66e615D2416A3adac',
  [SupportedChainId.ARBITRUM_ONE]: '0x02C282F60FB2f3299458c2B85EB7E303b25fc6F0',
  [SupportedChainId.MAINNET]: '0xD1fDF0144be118C30a53E1d08Cc1E61d600E508e',
  [SupportedChainId.POLYGON]: '0xD1fDF0144be118C30a53E1d08Cc1E61d600E508e',
}

export const UNISWAP_UTILS_ADDRESSES: AddressMap = {
  [SupportedChainId.KOVAN]: '0x9E1E4f041877f1aB604E5B109Cf699545e20E4bC',
}
export const ROUTER_ADDRESSES: AddressMap = {
  [SupportedChainId.ARBITRUM_ONE]: '0x79ba1CFF3998D7ce3DF452c3Fd6FCf817971Ea39',
  [SupportedChainId.POLYGON]: '0xCe7cbDA67DE0BFdBBBAEA0DB94434a722A353CF4',
}
export const METASWAP_ADDRESSES: AddressMap = {
  [SupportedChainId.POLYGON]: '0x6afD834f6e3D5ad5A83E7838ca45F3DBDe3E323d',
}
export const BICONOMY_DAPP_API: AddressMap = {
  [SupportedChainId.POLYGON]: 'lD1x8FLPD.45318b65-8ab0-45c7-b59c-2f73137fb751',
}
export const V3_MIGRATOR_ADDRESSES: AddressMap = constructSameAddressMap('0xA5644E29708357803b5A882D272c41cC0dF92B34', [
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
  SupportedChainId.POLYGON_MUMBAI,
  SupportedChainId.POLYGON,
])
