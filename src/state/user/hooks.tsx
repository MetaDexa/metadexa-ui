import { formatUnits, parseUnits } from '@ethersproject/units'
import { Currency, CurrencyAmount, Ether, Percent, Token } from '@uniswap/sdk-core'
import { computePairAddress, Pair } from '@uniswap/v2-sdk'
import { L2_CHAIN_IDS, SupportedChainId } from 'constants/chains'
import { SupportedLocale } from 'constants/locales'
import { DEFAULT_USER_GAS_PRICE, L2_DEADLINE_FROM_NOW } from 'constants/misc'
import { nativeOnChain } from 'constants/tokens'
import JSBI from 'jsbi'
import { useCallback, useMemo } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { useSingleCallResult } from 'state/multicall/hooks'

import { V2_FACTORY_ADDRESSES } from '../../constants/addresses'
import { BASES_TO_TRACK_LIQUIDITY_FOR, PINNED_PAIRS } from '../../constants/routing'
import { useAllTokens } from '../../hooks/Tokens'
import { useActiveWeb3React } from '../../hooks/web3'
import { AppState } from '../index'
import {
  addSerializedPair,
  addSerializedToken,
  removeSerializedToken,
  SerializedPair,
  SerializedToken,
  updateArbitrumAlphaAcknowledged,
  updateHideClosedPositions,
  updateOptimismAlphaAcknowledged,
  updateUserClientSideRouter,
  updateUserDarkMode,
  updateUserDeadline,
  updateUserExpertMode,
  updateUserGaslessMode,
  updateUserGasPrice,
  updateUserLocale,
  updateUserSlippageTolerance,
  updateUserTickOffset,
  updateUserTickSize,
} from './actions'

function serializeToken(token: Token): SerializedToken {
  return {
    chainId: token.chainId,
    address: token.address,
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
  }
}

function deserializeToken(serializedToken: SerializedToken): Token {
  return new Token(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name
  )
}

export function useIsDarkMode(): boolean {
  const { userDarkMode, matchesDarkMode } = useAppSelector(
    ({ user: { matchesDarkMode, userDarkMode } }) => ({
      userDarkMode,
      matchesDarkMode,
    }),
    shallowEqual
  )

  return userDarkMode === null ? matchesDarkMode : userDarkMode
}

export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useAppDispatch()
  const darkMode = useIsDarkMode()

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({ userDarkMode: !darkMode }))
  }, [darkMode, dispatch])

  return [darkMode, toggleSetDarkMode]
}

export function useUserLocale(): SupportedLocale | null {
  return useAppSelector((state) => state.user.userLocale)
}

export function useUserLocaleManager(): [SupportedLocale | null, (newLocale: SupportedLocale) => void] {
  const dispatch = useAppDispatch()
  const locale = useUserLocale()

  const setLocale = useCallback(
    (newLocale: SupportedLocale) => {
      dispatch(updateUserLocale({ userLocale: newLocale }))
    },
    [dispatch]
  )

  return [locale, setLocale]
}

export function useIsExpertMode(): boolean {
  return useAppSelector((state) => state.user.userExpertMode)
}

export function useExpertModeManager(): [boolean, () => void] {
  const dispatch = useAppDispatch()
  const expertMode = useIsExpertMode()

  const toggleSetExpertMode = useCallback(() => {
    dispatch(updateUserExpertMode({ userExpertMode: !expertMode }))
  }, [expertMode, dispatch])

  return [expertMode, toggleSetExpertMode]
}

export function useIsGaslessMode(): boolean {
  return useAppSelector((state) => state.user.userGaslessMode)
}

export function useGaslessModeManager(): [boolean, () => void] {
  const dispatch = useAppDispatch()
  const { chainId } = useActiveWeb3React()
  const gaslessMode = chainId === 137

  const toggleSetGaslessMode = useCallback(() => {
    dispatch(updateUserGaslessMode({ userGaslessMode: !gaslessMode }))
  }, [gaslessMode, dispatch])

  return [gaslessMode, toggleSetGaslessMode]
}

export function useClientSideRouter(): [boolean, (userClientSideRouter: boolean) => void] {
  const dispatch = useAppDispatch()

  const clientSideRouter = useAppSelector((state) => Boolean(state.user.userClientSideRouter))

  const setClientSideRouter = useCallback(
    (newClientSideRouter: boolean) => {
      dispatch(updateUserClientSideRouter({ userClientSideRouter: newClientSideRouter }))
    },
    [dispatch]
  )

  return [clientSideRouter, setClientSideRouter]
}

export function useRoutingAPIEnabled(): boolean {
  return true
}

export function useSetUserSlippageTolerance(): (slippageTolerance: Percent | 'auto') => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (userSlippageTolerance: Percent | 'auto') => {
      let value: 'auto' | number
      try {
        value =
          userSlippageTolerance === 'auto' ? 'auto' : JSBI.toNumber(userSlippageTolerance.multiply(10_000).quotient)
      } catch (error) {
        value = 'auto'
      }
      dispatch(
        updateUserSlippageTolerance({
          userSlippageTolerance: value,
        })
      )
    },
    [dispatch]
  )
}

