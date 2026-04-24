import React, { useEffect } from 'react';

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
  const total = members.length;
  const goPrev = () => onNav((index - 1 + total) % total);
  const goNext = () => onNav((index + 1) % total);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, onClose]);

  if (!member) return null;

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
          width: 480,
          maxWidth: '92vw',
          backgroundImage: "url('/backgroundck.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6)',
          animation: 'mSlideUp .4s cubic-bezier(.16, 1, .3, 1)',
        }}
      >
        {/* Overlay for depth */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', pointerEvents: 'none' }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            color: '#fff', fontSize: 18,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10, transition: 'all 0.2s ease'
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >×</button>

        {/* ── Header row ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '32px 32px 0', position: 'relative' }}>
          {/* Portrait */}
          <div style={{
            width: 100, height: 100, flexShrink: 0,
            border: '2px solid rgba(255,255,255,0.8)',
            borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          }}>
            <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Name + role */}
          <div>
            <h2 style={{
              margin: 0, color: '#fff',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 28, fontWeight: 700, letterSpacing: 3,
              textTransform: 'uppercase',
            }}>{member.name}</h2>
            <p style={{
              margin: '4px 0 0', color: 'rgba(255, 255, 255, 0.7)',
              fontSize: 14, fontFamily: "'Rajdhani', sans-serif",
              fontWeight: 500, letterSpacing: 1,
            }}>{member.role}{member.role2 ? ` / ${member.role2}` : ''}</p>
          </div>
        </div>

        {/* ── Quote ── */}
        <div style={{ padding: '24px 32px 16px', position: 'relative' }}>
          <img src="/qoute.svg" style={{ height: 12, marginBottom: 8, opacity: 0.6 }} alt="" />
          <p style={{
            margin: 0, color: '#fff',
            fontSize: 15, lineHeight: 1.6,
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'italic',
            opacity: 0.9,
          }}>
            {member.quote || 'Passionate about creating worlds that matter.'}
          </p>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 32px' }} />

        {/* ── Skills + Top 3 Games ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: '20px 32px' }}>
          {/* Skills */}
          <div>
            <p style={{ margin: '0 0 12px', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1.5, opacity: 0.5 }}>
              SKILLS
            </p>
            {(member.skills || ['—']).map((s, i) => (
              <p key={i} style={{ margin: '0 0 6px', color: 'rgba(255,255,255,0.85)', fontFamily: "'Rajdhani', sans-serif", fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10 }}>☉</span> {s}
              </p>
            ))}
          </div>

          {/* Top 3 Games */}
          <div>
            <p style={{ margin: '0 0 12px', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1.5, opacity: 0.5 }}>
              TOP 3 GAMES
            </p>
            {(member.topGames || ['—']).map((g, i) => (
              <p key={i} style={{ margin: '0 0 6px', color: 'rgba(255,255,255,0.85)', fontFamily: "'Rajdhani', sans-serif", fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 10 }}>☉</span> {g}
              </p>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 32px' }} />

        {/* ── Relationship Status + Social ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, padding: '20px 32px 32px' }}>
          {/* Relationship */}
          <div>
            <p style={{ margin: '0 0 8px', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: 1.5, opacity: 0.5 }}>
              RELATIONSHIP STATUS
            </p>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontFamily: "'Rajdhani', sans-serif", fontSize: 14, fontStyle: 'italic' }}>
              {member.relationshipStatus || 'Focused On The Game'}
            </p>
          </div>

          {/* Social */}
          <div>
            <p style={{ margin: '0 0 8px', color: '#fff', fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 1.5, opacity: 0.5 }}>
              SOCIAL
            </p>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              {member.instagram && (
                <a href={member.instagram} target="_blank" rel="noreferrer" className="modal-social-btn">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                  </svg>
                </a>
              )}
              {member.twitter && (
                <a href={member.twitter} target="_blank" rel="noreferrer" className="modal-social-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
              {!member.instagram && !member.twitter && (
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 14, fontFamily: "'Rajdhani', sans-serif" }}>—</span>
              )}
            </div>
          </div>
        </div>

        {/* ── Nav footer ── */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 32px',
        }}>
          <button className="modal-nav-btn" onClick={goPrev}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span style={{
            color: 'rgba(255,255,255,0.6)',
            fontFamily: "'Rajdhani', sans-serif",
            fontSize: 14, fontWeight: 600, letterSpacing: 2,
          }}>{index + 1} / {total}</span>
          <button className="modal-nav-btn" onClick={goNext}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
