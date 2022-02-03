import {render, screen} from "@testing-library/react";
import Footer from "./footer";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";

const history = createMemoryHistory();
const fakeFooter = (
  <Router history={history}>
    <Footer/>
  </Router>
)

describe('Component: Footer', () => {
  it('should render correctly', () => {

    render(fakeFooter);
    expect(screen.getByText(/Магазин гитар, музыкальных инструментов и гитарная мастерская/i)).toBeInTheDocument();
  });
});
