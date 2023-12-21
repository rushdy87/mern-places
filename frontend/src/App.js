import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Users, Auth } from './user/pages';
import { MainNavigation } from './shared/components/Navigation';
import { UpdatePlace, UserPlaces, NewPlace } from './places/pages';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks';

const App = () => {
  const { token, login, logout, userId } = useAuth();
  let routes;
  if (token) {
    routes = (
      <>
        <Route path='/' element={<Users />} />
        <Route path='/places/new' element={<NewPlace />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path='/places/:placeId' element={<UpdatePlace />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path='/' element={<Users />} />
        <Route path='/:userId/places' element={<UserPlaces />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='*' element={<Navigate to='/auth' replace />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Routes>{routes}</Routes>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
