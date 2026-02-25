import {
  Link,
  Stack,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Box,
} from '@chakra-ui/layout'
import NextLink from 'next/link'
import Cards from './Card'
import SlideUpWhenVisible from '../hook/SlideUpWhenVisible'
import ReactGA from 'react-ga4'
import { useTranslation } from 'next-i18next'

export default function FeaturedProjects({ projects }) {
  const { t } = useTranslation('common')
  const handleClick = (event) => {
    ReactGA.event({
      category: 'click',
      action: event,
    })
  }

  return (
    <>
      <Stack spacing={8} w="full">
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={16}>
          <SlideUpWhenVisible threshold={0.1}>
            <Stack spacing={1}>
              <Stack
                isInline
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading
                  color="displayColor"
                  fontFamily="Ubuntu"
                  fontSize={{ base: 'xl', md: '2xl' }}
                >
                  {t('all-creative-works')}
                </Heading>
                <NextLink passHref href="/projects">
                  <Link
                    onClick={() => handleClick('featuredprojects_explore more')}
                  >
                    <Text
                      _hover={{ color: 'button2' }}
                      color="button1"
                      display={{ base: 'block', md: 'none' }}
                      fontSize={{ base: 'sm', md: 'xl' }}
                    >
                      {' '}
                      {t('explore-more')} &rarr;
                    </Text>
                  </Link>
                </NextLink>
              </Stack>
              <Text color="textSecondary" fontSize={{ base: 'md', md: 'xl' }}>
                {t('projects-description')}
              </Text>
              <NextLink href="/projects">
                <Link
                  onClick={() => handleClick('featuredprojects_explore more')}
                >
                  <Text
                    display={{ base: 'none', md: 'block' }}
                    fontSize={{ base: 'md', md: 'xl' }}
                  >
                    {t('explore-more')} &rarr;
                  </Text>
                </Link>
              </NextLink>
            </Stack>
          </SlideUpWhenVisible>
          {projects.map((project, index) => (
            <SlideUpWhenVisible key={project.fields.slug || index}>
              <Box mt={index === 1 ? { md: '-50%' } : {}}>
                <Cards
                  slug={project.fields.slug}
                  desc={project.fields.description}
                  imageURL={project.fields.imageUrl}
                  tag={project.fields.tags}
                  title={project.fields.title}
                />
              </Box>
            </SlideUpWhenVisible>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  )
}
