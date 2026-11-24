/* global React */
function V2Form({ fields, cta }) {
  const [sent, setSent] = React.useState(false);
  if (sent) return <div style={{ fontFamily: "var(--v2-serif)", fontWeight: 600, fontStyle: "italic", fontSize: "28px" }}>Got it. We'll be in touch.</div>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0,1fr))", gap: "28px 32px", maxWidth: "900px" }}>
      {fields.map(([label, wide]) => (
        <label key={label} style={{ gridColumn: wide ? "1 / -1" : "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
          <span style={{ ...window.V2.label, fontSize: "11px", color: "var(--v2-dim)" , letterSpacing: "-0.05em" }}>{label}</span>
          {wide ? <textarea rows="3" className="v2-field"></textarea> : <input className="v2-field" />}
        </label>
      ))}
      <div><button type="submit" className="v2-pill">{cta}</button></div>
    </form>
  );
}
window.V2Form = V2Form;

// HubSpot form (new embed). The page is built client-side, so the embed script is
// re-run each time the form mounts; it scans for .hs-form-frame and fills it in.
// newsletter: set to the HubSpot newsletter form ID to switch the placeholder to the live form.
const HS = { newsletter: "ff476661-959f-4cff-924a-33e48ac211bf", src: "https://js-na2.hsforms.net/forms/embed/247805217.js", region: "na2", portalId: "247805217", formId: "41719489-9ffd-4c31-90de-3c39f7544393", project: "de510ee1-9a5f-4330-b8dd-117ea9f661ad", contractors: "b7a5f623-ccbb-4f22-8a7d-89fa51251595" };
function V2HubSpotForm({ formId }) {
  React.useEffect(() => {
    document.querySelectorAll('script[data-v2-hs]').forEach((s) => s.remove());
    const s = document.createElement("script");
    s.src = HS.src; s.defer = true; s.setAttribute("data-v2-hs", "");
    document.body.appendChild(s);
  }, []);
  return (
    <div data-v2="hubspot" style={{ maxWidth: "900px", background: "var(--v2-white, #F4F2EC)", borderRadius: "16px", padding: "28px 28px 12px", color: "#111" }}>
      <div className="hs-form-frame" data-region={HS.region} data-form-id={formId || HS.formId} data-portal-id={HS.portalId}></div>
    </div>
  );
}
window.V2HubSpotForm = V2HubSpotForm;

function V2Contact({ onNav }) {
  const V2 = window.V2;
  const { BoMark } = window.AkimboCreativeHausDesignSystem_10a51d;
  const [ask, setAsk] = React.useState(() => { const o = !!window.__v2OpenAsk; window.__v2OpenAsk = false; return o; });
  const [news, setNews] = React.useState(false);
  const [meet, setMeet] = React.useState(false);
  const [footH, setFootH] = React.useState(0);
  React.useEffect(() => {
    const measure = () => { const f = document.querySelector("#v2-root footer"); if (f) setFootH(Math.round(f.getBoundingClientRect().height)); };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400);
    return () => { window.removeEventListener("resize", measure); clearTimeout(t); };
  }, []);
  return (
    <div data-v2="contact-page" style={{ boxSizing: "border-box", minHeight: ask ? "auto" : "calc(100vh - " + footH + "px)", padding: "150px 40px 40px", display: "flex", flexDirection: "column", gap: "48px" }}>
      <div data-v2="contact-head" style={{ flex: ask ? "none" : 1, minHeight: "280px", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,0.8fr)", alignItems: "stretch", gap: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
          <h1 style={{ margin: 0, fontFamily: V2.serif, fontWeight: 600, fontSize: "clamp(48px, 7vw, 104px)", lineHeight: 0.96, letterSpacing: "-0.025em" }}>Get in touch.</h1>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "20px 40px" }}>
            <a href="#" onClick={(e) => { e.preventDefault(); setNews(false); setMeet(false); setAsk(!ask); }} className={"v2-pill" + (ask ? " v2-pill-on" : "")}>Start a project</a>
            <a href="/book" onClick={(e) => { e.preventDefault(); setAsk(false); setNews(false); setMeet(!meet); }} className={"v2-pill" + (meet ? " v2-pill-on" : "")}>Schedule meeting</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setAsk(false); setMeet(false); setNews(!news); }} className={"v2-pill" + (news ? " v2-pill-on" : "")}>Join our newsletter</a>
          </div>
          <div data-v2="contact-email" style={{ paddingTop: "12px" }}><window.V2CopyEmail size={24} /></div>
        </div>
        <div data-v2="contact-bo" style={{ position: "relative", minHeight: "1px", marginRight: "clamp(24px, 4vw, 72px)" }}>
          <div aria-label="Bo riding a bike" role="img" style={{ position: "absolute", bottom: 0, right: 0, height: "141.7%", width: "auto", aspectRatio: "16 / 9", maxWidth: "167%", transform: "translate(25.6%, -2%)", isolation: "isolate", mixBlendMode: "lighten", pointerEvents: "none" }}>
            <video ref={(el) => { if (el) { el.muted = true; el.defaultMuted = true; } }} src="assets/bo-bike-white.mp4?v=1080" autoPlay loop muted playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "right bottom", display: "block", filter: "sepia(0.08) brightness(0.957)" }}></video>
          </div>
        </div>
      </div>
      {ask && <V2HubSpotForm />}
      {meet && <V2Meetings />}
      {news && (HS.newsletter ? <V2HubSpotForm formId={HS.newsletter} /> : <div data-v2="newsletter-slot" style={{ maxWidth: "720px", padding: "28px 32px", border: "1px dashed var(--v2-line)", borderRadius: "14px", color: "var(--v2-dim-strong)", fontSize: "15px" }}>Newsletter sign-up form goes here.</div>)}
      <div data-v2="contractor-line" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "24px", borderTop: "1px solid var(--v2-line)", paddingTop: "28px" }}>
        <p style={{ margin: 0, maxWidth: "620px", fontFamily: V2.serif, fontWeight: 600, fontSize: "24px", lineHeight: 1.25 }}>Freelancer, partner agency, the most talented person in your room? <br data-v2="br-desk" /><em>Drop your work.</em></p>
        <window.V2Pill href="/partners" onClick={(e) => { e.preventDefault(); onNav("partners"); }}>Contractors and partners ↗</window.V2Pill>
      </div>
    </div>
  );
}
window.V2Contact = V2Contact;

