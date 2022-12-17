import { Text } from '@chakra-ui/react'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import TodoList from '../components/TodoList'

const Index = () => (
  <Container height='100vh'>
    <DarkModeSwitch />
    <Hero title='Список дел' />
    <TodoList />
    <Footer>
      <Text>Next ❤️ Chakra</Text>
    </Footer>
  </Container>
)

export default Index
