/* global React */
// V2Project: block-based project page driven by window.V2_PROJECTS (see v2/projects-data.js).
(function () {
  const sans = "var(--v2-sans)";
  const roman = "\"V2 Serif Roman\", var(--v2-serif)";
  const PAD = "clamp(20px, 4vw, 56px)";
  const soundBtn = { position: "absolute", right: "20px", bottom: "20px", display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", borderRadius: "999px", border: "1px solid rgba(244,242,236,0.5)", background: "rgba(15,14,13,0.45)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", color: "var(--v2-fg)", fontFamily: sans, fontWeight: 700, fontSize: "12px", letterSpacing: "-0.05em", textTransform: "uppercase", cursor: "pointer", zIndex: 2 };
  const fill = { position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", border: "none", objectFit: "cover" };

  function Sound({ muted, onClick }) {
    return <button onClick={onClick} aria-label={muted ? "Turn on sound" : "Mute"} style={soundBtn}>{muted ? "Sound off" : "Sound on"}</button>;
  }
  // One media surface: YouTube (muted loop + sound toggle, or click-to-play), local video, still, or drop slot.
  function Media({ m, slot, label, sound = false, loop = true, cover = false }) {
    const fr = React.useRef(null), vr = React.useRef(null);
    const [muted, setMuted] = React.useState(true);
    const toggleYt = () => {
      const w = fr.current && fr.current.contentWindow; if (!w) return;
      const cmd = (func, args) => w.postMessage(JSON.stringify({ event: "command", func, args: args || [] }), "*");
      if (muted) { cmd("unMute"); cmd("setVolume", [100]); cmd("playVideo"); } else cmd("mute");
      setMuted(!muted);
    };
    const toggleVid = () => { const v = vr.current; if (!v) return; v.muted = !muted; if (muted) v.play().catch(() => {}); setMuted(!muted); };
    if (m && m.yt) {
      const q = loop ? `autoplay=1&mute=1&loop=1&playlist=${m.yt}&controls=0` : "controls=1";
      return (
        <React.Fragment>
          <iframe ref={fr} src={`https://www.youtube-nocookie.com/embed/${m.yt}?${q}&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`} title={label || "Video"} allow="autoplay; encrypted-media; picture-in-picture; web-share" allowFullScreen style={cover ? { ...fill, inset: "auto", top: "50%", left: "50%", width: "max(100%, calc(100vh * 16 / 9))", height: "max(100%, calc(100vw * 9 / 16))", transform: "translate(-50%, -50%)", pointerEvents: loop ? "none" : "auto" } : fill}></iframe>
          {loop && sound && <Sound muted={muted} onClick={toggleYt} />}
        </React.Fragment>
      );
    }
    if (m && m.src) return (
      <React.Fragment>
        <video ref={(el) => { vr.current = el; if (el) { el.muted = muted; el.defaultMuted = true; } }} src={m.src} autoPlay loop={!m.clip} muted playsInline preload={m.clip ? "auto" : "metadata"}
          onLoadedMetadata={m.clip ? (e) => { const v = e.currentTarget; v.currentTime = m.clip[0]; v.play().catch(() => {}); } : undefined}
          onTimeUpdate={m.clip ? (e) => { const v = e.currentTarget; if (v.seeking) return; if (v.currentTime >= m.clip[1]) { v.currentTime = m.clip[0]; v.play().catch(() => {}); } } : undefined}
          onEnded={m.clip ? (e) => { e.currentTarget.currentTime = m.clip[0]; e.currentTarget.play().catch(() => {}); } : undefined}
          style={m.pos ? { ...fill, objectPosition: m.pos } : fill}></video>
        {sound && <Sound muted={muted} onClick={toggleVid} />}
      </React.Fragment>
    );
    if (m && m.img) return <img src={m.img} alt={label || ""} loading={cover ? "eager" : "lazy"} style={m.pos ? { ...fill, objectPosition: m.pos } : fill} />;
    return <image-slot id={slot} placeholder={label || "Drop media"} style={fill}></image-slot>;
  }
  const box = (ar, extra) => ({ position: "relative", aspectRatio: ar, overflow: "hidden", background: "#1A1918", borderRadius: "10px", ...(extra || {}) });

  function Phone({ m, slot, label, width = "min(340px, 70vw)", sound = true }) {
    return (
      <div style={{ position: "relative", width, aspectRatio: "9 / 19.5", borderRadius: "48px", background: "#0B0B0C", padding: "12px", boxSizing: "border-box", boxShadow: "0 30px 70px rgba(0,0,0,0.55), 0 0 0 1px rgba(244,242,236,0.14)" }}>
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "37px", overflow: "hidden", background: "#1A1918" }}>
          <Media m={m} slot={slot} label={label} sound={sound} />
        </div>
        <div style={{ position: "absolute", top: "24px", left: "50%", transform: "translateX(-50%)", width: "26%", height: "24px", borderRadius: "999px", background: "#0B0B0C", pointerEvents: "none" }}></div>
      </div>
    );
  }
  const Para = ({ children }) => <p style={{ margin: 0, maxWidth: "640px", fontFamily: sans, fontWeight: 400, fontSize: "clamp(14px, 1.05vw, 16px)", lineHeight: 1.6, letterSpacing: "-0.02em", color: "var(--v2-dim-strong)", textWrap: "pretty" }}>{children}</p>;
  const Kicker = ({ children, red }) => <div style={{ fontFamily: sans, fontWeight: red ? 700 : 400, fontSize: "clamp(14px, 1.1vw, 17px)", letterSpacing: "-0.05em", textTransform: "uppercase", color: red ? "var(--v2-red)" : "var(--v2-fg)" }}>{children}</div>;
  const Cap = ({ children }) => <div style={{ fontFamily: sans, fontWeight: 700, fontSize: "14px", letterSpacing: "-0.04em", color: "var(--v2-fg)", paddingTop: "12px" }}>{children}</div>;
  const Section = ({ children, pad = "72px", style }) => <section style={{ padding: `${pad} ${PAD}`, ...(style || {}) }}>{children}</section>;

  // On phones a row never holds more than 3 tiles: longer rows split into balanced chunks (4 → 2+2, 5 → 3+2, 6 → 3+3).
  function useNarrow() {
    const q = "(max-width: 760px)";
    const [n, setN] = React.useState(() => window.matchMedia(q).matches);
    React.useEffect(() => { const m = window.matchMedia(q); const f = () => setN(m.matches); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
    return n;
  }
  // Swaps in a block's mobileRows layout on phones (explicit per-row arrangement; no auto-splitting).
  function Loops({ b, pid, k }) {
    const narrow = useNarrow();
    const rows = narrow && b.mobileRows ? b.mobileRows : b.rows;
    return <div style={{ display: "flex", flexDirection: "column", gap: narrow ? "10px" : "14px" }}>{rows.map((r, n) => <Row key={n + (narrow ? "m" : "d")} items={r} pid={pid} k={`${k}-${n}`} photo={b.photo} max={narrow && b.mobileRows ? 99 : (b.mobileMax || 3)} />)}</div>;
  }
  function Row({ items, pid, k, photo, max = 3 }) {
    const narrow = useNarrow();
    const tiles = items.map((it, n) => ({ it, n }));
    let chunks = [tiles];
    if (narrow && tiles.length > max) {
      const count = Math.ceil(tiles.length / max), size = Math.ceil(tiles.length / count);
      chunks = [];
      for (let i = 0; i < tiles.length; i += size) chunks.push(tiles.slice(i, i + size));
    }
    const line = (list, key) => (
      <div key={key} data-v2="prow" style={{ display: "flex", gap: "14px" }}>
        {list.map(({ it, n }) => (
          <div key={n} style={box(String(it.ar), { flex: list.length === 1 ? "1 1 0" : `${it.ar} 1 0`, minWidth: 0 })}>
            <Media m={it} slot={`${pid}-${k}-${n}`} label={it.label + (photo ? "" : " · silent loop")} />
          </div>
        ))}
      </div>
    );
    if (chunks.length === 1) return line(chunks[0], 0);
    return <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>{chunks.map((c, i) => line(c, i))}</div>;
  }
  function Switcher({ b, pid, k }) {
    const [i, setI] = React.useState(0);
    const it = b.items[i];
    return (
      <div>
        <div style={{ position: "relative", aspectRatio: "16 / 9", background: "#1A1918" }}>
          <Media key={i} m={it} slot={`${pid}-${k}-${i}`} label={"Developer update · " + it.label} sound />
        </div>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", padding: "24px " + PAD + " 0" }}>
          {b.items.map((x, n) => (
            <button key={n} onClick={() => setI(n)} className="v2-pill" style={{ cursor: "pointer", background: n === i ? "var(--v2-fg)" : "transparent", color: n === i ? "#0F0E0D" : "var(--v2-fg)" }}>{x.label}</button>
          ))}
        </div>
      </div>
    );
  }
  // Masonry: every tile keeps its true ratio (no stretching). On desktop items go round-robin, so the data
  // order sets the columns; on phones they go to the shortest column.
  function Masonry({ b }) {
    const narrow = () => window.matchMedia("(max-width: 560px)").matches;
    const [n, setN] = React.useState(() => (narrow() ? 2 : (b.cols || 3)));
    React.useEffect(() => {
      const f = () => setN(narrow() ? 2 : (b.cols || 3));
      window.addEventListener("resize", f); return () => window.removeEventListener("resize", f);
    }, []);
    const ratio = (ar) => { const [w, h] = String(ar).split("/").map(Number); return h ? h / w : 1 / w; };
    const cols = Array.from({ length: n }, () => ({ h: 0, items: [] }));
    b.items.forEach((it, k) => { const c = n === (b.cols || 3) ? cols[k % n] : cols.reduce((a, x) => (x.h < a.h ? x : a)); c.items.push(it); c.h += ratio(it.ar); });
    return (
      <div data-v2="masonry" style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
        {cols.map((c, ci) => (
          <div key={ci} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
            {c.items.map((it, ii) => (
              <div key={ii} style={{ position: "relative", flex: "none", aspectRatio: String(it.ar), overflow: "hidden", borderRadius: "10px", background: "#1A1918" }}>
                <img loading="lazy" src={it.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: it.pos || "50% 50%" }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
  function FilmCard({ it, slot }) {
    const [open, setOpen] = React.useState(false);
    const vr = React.useRef(null);
    const enter = () => { const v = vr.current; if (v) { v.muted = true; v.play().catch(() => {}); } };
    const leave = () => { const v = vr.current; if (v) { v.pause(); v.currentTime = 0; } };
    React.useEffect(() => {
      if (!open) return;
      const key = (e) => { if (e.key === "Escape") setOpen(false); };
      window.addEventListener("keydown", key);
      const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
      return () => { window.removeEventListener("keydown", key); document.body.style.overflow = prev; };
    }, [open]);
    return (
      <React.Fragment>
        <div className={"v2-tile" + (it.yt ? " v2-film-card" : "")} onMouseEnter={enter} onMouseLeave={leave} onClick={() => it.yt && setOpen(true)} style={box("2 / 3", { cursor: it.yt ? "pointer" : "default" })}>
          {it.loop ? <video ref={vr} src={it.loop + "#t=0.1"} muted loop playsInline preload="metadata" style={fill}></video>
            : <Media m={null} slot={slot} label={it.name + " · loops on hover"} />}
          <div style={{ position: "absolute", left: "14px", right: "14px", bottom: "14px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "10px", pointerEvents: "none" }}>
            <div style={{ fontFamily: roman, fontSize: "clamp(20px, 1.8vw, 28px)", lineHeight: 1, color: "var(--v2-fg)", textShadow: "0 1px 12px rgba(0,0,0,0.5)" }}>{it.name}</div>
            {it.yt && <span className="v2-film-cue" style={{ flex: "none", display: "inline-flex", alignItems: "center", gap: "6px", padding: "7px 12px", borderRadius: "999px", border: "1px solid var(--v2-fg)", background: "rgba(15,14,13,0.4)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", fontFamily: "var(--v2-sans)", fontWeight: 700, fontSize: "11px", letterSpacing: "-0.05em", textTransform: "uppercase", color: "var(--v2-fg)", whiteSpace: "nowrap" }}>▶ Watch full film</span>}
          </div>
        </div>
        {open && ReactDOM.createPortal(
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(15,14,13,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px, 4vw, 64px)" }}>
            <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "min(100%, calc((100vh - 128px) * 16 / 9))", aspectRatio: "16 / 9", borderRadius: "10px", overflow: "hidden", background: "#000" }}>
              <iframe src={"https://www.youtube-nocookie.com/embed/" + it.yt + "?autoplay=1&rel=0&playsinline=1"} title={it.name} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}></iframe>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" style={{ position: "absolute", top: "20px", right: "24px", width: "44px", height: "44px", borderRadius: "999px", border: "1px solid var(--v2-fg)", background: "transparent", color: "var(--v2-fg)", fontFamily: "var(--v2-sans)", fontSize: "18px", cursor: "pointer" }}>✕</button>
          </div>, document.body)}
      </React.Fragment>
    );
  }
  function ArtistFilm({ it, slot }) {
    const [play, setPlay] = React.useState(false);
    return (
      <div>
        <div onClick={() => it.yt && setPlay(true)} style={box("9 / 16", { cursor: it.yt ? "pointer" : "default" })}>
          {it.src ? <Media m={{ src: it.src }} slot={slot} label={it.name} sound /> : play ? <Media m={{ yt: it.yt }} loop={false} label={it.name} /> : <Media m={it.img ? { img: it.img } : null} slot={slot} label={it.name + " · 9:16"} />}
        </div>
        <Cap>{it.name}</Cap>
      </div>
    );
  }

  // One phone pinned on a brand-colour band; scrolling swipes up through the films like Instagram Reels.
  function ArtistScroll({ b, slot }) {
    const ref = React.useRef(null);
    const vids = React.useRef([]);
    const [i, setI] = React.useState(0);
    const [muted, setMuted] = React.useState(true);
    const n = b.items.length;
    React.useEffect(() => {
      const on = () => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const span = el.offsetHeight - window.innerHeight;
        const prog = Math.min(0.9999, Math.max(0, -r.top / Math.max(1, span)));
        setI(Math.floor(prog * n));
      };
      on();
      window.addEventListener("scroll", on, { passive: true });
      window.addEventListener("resize", on);
      return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
    }, [n]);
    React.useEffect(() => {
      vids.current.forEach((v, m) => {
        if (!v) return;
        v.muted = m === i ? muted : true;
        if (m === i) v.play().catch(() => {}); else { v.pause(); }
      });
    }, [i, muted]);
    const bar = (w, h, o) => ({ width: w, height: h, borderRadius: "999px", background: "rgba(255,255,255," + (o || 0.85) + ")" });
    const icon = { width: "26px", height: "26px", borderRadius: "50%", border: "2.5px solid rgba(255,255,255,0.92)", boxSizing: "border-box" };
    return (
      <div ref={ref} data-v2="artistscroll" style={{ position: "relative", height: (n * 100 + 15) + "vh", background: b.bg }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", boxSizing: "border-box", padding: "96px 20px 40px", display: "grid", gridTemplateColumns: "minmax(0,1fr) auto minmax(0,1fr)", alignItems: "center", gap: "clamp(24px, 6vw, 96px)", overflow: "hidden" }}>
          <div data-v2="artistscroll-names" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px", minWidth: 0 }}>
            {b.items.map((x, m) => (
              <div key={m} style={{ fontFamily: roman, fontSize: "clamp(22px, 2.6vw, 40px)", lineHeight: 1.05, color: "#FFFFFF", opacity: m === i ? 1 : 0.42, transition: "opacity .35s ease", whiteSpace: "nowrap" }}>{x.name}</div>
            ))}
          </div>
          <div style={{ position: "relative", width: "min(300px, 42vw, calc((100vh - 136px) * 9 / 19.5))", aspectRatio: "9 / 19.5", borderRadius: "48px", background: "#0B0B0C", padding: "12px", boxSizing: "border-box", boxShadow: "0 30px 70px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.18)" }}>
            <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "37px", overflow: "hidden", background: "#000" }}>
              {/* reel stack, swipes up */}
              <div style={{ position: "absolute", inset: 0, transform: "translateY(" + (-i * 100) + "%)", transition: "transform .65s cubic-bezier(.65,0,.25,1)" }}>
                {b.items.map((x, m) => (
                  <div key={m} style={{ position: "absolute", left: 0, right: 0, top: (m * 100) + "%", height: "100%" }}>
                    {x.src
                      ? <video ref={(el) => { vids.current[m] = el; }} src={x.src} loop muted playsInline preload={m === 0 ? "auto" : "metadata"} style={fill}></video>
                      : <image-slot id={slot + "-" + m} placeholder={x.name + " · 9:16"} style={fill}></image-slot>}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 16%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.5) 100%)", pointerEvents: "none" }}></div>
                    <div style={{ position: "absolute", right: "12px", bottom: "92px", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", pointerEvents: "none" }}>
                {[0, 1, 2].map((q) => <div key={q} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}><div style={icon}></div><div style={bar("16px", "5px", 0.7)}></div></div>)}
                <div style={{ display: "flex", gap: "3px" }}>{[0, 1, 2].map((q) => <div key={q} style={{ width: "4px", height: "4px", borderRadius: "50%", background: "rgba(255,255,255,0.92)" }}></div>)}</div>
                <div style={{ width: "24px", height: "24px", borderRadius: "6px", border: "2px solid rgba(255,255,255,0.92)", boxSizing: "border-box" }}></div>
              </div>
              <div style={{ position: "absolute", left: "14px", right: "70px", bottom: "92px", display: "flex", flexDirection: "column", gap: "6px", opacity: 0.75, pointerEvents: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(255,255,255,0.3)", border: "1.5px solid rgba(255,255,255,0.9)", boxSizing: "border-box" }}></div>
                  <div style={bar("48px", "6px")}></div>
                  <div style={{ width: "30px", height: "14px", borderRadius: "5px", border: "1px solid rgba(255,255,255,0.75)", boxSizing: "border-box" }}></div>
                </div>
                <div style={bar("62%", "5px", 0.7)}></div>
              </div>
                  </div>
                ))}
              </div>
              {/* IG chrome: no text, just shapes */}
              <div style={{ position: "absolute", top: "52px", left: "16px", right: "16px", display: "flex", justifyContent: "space-between", alignItems: "center", pointerEvents: "none" }}>
                <div style={bar("54px", "12px")}></div>
                <div style={{ width: "22px", height: "18px", borderRadius: "5px", border: "2.5px solid rgba(255,255,255,0.92)", boxSizing: "border-box" }}></div>
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "62px", background: "#000", display: "flex", justifyContent: "space-around", alignItems: "center", padding: "0 10px 10px", pointerEvents: "none" }}>
                {[0, 1, 2, 3, 4].map((q) => <div key={q} style={q === 4 ? { width: "22px", height: "22px", borderRadius: "50%", background: "rgba(255,255,255,0.35)", border: "2px solid #fff", boxSizing: "border-box" } : { width: "22px", height: "22px", borderRadius: q === 2 ? "6px" : "5px", border: "2.5px solid rgba(255,255,255," + (q === 3 ? 1 : 0.85) + ")", boxSizing: "border-box", background: q === 3 ? "rgba(255,255,255,0.9)" : "transparent" }}></div>)}
              </div>
              {b.items[i] && b.items[i].src && <button onClick={() => setMuted(!muted)} aria-label={muted ? "Turn on sound" : "Mute"} style={{ ...soundBtn, right: "auto", bottom: "auto", left: "50%", top: "84px", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>{muted ? "Sound off" : "Sound on"}</button>}
            </div>
            <div style={{ position: "absolute", top: "24px", left: "50%", transform: "translateX(-50%)", width: "26%", height: "24px", borderRadius: "999px", background: "#0B0B0C", pointerEvents: "none" }}></div>
          </div>
          <div aria-hidden="true"></div>
        </div>
      </div>
    );
  }

  function Block({ b, pid, k, proj }) {
    const slot = `${pid}-${k}`;
    switch (b.t) {
      case "hero":
        if (b.fit === "pillar") return <div data-v2="phero" style={{ position: "relative", width: "100%", height: "100vh", background: "#0F0E0D", display: "flex", justifyContent: "center" }}><div style={{ position: "relative", height: "100%", aspectRatio: "4 / 3", overflow: "hidden" }}><Media m={b} slot={slot} label={b.label} sound /></div></div>;
        return <div data-v2="phero" data-yt={b.yt ? "true" : undefined} style={{ position: "relative", width: "100%", height: "100vh", background: "#1A1918", overflow: "hidden" }}><Media m={b} slot={slot} label={b.label} sound cover /></div>;
      case "intro":
        return (
          <Section pad="clamp(56px, 6vw, 88px)">
            <div data-v2="pintro" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 380px)", gap: "48px", alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: proj.title ? "18px" : "28px", maxWidth: "820px" }}>
                <Kicker red>{proj.client}</Kicker>
                {proj.title && <h1 style={{ margin: 0, fontFamily: roman, fontWeight: 400, fontStyle: "normal", fontSize: "clamp(44px, 6vw, 96px)", lineHeight: 1, letterSpacing: "-0.01em", color: "var(--v2-fg)", textWrap: "balance" }}>{proj.title}</h1>}
                <div style={{ paddingTop: proj.title ? "10px" : 0, display: "flex", flexDirection: "column", gap: "18px" }}><Para>{b.text}</Para>{(b.more || []).map((m, n) => typeof m === "string" ? <Para key={n}>{m}</Para> : <div key={n} style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "10px" }}><span style={{ fontFamily: sans, fontWeight: 700, fontSize: "12px", letterSpacing: "-0.05em", textTransform: "uppercase", color: "var(--v2-red)" }}>{m.h}</span><Para>{m.p}</Para></div>)}</div>
              </div>
              <div data-v2="pside" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "56px" }}>
                <div data-v2="ptags" style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: "6px 22px", maxWidth: "100%" }}>
                {b.tags.map((t) => <span key={t} style={{ fontFamily: "var(--v2-sans)", fontWeight: 700, fontSize: "12px", letterSpacing: "-0.05em", textTransform: "uppercase", color: "var(--v2-fg)", padding: "4px 0", whiteSpace: "nowrap" }}>{t}</span>)}
              </div>
                {b.credit && <div data-v2="pcredit" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px", textAlign: "right" }}><span style={{ fontFamily: sans, fontWeight: 400, fontSize: "13px", lineHeight: 1.2, letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--v2-red)", whiteSpace: "nowrap" }}>{b.credit.label}</span><span style={{ fontFamily: sans, fontWeight: 700, fontSize: "clamp(16px, 1.3vw, 19px)", lineHeight: 1.15, letterSpacing: "-0.04em", color: "var(--v2-fg)" }}>{b.credit.names}</span></div>}
              </div>
            </div>
          </Section>
        );
      case "text":
        return <Section pad="clamp(40px, 4.5vw, 64px)"><div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>{b.paras.map((p, n) => <Para key={n}>{p}</Para>)}</div></Section>;
      case "section":
        return <Section pad="clamp(56px, 6vw, 88px)"><div style={{ display: "flex", flexDirection: "column", gap: "18px" }}><Kicker>{b.kicker}</Kicker><h2 style={{ margin: 0, fontFamily: roman, fontWeight: 400, fontStyle: "normal", fontSize: "clamp(36px, 4.4vw, 68px)", lineHeight: 1, color: "var(--v2-fg)" }}>{b.title}</h2><div style={{ paddingTop: "8px" }}><Para>{b.text}</Para></div></div></Section>;
      case "switcher":
        return <div style={{ paddingBottom: "16px" }}><Switcher b={b} pid={pid} k={k} /></div>;
      case "cards":
        return <Section pad="32px"><div data-v2="pcards" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "14px" }}>{b.items.map((it, n) => <FilmCard key={n} it={it} slot={`${slot}-${n}`} />)}</div></Section>;
      case "loops":
        return <Section pad="32px"><Loops b={b} pid={pid} k={k} /></Section>;
      case "stills":
        return <Section pad="32px"><div data-v2="pcards" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "14px" }}>{Array.from({ length: b.count }, (_, n) => <div key={n} style={box("16 / 9")}><Media m={(b.items || [])[n]} slot={`${slot}-${n}`} label="Still" /></div>)}</div></Section>;
      case "twoup":
        return <Section pad="32px"><div data-v2="ptwo" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "14px" }}>{b.items.map((it, n) => <div key={n}><div style={box("16 / 9")}><Media m={it} slot={`${slot}-${n}`} label={it.caption} loop={false} /></div><Cap>{it.caption}</Cap></div>)}</div></Section>;
      case "langs":
        return (
          <Section pad="32px">
            <div data-v2="plangs" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.85fr) minmax(0, 1fr)", gap: "14px", alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>{b.items.map((it, n) => <div key={n}><div style={box("16 / 9")}><Media m={it} slot={`${slot}-${n}`} label={it.caption} loop={false} /></div><Cap>{it.caption}</Cap></div>)}</div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><Phone m={b.phone} slot={`${slot}-phone`} label={b.phone.label + " · 9:16, styled as an Instagram post"} width="100%" sound={!b.phone.silent} /><Cap>{b.phone.caption}</Cap></div>
            </div>
          </Section>
        );
      case "social":
        return (
          <Section pad="32px">
            <div data-v2="psocial" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.457fr) minmax(0, 1fr)", gap: "14px", alignItems: "start" }}>
              <Phone m={b.phone} slot={`${slot}-phone`} label={b.phone.label + " · vertical"} width="100%" sound={false} />
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={box("16 / 9")}><Media m={b.loops[0]} slot={`${slot}-0`} label={b.loops[0].label} /></div>
                <Row items={[{ ...b.loops[1], ar: 16 / 9 }, { ...b.loops[2], ar: 9 / 16 }]} pid={pid} k={`${k}-r`} />
              </div>
            </div>
          </Section>
        );
      case "artistscroll":
        return <ArtistScroll b={b} slot={slot} />;
      case "artists":
        return <Section pad="32px"><div data-v2="partists" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "14px" }}>{b.items.map((it, n) => <ArtistFilm key={n} it={it} slot={`${slot}-${n}`} />)}</div></Section>;
      case "film":
        return <div style={{ padding: "0 var(--v2-pad, 40px)" }}><div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: "var(--v2-radius, 14px)", overflow: "hidden", background: "#1A1918" }}><Media m={b} slot={slot} label={b.label} loop={false} /></div></div>;
      case "phone":
        return <div data-v2="pphones" style={{ background: b.bg || "#1A1918", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "clamp(32px, 8vw, 140px)", padding: "clamp(56px, 7vw, 104px) 20px" }}>{(b.items || [b]).map((it, n) => <div key={n} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}><Phone m={it.src ? { src: it.src } : it} slot={slot + "-" + n} label={(it.label || b.label) + " · vertical"} sound={it.sound !== false} width={(b.items || []).length > 2 ? "min(280px, 26vw)" : (b.items || []).length > 1 ? "min(300px, 40vw)" : undefined} />{it.caption && <Cap>{it.caption}</Cap>}</div>)}</div>;
      case "screen":
        return <Section pad="40px"><div style={box("16 / 10")}><Media m={b.src ? { src: b.src } : null} slot={slot} label={b.label} /></div></Section>;
      case "masonry":
        return <Section pad="32px"><Masonry b={b} /></Section>;
      case "credits":
        return <Section pad="40px" style={{ borderTop: "1px solid var(--v2-line)", borderBottom: "1px solid var(--v2-line)", display: "flex", alignItems: "baseline", gap: "18px", flexWrap: "wrap" }}><span style={{ fontFamily: sans, fontWeight: 400, fontSize: "13px", letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--v2-dim)" }}>{b.label}</span><span style={{ fontFamily: sans, fontWeight: 700, fontSize: "clamp(18px, 1.5vw, 22px)", letterSpacing: "-0.04em", color: "var(--v2-fg)" }}>{b.names}</span></Section>;
      default: return null;
    }
  }

  function V2Project({ id, onOpen }) {
    const all = window.V2_PROJECTS, order = window.V2_PROJECT_ORDER;
    const proj = all[id] || all[order[0]];
    const next = order[(order.indexOf(id) + 1) % order.length];
    const nextWork = (window.V2_WORK || []).find((w) => w.id === next) || {};
    const np = all[next];
    return (
      <div style={{ background: "#0F0E0D" }}>
        {proj.blocks.map((b, k) => <Block key={k} b={b} k={k} pid={"p-" + id} proj={proj} />)}
        <a href={window.V2_PATH ? window.V2_PATH({ name: "project", id: next }) : "#"} onClick={(e) => { e.preventDefault(); onOpen(next); }} className="v2-next" data-v2="pnext" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", padding: `28px ${PAD}`, borderTop: "1px solid var(--v2-line)", textDecoration: "none", color: "var(--v2-fg)" }}>
          <span style={{ fontFamily: "var(--v2-sans)", fontWeight: 400, fontSize: "13px", letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--v2-fg)", whiteSpace: "nowrap", flex: "none" }}>Next project</span>
          <span style={{ display: "flex", alignItems: "center", gap: "clamp(14px, 1.6vw, 24px)", minWidth: 0, textAlign: "right" }}>
            <span className="v2-next-name" style={{ fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontWeight: 400, fontSize: "clamp(22px, 2vw, 30px)", lineHeight: 1.1, minWidth: 0 }}>{np.client}<span style={{ color: "var(--v2-fg)" }}>{" · " + (np.title || nextWork.project || "")}</span></span>
            <span className="v2-next-arrow" aria-hidden="true" style={{ flex: "none", fontFamily: "var(--v2-sans)", fontSize: "clamp(26px, 2.4vw, 36px)", lineHeight: 1 }}>→</span>
          </span>
        </a>
      </div>
    );
  }
  window.V2Project = V2Project;
})();
