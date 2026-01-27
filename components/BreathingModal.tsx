'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface BreathingModalProps {
    onClose: () => void;
}

export default function BreathingModal({ onClose }: BreathingModalProps) {
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'done'>('inhale');
    const [isFinished, setIsFinished] = useState(false);

    // Timer logic
    useEffect(() => {
        if (isFinished) return;

        if (timeLeft <= 0) {
            setIsFinished(true);
            setPhase('done');
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isFinished]);

    // Breathing Cycle Logic (4-2-4)
    useEffect(() => {
        if (isFinished) return;

        let timeout: NodeJS.Timeout;

        const runCycle = () => {
            setPhase('inhale');
            timeout = setTimeout(() => {
                setPhase('hold');
                timeout = setTimeout(() => {
                    setPhase('exhale');
                    timeout = setTimeout(() => {
                        runCycle();
                    }, 4000); // Exhale duration
                }, 2000); // Hold duration
            }, 4000); // Inhale duration
        };

        runCycle();

        return () => clearTimeout(timeout);
    }, [isFinished]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getInstruction = () => {
        switch (phase) {
            case 'inhale': return 'Inhala... 🌸';
            case 'hold': return 'Sostén... 😐';
            case 'exhale': return 'Exhala... 💨';
            case 'done': return '¡Muy bien!';
        }
    };

    if (isFinished) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-green-900/95 backdrop-blur-md p-4 text-white"
            >
                <div className="bg-white/10 p-6 rounded-full mb-8">
                    <Check className="w-16 h-16 text-green-300" />
                </div>
                <h2 className="text-3xl font-bold mb-4">¡Excelente trabajo!</h2>
                <p className="text-white/80 mb-8 text-center max-w-sm">
                    Has completado 3 minutos de respiración consciente. Tu sistema nervioso te lo agradece.
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="bg-white text-green-900 font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    >
                        Volver al Dashboard
                    </button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 text-white"
        >
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Cerrar"
            >
                <X className="w-8 h-8" />
            </button>

            <div className="text-center mb-12">
                <h2 className="text-4xl font-light tracking-widest font-mono">{formatTime(timeLeft)}</h2>
                <p className="text-white/60 mt-2 text-sm uppercase tracking-widest">Respiración Coherente</p>
            </div>

            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute w-80 h-80 border-2 border-white/10 rounded-full" />

                {/* Breathing Circle */}
                <motion.div
                    animate={{
                        scale: phase === 'inhale' ? 1.5 : (phase === 'hold' ? 1.5 : 1),
                        opacity: phase === 'exhale' ? 0.7 : 1
                    }}
                    transition={{
                        duration: phase === 'inhale' ? 4 : (phase === 'hold' ? 0 : 4),
                        ease: "easeInOut"
                    }}
                    className="w-48 h-48 bg-green-200 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(167,243,208,0.3)]"
                >
                    <span className="text-green-900 font-bold text-xl tracking-wide">
                        {getInstruction()}
                    </span>
                </motion.div>
            </div>

            <p className="mt-16 text-white/50 text-center max-w-sm animate-pulse">
                Sigue el ritmo. Relaja los hombros.
            </p>
        </motion.div>
    );
}
