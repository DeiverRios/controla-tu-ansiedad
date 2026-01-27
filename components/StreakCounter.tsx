'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, RotateCcw } from 'lucide-react';

export default function StreakCounter() {
    const [days, setDays] = useState(0);
    const [progress, setProgress] = useState(0);

    const calculateDays = () => {
        const storedDate = localStorage.getItem('last_crisis_date');
        const lastDate = storedDate ? new Date(storedDate) : new Date();
        const now = new Date();

        // Reset time part to ensure we count full days roughly or just day difference
        // A simplified diff in days:
        const diffTime = Math.abs(now.getTime() - lastDate.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // If no stored date, it means we start today, so 0 days. 
        // Logic: checking if localStorage exists is better.
        if (!storedDate) {
            // First time logic: Assume today is day 0 or user just started. 
            // The prompt says: "Si no existe, asume que es HOY (0 días)."
            // So we set it to Now implicitly for calculation, but maybe don't save it yet until reset?
            // Actually, let's just show 0.
            return 0;
        }

        return diffDays;
    };

    useEffect(() => {
        const d = calculateDays();
        setDays(d);
        // Goal: 30 days. Cap at 100%
        const prog = Math.min((d / 30) * 100, 100);
        setProgress(prog);
    }, []);

    const handleReset = () => {
        if (confirm('¿Estás seguro de reiniciar tu contador? Esto no es un fracaso, es un nuevo comienzo.')) {
            const now = new Date();
            localStorage.setItem('last_crisis_date', now.toISOString());
            setDays(0);
            setProgress(0);
        }
    };

    return (
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-end mb-2">
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        Días consecutivos sin crisis
                    </span>
                    <span className="text-4xl font-bold text-[#4CAF50] mt-1">{days}</span>
                </div>

                <button
                    onClick={handleReset}
                    className="text-xs text-gray-400 hover:text-red-500 underline flex items-center gap-1 transition-colors"
                >
                    <RotateCcw className="w-3 h-3" />
                    Tuve una crisis hoy
                </button>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-3 mt-4 relative overflow-hidden">
                <div
                    className="bg-gradient-to-r from-[#4CAF50] to-green-300 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${Math.max(progress, 5)}%` }} // Min 5% so it's visible
                ></div>
            </div>

            <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>{days === 0 ? 'Cada día cuenta.' : '¡Sigue así!'}</span>
                <span>Meta: 30 días</span>
            </div>
        </section>
    );
}
