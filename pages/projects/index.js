import { useState } from 'react'
import { Stack, Heading, Text, SimpleGrid, Divider } from '@chakra-ui/react'

import Cards from '../../components/Card'
import Container from '../../components/Container'
import Head from 'next/head'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { FaSearch } from 'react-icons/fa'
import { GithubBlog } from '@rena.to/github-blog'

export default function Projects({ projects }) {
  const [query, setQuery] = useState('')
  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  return (
    <>
      <Container>
        <Head>
          <title>Gean Gontijo - Engenheiro de Software</title>
          <meta content="Gean Gontijo - Engenheiro de Software" name="title" />
          <meta name="description" content="Gean Gontijo - Engenheiro de Software com mais de 5 anos de experiência. Especialista em Back-end (Laravel / PHP), transformando ideias em código e sistemas escaláveis! Tech Lead no MobileStock."/>
          <meta name="keywords" content="Gean Gontijo, Engenheiro de Software, Desenvolvedor Back-end, Laravel, PHP, Tech Lead, MobileStock, Sistemas Escaláveis"/>
          <meta name="robots" content="index, follow"/>

          <meta content="website" property="og:type" />
          <meta content="https://gean.dev.br/blog" property="og:url" />
          <meta property="og:title" content="Gean Gontijo | Engenheiro de Software"/>
          <meta property="og:description" content="Transformando ideias em código e sistemas escaláveis! Especialista em Back-end (Laravel / PHP). Tech Lead no MobileStock."/>
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
            content="Transformando ideias em código e sistemas escaláveis! Especialista em Back-end (Laravel / PHP). Tech Lead no MobileStock."
            property="twitter:description"
          />
          <meta
            content="https://i.imgur.com/o7GMsA6.jpeg"
            property="twitter:image"
          />
        </Head>
        <Stack
          justifyContent="center"
          my={{ base: '15vh', md: '16vh' }}
          spacing={10}
        >
          <Stack spacing={5}>
            {' '}
            <Heading color="displayColor" fontSize={{ base: '4xl', md: '6xl' }}>
              Projects
            </Heading>
            <Text fontSize={{ base: '14px', md: '16px' }}>
              I love building projects and practice my engineering skills,
              here's an archive of things that I've worked on.
            </Text>
            <InputGroup maxW="400px">
              <InputRightElement pointerEvents="none">
                <FaSearch />
              </InputRightElement>
              <Input
                placeholder="Search projects"
                type="text"
                value={query}
                onChange={handleChange}
              />
            </InputGroup>
            <Divider />
          </Stack>
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={8}>
            {projects
              .filter((e) =>
                e.title.toLowerCase().includes(query.toLowerCase()),
              )
              .map((project) => (
                <Cards
                  key={project.title}
                  desc={project.frontmatter.summary}
                  imageURL={project.frontmatter.image}
                  tag={project.frontmatter.techStack
                    .split(',')
                    .map((e) => e.trim())}
                  title={project.title}
                  slug={project.frontmatter.slug}
                />
              ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const blog = new GithubBlog({
    repo: 'geangontijo/gean.dev.br',
    token: process.env.GITHUB_TOKEN,
  })
  const projects = await blog.getPosts({
    query: {
      author: 'abdulrcs',
      type: 'project',
      state: 'published',
    },
    pager: { limit: 100, offset: 0 },
  })

  return {
    props: {
      projects: projects.edges
        .sort(
          (a, b) =>
            Date.parse(b.post.frontmatter.date) -
            Date.parse(a.post.frontmatter.date),
        )
        .map((e) => e.post),
    },
  }
}
