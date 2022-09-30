import { Flex, Select, Text } from '@chakra-ui/react'
import millify from 'millify'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Spinner } from '../../../components/Spinner'
import { useGetCryptoHistoryQuery } from '../../../services/crypto-api'
import { LineChart } from './LineChart'

export const TopCryptoData = ({ topCrypto }) => {

    const [currentPrice, setCurrentPrice] = useState();
    const [timePeriod, setTimePeriod] = useState('1h');
    const [dateFormat, setDateFormat] = useState('h:mm')
    const [topCryptoHistoryLabel, setTopCryptoHistoryLabel] = useState([])
    const [topCryptoHistoryData, setTopCryptoHistoryData] = useState([])
    
    const changeDateFormat = (value) => {
        switch(value){
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

    useEffect(() => {
        setCurrentPrice(millify(topCrypto?.data.coins[0].price, {
            precision: 3
        }))

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
    }, [dateFormat, topCrypto?.data.coins, topCryptoHistory?.data?.history])

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
                        {currentPrice}
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
                        onChange={e => {
                            
                        }}
                    >
                        <option value='USD'> USD </option>
                        <option value='PHP'> PHP </option>
                        <option value='EUR'> EUR </option>
                        <option value='JPY'> JPY </option>
                        <option value='AUD'> AUD </option>
                        <option value='CAD'> CAD </option>
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
                {  isFetching ? <Spinner/> : (
                    <LineChart topCryptoHistoryLabel={topCryptoHistoryLabel} topCryptoHistoryData={topCryptoHistoryData}/>
                ) }
            </Flex>
        </>
    )
}
