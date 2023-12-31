import { Card } from '../../../shared/components/UIElements';
import UserItem from '../UserItem/UserItem';

import './UsersList.css';

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div>
        <Card className='center'>
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }
  return (
    <ul className='users-list'>
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          image={user.image}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
};

export default UsersList;
