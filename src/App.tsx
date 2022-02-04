import { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { firebase, auth } from './services/firebase';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

type User = {
  uid: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => void;
}

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>();

  const handleSetUser = (firebaseUser: any) => {
    const { displayName, photoURL, uid} = firebaseUser;

    if (!displayName || !photoURL) {
      throw new Error('Missing information from Google Account.');
    }

    setUser({
      uid: uid,
      name: displayName,
      avatar: photoURL
    });
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        handleSetUser(user)
      }
    })
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
        
    const result = await auth.signInWithPopup(provider)

    if (result.user) {
      handleSetUser(result.user)
    }
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, signInWithGoogle }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/rooms/new' element={<NewRoom />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
