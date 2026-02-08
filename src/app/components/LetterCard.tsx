import { motion } from 'motion/react';
import { useState } from 'react';
import { Volume2, Star } from 'lucide-react';

interface LetterCardProps {
  letter: string;
  color: string;
  emoji: string;
  word: string;
  sound: string;
}

export function LetterCard({ letter, color, emoji, word, sound }: LetterCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showStars, setShowStars] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    setShowStars(true);
    setTimeout(() => setShowStars(false), 1000);
  };

  const playSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, this would play actual audio
    const utterance = new SpeechSynthesisUtterance(sound);
    utterance.rate = 0.7;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative perspective-1000 w-full h-full">
      {showStars && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: 1.5,
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
            >
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </motion.div>
          ))}
        </>
      )}
      
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl shadow-2xl flex flex-col items-center justify-center"
          style={{
            backgroundColor: color,
            backfaceVisibility: 'hidden',
          }}
        >
          <motion.button
            onClick={playSound}
            className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm rounded-full p-3 hover:bg-white/50 transition-colors z-10"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            <Volume2 className="w-6 h-6 text-white" />
          </motion.button>
          
          <div className="flex flex-col items-center justify-center gap-2">
            <motion.div
              className="text-white font-black drop-shadow-2xl"
              style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', lineHeight: 1 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            >
              {letter.toUpperCase()}
            </motion.div>
            
            <motion.div
              className="text-white font-black opacity-80 drop-shadow-lg"
              style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 1 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.1 }}
            >
              {letter.toLowerCase()}
            </motion.div>
          </div>
          
          <motion.div
            className="mt-6 text-white font-bold bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-center"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Tap to see more! 🎉
          </motion.div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full rounded-3xl shadow-2xl flex flex-col items-center justify-center"
          style={{
            backgroundColor: color,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <motion.div
            style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
          >
            {emoji}
          </motion.div>
          
          <motion.div
            className="text-white font-black drop-shadow-lg mt-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {word}
          </motion.div>
          
          <motion.div
            className="text-white/90 font-bold mt-3"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {letter.toUpperCase()} is for {word}
          </motion.div>

          <motion.div
            className="mt-6 text-white font-bold bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full text-center"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Tap to flip back! 🔄
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}