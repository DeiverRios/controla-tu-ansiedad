"use client";

import { useState, useEffect, useRef } from "react";
import {
    ShieldCheck,
    Wind,
    AlertTriangle,
    Map as MapIcon,
    ClipboardList,
    Book,
    CheckSquare,
    Brain,
    Users,
    X,
    HeartPulse,
    Save
} from "lucide-react";
import AccessGate from "@/components/AccessGate";

// --- CONTENIDO DE LA BÓVEDA ---
const vaultContent: { [key: string]: React.ReactNode } = {
    "Plan de Acción": (
        <div className="text-left space-y-4">
            <h3 className="text-2xl font-bold text-indigo-700 mb-2">Tu Plan de Acción Inmediato</h3>
            <p className="text-slate-600">La ansiedad te hace sentir que pierdes el control. Este plan te lo devuelve. Cuando sientas que la ansiedad sube, sigue estos 3 pasos:</p>
            <ul className="list-disc pl-5 space-y-3 text-slate-700">
                <li>
                    <strong>1. Reconoce y Acepta:</strong> Di en voz alta: "Estoy sintiendo ansiedad. Es incómodo, pero no es peligroso".
                </li>
                <li>
                    <strong>2. Desactiva el Cuerpo:</strong> Usa el botón verde de "Respiración Guiada" en tu panel principal. Cumple los 3 minutos sin juzgarte.
                </li>
                <li>
                    <strong>3. Redirige el Foco:</strong> Cambia de ambiente. Lávate la cara con agua muy fría o toma un vaso de agua helada. El choque térmico "reinicia" el sistema nervioso.
                </li>
            </ul>
        </div>
    ),
    "Bitácora de Síntomas": (
        <div className="text-left space-y-4">
            <h3 className="text-2xl font-bold text-violet-700 mb-2">Tu Rastreador de Patrones</h3>
            <p className="text-slate-600">Escribir saca la ansiedad de tu cabeza y la pone en el papel, donde puedes controlarla. Hazte estas 3 preguntas cada noche:</p>
            <ul className="list-disc pl-5 space-y-3 text-slate-700">
                <li>
                    <strong>¿Qué detonó mi estrés hoy?</strong> (Ej: Un correo del jefe, pensar en el futuro, exceso de café).
                </li>
                <li>
                    <strong>¿Cómo reaccionó mi cuerpo?</strong> (Ej: Tensión en el cuello, respiración corta).
                </li>
                <li>
                    <strong>¿Qué técnica me funcionó para bajar la intensidad?</strong>
                </li>
            </ul>
            <p className="text-slate-600 font-medium italic mt-2">Identificar tu patrón es el primer paso para hackearlo.</p>
        </div>
    ),
    "Mapa de Confianza": (
        <div className="text-left space-y-4">
            <h3 className="text-2xl font-bold text-emerald-700 mb-2">Reconstruye tu Seguridad</h3>
            <p className="text-slate-600">La ansiedad borra tu memoria de éxito y te hace creer que no puedes. Vamos a construir tu escudo.</p>
            <ul className="list-disc pl-5 space-y-3 text-slate-700">
                <li>
                    <strong>El Archivo de Victorias:</strong> Recuerda 3 momentos donde sentiste mucha ansiedad y, aun así, lo lograste (un examen, una entrevista, una charla difícil). Sobreviviste al 100% de tus peores días.
                </li>
                <li>
                    <strong>Tu Mantra Ancla:</strong> Elige una frase corta. Ej: "Mi mente está asustada, pero mi cuerpo está a salvo".
                </li>
            </ul>
        </div>
    ),
    "Checklist Calma": (
        <div className="text-left space-y-4">
            <h3 className="text-2xl font-bold text-amber-700 mb-2">Hábitos Anti-Ansiedad</h3>
            <p className="text-slate-600">Un sistema nervioso alterado necesita un entorno predecible. Revisa estos básicos diarios:</p>
            <ul className="list-disc pl-5 space-y-3 text-slate-700">
                <li>
                    <strong>Cafeína Táctica:</strong> Evita el café o energizantes después de las 2:00 PM. La cafeína imita los síntomas físicos del pánico.
                </li>
                <li>
                    <strong>Descarga Matutina:</strong> Al despertar, no mires el celular. Anota en un papel 3 cosas que te preocupan y déjalas ahí.
                </li>
                <li>
                    <strong>Movimiento Obligatorio:</strong> 15 minutos de caminata rápida "queman" el exceso de cortisol (la hormona del estrés) en tu sangre.
                </li>
            </ul>
        </div>
    ),
    "Guía Anti-Rumiación": (
        <div className="text-left space-y-4">
            <h3 className="text-2xl font-bold text-pink-700 mb-2">Detén el Bucle Mental</h3>
            <p className="text-slate-600">Rumiar es darle vueltas al mismo pensamiento negativo. Usa la técnica del "Cuestionamiento Socrático":</p>
            <ul className="list-disc pl-5 space-y-3 text-slate-700">
                <li>
                    <strong>Identifica el pensamiento:</strong> Ej: "Todo va a salir mal hoy".
                </li>
                <li>
                    <strong>Busca evidencia:</strong> ¿Qué pruebas reales (no imaginadas) tengo de que esto es 100% cierto?
                </li>
                <li>
                    <strong>Cambia el "Y si..." por "Aun si...":</strong> En lugar de "¿Y si me da un ataque?", di: "Aun si me siento mal, sé cómo respirar y salir de ahí".
                </li>
            </ul>
        </div>
    ),
    "Ansiedad Social": (
        <div className="text-left space-y-4">
            <h3 className="text-2xl font-bold text-cyan-700 mb-2">Módulo de Relaciones</h3>
            <p className="text-slate-600">El miedo a ser juzgado nos paraliza. Aquí tienes tu protocolo para eventos sociales:</p>
            <ul className="list-disc pl-5 space-y-3 text-slate-700">
                <li>
                    <strong>El Foco Externo:</strong> La ansiedad social te hace mirarte a ti mismo (tu sudor, tus manos, tu voz). Obliga a tu cerebro a mirar afuera: fíjate en el color de los ojos de quien te habla o busca 3 cosas azules en la habitación.
                </li>
                <li>
                    <strong>Permiso para pausar:</strong> Si te abrumas, ir al baño por 3 minutos a respirar no es huir, es recargar munición.
                </li>
            </ul>
        </div>
    )
};

