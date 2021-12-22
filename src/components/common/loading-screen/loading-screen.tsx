import MainLayout from '../main-layout/main-layout';

function LoadingScreen(): JSX.Element {
  return (
    <MainLayout>
      <div className="page-content__title title title--bigger">Loading...</div>
    </MainLayout>
  );
}

export default LoadingScreen;
