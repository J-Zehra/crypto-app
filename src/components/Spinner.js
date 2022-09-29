import {  Flex } from '@chakra-ui/react'
import React from 'react'
import Lottie from 'react-lottie-player'

import lottieJson from '../assets/lottieJson.json'

export const Spinner = () => {
    return (
        <Flex
            w='100%'
            h='100%'
            justifyContent='center'
            alignItems='center'
        >
            <Lottie
                loop
                animationData={lottieJson}
                play
                style={{ width: 150, height: 150 }}
            />
        </Flex>
    )
}
