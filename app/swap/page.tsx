"use client"

import useBalance from "@/hooks/useBalance"
import { useEffect } from "react"
import { Token, ChainId, TradeType, Currency, CurrencyAmount } from '@uniswap/sdk-core'
import { FeeAmount } from '@uniswap/v3-sdk'
import { parseUnits } from "viem"
import JSBI from 'jsbi'

const Swap = () => {
    const balances = useBalance()
    useEffect(() => {
        const init = () => {
            console.log('ziad', balances)

            // Currencies and Tokens
            const WETH_TOKEN = new Token(
                ChainId.BASE,
                '0x4200000000000000000000000000000000000006',
                18,
                'WETH',
                'Wrapped Ether',
            )

            const USDC_TOKEN = new Token(
                ChainId.BASE,
                '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
                6,
                'USDC',
                'USD//C'
            )

            const tokens =  {
                in: WETH_TOKEN,
                amountOut: 1,
                out: USDC_TOKEN,
                poolFee: FeeAmount.MEDIUM,
            }
            const type = TradeType.EXACT_OUTPUT
            const amount = "1"
            const currencyIn = WETH_TOKEN
            const currenyOut = USDC_TOKEN

            const typedValueParsed = parseUnits(amount, currenyOut.decimals).toString()
            const parsedAmount =  CurrencyAmount.fromRawAmount(currenyOut, typedValueParsed)

            console.log('ziad', parsedAmount)
            console.log('ziad check wrapped', currencyIn.isNative)
        }
        init()
    }, [balances])

    return (
        <div className="grow flex justify-center items-center">
            <button className="bg-black font-archivo text-white p-2 rounded-md">Swap</button>
        </div>
    )
}

export default Swap