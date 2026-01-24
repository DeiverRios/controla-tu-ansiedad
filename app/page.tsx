import React from 'react';
import { Check, X, AlertCircle, Lock, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* SECCIÓN 1: HERO */}
      <section className="bg-gradient-to-b from-green-50 to-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#2196F3] font-semibold tracking-wide mb-4 uppercase text-sm md:text-base">
            Para personas de 18-45 años que sienten que la ansiedad domina su día a día
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Cómo Tomar el Control de la Ansiedad y los Ataques de Pánico
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-medium">
            Sin depender de medicamentos ni consejos genéricos que no funcionan
          </p>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#4CAF50] text-left mb-8">
            <p className="text-lg text-gray-700 leading-relaxed">
              Si sientes que un ataque de pánico puede ocurrir en cualquier momento, si el miedo a perder el control te impide disfrutar de tu vida y quieres una solución práctica que realmente funcione cuando el aire te falta... esta herramienta te ayudará a lograrlo.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: ¿TE SUENA FAMILIAR? */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">¿Te Suena Familiar?</h2>
          <div className="space-y-4">
            {[
              "Sientes una presión en el pecho y piensas que algo grave te está pasando.",
              "Evitas situaciones sociales por miedo a tener una crisis frente a otros.",
              "Has probado de todo (tés, ejercicios, consejos) y nada detiene el miedo.",
              "Te sientes solo/a porque nadie entiende realmente lo que experimentas.",
              "Vives en un estado de alerta constante, esperando el próximo 'ataque'.",
              "La incertidumbre sobre tu salud mental no te deja dormir tranquilo/a."
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="mt-1 flex-shrink-0 text-red-500">
                  <X className="w-6 h-6" />
                </div>
                <p className="text-lg text-gray-700">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-[#E8F5E9] p-6 rounded-xl text-center border border-[#4CAF50]">
            <p className="text-xl font-semibold text-[#2E7D32]">
              No es debilidad. Es un sistema nervioso sobreestimulado. Y existe una forma interactiva de recalibrarlo.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: LA SOLUCIÓN */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#4CAF50] mb-2">LA SOLUCIÓN: Controla Tu Ansiedad</h2>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">La guía interactiva que te devuelve el mando de tu vida</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Identifica tus detonantes en tiempo real, te enseña a desactivar los síntomas físicos antes de que escalen, y te proporciona un plan de acción personalizado para recuperar tu libertad en días, no años.
          </p>
        </div>
      </section>

      {/* SECCIÓN 4: CÓMO FUNCIONA */}
      <section className="py-12 px-4 bg-blue-50">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="bg-[#2196F3] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">1</div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Evaluación de Emergencia</h4>
                <p className="text-gray-700">A través de nuestro cuestionario inteligente, identificamos qué tipo de ansiedad te está afectando hoy y cuáles son tus detonantes específicos para no perder tiempo en teorías.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="bg-[#2196F3] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">2</div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Desactivación del Pánico</h4>
                <p className="text-gray-700">Accede a técnicas de relajación y respiración guiadas diseñadas para 'cortar' el circuito del pánico en el momento exacto en que sientes que vas a perder el control.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="bg-[#2196F3] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 shadow-md">3</div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Mapa de Progreso Personalizado</h4>
                <p className="text-gray-700">Registra tus avances y ajusta tus estrategias. Ver cómo disminuye la frecuencia de tus crisis te dará la confianza necesaria para volver a salir al mundo sin miedo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: POR QUÉ FUNCIONA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Por Qué 'Controla Tu Ansiedad' Funciona Tan Bien</h2>
          <p className="text-lg text-gray-700 mb-8">
            La mayoría de las 'soluciones' fallan porque son pasivas... Este producto funciona porque es interactivo y preventivo... Es como tener un especialista en crisis en tu bolsillo.
          </p>

          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-200 mb-8 inline-block w-full md:w-auto">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-3xl text-gray-400 line-through decoration-red-500 font-bold">$47</span>
              <span className="text-6xl font-extrabold text-[#4CAF50]">$7</span>
            </div>
          </div>

          <div className="w-full">
            <button className="w-full md:w-auto bg-[#FF9800] hover:bg-orange-600 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95">
              Sí, Quiero Controlar Mi Ansiedad Ahora - Porque merezco vivir sin miedo
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: STACK */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 text-[#4CAF50]">Todo Lo Que Obtienes Dentro</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Evaluación de Detonantes (Fase 1)",
              "Protocolo de Emergencia: Botón de Pánico",
              "Plan de Acción Personalizado",
              "Guía de Desactivación Física",
              "Bitácora de Seguimiento de Síntomas",
              "Módulo: Ansiedad Social y Relaciones",
              "Mapa de Reconstrucción de Confianza",
              "Guía Anti-Pensamientos Rumiativos",
              "Checklist de Estilo de Vida Calmo",
              "Acceso Vitalicio a Actualizaciones"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-[#4CAF50] transition-colors">
                <CheckCircle2 className="text-[#4CAF50] w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 7: TESTIMONIOS */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Lo que dicen nuestros usuarios</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((_, i) => <span key={i} className="text-[#FF9800]">★</span>)}
              </div>
              <p className="text-gray-700 italic mb-4">"Pensé que tendría que vivir medicada..."</p>
              <p className="font-bold text-gray-900">- Elena, 32 años</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((_, i) => <span key={i} className="text-[#FF9800]">★</span>)}
              </div>
              <p className="text-gray-700 italic mb-4">"Lo mejor es el plan personalizado..."</p>
              <p className="font-bold text-gray-900">- Marcos, 24 años</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 8: FAQ y GARANTÍA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Preguntas Frecuentes</h2>
          <div className="space-y-4 mb-16">
            <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer group">
              <summary className="font-semibold text-lg list-none flex justify-between items-center text-gray-900">
                <span>¿En cuánto tiempo veré resultados?</span>
                <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180 text-gray-500" />
              </summary>
              <p className="mt-3 text-gray-600 border-t pt-3 border-gray-100">Muchos usuarios reportan alivio desde la primera sesión gracias a las técnicas de desactivación inmediata.</p>
            </details>
            <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer group">
              <summary className="font-semibold text-lg list-none flex justify-between items-center text-gray-900">
                <span>¿Necesito dejar mi medicación?</span>
                <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180 text-gray-500" />
              </summary>
              <p className="mt-3 text-gray-600 border-t pt-3 border-gray-100">No. Esta guía es complementaria y no sustituye el consejo médico profesional.</p>
            </details>
            <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer group">
              <summary className="font-semibold text-lg list-none flex justify-between items-center text-gray-900">
                <span>¿Funciona para ansiedad severa?</span>
                <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180 text-gray-500" />
              </summary>
              <p className="mt-3 text-gray-600 border-t pt-3 border-gray-100">Sí, está diseñado para manejar desde ansiedad leve hasta ataques de pánico intensos.</p>
            </details>
          </div>

          <div className="bg-[#E3F2FD] p-8 rounded-2xl border border-[#2196F3] text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-full shadow-sm">
                <Lock className="w-10 h-10 text-[#2196F3]" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Garantía de 7 Días</h3>
            <p className="text-lg text-gray-700 mb-4">
              Si en una semana no sientes que tienes más herramientas... te devolvemos el 100%.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER FINAL */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 sticky bottom-0 z-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Precio Especial</p>
            <div className="flex items-baseline gap-2 justify-center md:justify-start">
              <span className="text-3xl font-bold text-[#4CAF50]">$7</span>
              <span className="text-lg text-gray-400 line-through">$47</span>
            </div>
          </div>

          <button className="w-full md:w-auto bg-[#FF9800] hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-md transition-colors flex flex-col items-center justify-center leading-tight">
            <span>Quiero Acceso a la Guía Ahora</span>
            <span className="text-[10px] font-normal opacity-90 block md:hidden lg:inline uppercase tracking-wide mt-0.5">Precio especial de lanzamiento</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
