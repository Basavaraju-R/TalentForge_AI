import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider Initialized - Listening for Auth State Changes");
    
    // Listen to Firebase Auth state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Firebase Auth detected user:", user.uid);
        setCurrentUser(user);
      } else {
        // FALLBACK: If there is no real Firebase user, check if we did the "mock" login
        const isMockAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        if (isMockAuthenticated) {
          console.log("No Firebase user, but Mock Auth detected. Permitting access.");
          setCurrentUser({ uid: 'mock-user-123', email: 'mock@example.com', role: 'student' });
        } else {
          setCurrentUser(null);
        }
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase Auth Error (Likely invalid API Key):", error);
      // Fallback in case of hard crash
      const isMockAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      setCurrentUser(isMockAuthenticated ? { uid: 'mock-user-123' } : null);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
