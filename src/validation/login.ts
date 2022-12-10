import * as yup from 'yup'

// const registerLoginRegex: RegExp = /^[a-zA-z][a-zA-Z1-9-]{3,20}$/

export const loginValidation = yup.object({
  email: yup
    .string()
    .email('Введите корректный E-mail')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(7, 'Минимум 7 символов')
    .max(20, 'Максимум 20 символов')
    .required('Обязательное поле'),
})
