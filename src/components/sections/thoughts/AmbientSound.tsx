'use client';

import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface SoundContextType {
    playHover: () => void;
    playClick: () => void;
    isEnabled: boolean;
    toggle: () => void;
}

const SoundContext = createContext<SoundContextType>({
    playHover: () => { },
    playClick: () => { },
    isEnabled: false,
    toggle: () => { },
});

export const useSound = () => useContext(SoundContext);

export const SoundProvider = ({ children }: { children: React.ReactNode }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const audioContext = useRef<AudioContext | null>(null);
    const masterGain = useRef<GainNode | null>(null);

    const initAudio = () => {
        if (audioContext.current) return;
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioContext.current = new AudioCtx();
        masterGain.current = audioContext.current!.createGain();
        masterGain.current.connect(audioContext.current!.destination);
        masterGain.current.gain.value = 0.1; // Low volume
    };

    const playOscillator = (freq: number, type: OscillatorType, duration: number) => {
        if (!isEnabled || !audioContext.current || !masterGain.current) return;

        const osc = audioContext.current.createOscillator();
        const gain = audioContext.current.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioContext.current.currentTime);

        gain.connect(masterGain.current);
        osc.connect(gain);

        gain.gain.setValueAtTime(0.05, audioContext.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.current.currentTime + duration);

        osc.start();
        osc.stop(audioContext.current.currentTime + duration);
    };

    const playHover = useCallback(() => {
        // High pitched blip
        playOscillator(800, 'sine', 0.1);
    }, [isEnabled]);

    const playClick = useCallback(() => {
        // Lower thud
        playOscillator(200, 'triangle', 0.2);
    }, [isEnabled]);

    const toggle = () => {
        if (!isEnabled) {
            initAudio();
            if (audioContext.current?.state === 'suspended') {
                audioContext.current.resume();
            }
        }
        setIsEnabled(!isEnabled);
    };

    return (
        <SoundContext.Provider value={{ playHover, playClick, isEnabled, toggle }}>
            {children}
            <SoundToggle isEnabled={isEnabled} toggle={toggle} />
        </SoundContext.Provider>
    );
};

const SoundToggle = ({ isEnabled, toggle }: { isEnabled: boolean; toggle: () => void }) => {
    return (
        <motion.button
            onClick={toggle}
            className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-cyan-400 hover:bg-cyan-950/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {isEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
        </motion.button>
    );
};
