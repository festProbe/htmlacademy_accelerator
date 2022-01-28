export enum AppRoute {
  MAIN = '/',
  CART = '/cart',
  PRODUCT = '/product',
}

export enum APIRoute {
  GUITARS = '/guitars',
  COMMENTS = '/comments',
  COUPONS = '/coupons',
  ORDERS = '/orders'
}

export const typesOfGuitars = {
  acoustic: ['6', '7', '12'],
  electric: ['4, 6, 7'],
  ukulele: ['4'],
};

export const MAX_GUITARS_ON_PAGE = 9;
