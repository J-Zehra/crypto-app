import { Box } from '@chakra-ui/react'
import { useInView } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { GlobalStats } from './Home/GlobalStats'
import { Home } from './Home/Home'

export const MainPage = ({ setActive }) => {

    const ref = useRef(null);
    const isInView =  useInView(ref)

    useEffect(() => {
        if(isInView){
            setActive(0)
        }
    }, [isInView, setActive])
    

    return (
        <Box
            ref={ref}
        >
            <Home/>
            <GlobalStats/>
        </Box>
    )
}
