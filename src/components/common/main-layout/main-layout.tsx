import Footer from '../footer/footer';
import Header from '../header/header';
import SVGs from '../svgs/svgs';

type MainLayoutProps = {
  children: JSX.Element,
}

function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <>
      <SVGs />
      <div className="wrapper">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default MainLayout;
