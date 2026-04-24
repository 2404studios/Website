import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemberModal from '../components/MemberModal';


// we would fill in each person's real details here
const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'FAVOUR',
    role: 'Character designer  ',
    role2: 'Animator',
    img: '/team/favour.png',
    quote: 'Whatever man.',
    skills: ['Character concept artist', 'Modeling artist', 'Animator'],
    topGames: ['Sifu', 'Mortal kombat', 'Naruto', 'Killzone'],
    relationshipStatus: 'Single asf',
    instagram: 'https://www.instagram.com/chikamaru9/',
  },
  {
    id: 2,
    name: 'OLASHILE',
    role: 'COO',
    img: '/team/shile.png',
    quote: "No one is coming to save you, get the work done.",
    skills: ['Adaptation', 'Leadership', 'Finance'],
    topGames: ['God of war', 'Call of Duty', 'Last of Us'],
    relationshipStatus: 'Single asf',
    instagram: 'https://www.instagram.com/_t.o.n.y_____?igsh=MXNwZWhhaDZ5dnF5MQ%3D%3D&utm_source=qr',
  },
  {
    id: 3,
    name: 'WONU',
    role: 'Game designer',
    role2: 'C.M.O',
    img: '/team/wonu.jpeg',
    quote: 'Every frame is a painting. My goal is to craft worlds that feel alive from the very first frame. Manners Maketh Man. ~梁佳佳',
    skills: ['Photography & Videography', 'Unreal Engine, Graphics and Games design ', 'Marketing'],
    topGames: ['Episodes ', 'Among Us', 'Spider-Man 2'],
    relationshipStatus: "☉",
    instagram: 'https://www.instagram.com/wonuchekwas',
    twitter: 'https://x.com/wonuchekwas',
  },
  {
    id: 4, name: 'DAN ODIN', role: 'Captain Of The Ship', role2: 'Director/ Game Designer/ Programmer',
    img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zuri',
    quote: "To Lead is to Serve. The only way Up is Down. To To Live is To Die. To Be God is To Be Human.",
    skills: ['LOVE2D, Godot Engine, Unreal Engine', 'Communication', 'Magic & Wizardry'],
    topGames: ['Dungeon of Dreadrock', 'Sky: Children of the Light', 'Albion Online'],
    relationshipStatus: 'Who set this question?', instagram: 'https://www.instagram.com/danodin69', twitter: 'https://x.com/danodin69',
  },

  {
    id: 10,
    name: 'DEFCON1',
    role: 'Infrastructure Developer',
    img: '/team/semi.jpeg',
    quote: 'Excellence and Performance .',
    skills: ['TypeScript', 'GoLang', 'Java and C'],
    topGames: ['Ghost recon', 'Rainbow 6 Seige', 'NBA2k'],
    relationshipStatus: 'Married To The Grind ',
    instagram: 'https://www.instagram.com/shemigam',
    twitter: 'https://x.com/shemigam',
  },
  {
    id: 5, name: 'GREEN',
    role: 'Game Designer',
    role2: 'Video Editor/ Graphic Designer',
    img: '/team/shood.JPG',
    quote: 'A man with new ideas is a mad man, until his ideas triumph.',
    skills: ['Game Design', 'Graphic Design', 'Video Editing'],
    topGames: ['Commandos', 'EA Sports FC', 'Super Mario Bros'],
    relationshipStatus: 'Single too',
    instagram: 'https://www.instagram.com/thefcprofessor',
    twitter: 'https://x.com/thefcprofessor',
  },
  {
    id: 6, name: 'VALOUR',
    role: 'Narrative Director',
    img: '/team/val.jpeg',
    quote: 'If you can imagine it, you can create it.',
    skills: ['Storytelling and Creation', 'Creative Writing', 'Character Rigging'],
    topGames: ['Halo Reach', 'GTA 5', 'FIFA 14'],
    relationshipStatus: 'Single',
    instagram: 'https://www.instagram.com/valour_michael?igsh=MXhiZ2tiZnBlZXBpYg%3D%3D&utm_source=qr',
    twitter: 'https://x.com/michaelmvp101?s=21',
  },
  {
    id: 7, name: 'DAMILARE',
    role: 'Gameplay Engineer',
    img: '/team/damzy.jpg',
    quote: "Learn to enjoy the process, it's more fun than the destination itself.",
    skills: ['Gameplay programming', '3d animation', 'Fluid simulation'],
    topGames: ["Forza", "Red dead redemption 2", 'Spiderman '],
    relationshipStatus: 'I Have A Girlfriend ',
    instagram: 'https://www.instagram.com/botf_x?igsh=NWE4a3Rzb3Q0c2Qx',
  },
  {
    id: 8, name: 'FARUQ OYETADE', role: 'TECHNICAL ARTIST',
    img: '/team/faruq.jpg',
    quote: 'A great level teaches without a single word.',
    skills: ['Unreal Engine', 'Blender', 'Fashion Design'],
    topGames: ['Fortnite', 'Portal 2', 'FIFA'],
    relationshipStatus: 'Focused On The Game', instagram: 'https://instagram.com/aceblorgames', twitter: '',
  },
  {
    id: 9, name: 'ZEK', role: 'Web Engineer',
    img: '/team/zek.jpg',
    quote: "As a man thinketh, so is he.",
    skills: ['HTML CSS & JS', 'ReactJs', 'Enviroment Design'],
    topGames: ['FIFA', 'Uncharted', 'God of War'],
    relationshipStatus: 'Inlove with God',
    twitter: 'https://x.com/ZekTheOtherGuy',
  },

  {
    id: 11, name: 'BamBam', role: 'Business Dev',
    img: '/team/BamBam.png',
    quote: 'Build what you love.',
    skills: ['Product engineering', 'marketing', 'Web development'],
    topGames: ['FIFA', 'GTA', 'Chess'],
    relationshipStatus: 'SINGLE ASF', instagram: '', twitter: 'https://x.com/curioswhispers?s=21',
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
