/* global React */
// SiteNav — sticky warm-translucent nav: wordmark left, text links + one pill CTA right.
function SiteNav({ current = "home", onNav, tone = "onDark", hideOnScroll = false }) {
  const { Logo } = window.AkimboCreativeHausDesignSystem_10a51d;
  const onDark = tone === "onDark";
  const onImage = tone === "onImage";
  const forceRed = tone === "red";
  const [atTop, setAtTop] = React.useState(true);
  const [hidden, setHidden] = React.useState(false);
  // Logo: play the reveal GIF once on load, then hold the composited final frame
  // (a PNG poster — the GIF's own frames use restore-to-bg disposal so it can't
  // hold on its own). Both share the crop window below, so the swap is seamless.
  const [logoHeld, setLogoHeld] = React.useState(false);
  // Scale the whole bar proportionally below its 1280px design width so it
  // looks identical on desktop and mobile, just smaller.
  const [zoom, setZoom] = React.useState(1);
  const barRef = React.useRef(null);
  React.useEffect(() => {
    const root = document.getElementById("marketing-site-root") || document.documentElement;
    // Natural width = logo + links + side padding + a minimum gap, measured at zoom 1.
    const update = () => {
      const bar = barRef.current;
      let natural = 900;
      if (bar) {
        const z = parseFloat(bar.style.zoom) || 1;
        const kids = bar.children;
        const logo = kids[2], links = kids[3];
        if (logo && links) natural = (logo.offsetWidth + links.scrollWidth) + 112 + 40;
        void z;
      }
      setZoom(Math.min(1, root.clientWidth / natural));
    };
    update();
    const ro = window.ResizeObserver ? new ResizeObserver(update) : null;
    if (ro) ro.observe(root);
    window.addEventListener("resize", update);
    return () => { if (ro) ro.disconnect(); window.removeEventListener("resize", update); };
  }, []);
  React.useEffect(() => {
    let cancelled = false;
    const posterUrl = "assets/bo-head-logo-full-beige.png";
    const poster = new Image();
    poster.src = posterUrl;
    const ready = poster.decode ? poster.decode().catch(() => {}) : new Promise((r) => { poster.onload = r; poster.onerror = r; });
    const timer = new Promise((r) => setTimeout(r, 5100));
    Promise.all([ready, timer]).then(() => { if (!cancelled) setLogoHeld(true); });
    return () => { cancelled = true; };
  }, []);
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 12);
      // Only "scroll away" where a hero exists (home). The header stays stuck
      // through the hero, then slides up once the hero has scrolled past.
      const hero = document.querySelector("[data-hero]");
      if (hero) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        setHidden(y > heroBottom - 160);
      } else if (hideOnScroll) {
        setHidden(y > 120);
      } else {
        setHidden(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [current, hideOnScroll]);
  // On load (at the top) the header is a solid Akimbo-red bar. Once scrolling,
  // it becomes the translucent darken-blend wash over the content behind it.
  // tone="red" (e.g. Our Work) stays solid red with cream text at every scroll position.
  const barBg = onImage ? "transparent" : (forceRed ? "#B74132" : (atTop ? "#B74132" : (onDark ? "rgba(20,19,18,0.72)" : "rgba(255,255,255,0.82)")));
  const barBlend = onImage ? "normal" : (forceRed ? "normal" : (atTop ? "normal" : "darken"));
  // Cream logo + links whenever the bar is dark: at the top (red), on dark pages, forced red, or over an image.
  const navCream = onImage ? true : (atTop || onDark || forceRed);
  const barBorder = "none";
  const barBlur = onImage ? "none" : "blur(10px)";
  const link = (id, label, href) => {
    const active = current === id;
    return (
      <a
        href={href || "#"}
        className="ak-nav-link"
        onClick={(e) => { if (onNav && id) { e.preventDefault(); onNav(id); } }}
        style={{
          fontFamily: "var(--font-display)", fontWeight: 400, fontSize: "20px",
          letterSpacing: "0px", textTransform: "none", textDecoration: "none",
          color: navCream ? "var(--akimbo-cream)" : "var(--text-body)",
          borderBottom: active ? "2px solid var(--nav-underline)" : "2px solid transparent",
          paddingBottom: "3px", cursor: "pointer", whiteSpace: "nowrap",
          transition: "border-bottom-color 0.3s ease",
        }}
      >{label}</a>
    );
  };
  return (
    <div ref={barRef} style={{
      position: onImage ? "absolute" : "sticky", top: 0, left: 0, right: 0, zIndex: 20,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "30px 56px",
      transform: hidden ? "translateY(-100%)" : "translateY(0)",
      transition: "transform 0.35s ease",
      pointerEvents: hidden ? "none" : "auto",
      zoom: zoom,
      ["--nav-underline"]: (atTop || forceRed || onImage) ? "#F7F4E8" : "var(--akimbo-red)",
    }}>
      <style>{`.ak-nav-link:hover{border-bottom-color:var(--nav-underline)!important} #marketing-site-root .ak-logo-crop{width:167px!important;height:84px!important} .ak-logo-crop{transition:transform 0.25s ease} .ak-logo-held:hover .ak-logo-crop{transform:scale(1.08)}`}</style>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 0,
        background: barBg,
        mixBlendMode: barBlend,
        transition: "background 0.3s ease",
        backdropFilter: barBlur, WebkitBackdropFilter: barBlur,
        borderBottom: barBorder,
      }} />
      <a href="#"
        onClick={(e) => { e.preventDefault(); onNav && onNav("home"); }}
        className={logoHeld ? "ak-logo-held" : ""}
        style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", height: "100px", lineHeight: 0, flexShrink: 0 }}>
        {/* crop window: shows only the logo art sub-rect so its left edge sits at the 56px gutter */}
        <span className="ak-logo-crop" style={{ display: "block", width: "167px", height: "84px", overflow: "hidden", position: "relative", transformOrigin: "left center" }}>
          <img
            src={logoHeld
              ? "assets/bo-head-logo-full-beige.png"
              : "./assets/illustrations/bo-head-animation-once.gif"}
            alt="Akimbo Creative Haus"
            style={{ position: "absolute", left: "-20.36%", top: "-90.48%", width: "140.72%", maxWidth: "none", height: "auto", filter: navCream ? "none" : "brightness(0)" }}
          />
        </span>
      </a>
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "28px", flexShrink: 0, whiteSpace: "nowrap" }}>
        {link("home", "Home")}
        {link("events", "Events")}
      </div>
    </div>
  );
}
window.SiteNav = SiteNav;
