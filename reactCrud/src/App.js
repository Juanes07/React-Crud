import React, { useState, useEffect } from "react";
import UserTable from "./components/UserTable/UserTable";
import { v4 as uuidv4 } from "uuid";
import AddUserForm from "./components/AddUserForm/AddUserForm";
import EditUserForm from "./components/EditUserForm/EditUserForm";

const KEY = "Users_Save"

const App = () => {
  // const usersData = [
  //   { id: uuidv4(), name: "Tania", username: "floppydiskette" },
  //   { id: uuidv4(), name: "Craig", username: "siliconeidolon" },
  //   { id: uuidv4(), name: "Ben", username: "benisphere" },
  // ];
  
  
  /**
   * creando local Storage
   */
  const localStorageUser = localStorage.getItem(KEY)
  let parsedUsers;

  if(!localStorageUser){
    localStorage.setItem(KEY, JSON.stringify([{}]))
    parsedUsers = [{}];
  } else {
    parsedUsers = JSON.parse(localStorageUser)
  }
  /**
   * State
   */
  const [users, setUsers] = useState(parsedUsers);

  /**
   * Controlador LocalStorage
   */
  useEffect(()=> {
    localStorage.setItem(KEY, JSON.stringify(users))
  }, [users])



  /**
   * Agregar usuarios
   */
  const addUser = (user) => {
    user.id = uuidv4();
    setUsers([...users, user]);
  };

  /**
   * Eliminar usuario
   */

  const deleteUser = (id) => {
    const arrayFiltrado = users.filter((user) => user.id !== id);
    setUsers(arrayFiltrado);
  };

  /**
   * Editar Usuario
   */
  const [editing, setEditing] = useState(false);

  const [currentUser, setCurrentUSer] = useState({
    id: null,
    name: "",
    username: "",
  });

  const editRow = (user) => {
    setEditing(true);
    setCurrentUSer({
      id: user.id,
      name: user.name,
      username: user.username,
    });
  };

  const updateUser = (id, updateUser) => {
    setEditing(false)
    setUsers(users.map(user => (user.id === id ? updateUser : user)))
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <div>
              <h2>Editar Usuario</h2>
              <EditUserForm currentUser={currentUser}
              updateUser={updateUser} 
              />
            </div>
          ) : (
            <div>
              <h2>Agregar Usuario</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserTable
            users={users}
            deleteUser={deleteUser}
            editRow={editRow}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
