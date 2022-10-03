import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { useGetCryptosQuery } from '../../services/crypto-api'
import { Card } from './components/Card';
import loadMoreJson from '../../assets/loadMore.json'
import Lottie from 'react-lottie-player';
import { NewestCoins } from './components/NewestCoins';
import { BestCoins } from './components/BestCoins';

export const Coins = ({ setActive }) => {

  const [loadMore, setLoadMore] = useState(false);
  const { data: cryptos } = useGetCryptosQuery();

  const { cryptoItems, moreCryptoItems } = useMemo(() => {
    const cryptoItems = []
    const moreCryptoItems = []

    cryptos?.data?.coins.forEach((item, index) => {
      if (index >= 0 && index <= 49) {
        cryptoItems.push(item)
      } else if (index >= 50 && index <= 99) {
        moreCryptoItems.push(item)
      } else;
    });

    return { cryptoItems, moreCryptoItems }
  }, [cryptos?.data?.coins])

  const ref = useRef(null);
  const isInView = useInView(ref)

  useEffect(() => {
    if (isInView) {
      setActive(1)
    }
  }, [isInView, setActive])



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
        pos='relative'
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

        <Flex
          w='100%'
          justifyContent='space-between'
          gap='2.5rem'
          marginTop='5rem'
        >
          <NewestCoins />
          <BestCoins />
        </Flex>

        <Flex
          flexDir='column'
          w='100%'
          marginTop='6rem'
        >
          <Text
            fontSize='1.5rem'
            fontWeight='bold'
            paddingBlockEnd='5rem'
            textAlign='center'
          >
            All
            <Text
              as='span'
              marginLeft='.6rem'
              color='palette.accent'
            >
              Cryptocurrencies
            </Text>
          </Text>
          <Grid
            templateColumns='repeat(4, 1fr)'
            w='100%'
            gap='1.5rem'
          >
            {cryptoItems?.map((crypto, index) => {
              return (
                <Card crypto={crypto} key={index} />
              )
            })}
            {loadMore &&
              moreCryptoItems?.map((crypto, index) => {
                return (
                  <Card crypto={crypto} key={index} />
                )
              })}

            <Flex
              borderRadius='.3'
              justifyContent='center'
              alignItems='center'
              bg='#101010'
              w='100%'
              p='2rem'
              pos='relative'
              cursor='pointer'
              onClick={() => {
                setLoadMore(!loadMore)
              }}
            >
              <Lottie
                loop
                animationData={loadMoreJson}
                play
              //style={{ width: 150, height: 150 }}
              />
              <Text
                pos='absolute'
                fontWeight='semibold'
                color='#808080'
              >
                {loadMore ? 'See less...' : 'See more...'}
              </Text>
            </Flex>
          </Grid>
        </Flex>
      </Flex>
    </Box>
  )
}
