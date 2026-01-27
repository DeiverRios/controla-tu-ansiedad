'use client';

import React, { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

export default function AccessGate({ children }: { children: React.ReactNode }) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const hasAccess = localStorage.getItem('dashboard_access');
        if (hasAccess === 'true') {
            setIsAuthorized(true);
        }
        setIsLoading(false);
    }, []);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'PAZ2026') {
            localStorage.setItem('dashboard_access', 'true');
            setIsAuthorized(true);
            setError(false);
        } else {
            setError(true);
        }
    };

    if (isLoading) {
        return null; // O un spinner si prefieres
    }

    if (isAuthorized) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-slate-100 p-4 rounded-full">
                        <Lock className="w-8 h-8 text-slate-700" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Área Exclusiva para Miembros</h1>
                <p className="text-gray-500 mb-8">Introduce tu código de acceso VIP</p>

                <form onSubmit={handleUnlock} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                            placeholder="Contraseña"
                            className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-slate-900'
                                } focus:outline-none focus:ring-2 bg-gray-50 transition-all`}
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-2 text-left animate-pulse">
                                Código incorrecto
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-colors shadow-lg hover:shadow-xl transform active:scale-95 duration-200"
                    >
                        Desbloquear
                    </button>
                </form>
            </div>
        </div>
    );
}
