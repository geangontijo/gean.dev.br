import { useState } from 'react'
import { Stack, Heading, Text, Divider, Flex, Box } from '@chakra-ui/react'
import Head from 'next/head'
import Link from 'next/link'
import Container from '../../components/Container'
import { FaSearch } from 'react-icons/fa'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import useMediaQuery from '../../hook/useMediaQuery'
import dateFormat from 'dateformat'

import { GithubBlog } from '@rena.to/github-blog'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Index({ posts }) {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const handleChange = (e) => setQuery(e.target.value)
  const isLargerThan1024 = useMediaQuery(1024)

  return (
    <Container>
      <Head>
          <title>Gean Gontijo - Engenheiro de Software</title>
          <meta content="Gean Gontijo - Engenheiro de Software" name="title" />
          <meta name="description" content="Gean Gontijo - Escrevendo código que faz a diferença no dia a dia"/>
          <meta name="keywords" content="Gean Gontijo, Blog, Engenheiro de Software"/>
          <meta name="robots" content="index, follow"/>

          <meta content="website" property="og:type" />
          <meta content="https://gean.dev.br/blog" property="og:url" />
          <meta property="og:title" content="Gean Gontijo | Engenheiro de Software"/>
          <meta property="og:description" content="Escrevendo código que faz a diferença no dia a dia"/>
          <meta property="og:image" content="https://i.imgur.com/o7GMsA6.jpeg"/>
          <meta property="og:url" content="https://gean.dev.br/blog"/>

          <meta content="summary_large_image" property="twitter:card" />
          <meta
            content="https://gean.dev.br/blog"
            property="twitter:url"
          />
          <meta
            content="Gean Gontijo | Engenheiro de Software"
            property="twitter:title"
          />
          <meta
            content="Escrevendo código que faz a diferença no dia a dia"
            property="twitter:description"
          />
          <meta
            content="https://i.imgur.com/o7GMsA6.jpeg"
            property="twitter:image"
          />
        </Head>
      <Stack
        as="main"
        alignItems="flex-start"
        justifyContent="center"
        my={{ base: '15vh', md: '16vh' }}
        spacing={5}
      >
        <Heading color="displayColor" fontSize={{ base: '4xl', md: '6xl' }}>
          Blog
        </Heading>
        <Text fontSize={{ base: '14px', md: '16px' }}>
          {t('blog-description')}
        </Text>
        <InputGroup maxW="400px">
          <InputRightElement pointerEvents="none">
            <FaSearch />
          </InputRightElement>
          <Input
            placeholder="Search articles"
            type="text"
            value={query}
            onChange={handleChange}
          />
        </InputGroup>
        <Divider />
        <Stack spacing={5}>
          {posts
            .filter((e) =>
              e.post.title.toLowerCase().includes(query.toLowerCase()),
            )
            .map(({ post }) => (
              <Stack
                key={post.frontmatter.slug}
                alignItems="flex-start"
                justifyContent="flex-start"
                direction={isLargerThan1024 ? 'row' : 'column'}
              >
                <Text
                  display={isLargerThan1024 ? 'block' : 'none'}
                  w={100}
                  color="textSecondary"
                  textAlign="right"
                >
                  {dateFormat(Date.parse(post.frontmatter.date), 'mmm d yyyy')}
                  <br />{' '}
                  <Text fontSize="sm" textAlign="right">
                    {post.frontmatter.readingTime}
                  </Text>
                </Text>
                <Text
                  display={isLargerThan1024 ? 'none' : 'block'}
                  color="textSecondary"
                  fontSize="sm"
                >
                  {dateFormat(Date.parse(post.frontmatter.date), 'mmm d yyyy')}{' '}
                  <Box as="span" fontSize="xs">
                    &bull;
                  </Box>{' '}
                  {post.frontmatter.readingTime}
                </Text>
                <Flex direction="column" px={isLargerThan1024 ? 10 : 0}>
                  <Link href={'/blog/' + post.frontmatter.slug}>
                    <Text
                      color="displayColor"
                      fontSize="xl"
                      fontWeight="bold"
                      cursor="pointer"
                    >
                      {post.title}
                    </Text>
                    <Text color="textSecondary">
                      {post.frontmatter.summary}
                    </Text>

                    <Text color="button1" cursor="pointer">
                      Learn more &rarr;
                    </Text>
                  </Link>
                </Flex>
              </Stack>
            ))}
        </Stack>
      </Stack>
    </Container>
  )
}

export async function getStaticProps({locale}) {
  const blog = new GithubBlog({
    repo: 'geangontijo/gean.dev.br',
    token: process.env.GITHUB_TOKEN,
  })
  const posts = await blog.getPosts({
    query: {
      author: 'geangontijo',
      type: 'post',
      state: 'published',
    },
    pager: { limit: 10, offset: 0 },
  })

  return {
    props: {
      posts: posts.edges.sort(
        (a, b) =>
          Date.parse(b.post.frontmatter.date) -
          Date.parse(a.post.frontmatter.date),
      ),
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
