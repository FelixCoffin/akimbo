/* global React */
// V2 shared bits: label style, click-to-copy email, connect CTA, footer, nav.
const V2 = {
  serif: "var(--v2-serif)",
  sans: "var(--v2-sans)",
  label: { fontFamily: "var(--v2-sans)", fontWeight: 500, fontSize: "12px", letterSpacing: "-0.05em", textTransform: "uppercase" },
  EMAIL: "hello@akimbo.haus",
  BOOK: "#book-a-call",
  SOCIALS: [["IG", "https://www.instagram.com/akimbo.haus"], ["LI", "https://www.linkedin.com/company/akimbo-creative-haus/"], ["YT", "https://www.youtube.com/@akimbo.haus"]],
};
window.V2 = V2;

// Email opens a Gmail compose window; a "Copy email" pill drops down beneath it on hover.
function CopyEmail({ size = 22 }) {
  const [done, setDone] = React.useState(false);
  const href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(V2.EMAIL);
  const copy = (e) => {
    e.preventDefault(); e.stopPropagation();
    const fallback = () => { const t = document.createElement("textarea"); t.value = V2.EMAIL; t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (err) {} t.remove(); };
    try { navigator.clipboard.writeText(V2.EMAIL).catch(fallback); } catch (err) { fallback(); }
    setDone(true); setTimeout(() => setDone(false), 1600);
  };
  return (
    <span className={"v2-email" + (done ? " v2-email-done" : "")} style={{ position: "relative", display: "inline-flex", flexDirection: "column", alignItems: "flex-start" }}>
      <a href={href} target="_blank" rel="noopener" className="v2-copy" title={"Email " + V2.EMAIL} style={{ display: "inline-flex", alignItems: "baseline", textDecoration: "none", color: "var(--v2-fg)" }}>
        <span style={{ fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontStyle: "normal", fontWeight: 400, fontSize: Math.round(size * 1.15) + "px", lineHeight: 1.1, letterSpacing: "0", color: "var(--v2-dim-strong)" }}>{V2.EMAIL}</span>
      </a>
      <span className="v2-email-drop">
        <button type="button" onClick={copy} className="v2-email-btn">{done ? "Copied" : "Copy email"}</button>
      </span>
    </span>
  );
}
window.V2CopyEmail = CopyEmail;

// Monochrome brand marks, drawn at 24px in the off-white.
const SOCIAL_ICONS = {
  IG: <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4.2"></circle><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"></circle></svg>,
  LI: <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.25H3zM9.5 9.75h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.78-1.7-2.78-1.7 0-1.96 1.33-1.96 2.7V21h-4z"></path></svg>,
  YT: <svg viewBox="0 0 24 24" width="26" height="24" fill="currentColor"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8zM9.75 15.1V8.9L15.5 12z"></path></svg>,
};
const SOCIAL_NAMES = { IG: "Instagram", LI: "LinkedIn", YT: "YouTube" };
function Socials({ size = 24, spread }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "22px", justifyContent: spread ? "space-between" : "flex-start" }}>
      {V2.SOCIALS.map(([k, href]) => <a key={k} href={href} target="_blank" rel="noopener" aria-label={SOCIAL_NAMES[k]} className="v2-link v2-social" style={{ display: "inline-flex", color: "var(--v2-fg)", width: size + "px", height: size + "px" }}>{SOCIAL_ICONS[k]}</a>)}
    </div>
  );
}
window.V2Socials = Socials;

function PillLink({ children, href, onClick }) {
  return <a href={href || "#"} onClick={onClick} className="v2-pill">{children}</a>;
}
window.V2Pill = PillLink;

