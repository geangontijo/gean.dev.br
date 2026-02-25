import {
  Box,
  Heading,
  Stack,
  Text,
  Divider,
  SimpleGrid,
  Link,
  Flex,
} from '@chakra-ui/react'
import Container from '../../components/Container'
import ProjectContainer from '../../components/ProjectContainer'
import Image from 'next/image'
import Head from 'next/head'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function WorkLifeBalancer() {
  return (
    <Container>
      <Head>
        <title>WorkLifeBalancer - Gean Gontijo</title>
        <meta
          name="description"
          content="A specialized tool to help users track and balance their personal life with work commitments."
        />
      </Head>
      <Stack
        justifyContent="center"
        my={{ base: '15vh', md: '16vh' }}
        spacing={10}
      >
        <Stack spacing={5}>
          <Heading color="displayColor" fontSize={{ base: '4xl', md: '6xl' }}>
            WorkLifeBalancer
          </Heading>
          <Flex alignItems="center">
            <Link
              isExternal
              href="https://worklifebalancer.com"
              mr={4}
              _hover={{ color: 'button1' }}
            >
              <Flex align="center">
                <FaExternalLinkAlt mr={2} />
                <Text ml={2} fontWeight="bold">
                  Visit Website
                </Text>
              </Flex>
            </Link>
            <Link
              isExternal
              href="https://github.com/geangontijo/worklifebalancer"
              _hover={{ color: 'button1' }}
            >
              <Flex align="center">
                <FaGithub mr={2} />
                <Text ml={2} fontWeight="bold">
                  Source Code
                </Text>
              </Flex>
            </Link>
          </Flex>
          <Text fontSize={{ base: 'lg', md: 'xl' }} color="textSecondary">
            WorkLifeBalancer is a specialized platform designed to help
            professionals maintain a healthy balance between their demanding
            careers and personal lives. Built with a modern stack, it provides
            tools for tracking time, scheduling personal days, and visualizing
            work-life metrics.
          </Text>
          <Divider />
        </Stack>

        <ProjectContainer>
          <Heading as="h2" size="lg" color="displayColor">
            Project Overview
          </Heading>
          <Text>
            The core challenge addressed by WorkLifeBalancer is the "always-on"
            culture of modern software engineering. The application allows users
            to set "hard boundaries" for work hours and intelligently suggests
            personal breaks and holidays based on workload patterns.
          </Text>

          <Box borderRadius="10px" overflow="hidden" my={8}>
            <Image
              src="/projects/worklifebalancer.com/homepage.gif"
              alt="WorkLifeBalancer Homepage"
              width={1366}
              height={768}
              layout="responsive"
              objectFit="cover"
            />
            <Text mt={2} fontSize="sm" textAlign="center" color="textSecondary">
              Live preview of the landing page and core interactive elements.
            </Text>
          </Box>

          <Heading as="h2" size="lg" color="displayColor">
            Key Features
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} my={8}>
            <Stack>
              <Heading as="h3" size="md">
                Dashboard Visualization
              </Heading>
              <Text>
                A comprehensive dashboard that gives you a bird's-eye view of
                your weekly and monthly balance. Users can quickly identify when
                they are overworking and take immediate action.
              </Text>
              <Box borderRadius="10px" overflow="hidden">
                <Image
                  src="/projects/worklifebalancer.com/dashboard.png"
                  alt="Dashboard View"
                  width={800}
                  height={500}
                  layout="responsive"
                />
              </Box>
            </Stack>
            <Stack>
              <Heading as="h3" size="md">
                Interactive Elements
              </Heading>
              <Text>
                Clean and responsive UI with subtle hover effects and state
                management to ensure a smooth user experience while navigating
                complex scheduling tools.
              </Text>
              <Box borderRadius="10px" overflow="hidden">
                <Image
                  src="/projects/worklifebalancer.com/dashboard-hover.png"
                  alt="Dashboard Hover Effects"
                  width={800}
                  height={500}
                  layout="responsive"
                />
              </Box>
            </Stack>
          </SimpleGrid>

          <Heading as="h2" size="lg" color="displayColor">
            Management Tools
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} my={8}>
            <Stack>
              <Heading as="h3" size="md">
                Holidays & Days Off
              </Heading>
              <Text>
                Integrated holiday tracking that syncs with your regional
                calendar and allows for easy planning of extended breaks.
              </Text>
              <Box borderRadius="10px" overflow="hidden">
                <Image
                  src="/projects/worklifebalancer.com/holidays-and-days-off.png"
                  alt="Holidays Management"
                  width={800}
                  height={500}
                  layout="responsive"
                />
              </Box>
            </Stack>
            <Stack>
              <Heading as="h3" size="md">
                Personal Time Off
              </Heading>
              <Text>
                Simple interface to add personal mental health days or family
                time, ensuring these are blocked off in your work availability.
              </Text>
              <Box borderRadius="10px" overflow="hidden">
                <Image
                  src="/projects/worklifebalancer.com/add-personal-day-off.png"
                  alt="Add Personal Day Off"
                  width={800}
                  height={500}
                  layout="responsive"
                />
              </Box>
            </Stack>
          </SimpleGrid>

          <Heading as="h2" size="lg" color="displayColor">
            Tech Stack
          </Heading>
          <Text>
            The project leverages <strong>Next.js</strong> for both the frontend
            and the responsive Backend API, ensuring a unified and performant
            codebase. <strong>ShadcnUI</strong> (Radix UI + Tailwind CSS)
            provides the sleek, accessible building blocks for the user
            interface, while <strong>Supabase</strong> serves as the robust
            infrastructure for authentication and PostgreSQL database
            management.
          </Text>
        </ProjectContainer>
      </Stack>
    </Container>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}