/**
 * Return the user's slippage tolerance, from the redux store, and a function to update the slippage tolerance
 */
export function useUserSlippageTolerance(): Percent | 'auto' {
  const userSlippageTolerance = useAppSelector((state) => {
    return state.user.userSlippageTolerance
  })

  return useMemo(
    () => (userSlippageTolerance === 'auto' ? 'auto' : new Percent(userSlippageTolerance, 10_000)),
    [userSlippageTolerance]
  )
}

export function useUserTickOffset(): [number, (newTickOffset: number) => void] {
  const dispatch = useAppDispatch()

  const userTickOffset = useAppSelector((state) => state.user.userTickOffset)

  const setUserTickOffset = useCallback(
    (newTickOffset: number) => {
      dispatch(updateUserTickOffset({ userTickOffset: newTickOffset }))
    },
    [dispatch]
  )

  return [userTickOffset, setUserTickOffset]
}

export function useUserTickSize(): [number, (newTickSize: number) => void] {
  const dispatch = useAppDispatch()

  const userTickSize = useAppSelector((state) => state.user.userTickSize)

  const setUserTickSize = useCallback(
    (newTickSize: number) => {
      dispatch(updateUserTickSize({ userTickSize: newTickSize }))
    },
    [dispatch]
  )

  return [userTickSize, setUserTickSize]
}

export function useUserHideClosedPositions(): [boolean, (newHideClosedPositions: boolean) => void] {
  const dispatch = useAppDispatch()

  const hideClosedPositions = useAppSelector((state) => state.user.userHideClosedPositions)

  const setHideClosedPositions = useCallback(
    (newHideClosedPositions: boolean) => {
      dispatch(updateHideClosedPositions({ userHideClosedPositions: newHideClosedPositions }))
    },
    [dispatch]
  )

  return [hideClosedPositions, setHideClosedPositions]
}

/**
 * Same as above but replaces the auto with a default value
 * @param defaultSlippageTolerance the default value to replace auto with
 */
export function useUserSlippageToleranceWithDefault(defaultSlippageTolerance: Percent): Percent {
  const allowedSlippage = useUserSlippageTolerance()
  return useMemo(
    () => (allowedSlippage === 'auto' ? defaultSlippageTolerance : allowedSlippage),
    [allowedSlippage, defaultSlippageTolerance]
  )
}

export function useUserTransactionTTL(): [number, (slippage: number) => void] {
  const { chainId } = useActiveWeb3React()
  const dispatch = useAppDispatch()
  const userDeadline = useAppSelector((state) => state.user.userDeadline)
  const onL2 = Boolean(chainId && L2_CHAIN_IDS.includes(chainId))
  const deadline = onL2 ? L2_DEADLINE_FROM_NOW : userDeadline

  const setUserDeadline = useCallback(
    (userDeadline: number) => {
      dispatch(updateUserDeadline({ userDeadline }))
    },
    [dispatch]
  )

  return [deadline, setUserDeadline]
}

export function useUserTransactionGas(): [string, (gasPrice: string) => void] {
  const dispatch = useAppDispatch()
  const userGasPrice = useAppSelector((state) => state.user.userGasPrice)

  const setUserGasPrice = useCallback(
    (userGasPrice: string) => {
      dispatch(updateUserGasPrice({ userGasPrice }))
    },
    [dispatch]
  )

  return [userGasPrice, setUserGasPrice]
}

export function useNetworkGasPrice(): CurrencyAmount<Currency> | undefined {
  const { chainId, library } = useActiveWeb3React()
  const [userGasPrice, setUserGasPrice] = useUserTransactionGas()

  const gasPriceCallback = useCallback(() => {
    library
      ?.getGasPrice()
      .then((userGasPrice) => {
        setUserGasPrice(formatUnits(userGasPrice, 'gwei'))
      })
      .catch((error) => console.error(`Failed to get gas price for chainId: ${chainId}`, error))
  }, [chainId, library, setUserGasPrice])

  gasPriceCallback()

  return useMemo(
    () =>
      userGasPrice && chainId
        ? CurrencyAmount.fromRawAmount(nativeOnChain(chainId), JSBI.BigInt(parseUnits(userGasPrice, 'gwei').toString()))
        : undefined,
    [chainId, userGasPrice]
  )
}

export function useAddUserToken(): (token: Token) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (token: Token) => {
      dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
    },
    [dispatch]
  )
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
  const dispatch = useAppDispatch()
  return useCallback(
    (chainId: number, address: string) => {
      dispatch(removeSerializedToken({ chainId, address }))
    },
    [dispatch]
  )
}

