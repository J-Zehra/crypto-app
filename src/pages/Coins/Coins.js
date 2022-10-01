import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import millify from 'millify';
import React, { useEffect, useRef, useState } from 'react'
import { LineChart } from './components/LineChart'

import { useGetCryptosQuery } from '../../services/crypto-api'
import { Link } from 'react-router-dom';

export const Coins = ({ setActive }) => {

  const [cryptoData, setCryptoData] = useState([])
  const ref = useRef(null);
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      setActive(1)
    }
  }, [isInView, setActive])

  const { data: cryptos } = useGetCryptosQuery();

  console.log(cryptos)

  useEffect(() => {
    setCryptoData(cryptos?.data?.coins)
  }, [cryptos?.data?.coins])

  return (
    <Box
      ref={ref}
    >
      <Flex
        w={{
          base: '95%',
          sm: '90%',
          lg: '85%',
          xl: '80%',
          '2xl': '75%',
        }}
        alignItems='center'
        justifyContent='center'
        paddingBlock='10rem'
        margin='auto'
        flexDir='column'
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
          Explore your
          <Text
            as='span'
            color='palette.accent'
            marginLeft='.5rem'
          >
            Crypto!
          </Text>
        </Text>

        <Grid
          templateColumns='repeat(4, 1fr)'
          w='100%'
          gap='1.5rem'
          marginTop='6rem'
        >
          {cryptoData?.map((crypto, index) => {
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
          })}
        </Grid>
      </Flex>
    </Box>
  )
}
