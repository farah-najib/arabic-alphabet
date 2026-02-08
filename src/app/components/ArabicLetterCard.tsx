import { motion } from 'motion/react'
import { useState } from 'react'
import { Volume2, Star, RotateCcw } from 'lucide-react'

interface ArabicLetterCardProps {
  letter: string
  name: string
  isolated: string
  initial: string
  medial: string
  final: string
  color: string
  emoji: string
  word: string
  sound: string
  examples?: {
    initialExample?: string
    medialExample?: string
    finalExample?: string
  }
}

export function ArabicLetterCard({
  letter,
  name,
  isolated,
  initial,
  medial,
  final,
  color,
  emoji,
  word,
  sound,
  examples
}: ArabicLetterCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showStars, setShowStars] = useState(false)

  const handleClick = () => {
    setIsFlipped(!isFlipped)
    setShowStars(true)
    setTimeout(() => setShowStars(false), 1000)
  }

  const playSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    const utterance = new SpeechSynthesisUtterance(sound)
    utterance.lang = 'ar-SA'
    utterance.rate = 0.6
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="relative w-full h-full" dir="rtl">
      {/* Floating instruction popup */}
      {!isFlipped && (
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="bg-yellow-400 text-purple-700 font-bold px-6 py-3 rounded-full shadow-2xl whitespace-nowrap"
            style={{ fontSize: 'clamp(0.9rem, 2vw, 1.3rem)' }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 10px 30px rgba(0,0,0,0.3)',
                '0 15px 40px rgba(251, 191, 36, 0.4)',
                '0 10px 30px rgba(0,0,0,0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            اضغط لرؤية أشكال الحرف! 🎉
          </motion.div>
        </motion.div>
      )}

      {/* Floating back instruction popup */}
      {isFlipped && (
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="bg-white text-purple-700 font-bold px-6 py-3 rounded-full shadow-2xl whitespace-nowrap flex items-center gap-2"
            style={{ fontSize: 'clamp(0.9rem, 2vw, 1.3rem)' }}
            animate={{
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <RotateCcw className="w-5 h-5" />
            اضغط للعودة!
          </motion.div>
        </motion.div>
      )}

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
                y: (Math.random() - 0.5) * 100
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
            >
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </motion.div>
          ))}
        </>
      )}

      <div className="perspective-1000 w-full h-full">
        <motion.div
          className="relative w-full h-full cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          onClick={handleClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Front of card - Main Letter */}
          <div
            className="absolute inset-0 w-full h-full rounded-3xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: color,
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-8">
              <motion.button
                onClick={playSound}
                className="absolute top-4 left-4 bg-white/30 backdrop-blur-sm rounded-full p-3 hover:bg-white/50 transition-colors z-10"
                whileHover={{ scale: 1.1, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              >
                <Volume2 className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </motion.button>

              <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
                <motion.div
                  className="text-white font-black drop-shadow-2xl"
                  style={{
                    fontSize: 'clamp(8rem, 20vw, 16rem)',
                    lineHeight: 0.8,
                    fontFamily: 'Tajawal, Arial, sans-serif'
                  }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                >
                  {isolated}
                </motion.div>

                <motion.div
                  className="text-white font-bold drop-shadow-lg px-6 md:px-8 py-2 md:py-3 bg-white/30 backdrop-blur-md rounded-full"
                  style={{
                    fontSize: 'clamp(1.6rem, 4vw, 3rem)',
                    lineHeight: 1.2
                  }}
                  initial={{ scale: 0, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 10,
                    delay: 0.15
                  }}
                >
                  {name}
                </motion.div>
              </div>

              <motion.div
                className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4 bg-white/30 backdrop-blur-md rounded-2xl px-5 md:px-8 py-3 md:py-4"
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <motion.div
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
                  animate={{
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  {emoji}
                </motion.div>
                <motion.div
                  className="text-white font-black"
                  style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    lineHeight: 1,
                    fontFamily: 'Tajawal, Arial, sans-serif'
                  }}
                >
                  {word}
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Back of card - Letter Forms */}
          <div
            className="absolute inset-0 w-full h-full rounded-3xl shadow-2xl overflow-hidden"
            style={{
              backgroundColor: color,
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div className="w-full h-full flex flex-col p-4 md:p-6">
              <motion.div
                className="text-white font-bold text-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-white/40 to-white/20 backdrop-blur-md rounded-full flex-shrink-0 shadow-lg"
                style={{ fontSize: 'clamp(1.2rem, 2.8vw, 2rem)' }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                ✨ أشكال حرف {name} ✨
              </motion.div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6 overflow-hidden">
                {/* Isolated Form */}
                <motion.div
                  className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center gap-3 shadow-lg border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                >
                  <div
                    className="text-white/90 font-bold text-center mb-2"
                    style={{ fontSize: 'clamp(0.8rem, 1.8vw, 1.1rem)' }}
                  >
                    🔸 منفصل
                  </div>
                  <div
                    className="text-white font-black text-center"
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                      fontFamily: 'Tajawal, Arial, sans-serif',
                      lineHeight: 1
                    }}
                  >
                    {isolated}
                  </div>
                  <div
                    className="text-white font-bold bg-white/20 rounded-lg px-3 py-2 text-center"
                    style={{
                      fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
                      fontFamily: 'Tajawal, Arial, sans-serif',
                      lineHeight: 1
                    }}
                  >
                    {word}
                  </div>
                </motion.div>

                {/* Initial Form */}
                <motion.div
                  className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center gap-3 shadow-lg border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.23 }}
                >
                  <div
                    className="text-white/90 font-bold text-center mb-2"
                    style={{ fontSize: 'clamp(0.8rem, 1.8vw, 1.1rem)' }}
                  >
                    🔹 في البداية
                  </div>
                  <div
                    className="text-white font-black text-center"
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                      fontFamily: 'Tajawal, Arial, sans-serif',
                      lineHeight: 1
                    }}
                  >
                    {initial}
                  </div>
                  {examples?.initialExample && (
                    <div
                      className="text-white font-bold bg-white/20 rounded-lg px-3 py-2 text-center"
                      style={{
                        fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
                        fontFamily: 'Tajawal, Arial, sans-serif',
                        lineHeight: 1
                      }}
                    >
                      {examples.initialExample}
                    </div>
                  )}
                </motion.div>

                {/* Medial Form */}
                <motion.div
                  className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center gap-3 shadow-lg border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.31 }}
                >
                  <div
                    className="text-white/90 font-bold text-center mb-2"
                    style={{ fontSize: 'clamp(0.8rem, 1.8vw, 1.1rem)' }}
                  >
                    🔸 في الوسط
                  </div>
                  <div
                    className="text-white font-black text-center"
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                      fontFamily: 'Tajawal, Arial, sans-serif',
                      lineHeight: 1
                    }}
                  >
                    {medial}
                  </div>
                  {examples?.medialExample && (
                    <div
                      className="text-white font-bold bg-white/20 rounded-lg px-3 py-2 text-center"
                      style={{
                        fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
                        fontFamily: 'Tajawal, Arial, sans-serif',
                        lineHeight: 1
                      }}
                    >
                      {examples.medialExample}
                    </div>
                  )}
                </motion.div>

                {/* Final Form */}
                <motion.div
                  className="bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center gap-3 shadow-lg border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.39 }}
                >
                  <div
                    className="text-white/90 font-bold text-center mb-2"
                    style={{ fontSize: 'clamp(0.8rem, 1.8vw, 1.1rem)' }}
                  >
                    🔹 في النهاية
                  </div>
                  <div
                    className="text-white font-black text-center"
                    style={{
                      fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                      fontFamily: 'Tajawal, Arial, sans-serif',
                      lineHeight: 1
                    }}
                  >
                    {final}
                  </div>
                  {examples?.finalExample && (
                    <div
                      className="text-white font-bold bg-white/20 rounded-lg px-3 py-2 text-center"
                      style={{
                        fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
                        fontFamily: 'Tajawal, Arial, sans-serif',
                        lineHeight: 1
                      }}
                    >
                      {examples.finalExample}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
