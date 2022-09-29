import { extendTheme } from "@chakra-ui/react"

const colors = {
    palette: {
        primary: '#090909',
        secondary: '#B3B3BE',
        tertiary: '#E0FBFC',
        accent: '#439070'
    }
}

const fonts = {
    body: `'Poppins', sans-serif`
}

const styles = {
    global: {
        html: {
            scrollBehavior: 'smooth',
            overflowX: 'hidden', 
        },
        body: {
            bg: 'palette.primary',
            color: 'palette.secondary',
        },
        _placeholder: {
            color: 'rgba(38, 50, 56, .6)',
            fontSize: '.9rem'
        },
        h1: {
            fontSize: '4rem',
            fontWeight: 'bold'
        },
        p: {
            fontSize: '1rem',
            fontWeight: 'medium'
        },
        '::-webkit-scrollbar': {
            w: '0'
        }
    }
}

export const theme = extendTheme({ colors, fonts, styles });