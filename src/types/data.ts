export type GuitarType = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number
}

export type CommentType = {
  id: string,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
  createAt: string,
  guitarId: number
}

export type AllCommments = {
  id: string,
  comments: CommentType[],
}


export type CommentPostType = {
  guitarId?: number,
  userName?: string,
  advantage?: string,
  disadvantage?: string,
  comment?: string,
  rating?: number,
}
