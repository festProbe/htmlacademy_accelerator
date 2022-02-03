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
import MainLayout from "./main-layout";

const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<ReducerState, Action, ThunkDispatch<ReducerState, typeof api, Action>>(middlewares);
const store = mockStore(initialState);

describe('Component: MainLayout', () => {
  it('should render correctly', () => {
    const fakeMainLayout = (
      <Provider store={store}>
        <Router history={history}>
          <MainLayout children={<div>Component</div>}/>
        </Router>
      </Provider>
    )
    render(fakeMainLayout);
    expect(screen.getByText(/Component/i)).toBeInTheDocument();
  });
});