export function useUserAddedTokens(): Token[] {
  const { chainId } = useActiveWeb3React()
  const serializedTokensMap = useAppSelector(({ user: { tokens } }) => tokens)

  return useMemo(() => {
    if (!chainId) return []
    return Object.values(serializedTokensMap?.[chainId] ?? {}).map(deserializeToken)
  }, [serializedTokensMap, chainId])
}

function serializePair(pair: Pair): SerializedPair {
  return {
    token0: serializeToken(pair.token0),
    token1: serializeToken(pair.token1),
  }
}

export function usePairAdder(): (pair: Pair) => void {
  const dispatch = useAppDispatch()

  return useCallback(
    (pair: Pair) => {
      dispatch(addSerializedPair({ serializedPair: serializePair(pair) }))
    },
    [dispatch]
  )
}

export function useURLWarningVisible(): boolean {
  return useAppSelector((state: AppState) => state.user.URLWarningVisible)
}

/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export function toV2LiquidityToken([tokenA, tokenB]: [Token, Token]): Token {
  if (tokenA.chainId !== tokenB.chainId) throw new Error('Not matching chain IDs')
  if (tokenA.equals(tokenB)) throw new Error('Tokens cannot be equal')
  if (!V2_FACTORY_ADDRESSES[tokenA.chainId]) throw new Error('No V2 factory address on this chain')

  return new Token(
    tokenA.chainId,
    computePairAddress({ factoryAddress: V2_FACTORY_ADDRESSES[tokenA.chainId], tokenA, tokenB }),
    18,
    'UNI-V2',
    'Uniswap V2'
  )
}

/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
export function useTrackedTokenPairs(): [Token, Token][] {
  const { chainId } = useActiveWeb3React()
  const tokens = useAllTokens()

  // pinned pairs
  const pinnedPairs = useMemo(() => (chainId ? PINNED_PAIRS[chainId] ?? [] : []), [chainId])

  // pairs for every token against every base
  const generatedPairs: [Token, Token][] = useMemo(
    () =>
      chainId
        ? Object.keys(tokens).flatMap((tokenAddress) => {
            const token = tokens[tokenAddress]
            // for each token on the current chain,
            return (
              // loop though all bases on the current chain
              (BASES_TO_TRACK_LIQUIDITY_FOR[chainId] ?? [])
                // to construct pairs of the given token with each base
                .map((base) => {
                  if (base.address === token.address) {
                    return null
                  } else {
                    return [base, token]
                  }
                })
                .filter((p): p is [Token, Token] => p !== null)
            )
          })
        : [],
    [tokens, chainId]
  )

  // pairs saved by users
  const savedSerializedPairs = useAppSelector(({ user: { pairs } }) => pairs)

  const userPairs: [Token, Token][] = useMemo(() => {
    if (!chainId || !savedSerializedPairs) return []
    const forChain = savedSerializedPairs[chainId]
    if (!forChain) return []

    return Object.keys(forChain).map((pairId) => {
      return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)]
    })
  }, [savedSerializedPairs, chainId])

  const combinedList = useMemo(
    () => userPairs.concat(generatedPairs).concat(pinnedPairs),
    [generatedPairs, pinnedPairs, userPairs]
  )

  return useMemo(() => {
    // dedupes pairs of tokens in the combined list
    const keyed = combinedList.reduce<{ [key: string]: [Token, Token] }>((memo, [tokenA, tokenB]) => {
      const sorted = tokenA.sortsBefore(tokenB)
      const key = sorted ? `${tokenA.address}:${tokenB.address}` : `${tokenB.address}:${tokenA.address}`
      if (memo[key]) return memo
      memo[key] = sorted ? [tokenA, tokenB] : [tokenB, tokenA]
      return memo
    }, {})

    return Object.keys(keyed).map((key) => keyed[key])
  }, [combinedList])
}

export function useArbitrumAlphaAlert(): [boolean, (arbitrumAlphaAcknowledged: boolean) => void] {
  const dispatch = useAppDispatch()
  const arbitrumAlphaAcknowledged = useAppSelector(({ user }) => user.arbitrumAlphaAcknowledged)
  const setArbitrumAlphaAcknowledged = (arbitrumAlphaAcknowledged: boolean) => {
    dispatch(updateArbitrumAlphaAcknowledged({ arbitrumAlphaAcknowledged }))
  }

  return [arbitrumAlphaAcknowledged, setArbitrumAlphaAcknowledged]
}

export function useOptimismAlphaAlert(): [boolean, (optimismAlphaAcknowledged: boolean) => void] {
  const dispatch = useAppDispatch()
  const optimismAlphaAcknowledged = useAppSelector(({ user }) => user.optimismAlphaAcknowledged)
  const setOptimismAlphaAcknowledged = (optimismAlphaAcknowledged: boolean) => {
    dispatch(updateOptimismAlphaAcknowledged({ optimismAlphaAcknowledged }))
  }

  return [optimismAlphaAcknowledged, setOptimismAlphaAcknowledged]
}
