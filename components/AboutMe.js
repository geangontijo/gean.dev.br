import {
  SimpleGrid,
  Text,
  Stack,
  Heading,
  Image,
  Flex,
  Box,
  chakra,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react'

import useMediaQuery from '../hook/useMediaQuery'
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'
import ReactGA from 'react-ga4'

export default function AboutMe() {
  const isLargerThan800 = useMediaQuery(800)
  const handleHover = (event) => {
    ReactGA.event({
      category: 'hover',
      action: event,
    })
  }
  const MoreInfo = ({ text, content }) => {
    return (
      <>
        {' '}
        {isLargerThan800 ? (
          <Popover isLazy placement="right" trigger="hover">
            <PopoverTrigger>
              <chakra.span
                color="button1"
                cursor="help"
                onMouseOver={() => handleHover(`about_${text}`)}
              >
                {text}
              </chakra.span>
            </PopoverTrigger>
            <PopoverContent color="white" bg="secondary" borderColor="button1">
              <PopoverArrow bg="button1" />
              <PopoverBody color="textPrimary" fontSize="sm">
                {content}
              </PopoverBody>
            </PopoverContent>
          </Popover>
        ) : (
          <Text as="span" color="button1">
            {text}
          </Text>
        )}{' '}
      </>
    )
  }

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        <SlideUpWhenVisible>
          <Stack spacing={4}>
            <Heading fontFamily="Ubuntu" fontSize="2xl">
              ⚡ Sobre mim
            </Heading>
            <Text
              color="textSecondary"
              fontSize={{ base: '14px', md: '16px' }}
              whiteSpace="pre-line"
            >
              Olá! Eu sou Gean Gontijo, destrincho o funcionamento de computadores desde pequeno, e sou apaixonado por eles desde então. <br />
              <br /> Tenho especialização em Laravel, apaixonado por criar soluções que vão além do código: desempenho, segurança e escalabilidade são meu foco. Desde cedo, mergulhei no mundo da tecnologia e infraestrutura, buscando sempre entregar sistemas robustos e eficientes.

            </Text>
            <Heading fontFamily="Ubuntu" fontSize="1xl">
              💡 O que me diferencia?
            </Heading>

            <Text
              color="textSecondary"
              fontSize={{ base: '14px', md: '16px' }}
              whiteSpace="pre-line"
            >
              <strong>✅ Infraestrutura otimizada</strong> – redução de custos e alta performance garantida. <br/>
              <strong> ✅ Foco em negócios</strong> – cada linha de código pensada para gerar impacto real.
            </Text>
          </Stack>
        </SlideUpWhenVisible>
        <SlideUpWhenVisible>
          <Flex align="center" justify="center">
            <Box
              pos="relative"
              maxW={{ base: '300px', lg: '350px' }}
              maxH={{ base: '300px', lg: '350px' }}
            >
              <Image
                pos="absolute"
                zIndex={3}
                top="0px"
                right={{ base: '-32px', lg: '-64px' }}
                w={{ base: '100px', lg: '150px' }}
                alt=""
                filter="invert(0.1)"
                src="https://svgsilh.com/svg/26432.svg"
              />
              <Image
                w={{ base: '300px', lg: '350px' }}
                h={{ base: '300px', lg: '350px' }}
                objectFit="cover"
                borderRadius="10%"
                alt="Gean Gontijo"
                src="https://i.imgur.com/ceOruJ0.png"
              />
            </Box>
          </Flex>
        </SlideUpWhenVisible>
      </SimpleGrid>
    </>
  )
}
