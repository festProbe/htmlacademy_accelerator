import {ArrayParam, NumberParam, StringParam} from 'use-query-params';

export type Params = {
  page: typeof NumberParam,
  'price_gte': typeof StringParam,
  'price_lte': typeof StringParam,
  type: typeof ArrayParam,
  stringCount: typeof ArrayParam,
  _sort: typeof StringParam,
  _order: typeof StringParam,
}

export type parsedUrlType = {
  page?: number,
  'price_gte'?: string,
  'price_lte'?: string,
  type?: string[],
  stringCount?: string[],
  _sort?: string,
  _order?: string,
};
