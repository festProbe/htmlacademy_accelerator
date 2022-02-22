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
  id: 0,
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
    advantage: '4 string',
    disadvantage: 'cant play',
    comment: 'its guitar',
    rating: 3,
    createAt: new Date().toString(),
    guitarId: 1,
  },
  {
    id: '1',
    userName: 'Petya',
    advantage: 'seems like gutiar of gods',
    disadvantage: 'no one',
    comment: 'i want to get marry this guitar',
    rating: 4.7,
    createAt: new Date().toString(),
    guitarId: 0,
  },
  {
    id: '2',
    userName: 'Somebody',
    advantage: 'WHAT A SOUND!!!',
    disadvantage: 'i dont understand english',
    comment: 'I can play famous songs of Little Big band',
    rating: 5,
    createAt: new Date().toString(),
    guitarId: 2,
  },
];

export const fourCommentsMock: CommentType[] = [
  {
    id: '0',
    userName: 'Vasya',
    advantage: '4 string',
    disadvantage: 'cant play',
    comment: 'its guitar',
    rating: 3,
    createAt: new Date().toString(),
    guitarId: 0,
  },
  {
    id: '1',
    userName: 'Petya',
    advantage: 'seems like gutiar of gods',
    disadvantage: 'no one',
    comment: 'i want to get marry this guitar',
    rating: 4.7,
    createAt: new Date().toString(),
    guitarId: 0,
  },
  {
    id: '2',
    userName: 'Somebody',
    advantage: 'WHAT A SOUND!!!',
    disadvantage: 'i dont understand english',
    comment: 'I can play famous songs of Little Big band',
    rating: 5,
    createAt: new Date().toString(),
    guitarId: 0,
  },
  {
    id: '3',
    userName: 'HellYeah',
    advantage: 'BabskiyPigach',
    disadvantage: 'i dont understand english',
    comment: 'I can play famous songs of Little Big band',
    rating: 4,
    createAt: new Date().toString(),
    guitarId: 0,
  },
];

export const commentMock: CommentType = {
  id: '0',
  userName: 'Vasya',
  advantage: '4 string',
  disadvantage: 'cant play',
  comment: 'its guitar',
  rating: 3,
  createAt: new Date().toString(),
  guitarId: 1,
};
