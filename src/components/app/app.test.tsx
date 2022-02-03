import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from './app';
import { AppRoute } from '../../utils/const';


const mockStore = configureMockStore();


const store = mockStore({
  guitars: [],
  guitar: null,
  totalCount: 0,
  comments: [],
  currentPage: 1,
  minPrice: '',
  maxPrice: '',
  sortType: '',
  sortOrder: '',
  guitarTypes: [],
  stringsCounts: [],
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('App test', () => {
  it('should render main when user navigate /', () => {
    history.push(AppRoute.MAIN);
    render(fakeApp);

    expect(screen.getByText(/Каталог гитар/i)).toBeInTheDocument();
  });

  it('should render cart when user navigate /cart', () => {
    history.push(AppRoute.CART);
    render(fakeApp);

    expect(screen.getByText(/Промокод на скидку/i)).toBeInTheDocument();
  });
});
