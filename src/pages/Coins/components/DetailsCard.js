import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

import { GiRank1 } from 'react-icons/gi'
import { RiExchangeDollarLine } from 'react-icons/ri'
import { BsFillSunFill } from 'react-icons/bs'
import { GiPriceTag } from 'react-icons/gi'
import { AiOutlineVerticalAlignTop } from 'react-icons/ai'
import { MdHouseSiding } from 'react-icons/md'
import { TbExchange } from 'react-icons/tb'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import millify from 'millify'

export const DetailsCard = ({ cryptoDetails }) => {

    const statistics = [
        {
            label: 'Rank',
            icon: <GiRank1 />,
            value: cryptoDetails?.rank
        },
        {
            label: 'Price to USD',
            icon: <RiExchangeDollarLine />,
            value: cryptoDetails?.price
        },
        {
            label: '24h Volume',
            icon: <BsFillSunFill />,
            value: cryptoDetails?.price
        },
        {
            label: 'Market Cap',
            icon: <GiPriceTag />,
            value: cryptoDetails?.marketCap
        },
        {
            label: 'All Time High',
            icon: <AiOutlineVerticalAlignTop />,
            value: cryptoDetails?.allTimeHigh?.price
        },
        {
            label: 'No. Of Markets',
            icon: <MdHouseSiding />,
            value: cryptoDetails?.numberOfMarkets
        },
        {
            label: 'No. Of Exchanges',
            icon: <TbExchange />,
            value: cryptoDetails?.numberOfExchanges
        },
        {
            label: 'Approved Supply',
            icon: <AiOutlineExclamationCircle />,
            value: 'Yes'
        },
        {
            label: 'Total Supply',
            icon: <AiOutlineExclamationCircle />,
            value: cryptoDetails?.supply?.total
        },
        {
            label: 'Circulating Supply',
            icon: <AiOutlineExclamationCircle />,
            value: cryptoDetails?.supply?.circulating
        },
    ]

    return (
        <Flex
            w='100%'
            h='100%'
            justifyContent='center'
            alignItems='center'
            bg='#101010'
            p='1.2rem'
            flexDir='column'
            gap='3rem'
        >
            <Text
                textAlign='center'
                fontWeight='semibold'
                color='palette.accent'
                fontSize='1.1rem'
                borderRadius='.3rem'
            >
                {cryptoDetails?.name}
                <Text
                    as='span'
                    color='palette.secondary'
                    marginLeft='.5rem'
                >
                    Statistics
                </Text>
            </Text>
            <Flex
                flexDir='column'
                w='100%'
                justifyContent='center'
                alignItems='center'
            >

                {statistics.map((data, index) => {
                    return (
                        <Flex
                            key={index}
                            w='100%'
                            paddingBlock='.6rem'
                            justifyContent='space-between'
                            alignItems='center'
                        >
                            <Flex
                                justifyContent='center'
                                alignItems='center'
                                gap='1rem'
                            >
                                <Box
                                    fontSize='.9rem'
                                >
                                    {data.icon}
                                </Box>
                                <Text
                                    fontSize='.7rem'
                                >
                                    {data.label}
                                </Text>
                            </Flex>
                            <Box
                                color='palette.accent'
                                fontWeight='bold'
                                fontSize='.7rem'
                            >
                                {millify(data.value, { precision: 2 })}
                            </Box>
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}