// --- COMPONENTES EXTERNOS PARA EVITAR RE-RENDER ---

// 1. Modal Onboarding
const OnboardingModal = ({ onSave, onSkip }: { onSave: (name: string) => void, onSkip: () => void }) => {
    const [inputValue, setInputValue] = useState("");
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white w-[90%] max-w-lg p-8 rounded-3xl shadow-2xl text-center">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Bienvenido a tu Espacio Seguro</h2>
                <p className="text-slate-500 mb-6">Para dirigirnos a ti con cariño, ¿cómo te gusta que te llamen?</p>
                <input
                    type="text"
                    placeholder="Tu nombre o apodo..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 mb-6 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onSave(inputValue)}
                    autoFocus
                />
                <button
                    onClick={() => onSave(inputValue)}
                    disabled={!inputValue.trim()}
                    className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Comenzar
                </button>
                <button
                    onClick={onSkip}
                    className="mt-4 text-sm text-slate-400 hover:text-slate-600 font-medium"
                >
                    Omitir por ahora
                </button>
            </div>
        </div>
    );
};

// 2. Modal SOS
const SOSModal = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-500/95 backdrop-blur-sm p-4 text-white animate-in fade-in zoom-in duration-300">
        <button
            onClick={onClose}
            className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
        >
            <X size={32} />
        </button>
        <div className="max-w-2xl w-full text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Técnica de Aterrizaje</h2>
            <div className="space-y-6 text-xl md:text-2xl font-medium">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
                    <span className="block text-5xl font-bold mb-2">5</span>
                    Cosas que puedes <span className="font-bold underline decoration-white/50">ver</span>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
                    <span className="block text-5xl font-bold mb-2">4</span>
                    Cosas que puedes <span className="font-bold underline decoration-white/50">tocar</span>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
                    <span className="block text-5xl font-bold mb-2">3</span>
                    Cosas que puedes <span className="font-bold underline decoration-white/50">escuchar</span>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
                    <span className="block text-5xl font-bold mb-2">2</span>
                    Cosas que puedes <span className="font-bold underline decoration-white/50">oler</span>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
                    <span className="block text-5xl font-bold mb-2">1</span>
                    Cosa que puedes <span className="font-bold underline decoration-white/50">saborear</span>
                </div>
            </div>
            <p className="mt-8 text-white/80">Respira. Estás a salvo.</p>
        </div>
    </div>
);

