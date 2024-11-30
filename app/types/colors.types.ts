export interface Paint {
    id: number
    name: string
    brand: string
    hexCode: string
    red: number
    green: number
    blue: number
    type: string
    discontinued: boolean
    finish?: string
    description?: string | null
    createdAt: string | Date
    updatedAt?: string | Date | null
}