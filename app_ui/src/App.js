import UserContext from './context/user';
import { useState, useContext, useEffect } from "react";
import FirebaseContext from "./context/firebase";

function App() {
  const { firebase } = useContext(FirebaseContext)

  console.log(firebase)
  return (
    // <UserContext.Provider value={user}  >
    <div className="App">
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
    // </UserContext.Provider>
  );
}

export default App;
