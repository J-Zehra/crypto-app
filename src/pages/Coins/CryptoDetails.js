import { Flex, Link, Select, Text } from '@chakra-ui/react'
import moment from 'moment'
import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { changeDateFormat } from '../../miscellaneous/dateFormats'
import { useGetCryptoHistoryQuery, useGetCryptoQuery } from '../../services/crypto-api'
import { CryptoDetailsChart } from './components/CryptoDetailsChart'
import { DetailsCard } from './components/DetailsCard'
import { Spinner } from '../../components/Spinner'
import millify from 'millify'
import parse from 'html-react-parser'

export const CryptoDetails = () => {

    const { id } = useParams();
    const [timePeriod, setTimePeriod] = useState('1h')
    const [dateFormat, setDateFormat] = useState('hh:mm')

    const { data: cryptoDetails } = useGetCryptoQuery({ id })
    const { data: cryptoHistory, isFetching } = useGetCryptoHistoryQuery({ id, timePeriod })

    const { label, data } = useMemo(() => {
        const label = cryptoHistory?.data?.history?.slice().reverse().map((data) => {
            return moment.unix(data.timestamp).format(dateFormat)
        });

        const data = cryptoHistory?.data?.history?.map((data) => {
            return data.price
        })

        return { label, data }
    }, [dateFormat, cryptoHistory?.data?.history])

    console.log(cryptoDetails)

    return (
        <Flex
            w={{
                base: '95%',
                sm: '90%',
                lg: '85%',
                xl: '80%',
                '2xl': '75%',
            }}
            paddingBlock='10rem'
            margin='auto'
            flexDir='column'
            gap='5rem'
        >
            <Text
                textAlign='center'
                fontWeight='bold'
                fontSize='1.6rem'
                pos='relative'

                _before={{
                    content: '""',
                    w: '5rem',
                    h: '.2rem',
                    top: '-.5rem',
                    borderRadius: '10%',
                    bg: 'palette.accent',
                    pos: 'absolute'
                }}
            >
                {cryptoDetails?.data?.coin?.name} |
                <Text
                    as='span'
                    color='palette.accent'
                    marginLeft='.5rem'
                >
                    {cryptoDetails?.data?.coin?.symbol}
                </Text>
            </Text>
            <Flex
                w='100%'
                justifyContent='center'
                alignItems='start'
                gap='1.2rem'
            >
                <Flex
                    flex={3}
                    flexDir='column'
                >
                    <Flex
                        w='100%'
                        justifyContent='space-between'
                        alignItems='center'
                        padding='.8rem'
                    >
                        <Flex
                            gap='1rem'
                        >
                            <Text
                                fontSize='.8rem'
                            >
                                Current Price:
                                <Text
                                    as='span'
                                    marginLeft='.2rem'
                                    color='palette.accent'
                                >
                                    {millify(cryptoDetails?.data?.coin?.price, { precision: 2 })}
                                </Text>
                            </Text>
                            <Text
                                fontSize='.8rem'
                            >
                                Change:
                                <Text
                                    as='span'
                                    marginLeft='.2rem'
                                    color='palette.accent'
                                >
                                    {`${millify(cryptoHistory?.data?.change, { precision: 2 })}%`}
                                </Text>
                            </Text>
                        </Flex>

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
                            <option value='12h'> 12h </option>
                            <option value='24h'> 24h </option>
                            <option value='7d'> 7d </option>
                            <option value='30d'> 30d </option>
                            <option value='1y'> 1y </option>
                            <option value='3y'> 3y </option>
                        </Select>

                    </Flex>
                    {isFetching ? <Spinner /> : (
                        <CryptoDetailsChart label={label} price={data} />
                    )}
                </Flex>
                <Flex
                    flex={1}
                    alignSelf='center'
                >
                    <DetailsCard cryptoDetails={cryptoDetails?.data?.coin} />
                </Flex>
            </Flex>
            <Flex
                flexDir='column'
            >
                <Text
                    fontSize='2.5rem'
                    fontWeight='bold'
                    paddingBlockEnd='.5rem'
                >
                    What is
                    <Text
                        as='span'
                        marginLeft='.5rem'
                        color='palette.accent'
                    >
                        {cryptoDetails?.data?.coin?.name} ?
                    </Text>

                </Text>
                <Text>
                    {parse(`${cryptoDetails?.data?.coin?.description}`)}
                </Text>
                <Flex
                    flexDir='column'
                    paddingBlock='2rem'
                >
                    <Text
                        color='palette.accent'
                        fontSize='2rem'
                        fontWeight='bold'
                    >
                        {cryptoDetails?.data?.coin?.name}
                        <Text
                            color='palette.secondary'
                            as='span'
                            marginLeft='.5rem'
                        >
                            Links
                        </Text>

                    </Text>
                    <Flex
                        flexDir='column'
                        gap='1rem'
                        marginTop='1rem'
                    >
                        { cryptoDetails?.data?.coin?.links?.map((item, index) => {
                            return(
                                <Flex
                                    justifyContent='space-between'
                                    alignItems='center'
                                >
                                    <Text>
                                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                    </Text>
                                    <Link 
                                        href={item.url}
                                        target='_blank'
                                        color='palette.accent'
                                    >
                                        {item.name}
                                    </Link>
                                </Flex>
                            )
                        }) }
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
