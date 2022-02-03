import {render, screen} from "@testing-library/react";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import Header from "./header";
import {createAPI} from "../../../api/api";
import thunk, {ThunkDispatch} from "redux-thunk";
import {configureMockStore} from "@jedmao/redux-mock-store";
import {ReducerState} from "../../../types/state";
import {Action} from "@reduxjs/toolkit";
import {initialState} from "../../../store/reducer";
import {Provider} from "react-redux";

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);
const fakeHeader = (
  <Provider store={store}>
    <Router history={history}>
      <Header/>
    </Router>
  </Provider>
)

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(fakeHeader);
    expect(screen.getByAltText(/Логотип/i)).toBeInTheDocument();
  });
});
