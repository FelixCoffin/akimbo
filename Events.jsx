/* global React */
// Events — event photo + video: hero, reel/collage, approach, recent work cards, stills, CTA.
// Keeps the collaboration "x" lowercase inside uppercase headlines.
function lowerX(s) {
  return String(s).split(/( x )/).map((p, i) => p === " x " ? <span key={i} style={{ textTransform: "none" }}> x </span> : p);
}
function Events({ onNav, onOpen }) {
  const { Button, BoMark } = window.AkimboCreativeHausDesignSystem_10a51d;
  const kicker = { fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: "15px", letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--akimbo-red)" };
  const slotBox = (id, placeholder, ratio, extra) => (
    <div style={{ aspectRatio: ratio, borderRadius: "10px", overflow: "hidden", background: "#E6E1D2", ...(extra || {}) }}>
      <image-slot id={id} shape="rounded" radius="10" placeholder={placeholder} style={{ width: "100%", height: "100%", display: "block" }}></image-slot>
    </div>
  );

  const approach = [
    ["So much goes into one night.", "The venue, the guests, the people on stage, the months of getting everyone into one room. All of it is worth capturing. The keynote is just as important as the interaction between guests, and the media is how everyone who could not be there still gets to see it."],
    ["We are easy to have around.", "We talk to people, and half of this job is being someone a stranger is glad to have point a camera at them. We love this work, we get excited hearing what other people are building, and we make a point of fitting seamlessly into the context of your event."],
    ["The goal is to immortalize the event.", "We want to help you stretch this moment as far as it can go. That means media that recaps the night itself, and photo and video that can be used on your website, your socials, your newsletter, your blog and anywhere else for months after. All of it shows the support and the people behind what you do."],
  ];

  const cases = window.AKIMBO_EVENTS || [];
  // Hover videos load on first hover only. The layer stays hidden until the
  // video can actually play, so the cover image never flashes to black.
  const [armed, setArmed] = React.useState({});
  const [ready, setReady] = React.useState({});
  const vids = React.useRef({});
  const canHover = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: hover)").matches;
  const enter = (c) => {
    if (!c.hoverVideo || !canHover) return;
    if (!armed[c.id]) setArmed((a) => ({ ...a, [c.id]: true }));
    const v = vids.current[c.id];
    if (v) v.play().catch(() => {});
  };
  const leave = (c) => { const v = vids.current[c.id]; if (v) v.pause(); };

  return (
    <div>
      {/* HERO */}
      <div style={{ background: "#F7F4E8", padding: "132px 72px 72px" }}>
        <div style={{ ...kicker, marginBottom: "14px" }}>Events</div>
        <div data-ev="hero" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "64px", alignItems: "end" }}>
          <div style={{ fontFamily: "var(--font-display)", fontVariantLigatures: "none", fontFeatureSettings: '"liga" 0, "clig" 0, "dlig" 0, "calt" 0', fontSize: "82px", lineHeight: 1.04, color: "var(--text-body)", maxWidth: "860px" }}>Photo and video<br />for events, coast<br />to coast.</div>
          <div style={{ margin: "0 0 14px", display: "flex", flexDirection: "column", gap: "16px" }}>
            <p style={{ margin: 0, fontWeight: 500, fontSize: "18px", lineHeight: 1.65, color: "var(--text-label)" }}>Conferences, launches, mixers, festivals and tours. We show up with a small crew, talk to your guests, and hand back work that keeps being useful after the night is over.</p>
            <p style={{ margin: 0, fontWeight: 500, fontSize: "18px", lineHeight: 1.65, color: "var(--text-body)" }}>From one recap film to a release that runs for weeks: social cuts, a brand piece, stills for the site, interviews you can post next month or next year.</p>
          </div>
        </div>
      </div>

      {/* HERO PHOTO */}
      <div data-ev="hero-photo" style={{ background: "#F7F4E8", padding: "0 72px 120px" }}>
        <div style={{ aspectRatio: "2 / 1", borderRadius: "10px", overflow: "hidden", background: "#1F1E1D" }}>
          <img src="assets/events-hero.jpg" fetchpriority="high" decoding="async" alt="The Akimbo crew on stage in front of the Akimbo Creative Haus sign" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 48%", display: "block" }} />
        </div>
      </div>

      {/* APPROACH */}
      <div data-ev="approach-band" style={{ background: "var(--akimbo-cream)", padding: "112px 72px 120px" }}>
        <div style={{ ...kicker, marginBottom: "32px" }}>How we work an event</div>
        <div data-ev="approach" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {approach.map(([lead, rest]) => (
              <div key={lead} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <strong style={{ fontWeight: 700, fontSize: "17px", lineHeight: 1.45, color: "var(--text-body)", WebkitTextStroke: "0.7px currentColor", paintOrder: "stroke fill" }}>{lead}</strong>
                <p style={{ margin: 0, fontWeight: 500, fontSize: "17px", lineHeight: 1.62, color: "var(--text-label)" }}>{rest}</p>
              </div>
            ))}
          </div>
          <div style={{ position: "sticky", top: "140px" }}>
            <div style={{ aspectRatio: "3 / 2", borderRadius: "10px", overflow: "hidden", background: "#E6E1D2" }}>
              <img src="assets/events-approach-web.jpg" alt="Guest at the AI Tinkerers finals, with the Akimbo crew filming behind him" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "55% 40%", display: "block" }} />
            </div>
          </div>
        </div>

        <div style={{ borderLeft: "3px solid var(--akimbo-red)", padding: "6px 0 6px 24px", margin: "232px 0 0", maxWidth: "900px", fontFamily: "var(--font-display)", fontVariantLigatures: "none", fontFeatureSettings: '"liga" 0, "clig" 0, "dlig" 0, "calt" 0', fontSize: "38px", lineHeight: 1.22, color: "var(--text-body)" }}>A room full of people who showed up for you is the best proof your business will ever get on camera.</div>
      </div>

      {/* RECENT WORK */}
      <div style={{ background: "#F7F4E8", padding: "112px 72px 120px" }}>
        <div style={{ ...kicker, marginBottom: "36px" }}>Recent event work</div>
        <div data-ev="cards" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: "28px" }}>
          <style>{`.ak-work-tile:hover .ak-tile-hover.ak-ready{opacity:1 !important} .ak-see-work{transition:color .25s ease, background-color .25s ease, border-color .25s ease} .ak-work-tile:hover .ak-see-work{color:var(--akimbo-cream) !important;background:var(--akimbo-red);border-color:var(--akimbo-red) !important}`}</style>
          {cases.map((c, i) => (
            <div key={c.id} className={c.noPage ? "" : "ak-work-tile"} onClick={c.noPage ? undefined : () => onOpen && onOpen(c.id)} onMouseEnter={() => enter(c)} onMouseLeave={() => leave(c)} style={{ border: "1px solid rgba(31,30,29,.12)", background: "#FFFDF2", borderRadius: "18px", overflow: "hidden", display: "flex", flexDirection: "column", cursor: c.noPage ? "default" : "pointer" }}>
              <div style={{ position: "relative", aspectRatio: "16 / 9", background: "#1F1E1D", overflow: "hidden" }}>
                {c.poster ? (
                  <img src={c.poster} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: c.posterPosition || "50% 30%", display: "block" }} />
                ) : (
                  <image-slot id={"events-case-" + i} shape="rect" placeholder={c.title + ": hero still"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}></image-slot>
                )}
                <div className={"ak-tile-hover" + (!c.hoverVideo || ready[c.id] ? " ak-ready" : "")} style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.3s ease" }}>
                  {c.hoverVideo ? (
                    armed[c.id] && <video ref={(el) => { vids.current[c.id] = el; if (el) { el.muted = true; el.defaultMuted = true; el.volume = 0; } }} onPlaying={() => setReady((r) => (r[c.id] ? r : { ...r, [c.id]: true }))} src={c.hoverVideo + (c.hoverClip ? "#t=" + c.hoverClip[0] + "," + c.hoverClip[1] : "")} onTimeUpdate={c.hoverClip ? (ev) => { const v = ev.currentTarget; if (v.currentTime >= c.hoverClip[1] || v.currentTime < c.hoverClip[0] - 0.25) { v.currentTime = c.hoverClip[0]; v.play().catch(() => {}); } } : undefined} onPause={c.hoverClip ? (ev) => { const v = ev.currentTarget; if (v.currentTime >= c.hoverClip[1] - 0.1) { v.currentTime = c.hoverClip[0]; v.play().catch(() => {}); } } : undefined} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : c.hoverImg ? (
                    <img src={c.hoverImg} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 30%", display: "block" }} />
                  ) : (
                    <image-slot id={"events-case-" + i + "-hover"} shape="rect" placeholder="Hover still" style={{ width: "100%", height: "100%", display: "block" }}></image-slot>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "36px 44px", flex: 1 }}>
                <div style={{ fontFamily: "var(--font-headline)", fontWeight: 800, fontSize: "38px", letterSpacing: "0.02em", lineHeight: 1.05, textTransform: "uppercase", color: "var(--text-body)", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                  <span>{c.pageTitle ? c.pageTitle.map((l, i) => <React.Fragment key={i}>{i > 0 && <br />}{i > 0 && /^x /.test(l) ? <React.Fragment><span style={{ textTransform: "none" }}>x </span>{lowerX(l.slice(2))}</React.Fragment> : lowerX(l)}</React.Fragment>) : c.meta}</span>
                  {c.soon && <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.14em", color: "var(--akimbo-red)", border: "1px solid var(--akimbo-red)", borderRadius: "999px", padding: "4px 10px" }}>{c.soon}</span>}
                </div>
                <div style={{ fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: "13px", letterSpacing: "0.18em", lineHeight: 1.4, textTransform: "uppercase", color: "var(--akimbo-red)", marginTop: "-4px" }}>{c.title}</div>
                <p style={{ margin: 0, fontWeight: 500, fontSize: "15px", lineHeight: 1.55, color: "var(--text-label)", maxWidth: "520px" }}>{c.body}</p>
                <div style={{ marginTop: "auto", paddingTop: "20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                  <span className="ak-see-work" style={{ fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.18em", color: "var(--akimbo-green)", textTransform: "uppercase", padding: "8px 16px", margin: "-8px 0 -8px -16px", borderRadius: "999px", border: "1.5px solid transparent", whiteSpace: "nowrap", visibility: c.noPage ? "hidden" : "visible" }}>See the work →︎</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "flex-end" }}>
                    {(c.list || []).map((li) => (
                      <span key={li} style={{ display: "inline-block", padding: "9px 18px", borderRadius: "999px", border: "1px solid #D8D4CB", background: "#F7F4E8", fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-body)", whiteSpace: "nowrap" }}>{li}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div data-ev="cta" style={{ background: "var(--akimbo-red)", padding: "120px 72px 132px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "56px" }}>
        <div>
          <div style={{ fontFamily: "var(--font-headline)", fontWeight: 800, fontSize: "76px", lineHeight: 0.98, letterSpacing: "0.01em", textTransform: "uppercase", color: "var(--akimbo-cream)", maxWidth: "820px" }}>Got an event <span style={{ whiteSpace: "nowrap" }}>coming up?</span></div>
        <p style={{ margin: "28px 0 0", fontWeight: 500, fontSize: "18px", lineHeight: 1.65, color: "rgba(255,253,230,0.88)", maxWidth: "640px" }}>We would love to cover it. Tell us what the event is and what you want out of it, and we will tell you what we would do with it. The earlier we know, the more we can plan for.</p>
        <style>{`.ak-cta-grow{transition:transform .25s ease}.ak-cta-grow:hover{transform:scale(1.3) !important}`}</style><div className="ak-cta-grow" style={{ marginTop: "40px", transform: "scale(1.2)", transformOrigin: "left top", display: "inline-block" }}>
          <Button variant="onDark" arrow onClick={() => onNav && onNav("contact")}>Get in touch</Button>
        </div>
        <p style={{ margin: "36px 0 0", fontWeight: 500, fontSize: "14px", lineHeight: 1.5, color: "rgba(255,253,230,0.88)" }}>Need help putting the event on, or filling the room? We do creative direction, production and promotion too.</p>
        </div>
        <div style={{ flex: "0 1 440px", minWidth: 0, maxWidth: "38%", display: "flex", justifyContent: "center" }}>
          <BoMark pose="leaping" tone="cream" size={440} basePath="assets/illustrations" style={{ width: "100%", height: "auto", maxWidth: "440px" }} />
        </div>
      </div>
    </div>
  );
}
window.Events = Events;
