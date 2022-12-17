import { Todo } from '../types/Todo'
import { api } from './api'

export class TodoApi {
  static getTodos = (userId: number) => {
    return api.get('/todos', {
      params: {
        userId,
      },
    })
  }

  static addTodo = (todo: Todo) => {
    return api.post('/todos', todo)
  }

  static deleteTodo = (id: number) => {
    return api.delete(`/todos/${id}`)
  }
}
