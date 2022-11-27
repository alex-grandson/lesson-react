import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TodoApi } from "../api/todoApi"
import TodoItem from "./TodoItem"

const TodoList = () => {
    const [ todos, setTodos ] = useState([])

    const loadData = () => {
        TodoApi.getTodos()
            .then((response) => {
                console.log(response.data)
                setTodos(response.data.map((item) => ({
                    ...item,
                    isDeleted: false
                })))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const deleteItem = (i: number) => {
        console.log('deleting ', i);
        
        setTodos(todos.map((item, idx) => ({
            ...item,
            isDeleted: idx == i ? true : item.isDeleted
        })))
    }

    const changeAll = (newState: boolean) => {
        console.log(todos);
        
        setTodos(todos.map((item) => ({
            ...item,
            completed: newState
        })))
    }

    useEffect(() => {
        if (todos.length == 0) {
            loadData()
        }
    }, [])

    return (
        <Flex flexDirection={'column'} gap={5}>
            <ButtonGroup>
                <Button onClick={() => changeAll(false)}>
                    Uncheck all
                </Button>
                <Button onClick={() => changeAll(true)}>
                    Check all
                </Button>
            </ButtonGroup>
            {
                todos.map((item, idx) => {
                    return <TodoItem todo={item} serial={idx + 1} key={idx} 
                    deleteItem={() => deleteItem(idx)} />
                })
            }
        </Flex>
    )
}

export default TodoList