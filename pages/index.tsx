import type { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Container, Heading, Text, Link } from '@chakra-ui/react'
import { Header } from '@/components/Header'
import { Search } from '@/components/Search'
import type { CardsProps, LegalCards } from '@/utils/dataTypes'

const Home: NextPage = (props) => {
  const legalCards = (props as CardsProps).legalCards

  return (
    <>
      <Header />
      <Container maxW="container.sm" mt="2em">
        <Heading as="h1" size="2xl">
          Card Search
        </Heading>
        <Text mt="1em">
          Enter any English or Japanese text to find all{' '}
          <Link href="https://www.eternalcentral.com/middleschoolrules/">
            Middle School legal
          </Link>{' '}
          card titles which include it.
        </Text>
        <Search legalcards={legalCards} />
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    // For offline builds, on the `middleschool-cardlist` repo directory:
    // python3 -m http.server
    // 'http://127.0.0.1:8000/output/middleschool.json'
    'https://alecrem.github.io/middleschool-cardlist/output/middleschool.json'
  )
  const legalCards: LegalCards = await res.json()

  return {
    props: {
      legalCards
    }
  }
}

export default Home
