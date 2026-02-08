import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArabicLetterCard } from '@/app/components/ArabicLetterCard';
import { ChevronLeft, ChevronRight, Sparkles, Home } from 'lucide-react';

const arabicLetters = [
  { 
    letter: 'ا', 
    name: 'ألف', 
    isolated: 'ا', 
    initial: 'ا', 
    medial: 'ـا', 
    final: 'ـا', 
    color: '#FF6B9D', 
    emoji: '🦁', 
    word: 'أسد', 
    sound: 'ألف - أسد',
    examples: { initialExample: 'أسد', medialExample: 'فأر', finalExample: 'ماء' }
  },
  { 
    letter: 'ب', 
    name: 'باء', 
    isolated: 'ب', 
    initial: 'بـ', 
    medial: 'ـبـ', 
    final: 'ـب', 
    color: '#4ECDC4', 
    emoji: '🦆', 
    word: 'بطة', 
    sound: 'باء - بطة',
    examples: { initialExample: 'بطة', medialExample: 'حبل', finalExample: 'كلب' }
  },
  { 
    letter: 'ت', 
    name: 'تاء', 
    isolated: 'ت', 
    initial: 'تـ', 
    medial: 'ـتـ', 
    final: 'ـت', 
    color: '#FFA07A', 
    emoji: '🍎', 
    word: 'تفاح', 
    sound: 'تاء - تفاح',
    examples: { initialExample: 'تفاح', medialExample: 'كتب', finalExample: 'بيت' }
  },
  { 
    letter: 'ث', 
    name: 'ثاء', 
    isolated: 'ث', 
    initial: 'ثـ', 
    medial: 'ـثـ', 
    final: 'ـث', 
    color: '#9B59B6', 
    emoji: '🦊', 
    word: 'ثعلب', 
    sound: 'ثاء - ثعلب',
    examples: { initialExample: 'ثعلب', medialExample: 'مثل', finalExample: 'حديث' }
  },
  { 
    letter: 'ج', 
    name: 'جيم', 
    isolated: 'ج', 
    initial: 'جـ', 
    medial: 'ـجـ', 
    final: 'ـج', 
    color: '#FFD93D', 
    emoji: '🐪', 
    word: 'جمل', 
    sound: 'جيم - جمل',
    examples: { initialExample: 'جمل', medialExample: 'رجل', finalExample: 'دجاج' }
  },
  { 
    letter: 'ح', 
    name: 'حاء', 
    isolated: 'ح', 
    initial: 'حـ', 
    medial: 'ـحـ', 
    final: 'ـح', 
    color: '#6BCF7F', 
    emoji: '🐴', 
    word: 'حصان', 
    sound: 'حاء - حصان',
    examples: { initialExample: 'حصان', medialExample: 'بحر', finalExample: 'صباح' }
  },
  { 
    letter: 'خ', 
    name: 'خاء', 
    isolated: 'خ', 
    initial: 'خـ', 
    medial: 'ـخـ', 
    final: 'ـخ', 
    color: '#FF85A1', 
    emoji: '🐑', 
    word: 'خروف', 
    sound: 'خاء - خروف',
    examples: { initialExample: 'خروف', medialExample: 'مخدة', finalExample: 'مطبخ' }
  },
  { 
    letter: 'د', 
    name: 'دال', 
    isolated: 'د', 
    initial: 'د', 
    medial: 'ـد', 
    final: 'ـد', 
    color: '#5DADE2', 
    emoji: '🐔', 
    word: 'دجاجة', 
    sound: 'دال - دجاجة',
    examples: { initialExample: 'دجاج', medialExample: 'مدرسة', finalExample: 'أسد' }
  },
  { 
    letter: 'ذ', 
    name: 'ذال', 
    isolated: 'ذ', 
    initial: 'ذ', 
    medial: 'ـذ', 
    final: 'ـذ', 
    color: '#F8B500', 
    emoji: '🐺', 
    word: 'ذئب', 
    sound: 'ذال - ذئب',
    examples: { initialExample: 'ذئب', medialExample: 'أذن', finalExample: 'أستاذ' }
  },
  { 
    letter: 'ر', 
    name: 'راء', 
    isolated: 'ر', 
    initial: 'ر', 
    medial: 'ـر', 
    final: 'ـر', 
    color: '#E74C3C', 
    emoji: '🌸', 
    word: 'وردة', 
    sound: 'راء - وردة',
    examples: { initialExample: 'رمل', medialExample: 'فرح', finalExample: 'بحر' }
  },
  { 
    letter: 'ز', 
    name: 'زاي', 
    isolated: 'ز', 
    initial: 'ز', 
    medial: 'ـز', 
    final: 'ـز', 
    color: '#3498DB', 
    emoji: '🦒', 
    word: 'زرافة', 
    sound: 'زاي - زرافة',
    examples: { initialExample: 'زهرة', medialExample: 'غزال', finalExample: 'أرز' }
  },
  { 
    letter: 'س', 
    name: 'سين', 
    isolated: 'س', 
    initial: 'سـ', 
    medial: 'ـسـ', 
    final: 'ـس', 
    color: '#FF6B9D', 
    emoji: '🐟', 
    word: 'سمكة', 
    sound: 'سين - سمكة',
    examples: { initialExample: 'سمك', medialExample: 'مسجد', finalExample: 'شمس' }
  },
  { 
    letter: 'ش', 
    name: 'شين', 
    isolated: 'ش', 
    initial: 'شـ', 
    medial: 'ـشـ', 
    final: 'ـش', 
    color: '#95E1D3', 
    emoji: '☀️', 
    word: 'شمس', 
    sound: 'شين - شمس',
    examples: { initialExample: 'شجرة', medialExample: 'مشط', finalExample: 'عطش' }
  },
  { 
    letter: 'ص', 
    name: 'صاد', 
    isolated: 'ص', 
    initial: 'صـ', 
    medial: 'ـصـ', 
    final: 'ـص', 
    color: '#FDA7DF', 
    emoji: '🐥', 
    word: 'صوص', 
    sound: 'صاد - صوص',
    examples: { initialExample: 'صقر', medialExample: 'فصل', finalExample: 'قميص' }
  },
  { 
    letter: 'ض', 
    name: 'ضاد', 
    isolated: 'ض', 
    initial: 'ضـ', 
    medial: 'ـضـ', 
    final: 'ـض', 
    color: '#FFA500', 
    emoji: '🐸', 
    word: 'ضفدع', 
    sound: 'ضاد - ضفدع',
    examples: { initialExample: 'ضفدع', medialExample: 'رضيع', finalExample: 'أرض' }
  },
  { 
    letter: 'ط', 
    name: 'طاء', 
    isolated: 'ط', 
    initial: 'طـ', 
    medial: 'ـطـ', 
    final: 'ـط', 
    color: '#C39BD3', 
    emoji: '✈️', 
    word: 'طائرة', 
    sound: 'طاء - طائرة',
    examples: { initialExample: 'طائر', medialExample: 'مطر', finalExample: 'خط' }
  },
  { 
    letter: 'ظ', 
    name: 'ظاء', 
    isolated: 'ظ', 
    initial: 'ظـ', 
    medial: 'ـظـ', 
    final: 'ـظ', 
    color: '#F4A460', 
    emoji: '🦌', 
    word: 'ظبي', 
    sound: 'ظاء - ظبي',
    examples: { initialExample: 'ظل', medialExample: 'نظر', finalExample: 'حظ' }
  },
  { 
    letter: 'ع', 
    name: 'عين', 
    isolated: 'ع', 
    initial: 'عـ', 
    medial: 'ـعـ', 
    final: 'ـع', 
    color: '#48C9B0', 
    emoji: '🐦', 
    word: 'عصفور', 
    sound: 'عين - عصفور',
    examples: { initialExample: 'عصفور', medialExample: 'معلم', finalExample: 'جميع' }
  },
  { 
    letter: 'غ', 
    name: 'غين', 
    isolated: 'غ', 
    initial: 'غـ', 
    medial: 'ـغـ', 
    final: 'ـغ', 
    color: '#FF7675', 
    emoji: '☁️', 
    word: 'غيمة', 
    sound: 'غين - غيمة',
    examples: { initialExample: 'غراب', medialExample: 'بغداد', finalExample: 'فراغ' }
  },
  { 
    letter: 'ف', 
    name: 'فاء', 
    isolated: 'ف', 
    initial: 'فـ', 
    medial: 'ـفـ', 
    final: 'ـف', 
    color: '#74B9FF', 
    emoji: '🦋', 
    word: 'فراشة', 
    sound: 'فاء - فراشة',
    examples: { initialExample: 'فيل', medialExample: 'مفتاح', finalExample: 'صف' }
  },
  { 
    letter: 'ق', 
    name: 'قاف', 
    isolated: 'ق', 
    initial: 'قـ', 
    medial: 'ـقـ', 
    final: 'ـق', 
    color: '#A29BFE', 
    emoji: '🐱', 
    word: 'قطة', 
    sound: 'قاف - قطة',
    examples: { initialExample: 'قطة', medialExample: 'وقت', finalExample: 'طريق' }
  },
  { 
    letter: 'ك', 
    name: 'كاف', 
    isolated: 'ك', 
    initial: 'كـ', 
    medial: 'ـكـ', 
    final: 'ـك', 
    color: '#FD79A8', 
    emoji: '🐕', 
    word: 'كلب', 
    sound: 'كاف - كلب',
    examples: { initialExample: 'كتاب', medialExample: 'مكتب', finalExample: 'سمك' }
  },
  { 
    letter: 'ل', 
    name: 'لام', 
    isolated: 'ل', 
    initial: 'لـ', 
    medial: 'ـلـ', 
    final: 'ـل', 
    color: '#00B894', 
    emoji: '🍋', 
    word: 'ليمون', 
    sound: 'لام - ليمون',
    examples: { initialExample: 'ليمون', medialExample: 'ملعب', finalExample: 'جمل' }
  },
  { 
    letter: 'م', 
    name: 'ميم', 
    isolated: 'م', 
    initial: 'مـ', 
    medial: 'ـمـ', 
    final: 'ـم', 
    color: '#E17055', 
    emoji: '🍌', 
    word: 'موز', 
    sound: 'ميم - موز',
    examples: { initialExample: 'موز', medialExample: 'حمام', finalExample: 'قلم' }
  },
  { 
    letter: 'ن', 
    name: 'نون', 
    isolated: 'ن', 
    initial: 'نـ', 
    medial: 'ـنـ', 
    final: 'ـن', 
    color: '#FDCB6E', 
    emoji: '🐝', 
    word: 'نحلة', 
    sound: 'نون - نحلة',
    examples: { initialExample: 'نحلة', medialExample: 'منزل', finalExample: 'حسن' }
  },
  { 
    letter: 'ه', 
    name: 'هاء', 
    isolated: 'ه', 
    initial: 'هـ', 
    medial: 'ـهـ', 
    final: 'ـه', 
    color: '#6C5CE7', 
    emoji: '🌙', 
    word: 'هلال', 
    sound: 'هاء - هلال',
    examples: { initialExample: 'هلال', medialExample: 'فهد', finalExample: 'وجه' }
  },
  { 
    letter: 'و', 
    name: 'واو', 
    isolated: 'و', 
    initial: 'و', 
    medial: 'ـو', 
    final: 'ـو', 
    color: '#55EFC4', 
    emoji: '🌹', 
    word: 'وردة', 
    sound: 'واو - وردة',
    examples: { initialExample: 'وردة', medialExample: 'حوت', finalExample: 'نحو' }
  },
  { 
    letter: 'ي', 
    name: 'ياء', 
    isolated: 'ي', 
    initial: 'يـ', 
    medial: 'ـيـ', 
    final: 'ـي', 
    color: '#FAB1A0', 
    emoji: '✋', 
    word: 'يد', 
    sound: 'ياء - يد',
    examples: { initialExample: 'يد', medialExample: 'بيت', finalExample: 'علي' }
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % arabicLetters.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + arabicLetters.length) % arabicLetters.length);
  };

  const handleHome = () => {
    setDirection(0);
    setCurrentIndex(0);
  };

  const handleLetterClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.5,
      rotate: direction > 0 ? -45 : 45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.5,
      rotate: direction < 0 ? -45 : 45,
    }),
  };

  return (
    <div 
      className="h-screen w-full flex relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
      }}
      dir="rtl"
    >
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl md:text-4xl opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['⭐', '🌈', '🎈', '🎨', '🎪', '🦄', '✨', '🌟'][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}
      </div>

      {/* Sidebar with letters */}
      <motion.div
        className="w-24 md:w-32 bg-white/20 backdrop-blur-lg border-l-4 border-white/30 flex flex-col py-4 z-20 shadow-2xl"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="text-center mb-4 px-2">
          <div className="text-white font-black text-lg md:text-2xl mb-1">الحروف</div>
          <div className="text-white/80 text-xs md:text-sm font-bold">
            {currentIndex + 1} / {arabicLetters.length}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
          <div className="flex flex-col gap-2">
            {arabicLetters.map((item, index) => (
              <motion.button
                key={item.letter}
                onClick={() => handleLetterClick(index)}
                className={`w-full aspect-square rounded-2xl font-black transition-all ${
                  index === currentIndex
                    ? 'bg-yellow-400 text-purple-700 shadow-2xl scale-110'
                    : 'bg-white/40 text-white hover:bg-white/60 hover:scale-105'
                }`}
                style={{ 
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                  fontFamily: 'Tajawal, Arial, sans-serif'
                }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                animate={index === currentIndex ? { 
                  scale: [1.1, 1.15, 1.1],
                  boxShadow: [
                    '0 10px 30px rgba(0,0,0,0.3)',
                    '0 15px 40px rgba(0,0,0,0.4)',
                    '0 10px 30px rgba(0,0,0,0.3)'
                  ]
                } : {}}
                transition={index === currentIndex ? { duration: 1.5, repeat: Infinity } : {}}
              >
                {item.letter}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        {/* Header */}
        <motion.div
          className="mb-4 md:mb-6 text-center z-10"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-2 drop-shadow-2xl flex items-center justify-center gap-2 md:gap-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-8 h-8 md:w-12 md:h-12 fill-yellow-300 text-yellow-300" />
            تعلم الحروف العربية!
            <Sparkles className="w-8 h-8 md:w-12 md:h-12 fill-yellow-300 text-yellow-300" />
          </motion.h1>
          <motion.p 
            className="text-base md:text-xl lg:text-2xl text-white/90 font-bold drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            هيا نتعلم الحروف معاً! 🎉
          </motion.p>
        </motion.div>

        {/* Card Container */}
        <div className="relative w-full max-w-2xl lg:max-w-4xl flex-1 max-h-[calc(100vh-240px)] mb-20 z-10">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                rotate: { duration: 0.3 },
              }}
              className="absolute inset-0"
            >
              <ArabicLetterCard {...arabicLetters[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-4 md:gap-6 z-10">
          <motion.button
            onClick={handleNext}
            className="bg-white text-purple-600 rounded-full p-3 md:p-4 shadow-2xl hover:shadow-3xl transition-shadow"
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            aria-label="الحرف التالي"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </motion.button>

          <motion.button
            onClick={handleHome}
            className="bg-yellow-400 text-purple-700 rounded-full p-3 md:p-4 shadow-2xl hover:shadow-3xl transition-shadow"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="العودة للبداية"
          >
            <Home className="w-6 h-6 md:w-8 md:h-8" />
          </motion.button>

          <motion.button
            onClick={handlePrev}
            className="bg-white text-purple-600 rounded-full p-3 md:p-4 shadow-2xl hover:shadow-3xl transition-shadow"
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
            aria-label="الحرف السابق"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}