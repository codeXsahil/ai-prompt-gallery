import { useState, useEffect } from 'react';
import { signInAnonymously, onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, isConfigured } from '@/lib/firebase';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isConfigured) {
            setLoading(false);
            return;
        }

        const initAuth = async () => {
            try {
                if (!auth.currentUser) {
                    await signInAnonymously(auth);
                }
            } catch (err: any) {
                console.error("Auth error:", err);
                if (err.code === 'auth/configuration-not-found' || err.code === 'auth/operation-not-allowed') {
                    setError("SETUP REQUIRED: Enable 'Anonymous' Sign-in in Firebase Console");
                } else {
                    setError(err.message);
                }
            }
        };

        initAuth();

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        if (!auth) return;
        await signOut(auth);
        await signInAnonymously(auth);
    };

    return {
        user,
        loading,
        error,
        isAdmin: !!(user && !user.isAnonymous),
        logout
    };
};
