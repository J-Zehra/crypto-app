import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

import { BsArrowBarRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import BackgroundImage from '../../assets/bg-image.png'

export const Home = () => {

    return (
        <Box
            h='100vh'
            bgImage={BackgroundImage}
            bgPos='top'
            bgRepeat='no-repeat'
            bgSize='cover'
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
                h='100%'
                alignItems='center'
                justifyContent='start'
            >
                <Flex
                    w='50%'
                    flexDir='column'
                    gap='1.2rem'
                >
                    <Text
                        as='h1'
                    >
                        The Home of
                        <Text
                            as='h1'
                            bg='linear-gradient(#0F7E50, #75C7A4)'
                            backgroundClip='text'
                        >
                            Cryptocurrencies.
                        </Text>
                    </Text>
                    <Text
                        fontSize='1.2rem'
                    >
                        See latest news and updates about crypto.
                    </Text>
                    <Link to='/news'>
                        <Button
                            rightIcon={<BsArrowBarRight/>}
                            w='45%'
                            bg='palette.accent'
                            color='white'
                            p='1.8rem 1.5rem'
                            marginTop='1.2rem'
                        >
                            See latest news
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Box>
    )
}
