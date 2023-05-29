export type ProductsDataType ={
   count: number
   results: ProductType[]
}

export type ProductType = {
   name: string
   type: string
   storage: number
   id: string
}