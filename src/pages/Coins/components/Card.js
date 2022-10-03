import { Flex, GridItem, Text } from '@chakra-ui/react'
import millify from 'millify'
import React from 'react'
import { Link } from 'react-router-dom'
import { LineChart } from './LineChart'

export const Card = ({ crypto, index }) => {
    return (
        <Link
            key={index}
            to={`/crypto-details/${crypto.uuid}`}
        >
            <GridItem
                colSpan={1}
            >
                <Flex
                    backgroundImage={
                        `linear-gradient(to bottom, rgba(0, 0, 0, .99), rgba(16, 16, 16, .96)),
                        url(${crypto.iconUrl})`
                    }
                    backgroundSize='cover'
                    backgroundRepeat='no-repeat'
                    backgroundPosition='center'
                    flexDir='column'
                    justifyContent='center'
                    alignItems='start'
                    p='1.5rem'
                    borderRadius='.3rem'
                    gap='1.3rem'
                    transition='all .3s ease'
                    pos='relative'
                    borderBottom='1px groove'
                    borderColor={crypto.color}
                    cursor='pointer'
                >
                    <Text
                        fontSize='1.1rem'
                        fontWeight='semibold'
                    >
                        {`${crypto.rank}. ${crypto.name} | `}
                        <Text
                            as='span'
                            marginLeft='.5rem'
                            color='#282828'
                        >
                            {crypto.symbol}
                        </Text>
                    </Text>

                    <Flex
                        flexDir='column'
                        gap='.5rem'
                    >
                        <Text
                            fontSize='.8rem'
                        >
                            Price:
                            <Text
                                as='span'
                                marginLeft='.5rem'
                                color='palette.accent'
                            >
                                {millify(crypto.price, { precision: 2 })}
                            </Text>
                        </Text>
                        <Text
                            fontSize='.8rem'
                        >
                            Market Cap:
                            <Text
                                as='span'
                                marginLeft='.5rem'
                                color='palette.accent'
                            >
                                {millify(crypto.marketCap, { precision: 2 })}
                            </Text>
                        </Text>
                        <Text
                            fontSize='.8rem'
                        >
                            Daily Change:
                            <Text
                                as='span'
                                marginLeft='.5rem'
                                color='palette.accent'
                            >
                                {`${millify(crypto.change, { precision: 2 })}% `}
                            </Text>
                        </Text>
                    </Flex>

                    <Flex
                        w='100%'
                    >
                        <LineChart data={crypto.sparkline} />
                    </Flex>
                </Flex>
            </GridItem>
        </Link>
    )
}
