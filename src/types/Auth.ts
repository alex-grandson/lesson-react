export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  user: {
    id: number
    email: string
  }
  accessToken: string
}

export type RegisterResponse = LoginResponse
export type RegisterRequest = LoginRequest
