import { Box } from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import React, { useEffect, useRef } from 'react'

export const Coins = ({ setActive }) => {

  const ref = useRef(null);
  const isInView =  useInView(ref)

  useEffect(() => {
      if(isInView){
          setActive(1)
      }
  }, [isInView, setActive])
  

  return (
    <Box
      ref={ref}
    >
      Coins
    </Box>
  )
}
