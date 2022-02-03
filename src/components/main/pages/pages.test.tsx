import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import {createAPI} from "../../../api/api";
import thunk, {ThunkDispatch} from "redux-thunk";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {ReducerState} from "../../../types/state";
import {Action} from "@reduxjs/toolkit";
import {initialState} from "../../../store/reducer";
import {Provider} from "react-redux";
import Pages from "./pages";

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);

describe('Component: Pages', () => {
  it('should render correctly', () => {
    const fakePages = (
      <Provider store={store}>
        <Router history={history}>
          <Pages />
        </Router>
      </Provider>
    )
    render(fakePages);
    expect(screen.getByText(/Далее/i)).toBeInTheDocument();
  });
});
