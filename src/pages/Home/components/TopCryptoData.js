import { Flex, Select, Text } from '@chakra-ui/react'
import millify from 'millify'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Spinner } from '../../../components/Spinner'
import { useGetCryptoHistoryQuery } from '../../../services/crypto-api'
import { LineChart } from './LineChart'

export const TopCryptoData = ({ topCrypto }) => {

    const [timePeriod, setTimePeriod] = useState('1h');
    const [dateFormat, setDateFormat] = useState('h:mm')
    const [topCryptoHistoryLabel, setTopCryptoHistoryLabel] = useState([])
    const [topCryptoHistoryData, setTopCryptoHistoryData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    
    const changeDateFormat = () => {
        switch(timePeriod){
            case '1h': setDateFormat('h:mm'); break;
            case '12h': setDateFormat('h:mm'); break;
            case '24': setDateFormat('h:mm'); break;
            case '7d': setDateFormat('YYYY-MM-DD'); break;
            case '30d': setDateFormat('YYYY-MM-DD'); break;
            case '1y': setDateFormat('YYYY-MM-DD'); break;
            case '3y': setDateFormat('YYYY-MM-DD'); break;
            default: setDateFormat('h:mm:ss')
        }
    }
    
    const { data: topCryptoHistory } = useGetCryptoHistoryQuery({ id: topCrypto?.data?.coins[0]?.uuid, timePeriod })
    
    useEffect(() => {
        const fetchHistory = async() => {
            const label = await topCryptoHistory?.data?.history?.slice().reverse().map((data) => {
                return moment(data.timestamp * 1000).format(dateFormat)
            })
            const data = await topCryptoHistory?.data?.history?.map((data) => {
                setIsLoading(false)
                return data.price
            })

            setTopCryptoHistoryData(data)
            setTopCryptoHistoryLabel(label)
        }

        fetchHistory();
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
                        {millify(topCrypto?.data?.coins[0].price, {
                            precision: 3
                        })}
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
                <Select
                    w='5rem'
                    fontSize='.8rem'
                    onChange={(e) => {
                        setIsLoading(true)
                        setTimePeriod(e.target.value)
                        changeDateFormat()
                    }}
                >
                    <option> 1h </option>
                    <option> 12h </option>
                    <option> 24h </option>
                    <option> 7d </option>
                    <option> 30d </option>
                    <option> 1y </option>
                    <option> 3y </option>
                </Select>
            </Flex>
            <Flex
                w='100%'
                h='100%'
            >
                {  isLoading ? <Spinner/> : (
                    <LineChart topCryptoHistoryLabel={topCryptoHistoryLabel} topCryptoHistoryData={topCryptoHistoryData}/>
                ) }
            </Flex>
        </>
    )
}
