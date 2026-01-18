export interface Pagination {
  limit?: number
  page?: number
}

export interface ExpenseSearchPagination extends Pagination {
  description?: string
  category?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

export type PaginatedUI = Omit<PaginatedResponse<any>, 'data'>['meta']
