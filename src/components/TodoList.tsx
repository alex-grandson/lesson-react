import { SmallAddIcon } from "@chakra-ui/icons"
import { Box, Button, ButtonGroup, Flex, FormControl, Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { TodoApi } from "../api/todoApi"
import { Todo } from "../types/Todo"
import TodoItem from "./TodoItem"

const TodoList = () => {
    const [ todos, setTodos ] = useState([] as Todo[])
    const [ newTodo, setNewTodo ] = useState("")
    
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
        console.debug('deleting ', i);
        
        setTodos(todos.map((item, idx) => ({
            ...item,
            isDeleted: idx == i ? true : item.isDeleted
        })))
    }

    const addItem = (value: string) => {
        console.debug("adding item", value);
        setTodos([
            ...todos,
            {
                userId: 1,
                title: value,
                completed: false,
                isDeleted: false,

            }
        ])
    }

    const changeAll = (newState: boolean) => {
        console.log(todos);
        
        setTodos(todos.map((item) => ({
            ...item,
            completed: newState
        })))
    }

    // useEffect(() => {
    //     if (todos.length == 0) {
    //         loadData()
    //     }
    // }, [])

    useEffect(() => {}, [todos])

    return (
        <Flex flexDirection={'column'} gap={5}>
            <Flex>
                <ButtonGroup isAttached variant={"ghost"}>
                    <Button onClick={() => changeAll(false)}>
                        Uncheck all
                    </Button>
                    <Button onClick={() => changeAll(true)}>
                        Check all
                    </Button>
                </ButtonGroup>
                <FormControl>
                    <InputGroup>
                        <Input
                            placeholder={"Введите дела"} 
                            value={newTodo}
                            onChange={(event) => {
                                setNewTodo(event.target.value)
                            }}
                        />
                        <InputRightElement>
                            <Button 
                                variant={"ghost"}
                                onClick={() => {
                                    addItem(newTodo)
                                    setNewTodo("")
                                }}
                            >
                                <SmallAddIcon />
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    
                </FormControl>

            </Flex>
            
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