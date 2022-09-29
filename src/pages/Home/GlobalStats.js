import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import React from 'react'

import TotalCoinsImage from '../../assets/totalcoins.png'
import TotalMarketImage from '../../assets/totalmarket.png'
import TotalExchangeImage from '../../assets/totalexchange.png'
import { LatestNews } from './components/LatestNews'
import { Totals } from './components/Totals'
import { useGetCryptosQuery } from '../../services/crypto-api'
import { TopCrypto } from './components/TopCrypto'

export const GlobalStats = () => {

    const { data: cryptos } = useGetCryptosQuery();
    
    const stats = [
        { title: 'Total Coins', icon: TotalCoinsImage, data: cryptos?.data?.stats?.totalCoins },
        { title: 'Total Markets', icon: TotalMarketImage,  data: cryptos?.data?.stats?.totalMarkets },
        { title: 'Total Exchange', icon: TotalExchangeImage,  data: cryptos?.data?.stats?.totalExchanges },
    ]

    return (
        <Box
            w='100%'
            h='100vh'
        >
            <Flex
                w={{
                    base: '95%',
                    sm: '90%',
                    lg: '85%',
                    xl: '80%',
                    '2xl': '75%',
                }}
                margin='auto'
                paddingBlock='10rem'
                justifyContent='center'
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
                    Global Stats
                </Text>
                <Grid
                    h='50rem'
                    templateRows='repeat(4, 1fr)'
                    templateColumns='repeat(5, 1fr)'
                    gap={6}
                >
                    {stats.map((stat, index) => {
                        return (
                            <Totals
                                index={index}
                                stat={stat}
                            />
                        )
                    })}

                    {/* NEWS */}
                    <LatestNews/>

                    {/* TOP CRYPTO */}
                    <TopCrypto/>
                </Grid>
            </Flex>
        </Box>
    )
}
