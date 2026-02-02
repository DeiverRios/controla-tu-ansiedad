"use client";

import { useState } from "react";
import { ShieldCheck, Wind, AlertCircle, BookOpen } from "lucide-react";
import AccessGate from "@/components/AccessGate";
import StreakCounter from "@/components/StreakCounter";
import BreathingModal from "@/components/BreathingModal";

export default function Dashboard() {
    const [showBreathing, setShowBreathing] = useState(false);

    return (
        <AccessGate>
            <div className="min-h-screen bg-slate-50 p-6 pb-24">
                {/* Header */}
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Hola, valiente.</h1>
                        <p className="text-slate-500">Tu espacio seguro está listo.</p>
                    </div>
                    <div className="bg-white p-2 rounded-full shadow-sm">
                        <ShieldCheck className="text-green-600 w-6 h-6" />
                    </div>
                </header>

                {/* MODAL DE RESPIRACIÓN (Se muestra solo cuando showBreathing es true) */}
                {showBreathing && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        {/* Si el componente BreathingModal no maneja el fondo, lo ponemos aquí */}
                        <BreathingModal onClose={() => setShowBreathing(false)} />
                        {/* Botón de cierre de emergencia por si acaso */}
                        <button
                            onClick={() => setShowBreathing(false)}
                            className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full z-[60]"
                        >
                            ✕
                        </button>
                    </div>
                )}

                <div className="grid gap-6">
                    {/* 1. CONTADOR DE DÍAS (Componente Nuevo) */}
                    <StreakCounter />

                    {/* 2. BOTÓN DE PÁNICO (Existente) */}
                    <div className="bg-red-50 p-6 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden group active:scale-95 transition-transform">
                        <div className="relative z-10">
                            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                <AlertCircle className="text-red-500 w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-1">Botón de Pánico</h3>
                            <p className="text-slate-500 text-sm mb-4">Ayuda inmediata para crisis.</p>
                            <button className="w-full bg-red-500 text-white font-bold py-3 rounded-xl shadow-red-200 shadow-lg">
                                Activar Protocolo SOS
                            </button>
                        </div>
                    </div>

                    {/* 3. RESPIRACIÓN GUIADA (Conectado al Modal) */}
                    <div className="bg-green-50 p-6 rounded-2xl border border-green-100 shadow-sm relative overflow-hidden">
                        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <Wind className="text-green-500 w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Respiración Guiada</h3>
                        <p className="text-slate-500 text-sm mb-4">Bajar revoluciones en 3 min</p>
                        <button
                            onClick={() => setShowBreathing(true)}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl transition-colors"
                        >
                            Iniciar
                        </button>
                    </div>

                    {/* 4. GUÍAS (Placeholder) */}
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm">
                        <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <BookOpen className="text-blue-500 w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-1">Tus Guías</h3>
                        <p className="text-slate-500 text-sm mb-4">Material de lectura rápida.</p>
                        <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-xl border border-blue-200">
                            Leer Ahora
                        </button>
                    </div>

                </div>
            </div>
        </AccessGate>
    );
}