import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
// import { Users, Auth } from './user/pages';
import { MainNavigation } from './shared/components/Navigation';
// import { UpdatePlace, UserPlaces, NewPlace } from './places/pages';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks';
import { LoadingSpinner } from './shared/components/UIElements';

const Users = React.lazy(() => import('./user/pages/Users'));
const Auth = React.lazy(() => import('./user/pages/Auth/Auth'));
const UpdatePlace = React.lazy(() =>
  import('./places/pages').then((module) => ({ default: module.UpdatePlace }))
);
const UserPlaces = React.lazy(() =>
  import('./places/pages').then((module) => ({ default: module.UserPlaces }))
);
const NewPlace = React.lazy(() =>
  import('./places/pages').then((module) => ({ default: module.NewPlace }))
);

const App = () => {
  const { token, login, logout, userId } = useAuth();

  const renderRoutes = token ? (
    <Routes>
      <Route path='/' element={<Users />} />
      <Route path='/places/new' element={<NewPlace />} />
      <Route path='/:userId/places' element={<UserPlaces />} />
      <Route path='/places/:placeId' element={<UpdatePlace />} />
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  ) : (
    <Routes>
      <Route path='/' element={<Users />} />
      <Route path='/:userId/places' element={<UserPlaces />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='*' element={<Navigate to='/auth' replace />} />
    </Routes>
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className='center'>
                <LoadingSpinner />
              </div>
            }
          >
            {renderRoutes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
