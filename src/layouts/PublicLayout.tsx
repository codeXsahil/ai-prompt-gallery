import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';

export const PublicLayout = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const { isAdmin, logout } = useAuth();

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                isAdmin={isAdmin}
                handleLogout={logout}
            />
            <main className="flex-grow">
                <Outlet context={{ searchTerm, setSearchTerm }} />
            </main>
            <Footer />
        </div>
    );
};
