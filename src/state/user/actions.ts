import { createAction } from '@reduxjs/toolkit'
import { SupportedLocale } from 'constants/locales'

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
}

export interface SerializedPair {
  token0: SerializedToken
  token1: SerializedToken
}

export const updateMatchesDarkMode = createAction<{ matchesDarkMode: boolean }>('user/updateMatchesDarkMode')
export const updateArbitrumAlphaAcknowledged = createAction<{ arbitrumAlphaAcknowledged: boolean }>(
  'user/updateArbitrumAlphaAcknowledged'
)
export const updateOptimismAlphaAcknowledged = createAction<{ optimismAlphaAcknowledged: boolean }>(
  'user/updateOptimismAlphaAcknowledged'
)
export const updateUserDarkMode = createAction<{ userDarkMode: boolean }>('user/updateUserDarkMode')
export const updateUserExpertMode = createAction<{ userExpertMode: boolean }>('user/updateUserExpertMode')
export const updateUserLocale = createAction<{ userLocale: SupportedLocale }>('user/updateUserLocale')
export const updateUserClientSideRouter = createAction<{ userClientSideRouter: boolean }>(
  'user/updateUserClientSideRouter'
)
export const updateHideClosedPositions = createAction<{ userHideClosedPositions: boolean }>('user/hideClosedPositions')
export const updateUserSlippageTolerance = createAction<{ userSlippageTolerance: number | 'auto' }>(
  'user/updateUserSlippageTolerance'
)
export const updateUserGaslessMode = createAction<{ userGaslessMode: boolean }>('user/updateUserGaslessMode')
export const updateUserTickOffset = createAction<{ userTickOffset: number }>('user/updateUserTickOffset')
export const updateUserTickSize = createAction<{ userTickSize: number }>('user/updateUserTickSize')
export const updateUserGasPrice = createAction<{ userGasPrice: string }>('user/updateUserGasPrice')
export const updateUserDeadline = createAction<{ userDeadline: number }>('user/updateUserDeadline')
export const addSerializedToken = createAction<{ serializedToken: SerializedToken }>('user/addSerializedToken')
export const removeSerializedToken = createAction<{ chainId: number; address: string }>('user/removeSerializedToken')
export const addSerializedPair = createAction<{ serializedPair: SerializedPair }>('user/addSerializedPair')
export const removeSerializedPair =
  createAction<{ chainId: number; tokenAAddress: string; tokenBAddress: string }>('user/removeSerializedPair')
