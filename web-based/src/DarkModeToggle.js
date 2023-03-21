import {IconButton, useColorMode, Button, useColorModeValue } from "@chakra-ui/react";
import {MoonIcon, SunIcon} from '@chakra-ui/icons';

export const IconDarkMode =() => {
    const {colorMode, toggleColorMode} = useColorMode();
    const iconcolortoggle = useColorModeValue('gray.800','white')

    return (
        <IconButton 
        size='md'
        onClick={toggleColorMode}
        color={`mode.${colorMode}.text`}
        borderColor={`mode.${colorMode}.text`}
        aria-label='toggle dark mode'
        icon={colorMode === 'light' ? <MoonIcon color={iconcolortoggle} /> : <SunIcon color={iconcolortoggle} />}
        zIndex='sticky'

        />
    )
}


export const TextDarkmode = () => {
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <Button
        onClick={toggleColorMode}
        >Toggle Dark Mode</Button>
    )
}