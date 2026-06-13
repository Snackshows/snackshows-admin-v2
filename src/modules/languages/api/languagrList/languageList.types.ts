export interface Language {
  id: string
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  totalSeries: string
}

export interface LanguageListResponse {
  statusCode: number
  message: string
  success: boolean
  data: Language[]
}
