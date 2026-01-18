export interface Expense {
  id: string
  description: string
  amount: number
  category: string
  date: string
}
export type ExpenseCreateRequest = Omit<Expense, 'id' | 'date'>

export type ExpenseUpdateRequest = Omit<Expense, 'id' | 'date'>