function V2Partners() {
  const V2 = window.V2;
  return (
    <div style={{ padding: "170px 40px 120px", display: "flex", flexDirection: "column", gap: "48px" }}>
      <h1 style={{ margin: 0, maxWidth: "1000px", fontFamily: V2.serif, fontWeight: 600, fontSize: "clamp(44px, 6vw, 92px)", lineHeight: 0.98, letterSpacing: "-0.025em" }}>We're always looking for the most talented <em>freelancers and partners</em>.</h1>
      <p style={{ margin: 0, maxWidth: "560px", fontSize: "17px", lineHeight: 1.55, color: "var(--v2-dim-strong)" }}>Drop your work and we'll bring you in when a project fits.</p>
      <V2HubSpotForm formId={HS.contractors} />
    </div>
  );
}
window.V2Partners = V2Partners;

// HubSpot Meetings scheduler. The embed script only scans the page once on load,
// so the container is rebuilt and the script re-run each time this page mounts.
const HS_MEETINGS = "https://meetings-na2.hubspot.com/nash-pearson/akimbo-intro-call?embed=true";
function V2Meetings() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current; if (!host) return;
    host.innerHTML = "";
    const box = document.createElement("div");
    box.className = "meetings-iframe-container";
    box.setAttribute("data-src", HS_MEETINGS);
    host.appendChild(box);
    const s = document.createElement("script");
    s.src = "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    s.async = true;
    host.appendChild(s);
    return () => { host.innerHTML = ""; };
  }, []);
  return <div ref={ref} data-v2="meetings" style={{ width: "100%", maxWidth: "1000px", minHeight: "680px", borderRadius: "14px", overflow: "hidden", background: "#F4F2EC" }} />;
}
function V2Book() {
  const V2 = window.V2;
  return (
    <div style={{ padding: "170px 40px 120px", display: "flex", flexDirection: "column", gap: "48px" }}>
      <h1 style={{ margin: 0, maxWidth: "1000px", fontFamily: V2.serif, fontWeight: 600, fontSize: "clamp(44px, 6vw, 92px)", lineHeight: 0.98, letterSpacing: "-0.025em" }}>Let's talk about <em>what you're making</em>.</h1>
      <p style={{ margin: 0, maxWidth: "560px", fontSize: "17px", lineHeight: 1.55, color: "var(--v2-dim-strong)" }}>Pick a time that works and we'll walk through the project together.</p>
      <V2Meetings />
    </div>
  );
}
window.V2Book = V2Book;
