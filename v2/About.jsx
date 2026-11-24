/* global React */
const SHOW_TEAM = false; // "Our team" is parked for now
function V2About({ onNav }) {
  const V2 = window.V2;
  const team = (window.AKIMBO_TEAM || []).filter((m) => m.name !== "BO");
  const [open, setOpen] = React.useState(null);
  return (
    <div>
      <section data-v2="about-head" style={{ padding: "180px 40px 110px", display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr)", gap: "48px", alignItems: "start" }}>
        <h1 style={{ margin: "-0.1em 0 0", fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontStyle: "normal", fontWeight: 400, fontSize: "clamp(48px, 7.4vw, 120px)", lineHeight: 0.96, letterSpacing: "-0.025em", color: "var(--v2-fg)" }}>It's a <em style={{ fontFamily: V2.serif, fontStyle: "italic", fontWeight: 600, color: "var(--v2-red)" }}>great</em> day to<br data-v2="br-desk" /> be <em style={{ fontFamily: V2.serif, fontStyle: "italic", fontWeight: 600, color: "var(--v2-red)" }}>great</em><span style={{ color: "var(--v2-red)" }}>.</span></h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "520px" }}>
          <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.55, color: "var(--v2-dim-strong)" }}>Akimbo was founded on the premise that caring deeply about the work breeds the best results. period.</p>
          <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.55, color: "var(--v2-dim-strong)" }}>So we built a team of not just the most talented and hard working individuals - but the ones who care the most, too. With bases and teams on both the West and East coasts, we're set up to support.</p>
          <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.55, color: "var(--v2-dim-strong)" }}>Working with Akimbo not only means gaining an incredible support system of experienced specialists who will help elevate your project to the next level. It also means you'll leave the project with new lifelong friends who are invested in the success of your business.</p>
          <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.55, color: "var(--v2-dim-strong)" }}>If you're interested in working with us, we'd love to have you; we can already tell.</p>
        </div>
      </section>

      {SHOW_TEAM && (<React.Fragment>
      <section style={{ padding: "0 40px 120px" }}>
        <div style={{ ...V2.label, color: "var(--v2-dim)", marginBottom: "28px" , letterSpacing: "-0.05em" }}>Our team</div>
        <div data-v2="team" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: "36px 16px" }}>
          {team.map((m) => (
            <button key={m.name} onClick={() => setOpen(open === m.name ? null : m.name)} style={{ all: "unset", cursor: "pointer", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ aspectRatio: "1 / 1", background: "#1A1918", overflow: "hidden" }}>
                <image-slot id={"v2-head-" + m.name} placeholder="Drawn headshot" style={{ width: "100%", height: "100%", display: "block" }}></image-slot>
              </div>
              <div style={{ fontFamily: V2.serif, fontWeight: 600, fontSize: "22px", lineHeight: 1.1, textTransform: "capitalize" }}>{m.name.toLowerCase()}</div>
              <div style={{ ...V2.label, fontSize: "11px", color: "var(--v2-dim)" , letterSpacing: "-0.05em" }}>{m.role}</div>
              {open === m.name && <div style={{ fontSize: "14.5px", lineHeight: 1.5, color: "var(--v2-dim-strong)" }}>{m.bio || "Short bio coming after the headshot round."}</div>}
            </button>
          ))}
        </div>
      </section>
      </React.Fragment>)}

      <section data-v2="about-photo" style={{ padding: "0 40px" }}>
        <div style={{ aspectRatio: "21 / 9", overflow: "hidden", borderRadius: "10px", background: "#1A1918" }}>
          <img src="assets/events-hero.jpg" alt="Nash and CJ in front of the Akimbo sign" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 48%", display: "block" }} />
        </div>
      </section>

      <section data-v2="join" style={{ padding: "120px 40px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "28px" }}>
        <h2 style={{ margin: 0, fontFamily: V2.serif, fontWeight: 600, fontStyle: "italic", fontSize: "clamp(32px, 4vw, 56px)", lineHeight: 1 }}>Interested in joining the team?</h2>
        <window.V2Pill href="/partners" onClick={(e) => { e.preventDefault(); onNav("partners"); }}>Contractors and partners ↗</window.V2Pill>
      </section>
    </div>
  );
}
window.V2About = V2About;
