import {CommentType, GuitarType} from '../types/data';

export const guitarsMock: GuitarType[] = [
  {
    id: 0,
    name: 'guitar1',
    vendorCode: 'fhwe123123',
    type: 'electric',
    description: 'best guitar of the world',
    previewImg: '/123/img.img',
    stringCount: 6,
    rating: 4.5,
    price: 20000,
  },
  {
    id: 1,
    name: 'guitar2',
    vendorCode: 'wef324g3g3',
    type: 'ukulele',
    description: 'is it guitar?',
    previewImg: '/312/img.img',
    stringCount: 4,
    rating: 2.5,
    price: 7000,
  },
  {
    id: 2,
    name: 'guitar3',
    vendorCode: 'btrtwr32r',
    type: 'acoustic',
    description: 'not bad',
    previewImg: '/321/img.img',
    stringCount: 12,
    rating: 3.7,
    price: 17000,
  },
];

export const guitarMock: GuitarType = {
  id: 1,
  name: 'guitar2',
  vendorCode: 'wef324g3g3',
  type: 'ukulele',
  description: 'is it guitar?',
  previewImg: '/312/img.img',
  stringCount: 4,
  rating: 2.5,
  price: 7000,
};

export const totalCountMock = 13;

export const commentsMock: CommentType[] = [
  {
    id: '0',
    userName: 'Vasya',
    advantages: '4 string',
    disadvantages: 'cant play',
    comment: 'its guitar',
    rating: 3,
    createAt: new Date().toString(),
    guitarId: 1,
  },
  {
    id: '1',
    userName: 'Petya',
    advantages: 'seems like gutiar of gods',
    disadvantages: 'no one',
    comment: 'i want to get marry this guitar',
    rating: 4.7,
    createAt: new Date().toString(),
    guitarId: 0,
  },
  {
    id: '2',
    userName: 'Somebody',
    advantages: 'WHAT A SOUND!!!',
    disadvantages: 'i dont understand english',
    comment: 'I can play famous songs of Little Big band',
    rating: 5,
    createAt: new Date().toString(),
    guitarId: 2,
  },
];

export const commentMock: CommentType = {
  id: '0',
  userName: 'Vasya',
  advantages: '4 string',
  disadvantages: 'cant play',
  comment: 'its guitar',
  rating: 3,
  createAt: new Date().toString(),
  guitarId: 1,
}