// 3. Respiración Guiada
const BreathingTool = ({ onClose }: { onClose: () => void }) => {
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'finished'>('inhale');
    const [cycleTimer, setCycleTimer] = useState(4); // Timer interno del ciclo
    const [text, setText] = useState('Inhala');
    const [totalTimeLeft, setTotalTimeLeft] = useState(180); // 3 minutos

    // Efecto del Timer Global (3 min)
    useEffect(() => {
        const timer = setInterval(() => {
            setTotalTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setPhase('finished');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Efecto del Ciclo de Respiración (Solo si no ha terminado)
    useEffect(() => {
        if (phase === 'finished') return;

        let interval: NodeJS.Timeout;
        const runCycle = () => {
            if (phase === 'inhale') {
                if (cycleTimer > 0) {
                    setCycleTimer(t => t - 1);
                } else {
                    setPhase('hold');
                    setCycleTimer(7);
                    setText('Sostén');
                }
            } else if (phase === 'hold') {
                if (cycleTimer > 0) {
                    setCycleTimer(t => t - 1);
                } else {
                    setPhase('exhale');
                    setCycleTimer(8);
                    setText('Exhala');
                }
            } else if (phase === 'exhale') {
                if (cycleTimer > 0) {
                    setCycleTimer(t => t - 1);
                } else {
                    setPhase('inhale');
                    setCycleTimer(4);
                    setText('Inhala');
                }
            }
        };
        interval = setInterval(runCycle, 1000);
        return () => clearInterval(interval);
    }, [phase, cycleTimer]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-900/95 backdrop-blur-sm p-4 text-white animate-in fade-in duration-500">
            <button
                onClick={onClose}
                className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
            >
                <X size={32} />
            </button>

            <h2 className="text-3xl font-bold mb-4 text-blue-100">Respiración 4-7-8</h2>

            <div className="mb-8 px-4 py-1 bg-blue-800/50 rounded-full font-mono text-xl tracking-wider text-blue-200">
                {formatTime(totalTimeLeft)}
            </div>

            <div className="relative flex items-center justify-center mb-12">
                {phase !== 'finished' ? (
                    <>
                        <div className={`absolute w-64 h-64 rounded-full border-4 border-white/30 transition-all duration-[4000ms] ease-in-out ${phase === 'inhale' ? 'scale-150 opacity-100' : phase === 'exhale' ? 'scale-100 opacity-50' : 'scale-150 opacity-100'}`} />
                        <div className={`absolute w-48 h-48 rounded-full bg-white/10 backdrop-blur-md transition-all duration-[4000ms] ease-in-out ${phase === 'inhale' ? 'scale-125' : phase === 'exhale' ? 'scale-75' : 'scale-125'}`} />

                        <div className="z-10 text-center">
                            <span className="block text-6xl font-bold mb-2">{cycleTimer}</span>
                            <span className="text-2xl font-light tracking-widest uppercase">{text}</span>
                        </div>
                    </>
                ) : (
                    <div className="text-center animate-in zoom-in duration-500">
                        <HeartPulse className="w-24 h-24 mx-auto mb-4 text-emerald-400" />
                        <h3 className="text-2xl font-bold mb-2">Ciclo completado.</h3>
                        <p className="text-blue-200">Has recuperado el control.</p>
                    </div>
                )}
            </div>

            <p className="text-blue-200/80 max-w-md text-center">
                {phase === 'finished'
                    ? "Puedes cerrar esta ventana cuando te sientas listo."
                    : "Sigue el ritmo. Tu cuerpo sabe cómo volver a la calma."}
            </p>
        </div>
    );
};

// 4. Modal Bóveda
const VaultModal = ({
    selectedResource,
    onClose,
    journalText,
    setJournalText,
    onSaveJournal
}: {
    selectedResource: { title: string, color: string },
    onClose: () => void,
    journalText: string,
    setJournalText: (text: string) => void,
    onSaveJournal: () => void
}) => {
    const content = vaultContent[selectedResource.title];
    const isJournal = selectedResource.title === "Bitácora de Síntomas";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-[90%] max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-slate-800 line-clamp-1">
                            {selectedResource.title}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                    >
                        <X size={20} className="text-slate-500" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto">
                    {content ? content : (
                        <div className="text-center py-8">
                            <p className="text-slate-400">Contenido próximamente...</p>
                        </div>
                    )}

                    {isJournal && (
                        <div className="mt-8 pt-6 border-t border-slate-100 animate-in slide-in-from-bottom-5 duration-300">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Tu Registro Personal
                            </label>
                            <textarea
                                className="w-full p-4 min-h-[150px] border border-slate-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:outline-none bg-slate-50 text-slate-700 placeholder:text-slate-400 resize-none font-medium"
                                placeholder="Escribe aquí qué detonó tu ansiedad hoy y cómo lo manejaste..."
                                value={journalText}
                                onChange={(e) => setJournalText(e.target.value)}
                            />
                            <button
                                onClick={onSaveJournal}
                                className="mt-4 w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-violet-200 flex items-center justify-center gap-2"
                            >
                                <Save size={18} />
                                Guardar Registro
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Componente Tarjeta Simplificado
function ResourceCard({ icon, title, subtitle, color, onClick }: { icon: React.ReactNode, title: string, subtitle: string, color: string, onClick: () => void }) {
    const colorClasses: { [key: string]: string } = {
        indigo: 'hover:border-indigo-200 hover:shadow-indigo-100',
        violet: 'hover:border-violet-200 hover:shadow-violet-100',
        emerald: 'hover:border-emerald-200 hover:shadow-emerald-100',
        amber: 'hover:border-amber-200 hover:shadow-amber-100',
        pink: 'hover:border-pink-200 hover:shadow-pink-100',
        cyan: 'hover:border-cyan-200 hover:shadow-cyan-100',
    };

    return (
        <div
            onClick={onClick}
            className={`bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 group cursor-pointer ${colorClasses[color] || 'hover:border-gray-200'}`}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <button className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    Abrir
                </button>
            </div>
            <h3 className="font-bold text-slate-800 mb-1 group-hover:text-slate-900 transition-colors">{title}</h3>
            <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
    );
}

export default function Dashboard() {
    // --- ESTADOS DE DATOS ---
    const [daysWithoutCrisis, setDaysWithoutCrisis] = useState(0);
    const [lastResetDate, setLastResetDate] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [journalText, setJournalText] = useState('');

    // --- ESTADOS DE UI (MODALES) ---
    const [showSOS, setShowSOS] = useState(false);
    const [showBreathing, setShowBreathing] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [selectedResource, setSelectedResource] = useState<{ title: string, color: string } | null>(null);

    // --- EFECTOS INICIALES ---
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem('anxiety_tracker');
            if (savedData) {
                const { lastReset } = JSON.parse(savedData);
                setLastResetDate(lastReset);
                calculateDays(lastReset);
            } else {
                const today = new Date().toISOString();
                setLastResetDate(today);
                localStorage.setItem('anxiety_tracker', JSON.stringify({ lastReset: today }));
            }

            const storedName = localStorage.getItem('userName');
            if (storedName) {
                setUserName(storedName);
            } else {
                setShowOnboarding(true);
            }

            const savedJournal = localStorage.getItem('anxiety_journal');
            if (savedJournal) {
                setJournalText(savedJournal);
            }
        }
    }, []);

    // --- LÓGICA DE NEGOCIO ---
    const calculateDays = (dateString: string) => {
        const start = new Date(dateString).getTime();
        const now = new Date().getTime();
        const diff = now - start;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        setDaysWithoutCrisis(days >= 0 ? days : 0);
    };

    const handleCrisisReset = () => {
        if (window.confirm("Tener una crisis no borra todo lo que has avanzado. Las recaídas son parte de la sanidad. Reinicia tu contador y empieza un nuevo ciclo de victoria hoy")) {
            const today = new Date().toISOString();
            setLastResetDate(today);
            setDaysWithoutCrisis(0);
            localStorage.setItem('anxiety_tracker', JSON.stringify({ lastReset: today }));
        }
    };

    const handleSaveName = (name: string) => {
        if (!name.trim()) return;
        localStorage.setItem('userName', name);
        setUserName(name);
        setShowOnboarding(false);
    };

    const handleSaveJournal = () => {
        localStorage.setItem('anxiety_journal', journalText);
        alert("Entrada guardada en tu dispositivo seguro.");
    };

    return (
        <AccessGate>
            {showOnboarding && (
                <OnboardingModal
                    onSave={handleSaveName}
                    onSkip={() => setShowOnboarding(false)}
                />
            )}

            {showSOS && (
                <SOSModal onClose={() => setShowSOS(false)} />
            )}

            {showBreathing && (
                <BreathingTool onClose={() => setShowBreathing(false)} />
            )}

            {selectedResource && (
                <VaultModal
                    selectedResource={selectedResource}
                    onClose={() => setSelectedResource(null)}
                    journalText={journalText}
                    setJournalText={setJournalText}
                    onSaveJournal={handleSaveJournal}
                />
            )}

            <div className="min-h-screen bg-slate-50 p-6 pb-24 font-sans text-slate-800">

                {/* HEADLINE */}
                <header className="max-w-5xl mx-auto mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Hola, {userName || 'valiente'}.
                        </h1>
                        <p className="text-slate-500 mt-1">Tu espacio seguro está listo.</p>
                    </div>
                    <div className="bg-white p-3 rounded-full shadow-sm border border-slate-100">
                        <ShieldCheck className="text-emerald-500 w-6 h-6" />
                    </div>
                </header>

                <div className="max-w-5xl mx-auto space-y-8">

                    {/* 1. STREAK COUNTER */}
                    <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
                        <h2 className="text-slate-400 text-sm font-semibold tracking-wider uppercase mb-2">Días de Calma</h2>
                        <div className="text-6xl font-black text-slate-900 mb-2 font-mono tracking-tighter">
                            {daysWithoutCrisis}
                        </div>
                        <p className="text-slate-500 mb-6">Días consecutivos recuperando tu poder.</p>

                        <button
                            onClick={handleCrisisReset}
                            className="text-sm text-slate-400 hover:text-red-500 hover:underline transition-colors cursor-pointer"
                        >
                            ¿Tuviste una crisis hoy?
                        </button>

                        <p className="text-xs text-slate-400 font-medium mt-2">
                            Meta: 30 días
                        </p>
                    </section>

                    {/* 2. HERRAMIENTAS DE EMERGENCIA */}
                    <section className="grid md:grid-cols-2 gap-6">
                        {/* Botón SOS */}
                        <button
                            onClick={() => setShowSOS(true)}
                            className="group relative overflow-hidden bg-rose-50 hover:bg-rose-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all border border-rose-100 text-left"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <AlertTriangle size={120} className="text-rose-500" />
                            </div>
                            <div className="relative z-10">
                                <span className="inline-block bg-white p-3 rounded-2xl shadow-sm mb-4">
                                    <AlertTriangle className="text-rose-500 w-8 h-8" />
                                </span>
                                <h3 className="text-2xl font-bold text-rose-900 mb-2">Botón SOS</h3>
                                <p className="text-rose-700/80">Activar protocolo de emergencia.</p>
                            </div>
                        </button>

                        {/* Botón Respiración */}
                        <button
                            onClick={() => setShowBreathing(true)}
                            className="group relative overflow-hidden bg-sky-50 hover:bg-sky-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all border border-sky-100 text-left"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Wind size={120} className="text-sky-500" />
                            </div>
                            <div className="relative z-10">
                                <span className="inline-block bg-white p-3 rounded-2xl shadow-sm mb-4">
                                    <Wind className="text-sky-500 w-8 h-8" />
                                </span>
                                <h3 className="text-2xl font-bold text-sky-900 mb-2">Respiración Guiada</h3>
                                <p className="text-sky-700/80">Bajar revoluciones en 3 min.</p>
                            </div>
                        </button>
                    </section>

                    {/* 3. BÓVEDA DE RECURSOS */}
                    <section>
                        <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="h-8 w-1 bg-slate-200 rounded-full" />
                            <h2 className="text-xl font-bold text-slate-800">Tu Bóveda de Recuperación</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <ResourceCard
                                icon={<ClipboardList className="text-indigo-500" />}
                                title="Plan de Acción"
                                subtitle="Tu hoja de ruta personalizada."
                                color="indigo"
                                onClick={() => setSelectedResource({ title: "Plan de Acción", color: "indigo" })}
                            />
                            <ResourceCard
                                icon={<Book className="text-violet-500" />}
                                title="Bitácora de Síntomas"
                                subtitle="Seguimiento diario."
                                color="violet"
                                onClick={() => setSelectedResource({ title: "Bitácora de Síntomas", color: "violet" })}
                            />
                            <ResourceCard
                                icon={<MapIcon className="text-emerald-500" />}
                                title="Mapa de Confianza"
                                subtitle="Reconstruye tu seguridad."
                                color="emerald"
                                onClick={() => setSelectedResource({ title: "Mapa de Confianza", color: "emerald" })}
                            />
                            <ResourceCard
                                icon={<CheckSquare className="text-amber-500" />}
                                title="Checklist Calma"
                                subtitle="Hábitos anti-ansiedad."
                                color="amber"
                                onClick={() => setSelectedResource({ title: "Checklist Calma", color: "amber" })}
                            />
                            <ResourceCard
                                icon={<Brain className="text-pink-500" />}
                                title="Guía Anti-Rumiación"
                                subtitle="Detén el bucle mental."
                                color="pink"
                                onClick={() => setSelectedResource({ title: "Guía Anti-Rumiación", color: "pink" })}
                            />
                            <ResourceCard
                                icon={<Users className="text-cyan-500" />}
                                title="Ansiedad Social"
                                subtitle="Módulo de relaciones."
                                color="cyan"
                                onClick={() => setSelectedResource({ title: "Ansiedad Social", color: "cyan" })}
                            />
                        </div>
                    </section>

                </div>
            </div>
        </AccessGate>
    );
}