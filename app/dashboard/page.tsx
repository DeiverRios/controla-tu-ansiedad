'use client';

import React, { useState, useEffect } from 'react';
import { Wind, Book, AlertCircle, Heart, X, Save, Calendar, Activity, Map, Users, ShieldCheck, BrainCircuit, Coffee, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AccessGate from '../../components/AccessGate';

// --- TIPOS ---
type Note = {
    id: string;
    text: string;
    date: string;
};

type Module = {
    id: string;
    title: string;
    icon: React.ElementType;
    content: React.ReactNode;
    color: string;
};

// --- DATOS: MÓDULOS EDUCATIVOS ---
const MODULES_DATA: Module[] = [
    {
        id: '1',
        title: 'Evaluación de Detonantes',
        icon: Activity,
        color: 'text-blue-500 bg-blue-50',
        content: (
            <div className="space-y-4">
                <p>Identificar qué dispara tu ansiedad es el primer paso para controlarla. Los detonantes pueden ser:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Externos:</strong> Lugares ruidosos, situaciones sociales, fechas límite, consumo de cafeína.</li>
                    <li><strong>Internos:</strong> Pensamientos de "y si...", sensaciones físicas (latidos rápidos), recuerdos.</li>
                </ul>
                <h3 className="font-bold text-lg mt-4">Ejercicio Rápido</h3>
                <p>Durante la próxima semana, cada vez que sientas ansiedad, anota: ¿Qué estaba pasando justo antes? ¿Qué pensaste? Con el tiempo, verás patrones.</p>
            </div>
        )
    },
    {
        id: '2',
        title: 'Plan de Acción Personalizado',
        icon: Map,
        color: 'text-green-500 bg-green-50',
        content: (
            <div className="space-y-4">
                <p>Tener un plan escrito reduce la incertidumbre cuando llega la crisis. Aquí tienes un protocolo base de 4 pasos:</p>
                <ol className="list-decimal pl-5 space-y-3">
                    <li><strong>PAUSA:</strong> No reacciones. Detente físicamente.</li>
                    <li><strong>RESPIRA:</strong> Usa la técnica 4-4-4 (Inhala 4s, Retén 4s, Exhala 4s).</li>
                    <li><strong>OBSERVA:</strong> Nombra 3 cosas que ves y 3 cosas que oyes (Técnica de "Grounding").</li>
                    <li><strong>ACTÚA:</strong> Haz una sola cosa pequeña y manejable (ej. beber agua, caminar).</li>
                </ol>
            </div>
        )
    },
    {
        id: '3',
        title: 'Ansiedad Social y Relaciones',
        icon: Users,
        color: 'text-purple-500 bg-purple-50',
        content: (
            <div className="space-y-4">
                <p>La ansiedad social a menudo viene del miedo al juicio ("Efecto Reflector"). Recuerda: la mayoría de las personas están pensando en sí mismas, no en ti.</p>
                <h3 className="font-bold text-lg mt-4">Técnica de Comunicación</h3>
                <p>Usa mensajes "YO" para expresar necesidades sin culpar:</p>
                <p className="italic bg-gray-50 p-3 rounded">"Cuando pasa [situación], me siento [emoción], y necesitaría [necesidad]."</p>
                <p>No tienes que ser el alma de la fiesta, solo necesitas estar presente.</p>
            </div>
        )
    },
    {
        id: '4',
        title: 'Reconstrucción de Confianza',
        icon: ShieldCheck,
        color: 'text-orange-500 bg-orange-50',
        content: (
            <div className="space-y-4">
                <p>La ansiedad erosiona la confianza en ti mismo. La reconstruimos con "Micro-Victorias".</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Cumple pequeñas promesas a ti mismo (ej. tender la cama).</li>
                    <li>Celebra el esfuerzo, no solo el resultado.</li>
                    <li>Háblate como le hablarías a un amigo querido.</li>
                </ul>
                <p className="font-medium mt-2">La confianza no es la ausencia de miedo, es actuar a pesar de él.</p>
            </div>
        )
    },
    {
        id: '5',
        title: 'Anti-Pensamientos Rumiativos',
        icon: BrainCircuit,
        color: 'text-pink-500 bg-pink-50',
        content: (
            <div className="space-y-4">
                <p>La rumiación es dar vueltas al mismo pensamiento sin solución. Rómpela con estas preguntas:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>¿Este pensamiento es un hecho o una opinión?</li>
                    <li>¿Me sirve pensar esto ahora mismo?</li>
                    <li>¿Qué le diría a alguien que amo si pensara esto?</li>
                </ul>
                <h3 className="font-bold text-lg mt-4">Técnica "STOP"</h3>
                <p>Visualiza una señal de PARE roja gigante cuando entres en bucle. Di "BASTA" en voz alta si es necesario.</p>
            </div>
        )
    },
    {
        id: '6',
        title: 'Checklist Estilo de Vida',
        icon: Coffee,
        color: 'text-teal-500 bg-teal-50',
        content: (
            <div className="space-y-4">
                <p>Tu cuerpo afecta tu mente. Revisa estos básicos:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Cafeína:</strong> ¿Más de 2 tazas? Intenta reducirla o cortarla después de las 2pm.</li>
                    <li><strong>Sueño:</strong> ¿Tienes una rutina de desconexión 30 min antes de dormir?</li>
                    <li><strong>Movimiento:</strong> 15 minutos de caminata queman cortisol (la hormona del estrés).</li>
                    <li><strong>Luz Solar:</strong> 10 minutos al despertar regulan tu reloj biológico.</li>
                </ul>
            </div>
        )
    },
];

// --- COMPONENTE: MODAL SOS ---
const SOSModal = ({ onClose }: { onClose: () => void }) => {
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

    useEffect(() => {
        const cycle = () => {
            setPhase('inhale');
            setTimeout(() => {
                setPhase('hold');
                setTimeout(() => {
                    setPhase('exhale');
                }, 4000); // 4s Retén
            }, 4000); // 4s Inhala
        };

        cycle();
        const interval = setInterval(cycle, 12000);
        return () => clearInterval(interval);
    }, []);

    const getInstructions = () => {
        switch (phase) {
            case 'inhale': return 'Inhala...';
            case 'hold': return 'Retén...';
            case 'exhale': return 'Exhala...';
        }
    };

    const getScale = () => {
        switch (phase) {
            case 'inhale': return 1.5;
            case 'hold': return 1.5;
            case 'exhale': return 1;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 text-white p-4"
        >
            <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
                <h2 className="text-3xl font-bold mb-12 tracking-wider text-center">Respira conmigo</h2>
                <div className="relative flex items-center justify-center mb-12">
                    {/* Aura */}
                    <motion.div
                        animate={{ scale: getScale(), opacity: phase === 'exhale' ? 0.8 : 1 }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className="w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl absolute opacity-50"
                    />
                    {/* Círculo Principal */}
                    <motion.div
                        animate={{ scale: getScale() }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl z-10"
                    >
                        <span className="text-2xl font-bold tracking-widest uppercase">{getInstructions()}</span>
                    </motion.div>

                    {/* Anillos Decorativos */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-80 h-80 border border-white/10 rounded-full"
                    />
                </div>
                <p className="text-white/60 text-center max-w-xs animate-pulse">
                    Sigue el ritmo del círculo. Tu ansiedad bajará en unos momentos.
                </p>
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="mb-8 bg-white text-gray-900 border-none font-bold py-4 px-12 rounded-full text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
            >
                Ya me siento mejor
            </motion.button>
        </motion.div>
    );
};

// --- COMPONENTE: MODAL DIARIO ---
const JournalModal = ({ onClose, onSave }: { onClose: () => void, onSave: (text: string) => void }) => {
    const [text, setText] = useState('');

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="bg-[#FF9800] p-4 flex justify-between items-center text-white">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Book className="w-5 h-5" /> Diario de Gratitud
                    </h2>
                    <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-gray-600 mb-4 text-sm">
                        Escribe algo por lo que te sientas agradecido hoy. No tiene que ser algo grande.
                    </p>
                    <textarea
                        className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF9800] focus:border-[#FF9800] outline-none resize-none bg-gray-50 text-gray-800 placeholder-gray-400"
                        placeholder="Hoy agradezco por..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                    />
                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                if (text.trim()) onSave(text);
                            }}
                            disabled={!text.trim()}
                            className="bg-[#FF9800] hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-bold shadow-md transition-colors flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" /> Guardar Nota
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- COMPONENTE: MODAL LECTURA ---
const ReadingModal = ({ module, onClose }: { module: Module, onClose: () => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            >
                <div className={`p-6 ${module.color.replace('text-', 'bg-').replace('bg-', 'text-').replace('50', '500').replace('text-blue-500', 'bg-blue-100') /* Fallback simple si tailwind classes complex, but using explicit generic header style better */}`}>
                    <div className="flex justify-between items-start">
                        <div className={`p-3 rounded-full ${module.color} mb-3 inline-block`}>
                            <module.icon className="w-6 h-6" />
                        </div>
                        <button onClick={onClose} className="hover:bg-black/5 p-1 rounded-full transition-colors">
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{module.title}</h2>
                </div>

                <div className="p-6 overflow-y-auto">
                    <div className="prose prose-sm max-w-none text-gray-600">
                        {module.content}
                    </div>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 text-center">
                    <button
                        onClick={onClose}
                        className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold transition-colors w-full"
                    >
                        Entendido
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- PAGINA PRINCIPAL DASHBOARD ---
export default function DashboardPage() {
    const [isSOSOpen, setIsSOSOpen] = useState(false);
    const [isJournalOpen, setIsJournalOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);
    const [notes, setNotes] = useState<Note[]>([]);
    const [showSavedAlert, setShowSavedAlert] = useState(false);

    // Cargar notas al iniciar
    useEffect(() => {
        const savedNotes = localStorage.getItem('pau_journal_notes');
        if (savedNotes) {
            try {
                setNotes(JSON.parse(savedNotes));
            } catch (e) {
                console.error("Error parsing notes", e);
            }
        }
    }, []);

    const handleSaveNote = (text: string) => {
        const newNote: Note = {
            id: Date.now().toString(),
            text,
            date: new Date().toLocaleDateString('es-ES', {
                day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
            })
        };

        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);
        localStorage.setItem('pau_journal_notes', JSON.stringify(updatedNotes));

        setIsJournalOpen(false);

        // Show success message
        setShowSavedAlert(true);
        setTimeout(() => setShowSavedAlert(false), 3000);
    };

    return (
        <AccessGate>
            <div className="min-h-screen bg-[#F0FFF4] font-sans text-gray-800 p-4 md:p-6 relative pb-20">
                {/* ALERT DE GUARDADO */}
                <AnimatePresence>
                    {showSavedAlert && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2"
                        >
                            <Heart className="w-5 h-5 fill-white" /> Nota guardada con éxito
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* HEADER */}
                <header className="max-w-md mx-auto mb-8 pt-4">
                    <div className="flex items-center gap-2 mb-1">
                        <Heart className="w-5 h-5 text-[#4CAF50] fill-current" />
                        <span className="font-bold text-gray-700 tracking-wide">Controla Tu Ansiedad</span>
                    </div>
                    <h1 className="text-2xl font-bold text-[#2E7D32]">
                        Hola, estás en tu espacio seguro.
                    </h1>
                </header>

                <main className="max-w-md mx-auto space-y-8">
                    {/* TARJETA DE EMERGENCIA (SOS) */}
                    <section className="bg-white rounded-2xl shadow-lg border-l-8 border-red-400 p-6 text-center transform hover:scale-[1.02] transition-transform duration-200">
                        <div className="flex justify-center mb-4 text-red-500">
                            <AlertCircle className="w-12 h-12" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">¿Tienes una crisis ahora?</h2>
                        <button
                            onClick={() => setIsSOSOpen(true)}
                            className="w-full bg-red-400 hover:bg-red-500 text-white text-lg font-bold py-4 px-6 rounded-xl shadow-md transition-colors animate-pulse"
                        >
                            ACTIVAR BOTÓN DE PÁNICO SOS
                        </button>
                    </section>

                    {/* HERRAMIENTAS RÁPIDAS */}
                    <section className="grid grid-cols-2 gap-4">
                        {/* Tarjeta 1: Respiración */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#4CAF50]/20 flex flex-col items-center text-center">
                            <div className="bg-[#E8F5E9] p-3 rounded-full mb-3 text-[#4CAF50]">
                                <Wind className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-1">Respiración Guiada</h3>
                            <p className="text-xs text-gray-500 mb-4">Bajar revoluciones en 3 min</p>
                            <button
                                onClick={() => setIsSOSOpen(true)}
                                className="w-full mt-auto bg-[#4CAF50] hover:bg-[#388E3C] text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                Iniciar
                            </button>
                        </div>

                        {/* Tarjeta 2: Diario */}
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-[#4CAF50]/20 flex flex-col items-center text-center">
                            <div className="bg-[#FFF3E0] p-3 rounded-full mb-3 text-[#FF9800]">
                                <Book className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-1">Diario de Gratitud</h3>
                            <p className="text-xs text-gray-500 mb-4">Registra un pensamiento positivo</p>
                            <button
                                onClick={() => setIsJournalOpen(true)}
                                className="w-full mt-auto bg-[#FF9800] hover:bg-orange-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                Escribir
                            </button>
                        </div>
                    </section>

                    {/* MÓDULOS EDUCACIONALES */}
                    <section>
                        <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                            <Book className="w-5 h-5 text-[#2E7D32]" /> Tus Guías y Recursos
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {MODULES_DATA.map((module) => (
                                <motion.div
                                    key={module.id}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setSelectedModule(module)}
                                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer flex flex-col items-center text-center h-full justify-between"
                                >
                                    <div className={`p-3 rounded-full mb-3 ${module.color}`}>
                                        <module.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-semibold text-gray-800 text-sm">{module.title}</h3>
                                    <div className="mt-2 text-xs text-gray-400 font-medium">LEER</div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* BARRA DE PROGRESO */}
                    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-medium text-gray-600">Días consecutivos sin crisis</span>
                            <span className="text-2xl font-bold text-[#4CAF50]">0</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5">
                            <div className="bg-[#4CAF50] h-2.5 rounded-full w-[5%] transition-all duration-500"></div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2 text-center">Cero es un excelente lugar para empezar.</p>
                    </section>

                    {/* ÚLTIMAS NOTAS */}
                    {notes.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-gray-700 mb-3 ml-1 flex items-center gap-2">
                                <FileText className="w-4 h-4 text-gray-400" /> Tus últimas notas
                            </h3>
                            <div className="space-y-3">
                                {notes.slice(0, 3).map((note) => (
                                    <motion.div
                                        key={note.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                                    >
                                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">"{note.text}"</p>
                                        <div className="flex items-center text-xs text-gray-400 gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {note.date}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* MODALES */}
                <AnimatePresence>
                    {isSOSOpen && (
                        <SOSModal onClose={() => setIsSOSOpen(false)} />
                    )}
                    {isJournalOpen && (
                        <JournalModal onClose={() => setIsJournalOpen(false)} onSave={handleSaveNote} />
                    )}
                    {selectedModule && (
                        <ReadingModal module={selectedModule} onClose={() => setSelectedModule(null)} />
                    )}
                </AnimatePresence>
            </div>
        </AccessGate>
    );
}
