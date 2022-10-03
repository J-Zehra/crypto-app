import { Flex, Select, Text } from '@chakra-ui/react'
import millify from 'millify'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { Spinner } from '../../../components/Spinner'
import { useGetCryptoHistoryQuery } from '../../../services/crypto-api'
import { LineChart } from './LineChart'
import { useGetAllCurrencyQuery } from '../../../services/currency-convert-api'
import { changeDateFormat } from '../../../miscellaneous/dateFormats'


export const TopCryptoData = ({ topCrypto }) => {

    const [timePeriod, setTimePeriod] = useState('1h')
    const [dateFormat, setDateFormat] = useState('hh:mm')

    const { data: topCryptoHistory, isFetching } = useGetCryptoHistoryQuery({ id: topCrypto?.data?.coins[0]?.uuid, timePeriod })
    const { data: currencies } = useGetAllCurrencyQuery();

    const { label, data } = useMemo(() => {
        const label = topCryptoHistory?.data?.history?.slice().reverse().map((data) => {
            return moment.unix(data.timestamp).format(dateFormat)
        });

        const data = topCryptoHistory?.data?.history?.map((data) => {
            return data.price
        })

        return { label, data }
    }, [dateFormat, topCryptoHistory?.data?.history])

    return (
        <>
            <Flex
                w='100%'
                alignItems='center'
                justifyContent='space-between'
            >
                <Text
                    fontWeight='semibold'
                    fontSize='.8rem'
                >
                    Current Price:
                    <Text
                        as='span'
                        marginLeft='.2rem'
                        color='palette.accent'
                    >
                        {millify(topCrypto?.data?.coins[0]?.price, { precision: 3 })}
                    </Text>
                </Text>
                <Text
                    fontWeight='bold'
                    textAlign='center'
                >
                    {`${topCrypto?.data?.coins[0]?.name} | `}
                    <Text
                        as='span'
                        marginLeft='.2rem'
                        color='palette.accent'
                    >
                        {topCrypto?.data?.coins[0]?.symbol}
                    </Text>
                </Text>
                <Flex
                    justifyContent='center'
                    alignItems='center'
                    gap='1rem'
                >
                    <Select
                        w='5rem'
                        fontSize='.8rem'
                        h='2rem'

                    >
                        {currencies?.map((symbol, index) => {
                            return (
                                <option
                                    key={index}
                                    value={symbol.symbol}
                                >
                                    {symbol.symbol}
                                </option>
                            )
                        })}
                    </Select>
                    <Select
                        w='5rem'
                        fontSize='.8rem'
                        h='2rem'
                        onChange={(e) => {
                            setTimePeriod(e.target.value)
                            setDateFormat(changeDateFormat(e.target.value))
                        }}
                    >
                        <option value='1h'> 1h </option>
                        <option value='3h'> 3h </option>
                        <option value='12h'> 12h </option>
                        <option value='24h'> 24h </option>
                        <option value='7d'> 7d </option>
                        <option value='30d'> 30d </option>
                        <option value='1y'> 1y </option>
                        <option value='3y'> 3y </option>
                    </Select>

                </Flex>
            </Flex>
            <Flex
                w='100%'
                h='100%'
            >
                {isFetching ? <Spinner /> : (
                    <LineChart topCryptoHistoryLabel={label} topCryptoHistoryData={data} />
                )}
            </Flex>
        </>
    )
}
