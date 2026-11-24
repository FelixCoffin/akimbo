/* global React */

// JustifiedGallery — Flickr-style justified rows. Each row's height is chosen so
// the row fills the container width exactly; every cell's width = rowHeight * (its
// true media aspect), so nothing is cropped — videos included. Equal row heights
// give a clean flush rectangle.
function JustifiedGallery({ items, bg = "#2B2A28", targetHeight = 400, gap = 14 }) {
  const ref = React.useRef(null);
  const [cw, setCw] = React.useState(0);
  const [ars, setArs] = React.useState({});
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setCw(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const setAr = (i, r) => { if (r && isFinite(r)) setArs((prev) => (prev[i] === r ? prev : Object.assign({}, prev, { [i]: r }))); };
  const media = (it, i, style) => it.kind === "video"
    ? React.createElement("video", { key: "m", ref: (el) => { if (el) { el.muted = true; el.defaultMuted = true; } }, src: it.src, autoPlay: true, loop: true, muted: true, playsInline: true, onLoadedMetadata: (e) => setAr(i, e.target.videoWidth / e.target.videoHeight), style: style })
    : React.createElement("img", { key: "m", src: it.src, alt: "", onLoad: (e) => setAr(i, e.target.naturalWidth / e.target.naturalHeight), style: style });

  const ready = cw > 0 && items.every((_, i) => ars[i]);
  // Build rows. A `tall` item becomes a full-width feature block: the tall media at
  // double height beside a stacked column of the next two items, sized to fill width.
  const rows = [];
  if (ready) {
    let cur = [], sum = 0;
    items.forEach((it, i) => {
      cur.push({ it: it, i: i });
      sum += ars[i];
      const h = (cw - gap * (cur.length - 1)) / sum;
      if (h <= targetHeight) { rows.push({ items: cur, h: h }); cur = []; sum = 0; }
    });
    // Fill the final row to full width too, so the bottom edge is always flush
    // (no partial/empty row). Nothing is cropped — the row just scales up.
    if (cur.length) rows.push({ items: cur, h: (cw - gap * (cur.length - 1)) / sum });
  }
  const cell = { flex: "0 0 auto", borderRadius: "12px", overflow: "hidden", background: "#1F1E1D" };

  return (
    <div style={{ background: bg, padding: "0 56px 64px" }}>
      <div ref={ref}>
        {!ready ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: gap + "px", opacity: 0, position: "absolute", pointerEvents: "none" }}>
            {items.map((it, i) => (
              <div key={i} style={{ height: targetHeight + "px" }}>{media(it, i, { height: targetHeight + "px", width: "auto", display: "block" })}</div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: gap + "px" }}>
            {rows.map((row, r) => (
              <div key={r} style={{ display: "flex", gap: gap + "px", height: row.h + "px" }}>
                {row.items.map(({ it, i }) => (
                  <div key={i} style={Object.assign({ width: (row.h * ars[i]) + "px", height: "100%" }, cell)}>
                    {media(it, i, { width: "100%", height: "100%", objectFit: "cover", display: "block" })}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
// FrameTile — a still with a very slight scroll parallax inside its frame.
function FrameTile({ src, srcs, amount = 3, ratio = "16 / 9" }) {
  const list = srcs && srcs.length ? srcs : [src];
  const ref = React.useRef(null);
  const [shift, setShift] = React.useState(0);
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    if (list.length < 2) return;
    const t = setInterval(() => setI((n) => (n + 1) % list.length), 2200);
    return () => clearInterval(t);
  }, [list.length]);
  React.useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      setShift((Math.max(0, Math.min(1, p)) - 0.5) * 2 * amount);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [amount]);
  return (
    <div ref={ref} style={{ position: "relative", aspectRatio: ratio, borderRadius: "10px", overflow: "hidden", background: "#1F1E1D" }}>
      {list.map((s, n) => (
        <img key={s} src={s} alt="" style={{ position: "absolute", top: "-6%", left: 0, width: "100%", height: "112%", objectFit: "cover", transform: "translateY(" + shift + "%)", willChange: "transform, opacity", opacity: n === i ? 1 : 0, transition: "opacity 900ms ease" }} />
      ))}
    </div>
  );
}
function SoundVideo({ src, ratio = "9 / 16", toggle = true, fill = false }) {
  const ref = React.useRef(null);
  const [muted, setMuted] = React.useState(true);
  const box = fill
    ? { position: "absolute", inset: 0, borderRadius: "10px", overflow: "hidden", background: "#0F0E0D" }
    : { position: "relative", aspectRatio: ratio, borderRadius: "10px", overflow: "hidden", background: "#0F0E0D" };
  return (
    <div style={box}>
      <video ref={(el) => { ref.current = el; if (el) { el.muted = muted; el.defaultMuted = true; } }} src={src} autoPlay loop muted playsInline preload="auto" style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" } : { width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <button
        onClick={() => { const el = ref.current; if (!el) return; const next = !muted; el.muted = next; if (!next) { el.volume = 1; el.play().catch(() => {}); } setMuted(next); }}
        aria-label={muted ? "Turn on sound" : "Mute"}
        style={{ display: toggle ? "flex" : "none", position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "24px", alignItems: "center", gap: "8px", padding: "11px 18px", borderRadius: "999px", border: "1px solid rgba(242,239,233,0.5)", background: "rgba(31,30,29,0.45)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", color: "var(--akimbo-cream)", fontFamily: "var(--v2-sans)", fontWeight: 700, fontSize: "12px", letterSpacing: "-0.05em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" }}
      >
        <span style={{ fontSize: "14px", lineHeight: 1 }}>{muted ? "\uD83D\uDD07" : "\uD83D\uDD0A"}</span>
        {muted ? "Sound Off" : "Sound On"}
      </button>
    </div>
  );
}
// WorkDetail — case-study page, matching the Somethings layout:
// centered film plate, dark hero band, red "THE WORK" gallery, dark stat cards, next.
function WorkDetail({ id, onOpen }) {
  const work = window.AKIMBO_WORK;
  const proj = work.find((w) => w.id === id) || work[0];
  const idx = work.findIndex((w) => w.id === proj.id);
  const next = work[(idx + 1) % work.length];
  const isWC = proj.id === "worldcup";
  const [scrollY, setScrollY] = React.useState(0);
  const [heroMuted, setHeroMuted] = React.useState(true);
  const [vidMuted, setVidMuted] = React.useState(true);
  const vidVideoRef = React.useRef(null);
  const [carIdx, setCarIdx] = React.useState(0);
  const carImgs = ["assets/super-fog-scroll.mp4"];
  const heroVideoRef = React.useRef(null);
  const ytRef = React.useRef(null);
  const [ytMuted, setYtMuted] = React.useState(true);
  const toggleYt = () => {
    const w = ytRef.current && ytRef.current.contentWindow;
    if (!w) return;
    const func = ytMuted ? "unMute" : "mute";
    w.postMessage(JSON.stringify({ event: "command", func: func, args: [] }), "*");
    setYtMuted(!ytMuted);
  };
  const [ytPlaying, setYtPlaying] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const leftVidWrapRef = React.useRef(null);
  const [leftVidShift, setLeftVidShift] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const el = leftVidWrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const progress = (window.innerHeight - r.top) / (window.innerHeight + r.height);
      setLeftVidShift((Math.max(0, Math.min(1, progress)) - 0.5) * 2 * 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const plate = (label) => (
    <div style={{ position: "relative", aspectRatio: "16 / 9", background: "rgba(31,30,29,.55)", borderRadius: "6px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--v2-sans)", fontWeight: 700, fontSize: "10px", letterSpacing: "-0.05em", color: "rgba(247, 244, 232,0.4)" }}>{label}</div>
  );
  return (
    <div style={{ background: "#0F0E0D" }}>
      {/* hero: full-screen parallax photo under the fixed transparent nav (World Cup) or centered film plate */}
      {proj.id === "worldcup" || proj.heroImg ? (
        <div data-v2={proj.id === "soundcu" ? "scu-hero" : undefined} data-scu-main={proj.id === "soundcu" ? "true" : undefined} data-wc-hero={proj.id === "worldcup" ? "true" : undefined} style={{ position: "relative", zIndex: 0, height: proj.heroImg && proj.id !== "soundcu" ? "74vh" : "100vh", overflow: "hidden", marginBottom: "-1px" }}>
          <img src={proj.heroImg || "assets/wc-hero-players.jpg"} alt={proj.title} style={{ position: "absolute", top: proj.heroImg ? 0 : "-12%", left: 0, width: "100%", height: proj.heroImg ? "100%" : "124%", objectFit: "cover", objectPosition: proj.heroPosition || "center", transformOrigin: "50% 0%", transform: "scale(" + (proj.heroZoom || 1) + ") translate(" + (proj.heroShiftX || "0%") + ", calc(" + (proj.heroShift || "0%") + " + " + (scrollY * 0.25) + "px))", willChange: "transform" }} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "220px", background: "linear-gradient(to bottom, rgba(20,19,18,0.62), rgba(20,19,18,0))", pointerEvents: "none" }} />
        </div>
      ) : (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#1F1E1D", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "76px", height: "76px", borderRadius: "16px", background: "#0F0E0D", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--akimbo-cream)", fontSize: "22px" }}>▶</div>
          </div>
        </div>
      )}

      {/* description band — light, kicker + headline + body left, work-area tags right */}
      <div data-wd="head" style={{ background: "#0F0E0D", padding: "88px 72px 80px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "64px" }}>
        <div style={{ maxWidth: "1000px" }}>
          <div style={{ fontFamily: "var(--v2-sans)", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.05em", textTransform: "uppercase", color: "var(--v2-red)", marginBottom: "24px" }}>{proj.cross}</div>
          <div data-wd="ttl" style={{ fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontStyle: "normal", fontWeight: 400, fontSize: "96px", lineHeight: 1, letterSpacing: "-0.01em", color: "var(--text-body)", maxWidth: "1000px" }}>{proj.title}</div>
          <p style={{ margin: "32px 0 0", maxWidth: "640px", fontWeight: 500, fontSize: "14px", lineHeight: 1.6, color: "var(--text-label)" }}>{proj.lead}</p>
          {(proj.leadMore || []).map((m, n) => <p key={n} style={{ margin: "16px 0 0", maxWidth: "640px", fontWeight: 500, fontSize: "14px", lineHeight: 1.6, color: "var(--text-label)" }}>{m}</p>)}
        </div>
        <div style={{ flex: "0 0 auto", display: "flex", flexWrap: "wrap", gap: "6px 22px", justifyContent: "flex-end", maxWidth: "475px", paddingTop: "8px" }}>
          {(proj.tags || ["Brand Strategy", "Art Direction", "Production"]).map((tag) => (
            <span key={tag} style={{ fontFamily: "var(--v2-sans)", fontWeight: 700, fontSize: "12px", letterSpacing: "-0.05em", textTransform: "uppercase", color: "var(--v2-fg)", padding: "4px 0", whiteSpace: "nowrap" }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* full-bleed hero video (World Cup only) */}
      {proj.id === "worldcup" && (
        <div style={{ position: "relative" }}>
          <video ref={(el) => { heroVideoRef.current = el; if (el) { el.muted = heroMuted; el.defaultMuted = true; } }} src="assets/wc-hero.mp4" autoPlay loop muted playsInline style={{ display: "block", width: "100%", height: "auto" }} />
          <button
            onClick={() => { const el = heroVideoRef.current; if (!el) return; const nextMuted = !heroMuted; el.muted = nextMuted; if (!nextMuted) { el.volume = 1; el.play().catch(() => {}); } setHeroMuted(nextMuted); }}
            aria-label={heroMuted ? "Turn on sound" : "Mute"}
            style={{ position: "absolute", right: "24px", bottom: "24px", display: "flex", alignItems: "center", gap: "8px", padding: "11px 18px", borderRadius: "999px", border: "1px solid rgba(242,239,233,0.5)", background: "rgba(31,30,29,0.45)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", color: "var(--akimbo-cream)", fontFamily: "var(--v2-sans)", fontWeight: 700, fontSize: "12px", letterSpacing: "-0.05em", textTransform: "uppercase", cursor: "pointer" }}
          >
            <span style={{ fontSize: "14px", lineHeight: 1 }}>{heroMuted ? "\uD83D\uDD07" : "\uD83D\uDD0A"}</span>
            {heroMuted ? "Sound Off" : "Sound On"}
          </button>
        </div>
      )}

      {isWC && (
      <React.Fragment>
      {/* TWO VERTICALS — dark band, two 4:5 slots */}
      <div data-wd="band" style={{ background: "#0F0E0D", padding: "112px 56px" }}>
        <div data-wd="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", margin: "0 auto" }}>
          <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden", background: "#1F1E1D", maxHeight: "120vh" }}>
            <video ref={(el) => { vidVideoRef.current = el; if (el) { el.muted = vidMuted; el.defaultMuted = true; } }} src="assets/wc-vertical-2.mp4" autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.005)" }} />
            <button
              onClick={() => { const el = vidVideoRef.current; if (!el) return; const nextMuted = !vidMuted; el.muted = nextMuted; if (!nextMuted) { el.volume = 1; el.play().catch(() => {}); } setVidMuted(nextMuted); }}
              aria-label={vidMuted ? "Turn on sound" : "Mute"}
              style={{ position: "absolute", right: "24px", bottom: "24px", display: "flex", alignItems: "center", gap: "8px", padding: "11px 18px", borderRadius: "999px", border: "1px solid rgba(242,239,233,0.5)", background: "rgba(31,30,29,0.45)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", color: "var(--akimbo-cream)", fontFamily: "var(--v2-sans)", fontWeight: 700, fontSize: "12px", letterSpacing: "-0.05em", textTransform: "uppercase", cursor: "pointer" }}
            >
              <span style={{ fontSize: "14px", lineHeight: 1 }}>{vidMuted ? "\uD83D\uDD07" : "\uD83D\uDD0A"}</span>
              {vidMuted ? "Sound Off" : "Sound On"}
            </button>
          </div>
          <div style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden", background: "#1F1E1D", maxHeight: "120vh" }}>
            {carImgs.map((src, j) => (
              src.endsWith(".mp4")
                ? <video key={j} src={src} autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: j === carIdx ? 1 : 0, transition: "opacity 0.45s ease", filter: "saturate(1.1) contrast(1.04)" }} />
                : <img key={j} src={src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: j === carIdx ? 1 : 0, transition: "opacity 0.45s ease" }} />
            ))}
            {false && (
            <React.Fragment>
            <button onClick={() => setCarIdx((carIdx - 1 + carImgs.length) % carImgs.length)} aria-label="Previous" style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", borderRadius: "999px", border: "1px solid rgba(242,239,233,0.6)", background: "rgba(31,30,29,0.4)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", color: "var(--akimbo-cream)", fontSize: "20px", lineHeight: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
            <button onClick={() => setCarIdx((carIdx + 1) % carImgs.length)} aria-label="Next" style={{ position: "absolute", right: "18px", top: "50%", transform: "translateY(-50%)", width: "48px", height: "48px", borderRadius: "999px", border: "1px solid rgba(242,239,233,0.6)", background: "rgba(31,30,29,0.4)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", color: "var(--akimbo-cream)", fontSize: "20px", lineHeight: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: "18px", display: "flex", justifyContent: "center", gap: "8px" }}>
              {carImgs.map((_, j) => (
                <button key={j} onClick={() => setCarIdx(j)} aria-label={"Slide " + (j + 1)} style={{ width: j === carIdx ? "22px" : "8px", height: "8px", borderRadius: "999px", border: "none", padding: 0, background: j === carIdx ? "var(--akimbo-cream)" : "rgba(242,239,233,0.5)", transition: "width 0.3s ease", cursor: "pointer" }} />
              ))}
            </div>
            </React.Fragment>
            )}
          </div>
        </div>
      </div>

      {/* THE GALLERY — masonry collage of drop-slots */}
      <JustifiedGallery bg="#0F0E0D" items={[
        { kind: "video", src: "assets/wc-flag.mp4" },
        { kind: "image", src: "assets/wc-fanbox.jpg" },
        { kind: "image", src: "assets/wc-ball-sky.jpg" },
        { kind: "image", src: "assets/wc-champs.png" },
        { kind: "image", src: "assets/wc-ball-goal.jpg" },
        { kind: "image", src: "assets/wc-keeper-portrait.jpg" },
        { kind: "video", src: "assets/wc-stadium-teaser.mp4" },
        { kind: "image", src: "assets/wc-field-portrait.jpg" },
        { kind: "image", src: "assets/wc-locker.jpg" },
        { kind: "image", src: "assets/wc-reactions.jpg" },
        { kind: "video", src: "assets/wc-vertical-teaser.mp4" },
        { kind: "image", src: "assets/wc-group-grass.jpg" },
      ]} />

      {/* SECOND DESCRIPTOR — Artist Collaboration Documentary */}
      <div data-wd="head" style={{ background: "#0F0E0D", padding: "88px 72px 80px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "64px" }}>
        <div style={{ maxWidth: "1000px" }}>
          <div style={{ fontFamily: "var(--v2-sans)", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.05em", textTransform: "uppercase", color: "var(--v2-red)", marginBottom: "24px" }}>Artist Collaboration</div>
          <div data-wd="ttl" style={{ fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontStyle: "normal", fontWeight: 400, fontSize: "96px", lineHeight: 1, letterSpacing: "-0.01em", color: "var(--text-body)", maxWidth: "1000px" }}>Shogo Ota</div>
          <p style={{ margin: "32px 0 0", maxWidth: "640px", fontWeight: 500, fontSize: "14px", lineHeight: 1.6, color: "var(--text-label)" }}>We met up with official FIFA World Cup Seattle Artist Shogo Ota at his home in Bainbridge Island to document his heritage, process, and connection to soccer as well as the Super Fog Brand.</p>
        </div>
      </div>

      {/* FULL-BLEED EMBEDDED VIDEO */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#0F0E0D" }}>
        <iframe
          ref={ytRef}
          src="https://www.youtube-nocookie.com/embed/Ezf8jpsrCaA?autoplay=1&mute=1&loop=1&playlist=Ezf8jpsrCaA&controls=0&playsinline=1&rel=0&enablejsapi=1"
          title="Artist Collaboration: Shogo Ota"
          allow="autoplay; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }}
        />
        <button
          onClick={toggleYt}
          aria-label={ytMuted ? "Turn on sound" : "Mute"}
          style={{ position: "absolute", right: "24px", bottom: "24px", display: "flex", alignItems: "center", gap: "8px", padding: "11px 18px", borderRadius: "999px", border: "1px solid rgba(242,239,233,0.5)", background: "rgba(31,30,29,0.45)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)", color: "var(--akimbo-cream)", fontFamily: "var(--v2-sans)", fontWeight: 700, fontSize: "12px", letterSpacing: "-0.05em", textTransform: "uppercase", cursor: "pointer" }}
        >
          <span style={{ fontSize: "14px", lineHeight: 1 }}>{ytMuted ? "\uD83D\uDD07" : "\uD83D\uDD0A"}</span>
          {ytMuted ? "Sound Off" : "Sound On"}
        </button>
      </div>

      {/* TWO 4:5 PLACEHOLDERS — dark band */}
      <div data-wd="band" style={{ background: "#0F0E0D", padding: "112px 56px" }}>
        <div data-wd="two" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", margin: "0 auto" }}>
          <div ref={leftVidWrapRef} style={{ position: "relative", aspectRatio: "4 / 5", overflow: "hidden", maxHeight: "120vh", background: "#1F1E1D" }}>
            <video ref={(el) => { if (el) { el.muted = true; el.defaultMuted = true; } }} src="assets/wd-shogo-right.mp4" autoPlay loop muted playsInline style={{ position: "absolute", top: "-5%", left: 0, width: "100%", height: "110%", objectFit: "cover", transform: "translateY(" + leftVidShift + "%)", willChange: "transform" }} />
          </div>
          <div style={{ aspectRatio: "4 / 5", overflow: "hidden", maxHeight: "120vh", background: "#1F1E1D" }}>
            <video ref={(el) => { if (el) { el.muted = true; el.defaultMuted = true; } }} src="assets/shogo-photos-prup.mp4" autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </div>
      </React.Fragment>
      )}

      {!isWC && (
      <React.Fragment>
        {/* THE FILM — large 16:9, full bleed */}
        <div style={{ background: proj.id === "soundcu" ? "#0F0E0D" : "#1A1918" }}>
          {proj.filmKicker && (
            <div data-wd="band" style={{ padding: "96px 56px 36px" }}>
              <div style={{ fontFamily: "var(--v2-sans)", fontWeight: 400, fontSize: "16px", letterSpacing: "-0.05em", textTransform: "uppercase", color: "var(--v2-fg)", marginBottom: "20px" }}>{proj.filmKicker}</div>
              <div data-wd="ttl" style={{ fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontStyle: "normal", fontWeight: 400, fontSize: "80px", lineHeight: 1, letterSpacing: "-0.01em", color: "var(--akimbo-cream)", maxWidth: "1000px" }}>{proj.filmTitle}</div>
            </div>
          )}
          <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#0F0E0D", overflow: "hidden" }}>
            {proj.youtube ? (
              <iframe
                src={"https://www.youtube-nocookie.com/embed/" + proj.youtube + "?rel=0&playsinline=1"}
                title={proj.title}
                allow="autoplay; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }}
              />
            ) : (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "88px", height: "88px", borderRadius: "18px", background: "#0F0E0D", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--akimbo-cream)", fontSize: "26px" }}>▶</div>
              </div>
            )}
          </div>
        </div>

        {/* FRAMES — one mosaic: stills + verticals interleaved */}
        <div data-wd="band" style={{ background: proj.id === "soundcu" ? "#0F0E0D" : "#1A1918", padding: "96px 56px 112px" }}>
          {proj.frames ? (
            <div data-wd="m12" style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "14px" }}>
              {(() => {
                const norm = proj.frames.map((f) => (typeof f === "string" ? { src: f } : f));
                const wide = norm.find((f) => f.wide);
                const stills = norm.filter((f) => !f.wide);
                const cuts = (proj.cutdowns || []).slice();
                const heroIdx = cuts.findIndex((s) => /belmar-15/.test(s));
                const heroCut = heroIdx === -1 ? null : cuts.splice(heroIdx, 1)[0];
                const tile = (item, key, ratio) => (
                  item.slot ? (
                    <div key={key} style={{ aspectRatio: "16 / 9", borderRadius: "10px", overflow: "hidden", background: "#1F1E1D" }}>
                      <image-slot id={proj.id + "-frame-extra"} shape="rounded" radius="10" placeholder="Drop a frame" style={{ width: "100%", height: "100%", display: "block" }}></image-slot>
                    </div>
                  ) : item.video ? (
                    <SoundVideo key={key} src={item.video} toggle={false} ratio="16 / 9" />
                  ) : (
                    <FrameTile key={key} src={item.src} srcs={item.srcs} ratio={ratio || "16 / 9"} />
                  )
                );
                const stack = (items, key) => (
                  <div key={key} style={{ gridColumn: "span 8", display: "flex", flexDirection: "column", gap: "14px" }}>
                    {items.map((it, n) => tile(it, key + "-" + n))}
                  </div>
                );
                const vert = (src, key) => (
                  <div key={key} style={{ gridColumn: "span 4", position: "relative" }}>
                    <SoundVideo src={src} fill toggle={/belmar-15/.test(src)} />
                  </div>
                );
                const rows = [];
                if (heroCut) {
                  rows.push(
                    <div key="hero-cut" style={{ gridColumn: "span 12", borderRadius: "10px", overflow: "hidden", background: "#14316B", display: "flex", justifyContent: "center", padding: "64px 24px" }}>
                      <div style={{ position: "relative", width: "320px", maxWidth: "64vw", aspectRatio: "9 / 19.5", borderRadius: "46px", background: "#0B0B0C", padding: "11px", boxShadow: "0 30px 70px rgba(6,16,40,0.55), 0 0 0 1px rgba(244,242,236,0.09)" }}>
                        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "36px", overflow: "hidden", background: "#0F0E0D" }}>
                          <SoundVideo src={heroCut} fill />
                        </div>
                        <div style={{ position: "absolute", top: "22px", left: "50%", transform: "translateX(-50%)", width: "84px", height: "24px", borderRadius: "999px", background: "#0B0B0C", pointerEvents: "none" }} />
                      </div>
                    </div>
                  );
                }
                const pairA = stills.slice(0, 2);
                const pairB = stills.slice(2, 4);
                const rest = stills.slice(4);
                const lastCut = cuts.length > 1 ? cuts.shift() : null;
                if (wide) {
                  rows.push(
                    <div key="wide" style={{ gridColumn: lastCut ? "span 8" : "span 12" }}>{tile(wide, "wide", lastCut ? "3 / 2" : "16 / 9")}</div>
                  );
                  if (lastCut) rows.push(vert(lastCut, "vlast"));
                }
                if (pairA.length) {
                  if (cuts.length) rows.push(vert(cuts.shift(), "va"));
                  rows.push(
                    <div key="a" style={{ gridColumn: "span 8", display: "flex", flexDirection: "column", gap: "14px" }}>
                      {pairA.map((it, n) => tile(it, "a-" + n))}
                    </div>
                  );
                }
                const lastCutDone = true;
                if (pairB.length) {
                  if (cuts.length) rows.push(vert(cuts.shift(), "vb"));
                  rows.push(stack(pairB, "b"));
                }
                rest.forEach((it, n) => rows.push(<div key={"r" + n} style={{ gridColumn: "span 6" }}>{tile(it, "r" + n)}</div>));
                cuts.forEach((src, n) => rows.push(
                  <div key={"vc" + n} style={{ gridColumn: "span 4" }}>
                    <SoundVideo src={src} toggle={/belmar-15/.test(src)} />
                  </div>
                ));
                return rows;
              })()}
            </div>
          ) : (
            <div data-wd="m6" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gridAutoRows: "minmax(0, auto)", gap: "14px" }}>
              {[["span 4", "16 / 9"], ["span 2", "4 / 5"], ["span 2", "16 / 9"], ["span 2", "16 / 9"], ["span 2", "16 / 9"], ["span 2", "4 / 5"], ["span 4", "16 / 9"]].map((cfg, i) => (
                <div key={i} style={{ gridColumn: cfg[0], aspectRatio: cfg[1], borderRadius: "10px", overflow: "hidden", background: "#E6E1D2" }}>
                  <image-slot id={proj.id + "-frame-" + (i + 1)} shape="rounded" radius="10" placeholder={"Frame " + (i + 1)} style={{ width: "100%", height: "100%", display: "block" }}></image-slot>
                </div>
              ))}
            </div>
          )}
        </div>

        {proj.cutdowns && !proj.frames && (
          <div data-wd="cuts" style={{ background: "#1A1918", padding: "0 56px 112px", display: "grid", gridTemplateColumns: "repeat(" + proj.cutdowns.length + ", 1fr)", gap: "14px" }}>
            {proj.cutdowns.map((src) => (
              <div key={src} style={{ aspectRatio: "9 / 16", borderRadius: "10px", overflow: "hidden", background: "#0F0E0D" }}>
                {/\.(png|jpg|jpeg|webp)$/i.test(src) ? (
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <video ref={(el) => { if (el) { el.muted = true; el.defaultMuted = true; } }} src={src} autoPlay loop muted playsInline controls preload="auto" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                )}
              </div>
            ))}
          </div>
        )}
      </React.Fragment>
      )}

      {/* next project */}
      <a href={window.V2_PATH ? window.V2_PATH({ name: "detail", id: next.id }) : "#"} onClick={(e) => { e.preventDefault(); onOpen && onOpen(next.id); }} className="v2-next" data-v2="pnext" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px", padding: "28px 72px", borderTop: "1px solid var(--v2-line)", textDecoration: "none", color: "var(--v2-fg)" }}>
          <span style={{ fontFamily: "var(--v2-sans)", fontWeight: 400, fontSize: "13px", letterSpacing: "0.02em", textTransform: "uppercase", color: "var(--v2-fg)", whiteSpace: "nowrap", flex: "none" }}>Next project</span>
          <span style={{ display: "flex", alignItems: "center", gap: "clamp(14px, 1.6vw, 24px)", minWidth: 0, textAlign: "right" }}>
            <span className="v2-next-name" style={{ fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontWeight: 400, fontSize: "clamp(22px, 2vw, 30px)", lineHeight: 1.1, minWidth: 0 }}>{next.client}<span style={{ color: "var(--v2-fg)" }}>{" · " + (next.title.charAt(0) + next.title.slice(1).toLowerCase())}</span></span>
            <span className="v2-next-arrow" aria-hidden="true" style={{ flex: "none", fontFamily: "var(--v2-sans)", fontSize: "clamp(26px, 2.4vw, 36px)", lineHeight: 1 }}>→</span>
          </span>
        </a>
    </div>
  );
}
window.WorkDetail = WorkDetail;
