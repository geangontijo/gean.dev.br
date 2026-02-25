import Head from 'next/head'
import { Stack } from '@chakra-ui/react'
import Container from '../components/Container'
import Introduction from '../components/Introduction'
import FeaturedProjects from '../components/FeaturedProjects'
import LatestArticle from '../components/LatestArticle'
import AboutMe from '../components/AboutMe'
import ContactMe from '../components/ContactMe'

import { GithubBlog } from '@rena.to/github-blog'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function Index({ introduction, projects, articles, contactMe }) {
  return (
    <>
      <Container enableTransition={true}>
        <Head>
          <title>Gean Gontijo - Engenheiro de Software</title>
          <meta content="Gean Gontijo - Engenheiro de Software" name="title" />
          <meta
            name="description"
            content="Gean Gontijo - Engenheiro de Software com mais de 5 anos de experiência. Especialista em Back-end (Laravel / PHP), transformando ideias em código e sistemas escaláveis! Tech Lead no Meu Look, LTDA."
          />
          <meta
            name="keywords"
            content="Gean Gontijo, Engenheiro de Software, Desenvolvedor Back-end, Laravel, PHP, Tech Lead, Meu Look, Sistemas Escaláveis"
          />
          <meta name="robots" content="index, follow" />

          <meta content="website" property="og:type" />
          <meta content="https://gean.dev.br" property="og:url" />
          <meta
            property="og:title"
            content="Gean Gontijo | Engenheiro de Software"
          />
          <meta
            property="og:description"
            content="Transformando ideias em código e sistemas escaláveis! Especialista em Back-end (Laravel / PHP). Tech Lead no Meu Look, LTDA."
          />
          <meta
            property="og:image"
            content="https://i.imgur.com/o7GMsA6.jpeg"
          />
          <meta property="og:url" content="https://gean.dev.br" />

          <meta content="summary_large_image" property="twitter:card" />
          <meta content="https://gean.dev.br" property="twitter:url" />
          <meta
            content="Gean Gontijo | Engenheiro de Software"
            property="twitter:title"
          />
          <meta
            content="Transformando ideias em código e sistemas escaláveis! Especialista em Back-end (Laravel / PHP). Tech Lead no Meu Look, LTDA."
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
          mt={{ base: '15vh', md: '20vh' }}
          pb="144px"
          spacing={{ base: '100px', md: '144px' }}
        >
          <Introduction introduction={introduction} />
          <AboutMe />
          <FeaturedProjects projects={projects} />
          <LatestArticle articles={articles} />
          <ContactMe contactMe={contactMe} />
        </Stack>
      </Container>
    </>
  )
}

let client = require('contentful').createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export async function getStaticProps({ locale }) {
  // Local projects
  const projects = [
    {
      fields: {
        title: 'WorkLifeBalancer',
        slug: 'worklifebalancer',
        description:
          'A specialized tool to help users track and balance their personal life with work commitments.',
        imageUrl: '/projects/worklifebalancer.com/homepage.gif',
        tags: ['Next.js', 'ShadcnUI', 'Supabase'],
      },
    },
  ]

  const blog = new GithubBlog({
    repo: 'geangontijo/gean.dev.br',
    token: process.env.GITHUB_TOKEN,
  })
  let data2 = await blog.getPosts({
    query: {
      author: 'geangontijo',
      type: 'post',
      state: 'published',
    },
    pager: { limit: 10, offset: 0 },
  })

  let data3 = await client.getEntries({
    content_type: 'introduction',
    limit: 2,
    order: 'sys.createdAt',
  })

  let data4 = await client.getEntries({
    content_type: 'contactMe',
    limit: 1,
    order: 'sys.createdAt',
  })

  return {
    props: {
      projects: projects,
      articles: data2.edges
        .sort(
          (a, b) =>
            Date.parse(b.post.frontmatter.date) -
            Date.parse(a.post.frontmatter.date),
        )
        .map((edge) => edge.post)
        .slice(0, 4),
      introduction: data3.items,
      contactMe: data4.items,
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
