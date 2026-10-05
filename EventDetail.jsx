/* global React */
// EventDetail — event case-study template, driven by window.AKIMBO_EVENTS.
// Layout: title + deliverable pills, red band with two phone mockups, four 9:16 stills, CTA.
// Keeps the collaboration "x" lowercase inside uppercase headlines.
function lowerX(s) {
  return String(s).split(/( x )/).map((p, i) => p === " x " ? <span key={i} style={{ textTransform: "none" }}> x </span> : p);
}
function EventDetail({ id, onNav, onOpen }) {
  const events = window.AKIMBO_EVENTS || [];
  const idx = Math.max(0, events.findIndex((e) => e.id === id));
  const ev = events[idx] || {};
  const phones = [0, 1].map((n) => (ev.phones || [])[n] || null);
  // stillsCount: render fewer than four tiles (e.g. 3) without leaving an empty slot.
  const stillCount = ev.stillsCount || 4;
  const stills = Array.from({ length: stillCount }, (_, n) => (ev.stills || [])[n] || null);
  const filmRef = React.useRef(null);
  const [filmMuted, setFilmMuted] = React.useState(true);
  // Carousel: scroll progress through the pinned section maps to slide position 0..n-1.
  const carRef = React.useRef(null);
  const [pos, setPos] = React.useState(0);
  const [navH, setNavH] = React.useState(0);
  const count = (ev.carousel || []).length;
  React.useEffect(() => {
    if (!count) return;
    const onScroll = () => {
      const el = carRef.current;
      if (!el) return;
      const nav = document.getElementById("marketing-site-root");
      const bar = nav && nav.firstElementChild;
      const h = bar ? Math.round(bar.getBoundingClientRect().height) : 0;
      setNavH((old) => (old === h ? old : h));
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      setPos(p * (count - 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [count]);
  const current = Math.round(pos);
  const slide = (src, n, outside) => (
    <div key={n} style={{ position: "relative", flex: "none", width: "var(--w)", aspectRatio: "4 / 5", borderRadius: outside ? "6px" : "0", overflow: "hidden", background: "#1F1E1D", boxShadow: outside ? "0 14px 34px rgba(0,0,0,0.45)" : "none" }}>
      {src && /\.(mp4|mov|webm)$/i.test(src) ? (
        <video ref={(el) => { if (el) { el.muted = true; el.defaultMuted = true; } }} src={src} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : src ? (
        <img src={src} alt={"Slide " + (n + 1)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      ) : (
        <image-slot id={"event-" + ev.id + "-slide-" + (n + 1) + (outside ? "" : "-in")} shape="rect" placeholder={"Slide " + (n + 1) + " · 4:5"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}></image-slot>
      )}
    </div>
  );

  return (
    <div>
      {/* TITLE */}
      <div style={{ background: "#F7F4E8", padding: "132px 72px 80px" }}>
        <div data-evd="title" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "64px" }}>
          <div style={{ maxWidth: "1000px" }}>
            <div style={{ fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: "20px", letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--akimbo-red)", marginBottom: "20px" }}>{ev.pageTitle ? lowerX(ev.pageTitle.join(" ")) : ev.meta}</div>
            <div style={{ fontFamily: "var(--font-headline)", fontWeight: 800, fontSize: "84px", lineHeight: 1.02, letterSpacing: "-2px", textTransform: "uppercase", color: "var(--text-body)", maxWidth: "1000px" }}>{lowerX(ev.title)}</div>
            {ev.summary ? (
              <div style={{ margin: "32px 0 0", maxWidth: "640px", display: "flex", flexDirection: "column", gap: "18px" }}>
                {ev.summary.map((text, n) => (
                  <p key={n} style={{ margin: 0, fontWeight: 500, fontSize: "16.5px", lineHeight: 1.6, color: "var(--text-label)" }}>{text}</p>
                ))}
                {ev.note && <p style={{ margin: 0, fontWeight: 500, fontSize: "14px", lineHeight: 1.55, color: "var(--akimbo-red)" }}>{ev.note}</p>}
              </div>
            ) : ev.goal ? (
              <div style={{ margin: "32px 0 0", maxWidth: "640px", display: "flex", flexDirection: "column", gap: "24px" }}>
                {[["Goal", ev.goal], ["Approach", ev.approach]].filter((b) => b[1]).map(([label, text]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: "20px", letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--text-body)", marginBottom: "10px" }}>{label}</div>
                    {String(text).split(/\n\n+/).map((para, n) => (
                      <p key={n} style={{ margin: n ? "14px 0 0" : 0, fontWeight: 500, fontSize: "16.5px", lineHeight: 1.6, color: "var(--text-label)" }}>{para}</p>
                    ))}
                  </div>
                ))}
                {ev.note && <p style={{ margin: 0, fontWeight: 500, fontSize: "14px", lineHeight: 1.55, color: "var(--akimbo-red)" }}>{ev.note}</p>}
              </div>
            ) : (
              <p style={{ margin: "32px 0 0", maxWidth: "640px", fontWeight: 500, fontSize: "16.5px", lineHeight: 1.6, color: "var(--text-label)" }}>{ev.lead || ev.body}</p>
            )}
          </div>
          <div style={{ flex: "0 1 400px", minWidth: 0, display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: "12px", maxWidth: "400px", paddingTop: "8px" }}>
            {ev.soon && <span style={{ fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: "15px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--akimbo-red)", padding: "12px 22px", borderRadius: "999px", border: "1px solid var(--akimbo-red)", whiteSpace: "nowrap" }}>{ev.soon}</span>}
            {(ev.list || []).map((tag) => (
              <span key={tag} style={{ fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: "15px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-body)", padding: "12px 22px", borderRadius: "999px", border: "1px solid rgba(31,30,29,0.18)", background: "rgba(31,30,29,0.04)", whiteSpace: "nowrap" }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* HERO — full-bleed 16:9: YouTube embed, video file, image, or drop slot */}
      {ev.heroVertical && ev.heroYoutube && (
        <div data-evd="vhero" style={{ background: "var(--akimbo-red)", padding: "96px 20px", display: "flex", justifyContent: "center" }}>
          <div style={{ boxSizing: "border-box", position: "relative", height: "min(80vh, 820px)", aspectRatio: "9 / 19.5", maxWidth: "100%", borderRadius: "52px", background: "#0B0B0C", padding: "13px", boxShadow: "0 24px 60px rgba(90,20,14,0.42), 0 0 0 1px rgba(255,253,230,0.14)" }}>
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "40px", overflow: "hidden", background: "#000" }}>
              <iframe src={"https://www.youtube-nocookie.com/embed/" + ev.heroYoutube + "?rel=0&playsinline=1"} title={ev.title} allow="autoplay; encrypted-media; picture-in-picture; web-share" allowFullScreen style={{ position: "absolute", top: 0, left: "50%", height: "100%", aspectRatio: "9 / 16", width: "auto", transform: "translateX(-50%)", border: "none", display: "block" }} />
            </div>
            <div style={{ position: "absolute", top: "25px", left: "50%", transform: "translateX(-50%)", width: "104px", height: "28px", borderRadius: "999px", background: "#0B0B0C", pointerEvents: "none" }} />
          </div>
        </div>
      )}
      {!ev.heroVertical && (ev.heroYoutube !== undefined || ev.hero !== undefined) && (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#000", overflow: "hidden" }}>
          {ev.heroYoutube ? (
            <iframe src={"https://www.youtube-nocookie.com/embed/" + ev.heroYoutube + "?rel=0&playsinline=1"} title={ev.title} allow="autoplay; encrypted-media; picture-in-picture; web-share" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }} />
          ) : !ev.hero ? (
            <image-slot id={"event-" + ev.id + "-hero"} shape="rect" placeholder="Hero film 16:9" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}></image-slot>
          ) : /\.(mp4|mov|webm)$/i.test(ev.hero) ? (
            <video ref={(el) => { if (el) { el.muted = true; el.defaultMuted = true; } }} src={ev.hero} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <img src={ev.hero} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          )}
        </div>
      )}

      {/* SECOND FILM — optional second full-bleed 16:9 */}
      {(ev.hero2Youtube !== undefined || ev.hero2 !== undefined) && (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#000", overflow: "hidden", borderTop: "14px solid #161514" }}>
          {ev.hero2Youtube ? (
            <iframe src={"https://www.youtube-nocookie.com/embed/" + ev.hero2Youtube + "?rel=0&playsinline=1"} title={ev.title + " film 2"} allow="autoplay; encrypted-media; picture-in-picture; web-share" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }} />
          ) : !ev.hero2 ? (
            <image-slot id={"event-" + ev.id + "-hero2"} shape="rect" placeholder="Second film 16:9" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}></image-slot>
          ) : (
            <video ref={(el) => { if (el) { el.muted = true; el.defaultMuted = true; } }} src={ev.hero2} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          )}
        </div>
      )}

      {ev.carousel ? (
        <React.Fragment>
          {/* STILLS MOSAIC */}
          {ev.mosaic && (
            <div style={{ background: "#161514", padding: "96px 56px" }}>
              <div data-evd="mosaic" style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0,1fr))", gridAutoRows: "calc((100cqw - 266px) / 12 * 1.9)", gap: "14px" }}>
                {ev.mosaic.map((m) => (
                  <div key={m.src} data-wide={m.wide ? "true" : undefined} style={{ gridColumn: "span " + m.cols, gridRow: "span " + m.rows, borderRadius: "10px", overflow: "hidden", background: "#1F1E1D" }}>
                    <img src={m.src} alt="" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: m.pos || "50% 50%", display: "block" }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CAROUSEL IN PHONE — pinned while you scroll; vertical scroll drives the swipe */}
          <div ref={carRef} data-evd="carousel" style={{ position: "relative", height: "320vh", background: "#161514" }}>
            <div style={{ position: "sticky", top: 0, height: "100vh", boxSizing: "border-box", paddingTop: (navH + 56) + "px", paddingBottom: "56px", overflow: "hidden", display: "flex", alignItems: "center", ["--w"]: "min(300px, 58cqw, calc((100vh - " + (navH + 112) + "px) * 9 / 19.5 - 24px))", ["--step"]: "calc(var(--w) + 16px)" }}>
              <div style={{ position: "relative", width: "100%", height: "calc((var(--w) + 24px) * 19.5 / 9)" }}>
                {/* outside strip: the current slide sits under the phone's media frame */}
                <div style={{ position: "absolute", top: "calc(12px + 44px + 52px)", left: "calc(50% - var(--w) / 2)", display: "flex", gap: "16px", transform: "translateX(calc(var(--step) * " + (-pos) + "))", willChange: "transform" }}>
                  {ev.carousel.map((src, n) => slide(src, n, true))}
                </div>
                {/* phone */}
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", boxSizing: "border-box", width: "calc(var(--w) + 24px)", height: "100%", borderRadius: "48px", background: "#0B0B0C", padding: "12px", boxShadow: "0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,253,230,0.16)" }}>
                  <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "37px", overflow: "hidden", background: "#FFFDF2", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: "44px", flex: "none" }}></div>
                    <div style={{ height: "52px", flex: "none", display: "flex", alignItems: "center", gap: "10px", padding: "0 12px" }}>
                      <div style={{ width: "30px", height: "30px", borderRadius: "999px", background: "var(--akimbo-red)" }}></div>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
                        <div style={{ width: "44%", height: "8px", borderRadius: "4px", background: "#333132" }}></div>
                        <div style={{ width: "28%", height: "6px", borderRadius: "3px", background: "#D8D4CB" }}></div>
                      </div>
                      <div style={{ fontSize: "16px", lineHeight: 1, color: "#333132", letterSpacing: "1px" }}>···</div>
                    </div>
                    {/* media frame: same strip, clipped, so slides glide through the phone */}
                    <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 5", flex: "none", background: "#1F1E1D", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, display: "flex", gap: "16px", transform: "translateX(calc(var(--step) * " + (-pos) + "))", willChange: "transform" }}>
                        {ev.carousel.map((src, n) => slide(src, n, false))}
                      </div>
                      <div style={{ position: "absolute", top: "10px", right: "10px", padding: "4px 9px", borderRadius: "999px", background: "rgba(20,19,18,0.6)", color: "#FFFDE6", fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.08em" }}>{current + 1}/{ev.carousel.length}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 6px" }}>
                      <div style={{ display: "flex", gap: "12px" }}>
                        {[0, 1, 2].map((k) => <div key={k} style={{ width: "20px", height: "20px", borderRadius: "999px", border: "2px solid #333132", boxSizing: "border-box" }}></div>)}
                      </div>
                      <div style={{ display: "flex", gap: "4px" }}>
                        {ev.carousel.map((_, k) => <div key={k} style={{ width: "5px", height: "5px", borderRadius: "999px", background: k === current ? "var(--akimbo-red)" : "#D8D4CB", transition: "background 0.2s" }}></div>)}
                      </div>
                      <div style={{ width: "20px" }}></div>
                    </div>
                    <div style={{ padding: "6px 14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ width: "36%", height: "7px", borderRadius: "4px", background: "#333132" }}></div>
                      <div style={{ width: "88%", height: "6px", borderRadius: "3px", background: "#D8D4CB" }}></div>
                      <div style={{ width: "64%", height: "6px", borderRadius: "3px", background: "#D8D4CB" }}></div>
                    </div>
                  </div>
                  <div style={{ position: "absolute", top: "22px", left: "50%", transform: "translateX(-50%)", width: "86px", height: "24px", borderRadius: "999px", background: "#0B0B0C", pointerEvents: "none" }}></div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (
      <React.Fragment>
      {/* PHONES — skipped when the page has a full-bleed hero */}
      {!(ev.heroYoutube !== undefined || ev.hero !== undefined) && (
      <div style={{ background: "var(--akimbo-red)" }}>
        <div data-evd="phones" style={{ display: "flex", flexWrap: "nowrap", alignItems: "center", justifyContent: "space-evenly", gap: "0", padding: "96px 0" }}>
          {phones.map((src, i) => (
            <div key={i} style={{ boxSizing: "border-box", position: "relative", flex: "0 1 380px", maxWidth: "28%", aspectRatio: "9 / 19.5", borderRadius: "52px", background: "#0B0B0C", padding: "13px", boxShadow: "0 24px 60px rgba(90,20,14,0.42), 0 0 0 1px rgba(255,253,230,0.14)" }}>
              <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "40px", overflow: "hidden", background: "#1F1E1D" }}>
                {src ? (
                  <video ref={(el) => { if (i === 0) filmRef.current = el; if (el) { el.muted = i === 0 ? filmMuted : true; el.defaultMuted = true; } }} src={src} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <image-slot id={"event-" + ev.id + "-phone-" + (i + 1)} shape="rect" placeholder="Vertical video 9:16" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}></image-slot>
                )}
                {src && i === 0 && (
                  <button
                    onClick={() => { const el = filmRef.current; if (!el) return; const nextMuted = !filmMuted; el.muted = nextMuted; if (!nextMuted) { el.volume = 1; el.play().catch(() => {}); } setFilmMuted(nextMuted); }}
                    style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "22px", display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "999px", border: "1px solid rgba(242,239,233,0.5)", background: "rgba(31,30,29,0.45)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", color: "var(--akimbo-cream)", fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    <span style={{ fontSize: "13px", lineHeight: 1 }}>{filmMuted ? "\uD83D\uDD07" : "\uD83D\uDD0A"}</span>
                    {filmMuted ? "Sound Off" : "Sound On"}
                  </button>
                )}
              </div>
              <div style={{ position: "absolute", top: "25px", left: "50%", transform: "translateX(-50%)", width: "104px", height: "28px", borderRadius: "999px", background: "#0B0B0C", pointerEvents: "none" }} />
            </div>
          ))}
        </div>
      </div>
      )}

      {/* STILLS (noStills: skip the band until media arrives) */}
      {!ev.noStills && (
      <div style={{ background: "#161514", padding: "96px 56px" }}>
        {ev.mosaic ? (
          <div data-evd="mosaic" style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0,1fr))", gridAutoRows: "calc((100cqw - 266px) / 12 * 1.9)", gap: "14px" }}>
            {ev.mosaic.map((m) => (
              <div key={m.src} data-wide={m.wide ? "true" : undefined} style={{ gridColumn: "span " + m.cols, gridRow: "span " + m.rows, borderRadius: "10px", overflow: "hidden", background: "#1F1E1D" }}>
                <img src={m.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: m.pos || "50% 50%", display: "block" }} />
              </div>
            ))}
          </div>
        ) : (
        <div data-evd="stills" data-count={stillCount} style={{ display: "grid", gridTemplateColumns: "repeat(" + stillCount + ", minmax(0,1fr))", gap: "20px" }}>
          {stills.map((it, n) => (
            <div key={n} style={{ position: "relative", aspectRatio: "9 / 16", borderRadius: "10px", overflow: "hidden", background: "#1F1E1D" }}>
              {!it ? (
                <image-slot id={"event-" + ev.id + "-still-" + (n + 1)} shape="rounded" radius="10" placeholder="Event still 9:16" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}></image-slot>
              ) : it.video ? (
                <video ref={(el) => { if (el) { el.muted = true; el.defaultMuted = true; } }} src={it.src} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <img src={it.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: it.pos || "50% 50%", display: "block" }} />
              )}
            </div>
          ))}
        </div>
        )}
      </div>
      )}

      </React.Fragment>
      )}

      {/* CTA */}
      <div data-evd="cta" style={{ background: "var(--akimbo-red)", padding: "112px 72px 120px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "56px" }}>
        <div>
          <div style={{ fontFamily: "var(--font-headline)", fontWeight: 800, fontSize: "72px", lineHeight: 0.98, letterSpacing: "0.01em", textTransform: "uppercase", color: "var(--akimbo-cream)", maxWidth: "820px" }}>Got an event <span style={{ whiteSpace: "nowrap" }}>coming up?</span></div>
          <style>{`.ak-cta-grow{transition:transform .25s ease}.ak-cta-grow:hover{transform:scale(1.3) !important}`}</style><div className="ak-cta-grow" style={{ marginTop: "40px", transform: "scale(1.2)", transformOrigin: "left top", display: "inline-block" }}>
            <Btn onNav={onNav} />
          </div>
        </div>
        <div style={{ flex: "0 1 440px", minWidth: 0, maxWidth: "38%", display: "flex", justifyContent: "center" }}>
          <BoMarkCta />
        </div>
      </div>
    </div>
  );
}
function BoMarkCta() {
  const { BoMark } = window.AkimboCreativeHausDesignSystem_10a51d;
  return <BoMark pose="leaping" tone="cream" size={440} basePath="assets/illustrations" style={{ width: "100%", height: "auto", maxWidth: "440px" }} />;
}
function Btn({ onNav }) {
  const { Button } = window.AkimboCreativeHausDesignSystem_10a51d;
  return <Button variant="onDark" arrow onClick={() => onNav && onNav("contact")}>Get in touch</Button>;
}
window.EventDetail = EventDetail;
