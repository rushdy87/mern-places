import UsersList from '../components/UsersList/UsersList';

const users = [
  {
    id: 12131,
    name: 'Leo Messi',
    image:
      'https://wallpapers.com/images/hd/messi-pictures-jzykf84saw6wbkd6.jpg',
    placeCount: 8,
  },
];

const Users = () => {
  return (
    <div>
      <UsersList items={users} />
    </div>
  );
};

export default Users;
