import { useEffect, useState } from "react";
import { db } from "./Firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "./App.css";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    //addDoc will add document in firebase which holds name and age
    //it accepts two arguments first one - reference tot the userCollection
    //second one - objects to be added in the document
    await addDoc(usersCollectionRef, {
      name: newName,
      age: newAge,
    });
  };

  const updateUser = async (id, age) => {
    //doc will map to the particular document we are going to update the age
    const userDoc = doc(db, "users", id);
    const newFields = { age: Number(age) + 1 };
    //updateDoc will get arguments 1st - unique doc that has to be updated
    // 2nd - field that has to be updated within doc
    updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    deleteDoc(userDoc);
  };

  //useEffect function will call everytime when the page renders
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      //getDocs will get documents from specific collection
      // console.log(data);
      // console.log(data.docs);
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Enter a Name"
        onChange={(event) => setNewName(event.target.value)}
      />
      <input
        type="number"
        placeholder="Enter the age"
        onChange={(event) => setNewAge(event.target.value)}
      />
      <button onClick={createUser}>Create User</button>
      {users.map((user) => {
        return (
          <div>
            <h1>Name: {user.name} </h1>
            <h1>Age: {user.age}</h1>
            {/* Increase age button will increase age by 1 as per our logic
            create onclick function by passing the age and id of users
             */}
            <button onClick={() => updateUser(user.id, user.age)}>
              Increase Age
            </button>
            <button onClick={() => deleteUser(user.id)}>Delete User</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
