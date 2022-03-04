import { createReducer } from '@reduxjs/toolkit';
import { GuitarInCart } from '../types/data';
import { ReducerState } from '../types/state';
import {
  loadComments,
  loadCommentsCount,
  loadAllGuitars,
  loadGuitars,
  putGuitarInCart,
  setCustomGuitarCount,
  decreseGuitarInCart,
  deleteGuitarFromCart,
  setIsGuitarsLoaded,
  loadTotalCount,
  loadProductInfo,
  setIsGuitarLoaded,
  setCurrentPage,
  setMinPrice,
  setMaxPrice,
  setMinPricePlaceholder,
  setMaxPricePlaceholder,
  setSortType,
  setSortOrder,
  setGuitarTypes,
  setStringsCounts,
  setProductTab
} from './actions';

const initialState: ReducerState = {
  allGuitars: [],
  guitars: [],
  guitarsInCart: [],
  isGuitarsLoaded: false,
  guitar: null,
  isGuitarLoaded: false,
  totalCount: 0,
  commentsCount: [],
  comments: [],
  currentPage: 1,
  minPrice: '',
  maxPrice: '',
  minPricePlaceholder: 0,
  maxPricePlaceholder: 0,
  sortType: '',
  sortOrder: '',
  guitarTypes: [],
  stringsCounts: [],
  productTab: 'characteristics',
};

const putGuitarsInCart = (state: ReducerState, payload: GuitarInCart): GuitarInCart[] => {
  const result: GuitarInCart[] = state.guitarsInCart;
  if (state.guitarsInCart.length === 0) {
    result.push(payload);
    return result;
  } else {
    const ids = state.guitarsInCart.map((guitarInCart) => guitarInCart.guitar.id);
    if (ids.includes(payload.guitar.id)) {
      state.guitarsInCart.forEach((guitar, index) => {
        if (guitar.guitar.id === payload.guitar.id) {
          result[index].count += 1;
          return result;
        }
      });
    } else {
      result.push(payload);
    }
  }
  return result;
};

const setCustomCount = (state: ReducerState, payload: GuitarInCart) => {
  const result = state.guitarsInCart;
  state.guitarsInCart.forEach((guitarInCart, index) => {
    if (guitarInCart.guitar.id === payload.guitar.id) {
      result[index].count = payload.count;
    }
  });
  return result;
};

const deleteGuitarsInCart = (state: ReducerState, payload: GuitarInCart): GuitarInCart[] => {
  let result = state.guitarsInCart;
  state.guitarsInCart.forEach((guitarInCart, index) => {
    if (guitarInCart.guitar.id === payload.guitar.id) {
      result = [
        ...result.slice(0, index),
        ...result.slice(index + 1),
      ];
    }
  });
  return result;
};

const decreseGuitarCountInCart = (state: ReducerState, payload: GuitarInCart): GuitarInCart[] => {
  const result = state.guitarsInCart;
  state.guitarsInCart.forEach((guitarInCart, index) => {
    if (guitarInCart.guitar.id === payload.guitar.id) {
      result[index].count -= 1;
    }
  });
  return result;
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadAllGuitars, (state, action) => {
      state.allGuitars = action.payload;
    })
    .addCase(loadGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(putGuitarInCart, (state, action) => {
      state.guitarsInCart = putGuitarsInCart(state, action.payload);
    })
    .addCase(setCustomGuitarCount, (state, action) => {
      state.guitarsInCart = setCustomCount(state, action.payload);
    })
    .addCase(decreseGuitarInCart, (state, action) => {
      state.guitarsInCart = decreseGuitarCountInCart(state, action.payload);
    })
    .addCase(deleteGuitarFromCart, (state, action) => {
      state.guitarsInCart = deleteGuitarsInCart(state, action.payload);
    })
    .addCase(setIsGuitarsLoaded, (state, action) => {
      state.isGuitarsLoaded = action.payload;
    })
    .addCase(loadProductInfo, (state, action) => {
      state.guitar = action.payload;
    })
    .addCase(setIsGuitarLoaded, (state, action) => {
      state.isGuitarLoaded = action.payload;
    })
    .addCase(loadTotalCount, (state, action) => {
      state.totalCount = action.payload;
    })
    .addCase(loadCommentsCount, (state, action) => {
      state.commentsCount.push(action.payload);
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setCurrentPage, (state, action) => {
      state.currentPage = action.payload;
    })
    .addCase(setMinPrice, (state, action) => {
      state.minPrice = action.payload;
    })
    .addCase(setMaxPrice, (state, action) => {
      state.maxPrice = action.payload;
    })
    .addCase(setMinPricePlaceholder, (state, action) => {
      state.minPricePlaceholder = action.payload;
    })
    .addCase(setMaxPricePlaceholder, (state, action) => {
      state.maxPricePlaceholder = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(setSortOrder, (state, action) => {
      state.sortOrder = action.payload;
    })
    .addCase(setGuitarTypes, (state, action) => {
      state.guitarTypes = action.payload;
    })
    .addCase(setStringsCounts, (state, action) => {
      state.stringsCounts = action.payload;
    })
    .addCase(setProductTab, (state, action) => {
      state.productTab = action.payload;
    });
});

export { reducer, initialState };
