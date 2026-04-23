import React from 'react';

/**
 * MemberModal
 * Props:
 *   member   – current member object (or null to hide)
 *   members  – full array of all members
 *   onClose  – () => void
 *   onNav    – (newIndex: number) => void   ← parent updates which member is shown
 *   index    – current index in `members`
 */
export default function MemberModal({ member, members, index, onClose, onNav }) {
  if (!member) return null;

  const total = members.length;
  const goPrev = () => onNav((index - 1 + total) % total);
  const goNext = () => onNav((index + 1) % total);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.72)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'mFadeIn .2s ease',
      }}
    >
      <style>{`
        @keyframes mFadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes mSlideUp { from { transform:translateY(28px); opacity:0 } to { transform:translateY(0); opacity:1 } }
        .modal-social-btn { background:none; border:none; cursor:pointer; padding:0; color:#fff; opacity:.85; transition:opacity .15s; }
        .modal-social-btn:hover { opacity:1; }
        .modal-nav-btn {
          width:38px; height:38px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 8px;
          color:#fff; font-size:16px; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
          transition: background .15s;
        }
        .modal-nav-btn:hover { background: rgba(255,255,255,0.18); }
      `}</style>

      {/* ── Card ── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 340,
          maxWidth: '92vw',
          backgroundImage: "url('/backgroundck.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: '1.5px solid rgba(180,120,255,0.28)',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0 0 80px rgba(100,40,220,0.3)',
          animation: 'mSlideUp .3s cubic-bezier(.4,0,.2,1)',
        }}
      >


        {/* Close */}
        <button
          onClick={onClose} className='bg-white/2 border border-white/10 rounded-2xl text-white hover:bg-white/10 hover:scale-110 hover:shadow-lg transition duration-300'
          style={{
            position: 'absolute', top: 10, right: 14,
            background: 'none', border: 'none',
            color: 'rgba(255,255,255,0.5)', fontSize: 22,
            cursor: 'pointer', lineHeight: 1, zIndex: 10,
          }}
        >×</button>

        {/* ── Header row ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, padding: '18px 20px 0', position: 'relative' }}>
          {/* Portrait */}
          <div style={{
            width: 80, height: 80, flexShrink: 0,
            border: '2px solid rgba(255,255,255,0.5)',
            borderRadius: 6, overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}>
            <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Name + role */}
          <div style={{ paddingBottom: 4 }}>
            <h2 style={{
              margin: 0, color: '#fff',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 15, fontWeight: 700, letterSpacing: 2,
            }}>{member.name}</h2>
            <p style={{
              margin: 0, color: 'rgba(255, 255, 255, 0.87)',
              fontSize: 12, fontFamily: "'Rajdhani', sans-serif",
            }}>{member.role}{member.role2 ? `, ${member.role2}` : ''}</p>
          </div>
        </div>

        {/* ── Quote ── */}
        <div style={{ padding: '14px 20px 10px' }}>
          <span> <img src="/qoute.svg"  className='h-2' alt="" /> </span>
          <p style={{
            margin: '2px 0 0', color: '#fff',
            fontSize: 13, lineHeight: 1.6,
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'italic',
          }}>
            {member.quote || 'Passionate about creating worlds that matter.'}
          </p>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 20px' }} />

        {/* ── Skills + Top 3 Games ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, padding: '14px 20px' }}>
          {/* Skills */}
          <div>
            <p style={{ margin: '0 0 8px', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>
              SKILLS
            </p>
            {(member.skills || ['—']).map((s, i) => (
              <p key={i} style={{ margin: '0 0 4px', color: 'rgba(255,255,255,0.7)', fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontStyle: 'italic' }}>
                - {s}
              </p>
            ))}
          </div>

          {/* Top 3 Games */}
          <div>
            <p style={{ margin: '0 0 8px', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>
              TOP 3 GAMES
            </p>
            {(member.topGames || ['—']).map((g, i) => (
              <p key={i} style={{ margin: '0 0 4px', color: 'rgba(255,255,255,0.7)', fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontStyle: 'italic' }}>
                - {g}
              </p>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 20px' }} />

        {/* ── Relationship Status + Social ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, padding: '14px 20px 18px' }}>
          {/* Relationship */}
          <div>
            <p style={{ margin: '0 0 6px', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 1 }}>
              RELATIONSHIP STATUS
            </p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.65)', fontFamily: "'Rajdhani', sans-serif", fontSize: 12, fontStyle: 'italic' }}>
              {member.relationshipStatus || 'Focused On The Game'}
            </p>
          </div>

          {/* Social */}
          <div>
            <p style={{ margin: '0 0 8px', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1 }}>
              SOCIAL
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {member.instagram && (
                <a href={member.instagram} target="_blank" rel="noreferrer" className="modal-social-btn">
                  {/* Instagram icon */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
              )}
              {member.twitter && (
                <a href={member.twitter} target="_blank" rel="noreferrer" className="modal-social-btn">
                  {/* X / Twitter icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
              {/* Fallback if no socials set */}
              {!member.instagram && !member.twitter && (
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, fontFamily: "'Rajdhani', sans-serif" }}>—</span>
              )}
            </div>
          </div>
        </div>

        {/* ── Nav footer ── */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 20, padding: '12px 20px',
        }}>
          <button className="modal-nav-btn" onClick={goPrev}>
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
          <span style={{
            color: 'rgba(255,255,255,0.5)',
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 13, letterSpacing: 1,
          }}>{index + 1} / {total}</span>
          <button className="modal-nav-btn" onClick={goNext}>
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
        </div>
      </div>
    </div>
  );
}
