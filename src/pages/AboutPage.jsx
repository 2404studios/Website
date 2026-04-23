import React, { useState, useEffect, useRef } from 'react';
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

/* ───────────── HOOK ───────────── */
function useAutoSlide(callback, delay = 4000) {
  const cbRef = useRef();
  useEffect(() => { cbRef.current = callback; });
  useEffect(() => {
    const id = setInterval(() => cbRef.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

/* ───────────── CARD ───────────── */
function MemberCard({ member, position, onClick }) {
  const isCenter = position === 'center';
  const transformMap = {
    left: 'rotate(-8deg) translateX(12px) scale(0.9)',
    right: 'rotate(8deg) translateX(-12px) scale(0.9)',
    center: 'scale(1.05)',
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer transition-all duration-500 select-none"
      style={{
        transform: transformMap[position],
        filter: isCenter ? 'none' : 'brightness(0.6)',
        zIndex: isCenter ? 10 : 5,
      }}
    >
      <div
        className={`relative overflow-hidden rounded-xl ${
          isCenter ? 'border-2 border-white' : 'border border-white/30'
        }`}
        style={{
          width: isCenter ? 170 : 140,
          height: isCenter ? 230 : 200,
          background: '#1a0040',
          boxShadow: isCenter
            ? '0 0 40px rgba(140,80,255,0.5)'
            : '0 4px 16px rgba(0,0,0,0.5)',
        }}
      >
        <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-white font-bold text-sm tracking-wide">{member.name}</p>
          <p className="text-purple-300 text-xs">{member.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────── PAGE ───────────── */
export default function AboutPage() {
  const [index, setIndex]           = useState(0);
  const [textIndex, setTextIndex]   = useState(0);
  const [modalIndex, setModalIndex] = useState(null); // null = closed

  const total = TEAM_MEMBERS.length;
  const left  = (index - 1 + total) % total;
  const right = (index + 1) % total;

  useAutoSlide(() => setIndex(i => (i + 1) % total));

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center px-4">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/backgroundck.png')" }}
        />

        {/* Content */}
        <div className="relative flex flex-col items-center text-center max-w-xl w-full">

          {/* Cards */}
          <div className="flex items-center justify-center mb-6">
            <MemberCard member={TEAM_MEMBERS[left]}  position="left"   onClick={() => setModalIndex(left)}  />
            <MemberCard member={TEAM_MEMBERS[index]} position="center" onClick={() => setModalIndex(index)} />
            <MemberCard member={TEAM_MEMBERS[right]} position="right"  onClick={() => setModalIndex(right)} />
          </div>

          {/* Date */}
          <h3 className="text-white text-3xl tracking-[0.4em] mb-3">24TH OF APRIL</h3>

          {/* Text */}
          <p className="text-white/80 text-sm leading-relaxed mb-3 px-2">
            {TEXT_PAGES[textIndex]}
          </p>

          {/* Text pagination */}
          <div className="flex gap-4">
            {textIndex > 0 && (
            <button
                onClick={() => setTextIndex(p => p - 1)}
                className="w-10 h-10 flex items-center justify-center border border-white/20 bg-white/10 text-white rounded-md"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
            </button>
            )}
            {textIndex < TEXT_PAGES.length - 1 && (
              <button
                onClick={() => setTextIndex(p => p + 1)}
                className="w-10 h-10 flex items-center justify-center border border-white/20 bg-white/10 text-white rounded-md"
              >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              </button>
            )}
          </div>
        </div>
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
