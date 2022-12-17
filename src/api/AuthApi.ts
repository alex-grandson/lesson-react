import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../types/Auth'
import { api } from './api'

export class AuthApi {
  static login = (user: LoginRequest) => {
    return api.post<LoginResponse>('/login', {
      email: user.email,
      password: user.password,
    })
  }

  static register = (user: RegisterRequest) => {
    return api.post<RegisterResponse>('/register', {
      email: user.email,
      password: user.password,
    })
  }
}
