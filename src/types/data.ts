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
  advantages: string,
  disadvantages: string,
  comment: string,
  rating: number,
  createAt: Date,
  guitarId: number
}

export type CommentPostType = {
  guitarId: number,
  userName: string,
  advantage: string,
  disadvantage: string,
  comment: string,
  rating: number,
}

export type CouponPostType = {
  coupon: string
}

export type OrderPostType = {
  guitarsIds: number[],
  coupon: string
}
