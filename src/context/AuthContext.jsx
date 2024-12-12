import { createContext, useContext, useState, useEffect } from 'react';
import { auth, onAuthStateChanged } from '../../firebase'; // Ajusta la ruta según tu configuración

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // Puedes extraer datos específicos del usuario
                const { displayName, email, uid } = currentUser;
                setUser({ displayName, email, uid });
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
