import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemberModal from '../components/MemberModal';


// we would fill in each person's real details here
const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'WONU',
    role: 'Game Designer',
    role2: 'Environmental Artist',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wonu',
    quote: 'I want to craft worlds that feel alive from the very first frame.',
    skills: ['Unreal Engine', 'Game Design', 'Level Scripting'],
    topGames: ['Hollow Knight', 'Dark Souls', 'Celeste'],
    relationshipStatus: 'Focused On The Game',
    instagram: '',
    twitter: '',
  },
  {
    id: 2,
    name: 'ZEK',
    role: 'Web Developer',
    role2: 'Environmental Artist',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zek',
    quote: "I want to build the best web experiences for users to have a cohesive world with our studio's stories",
    skills: ['Unreal Engine', 'HTML, CSS, Javascript', 'Snipping'],
    topGames: ['Candy Crush', 'FIFA', 'My Talking Angela'],
    relationshipStatus: 'Focused On The Game',
    instagram: 'https://instagram.com',
    twitter: 'https://x.com',
  },
  {
    id: 3,
    name: 'DANHUSI',
    role: 'Business Dev',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Danhusi',
    quote: 'Building bridges between great games and the people who need them.',
    skills: ['Strategy', 'Partnerships', 'Finance'],
    topGames: ['FIFA', 'Call of Duty', 'Among Us'],
    relationshipStatus: "It's Complicated",
    instagram: '',
    twitter: '',
  },

  {
    id: 4, name: 'KIRA', role: 'Art Director',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kira',
    quote: 'Every frame is a painting.',
    skills: ['Concept Art', 'Blender', 'Photoshop'],
    topGames: ['Journey', 'Shadow of the Colossus', 'Ori'],
    relationshipStatus: 'Focused On The Game', instagram: '', twitter: '',
  },
  {
    id: 5, name: 'TAKO', role: 'Sound Engineer',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tako',
    quote: 'Sound is 50% of the experience.',
    skills: ['Ableton', 'FMOD', 'Foley'],
    topGames: ['Disco Elysium', 'Hades', 'Undertale'],
    relationshipStatus: 'Married to the DAW', instagram: '', twitter: '',
  },
  {
    id: 6, name: 'MELO', role: 'Narrative Lead',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Melo',
    quote: 'Stories are the reason people stay.',
    skills: ['Screenwriting', 'Twine', 'Ink'],
    topGames: ['Disco Elysium', 'Planescape Torment', '80 Days'],
    relationshipStatus: 'Focused On The Game', instagram: '', twitter: '',
  },
  {
    id: 7, name: 'SUYA', role: 'UI/UX Designer',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Suya',
    quote: "The best UI is the one you don't notice.",
    skills: ['Figma', 'React', 'Motion Design'],
    topGames: ["Monument Valley", "Alto's Odyssey", 'Braid'],
    relationshipStatus: 'Focused On The Game', instagram: '', twitter: '',
  },
  {
    id: 8, name: 'BOLU', role: 'Level Designer',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bolu',
    quote: 'A great level teaches without a single word.',
    skills: ['Unreal Engine', 'Unity', 'Whitebox Design'],
    topGames: ['Super Mario Odyssey', 'Portal 2', 'Doom Eternal'],
    relationshipStatus: 'Focused On The Game', instagram: '', twitter: 'https://x.com/zekiah_711',
  },
  {
    id: 9, name: 'EMRE', role: 'Backend Dev',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emre',
    quote: "If users don't notice me, I've done my job.",
    skills: ['Node.js', 'PostgreSQL', 'AWS'],
    topGames: ['StarCraft II', 'Factorio', 'Dwarf Fortress'],
    relationshipStatus: 'Focused On The Game', instagram: '', twitter: '',
  },
  {
    id: 10, name: 'ZURI', role: 'QA Engineer',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zuri',
    quote: "I break things so players don't have to.",
    skills: ['Test Automation', 'Bug Tracking', 'Python'],
    topGames: ['The Sims', 'Minecraft', 'Stardew Valley'],
    relationshipStatus: 'Focused On The Game', instagram: '', twitter: '',
  },
  {
    id: 11, name: 'LADE', role: 'Producer',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lade',
    quote: 'The glue that keeps the chaos beautiful.',
    skills: ['Jira', 'Scrum', 'Risk Management'],
    topGames: ['Civilization VI', 'Age of Empires', 'Frostpunk'],
    relationshipStatus: 'Focused On The Game', instagram: '', twitter: '',
  },
];

const TEXT_PAGES = [
  `We are a group of friends who love video games. We believe that the games we create have the power to change lives and bring people together across borders, backgrounds, and beliefs. Every pixel we push, every mechanic we design, every story we tell — it all flows from a simple conviction: play is powerful. Our studio was born in a Lagos apartment, fuelled by jollof rice, late nights, and the stubborn belief that African stories deserve to be told through interactive worlds.`,
  `Since our founding, we have shipped titles that have been played in over 40 countries. Our flagship title won three independent game awards. But awards aren't why we do this — we do it because every week we receive messages from kids in Ibadan, Nairobi, Accra, and beyond who for the first time saw a hero who looked like them. We are currently in pre-production on two new titles slated for release next year.`,
];

