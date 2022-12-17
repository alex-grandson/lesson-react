import { SmallAddIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { TodoApi } from '../api/todoApi'
import UserStore from '../store/UserStore'
import { Todo } from '../types/Todo'
import TodoItem from './TodoItem'

const TodoList = () => {
  const [todos, setTodos] = useState([] as Todo[])
  const [newTodo, setNewTodo] = useState('')
  const userId = UserStore.user?.user?.id

  const loadData = () => {
    TodoApi.getTodos(userId)
      .then((response) => {
        console.log(response.data)
        setTodos(
          response.data.map((item) => ({
            ...item,
            isDeleted: false,
          }))
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const deleteItem = (i: number) => {
    console.debug('deleting ', i)
    setTodos(
      todos.map((item, idx) => ({
        ...item,
        isDeleted: idx == i ? true : item.isDeleted,
      }))
    )
    TodoApi.deleteTodo(i + 1)
  }

  const addItem = (todo: Todo) => {
    console.debug('adding item', todo.title)
    setTodos([...todos, todo])
  }

  const changeAll = (newState: boolean) => {
    console.log(todos)

    setTodos(
      todos.map((item) => ({
        ...item,
        completed: newState,
      }))
    )
  }

  useEffect(() => {
    if (userId != undefined && todos.length == 0) {
      loadData()
    }
  }, [])

  useEffect(() => {}, [todos])

  if (userId == undefined) {
    return <Box mt={5}>Вы не вошли</Box>
  }

  return (
    <Flex flexDirection={'column'} gap={5}>
      <Flex>
        <ButtonGroup isAttached variant={'ghost'}>
          <Button onClick={() => changeAll(false)}>Uncheck all</Button>
          <Button onClick={() => changeAll(true)}>Check all</Button>
        </ButtonGroup>
        <FormControl>
          <InputGroup>
            <Input
              placeholder={'Введите дела'}
              value={newTodo}
              onChange={(event) => {
                setNewTodo(event.target.value)
              }}
            />
            <InputRightElement>
              <Button
                variant={'ghost'}
                onClick={() => {
                  const newTodoItem: Todo = {
                    userId: userId,
                    title: newTodo,
                    completed: false,
                    isDeleted: false,
                  }
                  TodoApi.addTodo(newTodoItem)
                  addItem(newTodoItem)
                  setNewTodo('')
                }}
              >
                <SmallAddIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Flex>

      {todos.map((item, idx) => {
        return (
          <TodoItem
            todo={item}
            serial={idx + 1}
            key={idx}
            deleteItem={() => deleteItem(idx)}
          />
        )
      })}
    </Flex>
  )
}

export default observer(TodoList)
