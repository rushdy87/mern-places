import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Users, Auth } from './user/pages';
import { MainNavigation } from './shared/components/Navigation';
import { UpdatePlace, UserPlaces, NewPlace } from './places/pages';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path='/' element={<Users />} />
          <Route path='/places/new' element={<NewPlace />} />
          <Route path='/:userId/places' element={<UserPlaces />} />
          <Route path='/places/:placeId' element={<UpdatePlace />} />
          <Route path='*' element={<Navigate to='/' replace />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
