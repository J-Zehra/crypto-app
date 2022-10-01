import { Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetCryptoHistoryQuery, useGetCryptoQuery } from '../../services/crypto-api'
import { CryptoDetailsChart } from './components/CryptoDetailsChart'
import { DetailsCard } from './components/DetailsCard'

export const CryptoDetails = () => {

    const [cryptoHistoryDetails, setCryptoHistoryDetails] = useState([])
    const [cryptoDetails, setCryptoDetails] = useState([])
    const { id } = useParams()
    const { data: crypto } = useGetCryptoQuery({ id })
    const { data: cryptoHistory } = useGetCryptoHistoryQuery({ id })

    console.log(cryptoHistory)

    useEffect(() => {
        setCryptoDetails(crypto?.data?.coin)
        setCryptoHistoryDetails(cryptoHistory?.data?.history)

    }, [crypto?.data?.coin, cryptoHistory?.data?.history] )

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
                { cryptoDetails?.name } |
                <Text
                    as='span'
                    color='palette.accent'
                    marginLeft='.5rem'
                >
                    { cryptoDetails?.symbol }
                </Text>
            </Text>
            <Flex
                w='100%'
                justifyContent='center'
                alignItems='center'
                gap='1.2rem'
            >
                <Flex
                    flex={3}
                >
                    <CryptoDetailsChart cryptoHistoryDetails={cryptoHistoryDetails}/>
                </Flex>
                <Flex
                    flex={1}
                >
                    <DetailsCard cryptoDetails={cryptoDetails}/>
                </Flex>
            </Flex>
        </Flex>
    )
}
