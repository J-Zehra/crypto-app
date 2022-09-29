import { Box, Flex, GridItem, Image, Text } from '@chakra-ui/react'
import moment from 'moment/moment';
import React from 'react'
import { useGetCryptoNewsQuery } from '../../../services/crypto-news-api';
import DefaultThumbnail from '../../../assets/default.png'
import { Link } from 'react-router-dom';

export const LatestNews = () => {

    const { data: cryptoNews } = useGetCryptoNewsQuery({ search: 'Cryptocurrency', count: 10 });

    return (
        <GridItem
            bg='#101010'
            colSpan={2}
            rowSpan={4}
            borderRadius='.3rem'
            p='3rem'
            display='flex'
            flexDir='column'
            gap='2.5rem'
        >
            <Flex
                w='100%'
                justifyContent='space-between'
                alignItems='center'
            >
                <Text
                    fontWeight='semibold'
                    fontSize='1.3rem'
                >
                    Latest News
                </Text>
                <Link to='/news'>
                    <Text
                        fontWeight='normal'
                        fontSize='.8rem'
                        color='palette.accent'
                    >
                        See more
                    </Text>
                </Link>
            </Flex>

            <Flex
                flexDir='column'
                gap='1rem'
                h='100%'
                overflowY='scroll'
            >
                {/* ITEM */}
                {cryptoNews?.value?.map((news, index) => {
                    return (
                        <Flex
                            key={index}
                            bg='#131313'
                            w='100%'
                            h='5rem'
                            borderRadius='.3rem'
                            p='.5rem'
                            gap='1rem'
                            alignItems='center'
                            justifyContent='center'
                            cursor='pointer'
                            as='a'
                            href={news.url}
                            target='_blank'
                        >
                            <Image
                                src={news.image?.thumbnail?.contentUrl || DefaultThumbnail}
                                borderRadius='.4rem'
                                w='4rem'
                                h='100%'
                            />
                            <Flex
                                w='100%'
                                h='100%'
                                flexDir='column'
                                justifyContent='center'
                                gap='.5rem'
                            >
                                <Text
                                    fontSize='.8rem'
                                    fontWeight='semibold'
                                >
                                    {news.name}
                                </Text>

                                <Flex
                                    gap='1.2rem'
                                >
                                    <Image
                                        w='1rem'
                                        src={news.provider[0]?.image?.thumbnail?.contentUrl || DefaultThumbnail}
                                    />
                                    <Text
                                        fontSize='.6rem'
                                        color='palette.accent'
                                        fontWeight='normal'
                                    >
                                        {moment(news.datePublished).startOf('ss').fromNow()}
                                    </Text>
                                </Flex>

                            </Flex>
                        </Flex>
                    )
                })}

            </Flex>
        </GridItem>
    )
}