/* ───────────── HOOKS ───────────── */
function useAutoSlide(callback, delay = 4000) {
  const cbRef = useRef();
  useEffect(() => { cbRef.current = callback; });
  useEffect(() => {
    const id = setInterval(() => cbRef.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        isMobile: window.innerWidth < 768
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

/* ───────────── CARD ───────────── */
function MemberCard({ member, position, onClick, isMobile }) {
  const isCenter = position === 'center';

  // Responsive sizing and spacing
  const cardWidth = isMobile ? 180 : 280;
  const cardHeight = isMobile ? 240 : 380;
  const xOffset = isMobile ? 210 : 420;

  const variants = {
    left: {
      rotate: -12,
      x: -xOffset,
      scale: 0.8,
      opacity: 0.3,
      zIndex: 10,
      filter: 'brightness(0.3) blur(2px)'
    },
    center: {
      rotate: 0,
      x: 0,
      scale: 1.1,
      opacity: 1,
      zIndex: 20,
      filter: 'brightness(1) blur(0px)'
    },
    right: {
      rotate: 12,
      x: xOffset,
      scale: 0.8,
      opacity: 0.3,
      zIndex: 10,
      filter: 'brightness(0.3) blur(2px)'
    }
  };

  return (
    <motion.div
      layout
      initial={variants[position]}
      animate={variants[position]}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1
      }}
      onClick={onClick}
      className="absolute cursor-pointer select-none"
    >
      <div
        className="relative overflow-hidden bg-black border-[3px] border-white shadow-2xl"
        style={{
          width: cardWidth,
          height: cardHeight,
        }}
      >
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover"
        />

        {/* Name Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/95 via-black/40 to-transparent">
          <h4 className="text-white font-black text-lg md:text-2xl leading-none uppercase tracking-tighter">
            {member.name}
          </h4>
          <p className="text-white/70 text-[10px] md:text-sm font-medium mt-1 uppercase tracking-wider">
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────── PAGE ───────────── */
export default function AboutPage({ isActive }) {
  const [index, setIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(null);
  const { isMobile } = useWindowSize();
  const touchStartRef = useRef(null);

  const total = TEAM_MEMBERS.length;

  // Calculate relative indices for the 3 visible cards
  const left = (index - 1 + total) % total;
  const right = (index + 1) % total;

  useAutoSlide(() => setIndex(i => (i + 1) % total), 5000);

  // Horizontal swipe for carousel
  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (!touchStartRef.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartRef.current.y);
    const threshold = 50;
    if (Math.abs(deltaX) > threshold && Math.abs(deltaX) > deltaY) {
      if (deltaX < 0) {
        setIndex(i => (i + 1) % total); // swipe left = next
      } else {
        setIndex(i => (i - 1 + total) % total); // swipe right = prev
      }
    }
    touchStartRef.current = null;
  }, [total]);

  return (
    <>
      <div
        className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* Background Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: "url('/checkered_standard.png')" }}
        />

        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />

        {/* Animated Content Wrapper */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center w-full h-full"
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={isActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 40 }}
          transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Carousel Container */}
          <div className="relative flex items-center justify-center w-full h-[500px]">
            <AnimatePresence mode="popLayout">
              <MemberCard
                key={TEAM_MEMBERS[left].id}
                member={TEAM_MEMBERS[left]}
                position="left"
                onClick={() => setIndex(left)}
                isMobile={isMobile}
              />
              <MemberCard
                key={TEAM_MEMBERS[index].id}
                member={TEAM_MEMBERS[index]}
                position="center"
                onClick={() => setModalIndex(index)}
                isMobile={isMobile}
              />
              <MemberCard
                key={TEAM_MEMBERS[right].id}
                member={TEAM_MEMBERS[right]}
                position="right"
                onClick={() => setIndex(right)}
                isMobile={isMobile}
              />
            </AnimatePresence>
          </div>

          {/* Footer Title */}
          <div className="absolute bottom-42 md:bottom-20 text-center">
            <h2 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none flex items-center gap-4">
              <span>TEAM</span>
              <span className="font-press-start text-3xl md:text-5xl mt-1 opacity-100">2404</span>
            </h2>
          </div>
        </motion.div>
      </div>

      {/* Modal — separate component */}
      {modalIndex !== null && (
        <MemberModal
          member={TEAM_MEMBERS[modalIndex]}
          members={TEAM_MEMBERS}
          index={modalIndex}
          onClose={() => setModalIndex(null)}
          onNav={(newIdx) => setModalIndex(newIdx)}
        />
      )}
    </>
  );
}
