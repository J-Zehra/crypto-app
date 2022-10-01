import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../assets/Logo.png'

export const Navbar = ({ active, setActive }) => {

    const navLinks = [
        { link: '/', label: 'Home' },
        { link: '/coins', label: 'Coins' },
        { link: '/news', label: 'News' },
    ]

    // INITIALIZE A STATE TO TRACK IF THE PAGE IS SCROLLED
    const [scrolled, setScrolled] = useState(false);

    // HANDLE THE SCROLL EVENT. CHANGE VARIABLES WHEN SCROLLED
    const handleScroll = () => {
        if (window.scrollY >= 60) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }
    // ATTACH THE FUNCTION TO THE SCROLL EVENT LISTENER ON MOUNT
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    })

    const navScrolledStyle = {
        bg: 'palette.primary',
        h: '4rem',
        boxShadow: '1px 0 10px rgba(0, 0, 0, .050)',
    }

    return (
        <Box
            pos='fixed'
            w='100%'
            h='5rem'
            zIndex={999}
            {... scrolled && navScrolledStyle}
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
                justifyContent='space-between'
                alignItems='center'
            >
                {/* LOGO */}
                <Link to='/'>
                    <Image
                        src={Logo}
                        w='9rem'
                    />
                </Link>
                <Flex
                    justifyContent='center'
                    alignItems='center'
                    gap='2rem'
                >
                    <Flex
                        gap='2.5rem'
                    >
                        {navLinks.map((nav, index) => {
                            return (
                                <Link
                                    key={index}
                                    to={nav.link}
                                >
                                    <Flex
                                        justifyContent='center'
                                        pos='relative'
                                    >
                                        <Text>
                                            {nav.label}
                                        </Text>
                                        {active === index && (
                                            <Box
                                                pos='absolute'
                                                bottom='-.4rem'
                                                w='2.5rem'
                                                h='.1rem'
                                                borderRadius='50%'
                                                bg='palette.accent'
                                            >

                                            </Box>
                                        )}
                                    </Flex>
                                </Link>
                            )
                        })}
                    </Flex>
                    <Button
                        bg='none'
                        border='1px solid'
                        borderColor='palette.accent'
                        color='palette.accent'
                    >
                        Subscribe
                    </Button>
                </Flex>
            </Flex>
        </Box >
    )
}
