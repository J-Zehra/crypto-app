import { Flex, GridItem, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Spinner } from '../../../components/Spinner'

import ArrowUp from '../../../assets/arrowup.png'
import { useGetTopCryptoQuery } from '../../../services/crypto-api'
import { TopCryptoData } from './TopCryptoData'

export const TopCrypto = () => {

    const { data: topCrypto, isLoading } = useGetTopCryptoQuery();

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
                    <Image src={ArrowUp}/>
                </Flex>
                <Link to='/coins'>
                    <Text
                        fontWeight='normal'
                        fontSize='.8rem'
                        color='palette.accent'
                    >
                        See all cryptocurrencies
                    </Text>
                </Link>
            </Flex>

            {isLoading ? <Spinner/> : <TopCryptoData topCrypto={topCrypto}/>}

        </GridItem>
    )
}
