import UserTable from '../components/UserTable';
import MenuAppBar from '../components/MenuAppBar';
import FloatingButtonAddUser from '../components/FloatingButtonAddUser';
import { useEffect, useState } from 'react';
import api from '../data/api';

function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get('/user/getAll')
    .then( (response) => {
      setUsers(response.data);
    });
  }, []);

  const handleNewUser = (user) => {
    setUsers([...users, user]);
  }

  const handleDeleteUser = (id) => {
    const newUsersList = users.filter((user) => user.id !== id);
    setUsers(newUsersList);
  }

  const handleEditUser = (updatedUser) => {
    const newUsersList = users.map((user) => {
      if(user.id === updatedUser.id) {
        const newUser = {
          ...user,
          name: updatedUser.name,
          email: updatedUser.email,
          password: updatedUser.password,
          birthday: updatedUser.birthday
        };
        return newUser;
      }
      return user;
    });
    setUsers(newUsersList);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <MenuAppBar />
      </header>
      <body>
        <h2>Users</h2>
        <UserTable users={users} handleDeleteUser={handleDeleteUser} handleEditUser={handleEditUser} />
        <FloatingButtonAddUser handleNewUser={handleNewUser} />
      </body>
    </div>
  );
}

export default UsersPage;