function V2Nav({ current, onNav }) {
  const [logoSrc, setLogoSrc] = React.useState(() => "assets/illustrations/bo-head-animation-once.gif?play=" + Date.now());
  const [hidden, setHidden] = React.useState(false);
  React.useEffect(() => {
    const still = new Image(); still.src = "assets/bo-head-logo-full-beige.png";
    const t = setTimeout(() => setLogoSrc("assets/bo-head-logo-full-beige.png"), 5100);
    return () => clearTimeout(t);
  }, []);
  // Same behavior as V1: on Home the header rides over the reel, then slides away once the reel has scrolled past.
  React.useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector("[data-v2-hero]");
      setHidden(hero ? window.scrollY > hero.offsetTop + hero.offsetHeight - 160 : false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [current]);
  const link = (id, label) => (
    <a href={window.V2_PATH ? window.V2_PATH({ name: id }) : "#"} onClick={(e) => { e.preventDefault(); onNav(id); }} className={"v2-nav-link" + (current === id ? " v2-nav-on" : "")}>{label}</a>
  );
  return (
    <header data-v2="nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "26px 56px 32px", transform: hidden ? "translateY(-100%)" : "none", transition: "transform 0.35s ease", pointerEvents: hidden ? "none" : "auto" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, background: "linear-gradient(to bottom, rgba(15,14,13,0.72) 0%, rgba(15,14,13,0.38) 55%, rgba(15,14,13,0) 100%)", pointerEvents: "none" }}></div>
      <a href="/" onClick={(e) => { e.preventDefault(); onNav("home"); }} aria-label="Akimbo Creative Haus, home" className="v2-logo" style={{ position: "relative", zIndex: 1, display: "block", lineHeight: 0 }}>
        <span data-v2="logo" style={{ display: "block", width: "128px", height: "64px", overflow: "hidden", position: "relative" }}>
          <img src={logoSrc} alt="Akimbo Creative Haus" style={{ position: "absolute", left: "-20.36%", top: "-90.48%", width: "140.72%", maxWidth: "none", height: "auto", filter: "brightness(0) invert(0.93) sepia(0.1)" }} />
        </span>
      </a>
      <nav style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "32px" }}>
        {link("work", "Work")}{link("about", "About")}{link("contact", "Contact")}
      </nav>
    </header>
  );
}
window.V2Nav = V2Nav;

