import { Flex, GridItem, Image, Skeleton, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Spinner } from '../../../components/Spinner'

import ArrowUp from '../../../assets/arrowup.png'
import { useGetTopCryptoQuery } from '../../../services/crypto-api'
import { TopCryptoData } from './TopCryptoData'

export const TopCrypto = () => {

    const { data: topCrypto, isFetching } = useGetTopCryptoQuery();

    return (
        <GridItem
            bg='#101010'
            colSpan={3}
            rowSpan={3}
            borderRadius='.3rem'
            p='1.5rem'
            gap='2rem'
            display='flex'
            flexDir='column'
        >
            <Flex
                w='100%'
                justifyContent='space-between'
                as='span'
                alignItems='center'
            >
                <Flex
                    justifyContent='center'
                    alignItems='center'
                >
                    <Text
                        fontWeight='semibold'
                        fontSize='1.3rem'
                    >
                        Top Cryptocurrency
                    </Text>
                    <Image src={ArrowUp} />
                </Flex>
                <Link to='/coins'>
                    <Text
                        fontWeight='normal'
                        fontSize='.8rem'
                        color='palette.accent'
                        pos='relative'

                        _before={{
                            content: '""',
                            pos: 'absolute',
                            bg: 'palette.accent',
                            bottom: '-.5rem',
                            right: 0,
                            w: '5rem',
                            h: '.01rem'
                        }}
                    >
                        See all cryptocurrencies
                    </Text>
                </Link>
            </Flex>

            {/* {isFetching ? <Spinner /> : <TopCryptoData topCrypto={topCrypto} />} */}
            <Skeleton
                h='100%'
                isLoaded={!isFetching}
                borderRadius='.5rem'
                startColor='#151515'
                endColor='#202020'
                fadeDuration={1}
            >
                <TopCryptoData topCrypto={topCrypto} />
            </Skeleton>

        </GridItem>
    )
}
