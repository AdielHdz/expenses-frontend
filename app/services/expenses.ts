import type { AxiosResponse } from 'axios'
import axios from './axios'
import type {
  Expense,
  ExpenseCreateRequest,
  ExpenseUpdateRequest
} from '~/types/expense'
import type {
  Pagination,
  PaginatedResponse,
  ExpenseSearchPagination
} from '~/types/pagination'

export const createExpense = async (
  body: ExpenseCreateRequest
): Promise<Expense> => {
  const response = await axios.post<Expense>('/api/expenses', body)

  return response.data
}

export const updateExpense = async (
  id: string,
  body: ExpenseUpdateRequest
): Promise<Expense> => {
  const response = await axios.put<Expense>(`/api/expenses/${id}`, body)

  return response.data
}

export const getExpenseById = async (id: string): Promise<Expense> => {
  const response = await axios.get<Expense>(`/api/expenses/${id}`)

  return response.data
}

export const getExpenses = async (
  pagination: Pagination
): Promise<PaginatedResponse<Expense>> => {
  const { limit, page } = pagination

  const params = new URLSearchParams()

  if (page != null) params.append('page', page.toString())
  if (limit != null) params.append('limit', limit.toString())

  const { data } = await axios.get<PaginatedResponse<Expense>>(
    `/api/expenses?${params}`
  )

  if (!data.data.length) throw new Error('No expenses found')

  return data
}

export const searchExpenses = async (
  searchPagination: ExpenseSearchPagination
): Promise<PaginatedResponse<Expense>> => {
  const { limit, page, category, description = '' } = searchPagination

  const params = new URLSearchParams()

  if (page != null) params.append('page', page.toString())
  if (limit != null) params.append('limit', limit.toString())
  if (category) params.append('category', category)

  params.append('description', description)

  const { data } = await axios.get<PaginatedResponse<Expense>>(
    `/api/expenses/search?${params.toString()}`
  )
  if (!data.data.length) throw new Error('No expenses found')

  return data
}

export const removeExpense = async (id: string): Promise<AxiosResponse> => {
  const response = await axios.delete(`/api/expenses/${id}`)

  return response
}

export const getCategories = async (): Promise<string[]> => {
  const response = await axios.get('/api/expenses/categories')

  return response.data
}