// Connect block that sits above the footer on every page except Contact.
function V2Connect({ title, sub, withBo, noRule, cta }) {
  const { BoMark } = window.AkimboCreativeHausDesignSystem_10a51d;
  return (
    <section data-v2="connect" style={{ padding: "80px 40px 72px", borderTop: noRule ? "none" : "1px solid var(--v2-line)", display: "grid", gridTemplateColumns: withBo === "bike" ? "minmax(0,1.5fr) minmax(0,0.8fr) minmax(0,1.3fr)" : "minmax(0,1.7fr) minmax(0,1fr) minmax(0,0.7fr)", alignItems: "end", gap: "40px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "68px" }}>
        <h2 data-v2="connect-title" style={{ margin: 0, fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontWeight: 400, fontStyle: "normal", fontSize: "clamp(36px, 4.2vw, 72px)", lineHeight: 1, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{title}</h2>
        {sub && <p style={{ margin: "-16px 0 0", maxWidth: "520px", fontSize: "17px", lineHeight: 1.5, color: "var(--v2-dim-strong)" }}>{sub}</p>}
        <div style={{ display: "inline-flex", flexDirection: "column", alignSelf: "flex-start", gap: "28px" }}>
          <div>{cta ? <a href="/contact" onClick={(e) => { e.preventDefault(); cta.onClick(); }} className="v2-pill v2-pill-cta">{cta.label}</a> : <a href={V2.BOOK} className="v2-pill v2-pill-cta">Schedule meeting</a>}</div>
          <CopyEmail size={26} />
          <div style={{ width: "100%" }}><Socials size={44} spread /></div>
        </div>
      </div>
      <div data-v2="connect-offices" style={{ display: "flex", flexDirection: "column", gap: "32px", paddingBottom: "6px" }}>
        {[["Seattle", "5651 University Wy NE", "Seattle, WA"], ["New York", "300 Kent Ave", "Brooklyn, NY"]].map(([city, l1, l2]) => (
          <div key={city} className="v2-office" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div className="v2-office-city" style={{ fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontStyle: "normal", fontWeight: 400, fontSize: "clamp(26px, 2.2vw, 34px)", lineHeight: 1 }}>{city}</div>
            <div style={{ fontFamily: "var(--v2-sans)", fontWeight: 400, fontSize: "15px", lineHeight: 1.5, letterSpacing: "-0.05em", textTransform: "uppercase", color: "var(--v2-dim-strong)" }}>{l1}<br />{l2}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end", alignSelf: "stretch", paddingBottom: "10px", marginLeft: "-32px" }}>
        {withBo === "sitting" ? <div data-v2="connect-bo" style={{ width: "min(21.7vw, 253px)", transform: "translate(-14px, 12px)" }}><img src="assets/illustrations/bos-sitting-cream.png" alt="Bo sitting" style={{ width: "100%", height: "auto", display: "block", filter: "brightness(0) invert(0.93) sepia(0.1)" }} /></div> : withBo && (withBo === "bike"
          ? <div data-v2="connect-bike" aria-label="Bo riding a bike" role="img" style={{ width: "min(36vw, 560px)", flexShrink: 0, marginLeft: "auto", marginBottom: "calc(min(36vw, 560px) * -0.0575 - 10px)", aspectRatio: "16 / 9", isolation: "isolate", mixBlendMode: "lighten" }}><video ref={(el) => { if (el) { el.muted = true; el.defaultMuted = true; } }} src="assets/bo-bike-white.mp4?v=1080" autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "left bottom", display: "block", filter: "sepia(0.08) brightness(0.957)" }}></video></div>
          : <div data-v2="connect-bo" style={{ width: "min(26vw, 300px)" }}><BoMark pose="leaping" tone="cream" basePath="assets/illustrations" style={{ width: "100%", height: "auto", display: "block", filter: "brightness(0) invert(0.93) sepia(0.1)" }} /></div>)}
      </div>
    </section>
  );
}
window.V2Connect = V2Connect;

// Footer: one red rounded bar split into four cells by hairlines.
function V2Footer({ onNav }) {
  const serif = { fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontStyle: "normal", fontWeight: 400, fontSize: "26px", lineHeight: 1.1, color: "var(--v2-fg)" };
  const fl = (id, label) => <a key={id} href={window.V2_PATH ? window.V2_PATH({ name: id }) : "#"} onClick={(e) => { e.preventDefault(); onNav(id); }} className="v2-link" style={{ ...serif, fontFamily: "var(--v2-serif)", fontStyle: "italic" }}>{label}</a>;
  const cell = { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px", padding: "16px 20px", textAlign: "center", minWidth: 0 };
  const line = "1px solid rgba(15,14,13,0.55)";
  return (
    <footer style={{ padding: "0 16px 16px" }}>
      <div data-v2="footer" style={{ background: "var(--v2-red)", borderRadius: "22px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px 40px", minHeight: "88px", padding: "8px 32px" }}>
        <span style={{ display: "block", width: "120px", height: "60px", overflow: "hidden", position: "relative", flex: "none" }}>
          <img src="assets/bo-head-logo-full-beige.png" alt="Akimbo Creative Haus" style={{ position: "absolute", left: "-20.36%", top: "-90.48%", width: "140.72%", maxWidth: "none", height: "auto", filter: "brightness(0) invert(0.93) sepia(0.1)" }} />
        </span>
        <nav data-v2="footer-links" style={{ display: "flex", flexWrap: "wrap", gap: "2px 32px" }}>
          {fl("work", "Work")}{fl("about", "About")}{fl("contact", "Contact")}{fl("partners", "Partners")}
        </nav>
        <Socials size={24} />
      </div>
    </footer>
  );
}
window.V2Footer = V2Footer;
