import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { db, type User } from '../db';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = 'land2build_user_id';

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Restore session on mount
    useEffect(() => {
        const restoreSession = async () => {
            const savedUserId = localStorage.getItem(SESSION_KEY);
            if (savedUserId) {
                const foundUser = await db.users.get(parseInt(savedUserId));
                if (foundUser) {
                    setUser(foundUser);
                } else {
                    localStorage.removeItem(SESSION_KEY);
                }
            }
            setLoading(false);
        };
        restoreSession();
    }, []);

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        const foundUser = await db.users.where('email').equals(email.toLowerCase()).first();

        if (!foundUser) {
            return { success: false, error: 'No account found with this email' };
        }

        if (foundUser.password !== password) {
            return { success: false, error: 'Incorrect password' };
        }

        setUser(foundUser);
        localStorage.setItem(SESSION_KEY, String(foundUser.id));
        return { success: true };
    };

    const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
        const existing = await db.users.where('email').equals(email.toLowerCase()).first();

        if (existing) {
            return { success: false, error: 'An account with this email already exists' };
        }

        const id = await db.users.add({
            email: email.toLowerCase(),
            password,
            name,
            createdAt: new Date()
        });

        const newUser = await db.users.get(id);
        if (newUser) {
            setUser(newUser);
            localStorage.setItem(SESSION_KEY, String(newUser.id));
        }

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(SESSION_KEY);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
