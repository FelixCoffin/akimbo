/* global React */
function V2Home({ onNav, openItem }) {
  // the 18MB reel waits until the page (images, fonts) has finished loading
  const [reelSrc, setReelSrc] = React.useState(null);
  const stmtRef = React.useRef(null);
  React.useEffect(() => {
    const el = stmtRef.current; if (!el) return;
    const set = () => document.documentElement.style.setProperty("--v2-stmt-h", el.offsetHeight + "px");
    set();
    const ro = window.ResizeObserver ? new ResizeObserver(set) : null;
    if (ro) ro.observe(el); else window.addEventListener("resize", set);
    return () => { if (ro) ro.disconnect(); else window.removeEventListener("resize", set); };
  }, []);
  React.useEffect(() => {
    let t;
    const start = () => { t = setTimeout(() => setReelSrc("assets/reel-hero-v2.mp4"), 300); };
    if (document.readyState === "complete") start(); else window.addEventListener("load", start, { once: true });
    return () => { clearTimeout(t); window.removeEventListener("load", start); };
  }, []);
  const clientsRef = React.useRef(null);
  const [stick, setStick] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const el = clientsRef.current; if (!el) return;
      const r = el.getBoundingClientRect(), vh = window.innerHeight;
      // 0 when the strip's top meets the bottom of the screen, 1 once it reaches 55% up
      const p = (vh - r.top) / (vh * 0.45);
      setStick(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  const V2 = window.V2;
  const items = window.V2_WORK;
  const featured = ["worldcup", "somethings", "europe-tour", "tmobile", "soundcu"].map((id) => items.find((w) => w.id === id)).filter(Boolean);
  const logos = ["adidas.svg", "pepsi.svg", "t-mobile.svg", "natgeo.svg", "rayban.svg", "macklemore.svg", "shopify.svg", "universal.svg", "w-hotels.svg", "brooks.png", "somethings.svg", "mfused.png", "wmg.png"];
  return (
    <div>
      <section data-v2-hero="true" style={{ position: "relative", height: "100vh", minHeight: "560px", background: "#0F0E0D", overflow: "hidden" }}>
        <video ref={(el) => { if (el) { el.muted = true; el.defaultMuted = true; } }} src={reelSrc || undefined} preload="none" autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}></video>
      </section>

      <section ref={stmtRef} data-v2="statement" style={{ padding: "88px 40px 60px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "44px" }}>
        <h1 style={{ margin: 0, maxWidth: "1400px", fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontWeight: 600, fontStyle: "normal", fontSize: "clamp(40px, 6.4vw, 104px)", lineHeight: 1.04, letterSpacing: "-0.02em", textWrap: "pretty" }}>Intentional <em style={{ fontStyle: "italic", color: "var(--v2-red)" }}>human-led</em> creative, production, and post - that move <em style={{ fontStyle: "italic", color: "var(--v2-red)" }}>people</em> and <em style={{ fontStyle: "italic", color: "var(--v2-red)" }}>brands</em> forward.</h1>
      </section>

      <section ref={clientsRef} aria-label="Clients" data-v2="clients" style={{ display: "grid", gridTemplateColumns: "auto minmax(0,1fr)", alignItems: "center" }}>
        <div style={{ padding: "0 clamp(20px, 3vw, 56px)", alignSelf: "stretch", display: "flex", alignItems: "center", justifyContent: "center", minWidth: "clamp(260px, 24vw, 370px)" }}>
          {/* red sticker that rises into place as the strip scrolls into view */}
          <div data-v2="sticker" style={{ width: "clamp(210px, 19vw, 290px)", aspectRatio: "700 / 376", background: "url(assets/illustrations/bo-head-solid-red.png) center / contain no-repeat", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", transform: "translateY(" + ((1 - stick) * 140) + "px) rotate(" + (-14 + stick * 9) + "deg)", opacity: Math.min(1, stick * 1.6), willChange: "transform" }}>
            <span style={{ fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontStyle: "normal", fontWeight: 400, fontSize: "clamp(26px, 2.4vw, 36px)", lineHeight: 0.95, color: "var(--v2-fg)", whiteSpace: "nowrap", textAlign: "center", transform: "translateY(10%)" }}>We've<br />Worked With</span>
          </div>
        </div>
        <div style={{ overflow: "hidden", padding: "60px 0", maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)" }}>
          <div className="v2-marquee" style={{ display: "flex", width: "max-content", gap: "140px", alignItems: "center", paddingLeft: "70px" }}>
            {logos.concat(logos).map((f, i) => <img key={i} src={"assets/clients/" + f} alt={i < logos.length ? f.replace(/\.\w+$/, "").replace(/-/g, " ") + " logo" : ""} aria-hidden={i >= logos.length ? "true" : undefined} style={{ height: "56px", width: "auto", filter: "brightness(0) invert(0.93) sepia(0.1)", opacity: 0.9 }} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: "8px" }}>
        {/* five tiles, mixed sizes on a 12-column grid: tall lead + stack, then a flipped pair */}
        <div data-v2="mosaic5" style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0,1fr))", gridAutoRows: "clamp(240px, 28vw, 440px)", gap: "clamp(12px, 1.6vw, 24px)", padding: "40px clamp(12px, 2vw, 28px) 0" }}>
          {featured.map((w, i) => {
            const span = [["span 6", "span 2"], ["span 6", "span 1"], ["span 6", "span 1"], ["span 5", "span 1"], ["span 7", "span 1"]][i];
            return (
              <div key={w.id} data-i={i} style={{ gridColumn: span[0], gridRow: span[1], minHeight: 0 }}>
                <window.V2Tile item={w} fill onOpen={() => openItem(w)} />
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: "56px 0 0" }}>
          <window.V2Pill href="/work" onClick={(e) => { e.preventDefault(); onNav("work"); }}>More work</window.V2Pill>
        </div>
      </section>

      <section data-v2="about" style={{ padding: "48px 40px 72px", display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", gap: "48px", alignItems: "stretch" }}>
        <div style={{ aspectRatio: "3 / 2", overflow: "hidden", background: "#1A1918" }}>
          <img loading="lazy" src="assets/v2-thumbs/team.jpg" alt="The Akimbo crew on set" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "28px", height: "100%" }}>
          <div style={{ ...V2.label, color: "var(--v2-dim)" , letterSpacing: "-0.05em" }}>About us</div>
          <p style={{ margin: 0, fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontStyle: "normal", fontWeight: 600, fontSize: "clamp(26px, 2.6vw, 38px)", lineHeight: 1.12, letterSpacing: "-0.01em" }}>If the personality-hire was not only the friendliest person on set, but also the hardest working and the most technically specialized - you'd have an Akimbro.</p>
          <p style={{ margin: 0, fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontStyle: "normal", fontWeight: 600, fontSize: "clamp(26px, 2.6vw, 38px)", lineHeight: 1.12, letterSpacing: "-0.01em" }}>We found some of the most skilled professionals who are also the nicest<br data-v2="br-desk" /> people - and we built a team of them.</p>
          <div style={{ marginTop: "auto" }}><window.V2Pill href="/about" onClick={(e) => { e.preventDefault(); onNav("about"); }}>Meet the team</window.V2Pill></div>
        </div>
      </section>
    </div>
  );
}
window.V2Home = V2Home;
