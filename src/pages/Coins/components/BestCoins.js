import { Flex, Text } from '@chakra-ui/react'
import millify from 'millify'
import React from 'react'
import { Link } from 'react-router-dom'

import { useGetCryptoQuery, useGetGlobalStatsQuery } from '../../../services/crypto-api'

export const BestCoins = () => {

    const { data: coins } = useGetGlobalStatsQuery();
    const { data: bestCoin1 } = useGetCryptoQuery({ id: coins?.data?.bestCoins[0]?.uuid })
    const { data: bestCoin2 } = useGetCryptoQuery({ id: coins?.data?.bestCoins[1]?.uuid })
    const { data: bestCoin3 } = useGetCryptoQuery({ id: coins?.data?.bestCoins[2]?.uuid })

    const bestCoins = [
        bestCoin1,
        bestCoin2,
        bestCoin3
    ]
    return (
        <Flex
            flex={1}
            h='18rem'
            backgroundPosition='center'
            // backgroundImage={
            //     `linear-gradient(to bottom, rgba(0, 0, 0, .96), rgba(16, 16, 16, .96)),
            //     url(${bestCrypto})`
            // }
            bg='#101010'
            borderRadius='.3rem'
            p='1.5rem'
            flexDir='column'
        >
            <Text
                fontSize='1.2rem'
                fontWeight='bold'
                color='palette.accent'
            >
                Best Crypto
            </Text>
            <Flex
                h='100%'
                w='100%'
                gap='1rem'
                paddingBlock='1rem'
            >
                {bestCoins?.map((coin, index) => {
                    return (
                        <Link
                            key={index}
                            to={`/crypto-details/${coin?.data?.coin?.uuid}`}
                            style={{
                                width: '100%'
                            }}
                        >
                            <Flex
                                key={index}
                                h='100%'
                                flex={1}
                                flexDir='column'
                                borderRadius='.3rem'
                                backgroundSize='cover'
                                backgroundRepeat='no-repeat'
                                backgroundPosition='center'
                                justifyContent='space-around'
                                p='1rem'
                                borderBottom='1px groove'
                                borderColor={coin?.data?.coin?.color}
                                backgroundImage={
                                    `linear-gradient(to bottom, rgba(0, 0, 0, .99), rgba(16, 16, 16, .96)),
                                url(${coin?.data?.coin?.iconUrl})`
                                }
                            >
                                <Text
                                    fontSize='.9rem'
                                    fontWeight='semibold'
                                >
                                    {`${coin?.data?.coin?.name} | `}
                                    <Text
                                        as='span'
                                        marginLeft='.5rem'
                                        color='#282828'
                                    >
                                        {coin?.data?.coin?.symbol}
                                    </Text>
                                </Text>

                                <Flex
                                    flexDir='column'
                                    gap='.5rem'
                                >
                                    <Text
                                        fontSize='.6rem'
                                    >
                                        Price:
                                        <Text
                                            as='span'
                                            marginLeft='.5rem'
                                            color='palette.accent'
                                        >
                                            {millify(coin?.data?.coin?.price, { precision: 2 })}
                                        </Text>
                                    </Text>
                                    <Text
                                        fontSize='.6rem'
                                    >
                                        Market Cap:
                                        <Text
                                            as='span'
                                            marginLeft='.5rem'
                                            color='palette.accent'
                                        >
                                            {millify(coin?.data?.coin?.marketCap, { precision: 2 })}
                                        </Text>
                                    </Text>
                                    <Text
                                        fontSize='.6rem'
                                    >
                                        Daily Change:
                                        <Text
                                            as='span'
                                            marginLeft='.5rem'
                                            color='palette.accent'
                                        >
                                            {`${millify(coin?.data?.coin?.change, { precision: 2 })}% `}
                                        </Text>
                                    </Text>
                                </Flex>
                            </Flex>
                        </Link>
                    )
                })}
            </Flex>
        </Flex>
    )
}
