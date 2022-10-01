import { Flex, Select, Text } from '@chakra-ui/react'
import millify from 'millify'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Spinner } from '../../../components/Spinner'
import { useGetCryptoHistoryQuery } from '../../../services/crypto-api'
import { LineChart } from './LineChart'
import axios from 'axios'
import { useGetAllCurrencyQuery } from '../../../services/currency-convert-api'

export const TopCryptoData = ({ topCrypto }) => {

    const [currentCurrency, setCurrentCurrency] = useState('USD')
    const [currentPrice, setCurrentPrice] = useState(topCrypto?.data.coins[0].price);
    const [timePeriod, setTimePeriod] = useState('1h');
    const [dateFormat, setDateFormat] = useState('h:mm')
    const [topCryptoHistoryLabel, setTopCryptoHistoryLabel] = useState([])
    const [topCryptoHistoryData, setTopCryptoHistoryData] = useState([])

    const changeDateFormat = (value) => {
        switch (value) {
            case '1h': setDateFormat('h:mm'); break;
            case '12h': setDateFormat('h:mm'); break;
            case '24h': setDateFormat('h:mm'); break;
            case '7d': setDateFormat('YYYY-MM-DD'); break;
            case '30d': setDateFormat('YYYY-MM-DD'); break;
            case '1y': setDateFormat('YYYY-MM-DD'); break;
            case '3y': setDateFormat('YYYY-MM-DD'); break;
            default: setDateFormat('h:mm:ss')
        }
    }

    const { data: topCryptoHistory, isFetching } = useGetCryptoHistoryQuery({ id: topCrypto?.data?.coins[0]?.uuid, timePeriod })
    const { data: currencies } = useGetAllCurrencyQuery();

    console.log(currencies)

    const convertCurrency = async(e) => {
        const params = {
            from: currentCurrency,
            to: e.target.value,
            amount: currentPrice
        }

        const options = {
            method: 'GET',
            url: 'https://currency-converter18.p.rapidapi.com/api/v1/convert',
            params,
            headers: {
                'X-RapidAPI-Key': '1e4a5a653fmshbeb1f1704b32db8p105c5bjsn8c26bef97e7e',
                'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
            }
        }

        await axios.request(options)
        .then((res) => {
            setCurrentPrice(res.data.result.convertedAmount)
            setCurrentCurrency(e.target.value)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        const fetchHistory = () => {
            const label = topCryptoHistory?.data?.history?.slice().reverse().map((data) => {
                return moment(data.timestamp * 1000).format(dateFormat)
            })
            const data = topCryptoHistory?.data?.history?.map((data) => {
                return data.price
            })

            setTopCryptoHistoryData(data)
            setTopCryptoHistoryLabel(label)
        }

        fetchHistory();
    }, [ dateFormat, topCrypto.data.coins, topCryptoHistory?.data?.history])

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
                        {`${millify(currentPrice, { precision: 3 })} ${currentCurrency}`}
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
                        onChange={convertCurrency}
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
                            changeDateFormat(e.target.value)
                            setTimePeriod(e.target.value)
                        }}
                    >
                        <option value='1h'> 1h </option>
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
                    <LineChart topCryptoHistoryLabel={topCryptoHistoryLabel} topCryptoHistoryData={topCryptoHistoryData} />
                )}
            </Flex>
        </>
    )
}
