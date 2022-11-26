import {
  Text,
} from '@chakra-ui/react'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'

const Index = () => (
  <Container height="100vh">
    <DarkModeSwitch />
    <Hero title='Список дел' />
    <Main>
      
      
    </Main>

    <Footer>
      <Text>Next ❤️ Chakra</Text>
    </Footer>
  </Container>
)

export default Index
