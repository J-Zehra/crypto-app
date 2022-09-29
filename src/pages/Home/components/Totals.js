import { GridItem, Image, Text } from '@chakra-ui/react'
import React from 'react'

export const Totals = ( { index, stat } ) => {

    return (
        <GridItem
            bg='#101010'
            colSpan={1}
            key={index}
            display='flex'
            flexDir='column'
            justifyContent='end'
            p='1.5rem'
            gap='1rem'
            position='relative'
            borderRadius='.3rem'
        >
            <Image
                src={stat.icon}
                w='100%'
                top='0'
                left='0'
                position='absolute'
            />
            <Text
                fontWeight='semibold'
                fontSize='.85rem'
            >
                {stat.title}
            </Text>
            <Text
                fontSize='1.6rem'
                fontWeight='semibold'
                color='palette.accent'
            >
                {stat.data?.toLocaleString()}
            </Text>
        </GridItem>
    )
}
