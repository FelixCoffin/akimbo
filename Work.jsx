/* global React */
// Unified project list: case studies + events + placeholders. Tags describe, filters sort.
(function () {
  const W = window.AKIMBO_WORK || [], E = window.AKIMBO_EVENTS || [];
  const w = (id) => W.find((x) => x.id === id) || {};
  const e = (id) => E.find((x) => x.id === id) || {};
  window.V2_WORK = [
    { id: "somethings", video: "assets/v2-hovers/somethings.mp4", homeVpos: "50% 30%", kind: "project", client: "Somethings", project: "We're here for you", cats: ["commercial", "design"], tags: ["Creative Direction", "Production", "Videography", "Editing", "Post"], img: "assets/v2-thumbs/somethings.jpg?v=1", pos: "50% 30%" },
    { id: "worldcup", kind: "detail", client: "Mfused", project: "World Cup campaign", cats: ["commercial", "design"], tags: ["Creative Direction", "Production", "3D"], img: "assets/v2-thumbs/worldcup.jpg", video: w("worldcup").hoverVideo },
    { id: "europe-tour", kind: "event", client: "Macklemore", project: "Europe tour", cats: ["events", "music", "design"], tags: ["Production", "Photography", "Social"], img: e("europe-tour").poster, pos: e("europe-tour").posterPosition, video: e("europe-tour").hoverVideo },
    { id: "soundcu", kind: "detail", client: "Sound Credit Union", project: "Member stories", cats: ["commercial"], tags: ["Production", "Editing", "Color"], img: "assets/v2-thumbs/soundcu.jpg", video: w("soundcu").hoverVideo },
    { id: "tmobile", video: "assets/v2-hovers/tmobile.mp4", homeVpos: "50% 38%", kind: "project", img: "assets/v2-thumbs/tmobile.jpg", pos: "50% 42%", client: "T-Mobile", project: "Club Magenta at Watershed", cats: ["commercial", "events", "music"], tags: ["Event Coverage", "Artist Films", "Next-Day Edits"] },
    { id: "hamptons-activation", kind: "project", client: "Heavensake", project: "Prestige III at Sushi Noz", cats: ["events"], tags: ["Photography", "Content Capture", "Videography", "Post Production"], img: "assets/v2-projects/heavensake/noz2-54.jpg", pos: "50% 30%", video: "assets/v2-projects/heavensake/heavensake_sushi-noz_final-V6_1080x1920_web.mp4" },
    { id: "grand-street-pizza", kind: "project", img: "assets/v2-projects/gsp/gsp_photo-cheers.jpg", pos: "50% 40%", video: "assets/v2-projects/gsp/gsp_loop_short-1_9x16.mp4", client: "Grand Street Pizza", project: "Grand Street Pizza is for everyone", cats: ["commercial"], tags: ["Creative Direction", "Content Strategy", "Production"] },
    { id: "tina-kotek", video: "assets/v2-hovers/kotek.mp4", kind: "project", img: "assets/v2-thumbs/kotek.jpg?v=3", pos: "50% 34%", client: "Governor Tina Kotek", project: "Reelection commercial series", cats: ["social-issues"], tags: ["Scriptwriting", "Directing", "Production", "Post"] },
    { id: "suncadia", video: "assets/v2-hovers/suncadia.mp4", kind: "project", img: "assets/v2-thumbs/suncadia-aerial.jpg", pos: "45% 60%", client: "Suncadia", project: "Retail village film series", cats: ["commercial"], tags: ["Content Capture", "Editing", "Seasonal Updates"] },
    { id: "lesly-munoz", img: "assets/v2-projects/munoz/cover.jpg", pos: "55% 40%", video: "assets/v2-hovers/munoz.mp4", kind: "project", client: "Rep. Lesly Muñoz", project: "Campaign hero commercial", cats: ["social-issues"], tags: ["Creative Direction", "Production", "Post"] },
    { id: "common-formme", img: "assets/v2-thumbs/common-formme.jpg", pos: "50% 50%", video: "assets/v2-hovers/common-formme.mp4", kind: "project", client: "Common Formme", project: "Brand film", cats: [], tags: ["Brand Identity", "Motion Graphics"] },
    { id: "katie-wilson", kind: "project", img: "assets/v2-thumbs/katie-wilson-kid.jpg", pos: "50% 55%", client: "Mayor Katie Wilson", video: "assets/v2-projects/wilson/wilson_loop-2_9x16.mp4", project: "Campaign commercial", cats: ["social-issues"], tags: ["Creative Direction", "Casting", "Production"] },
    { id: "somethings-nashville", kind: "event", client: "Somethings x BHT", project: "Behavioral Tech Conference", cats: ["events"], tags: ["Production", "Photography", "Social", "Content Capture"], img: e("somethings-nashville").poster, pos: "50% 20%", video: e("somethings-nashville").hoverVideo },
    { id: "summer-bash", kind: "event", client: "AI Tinkerers", project: "Summer Bash", cats: ["events"], tags: ["Production", "Photo & Video", "Social", "Content Capture"], img: e("summer-bash").poster, pos: e("summer-bash").posterPosition, video: e("summer-bash").hoverVideo },
    { id: "pride-weekend", video: "assets/v2-hovers/pride-weekend.mp4", kind: "event", client: "W Seattle", project: "Pride weekend", cats: ["events"], tags: ["Production", "Editing", "Social"], img: "assets/v2-thumbs/pride.jpg", pos: e("pride-weekend").posterPosition, video: e("pride-weekend").hoverVideo },
    { id: "junior-achievement", video: "assets/v2-hovers/junior-achievement.mp4", kind: "event", client: "Sound CU x Junior Achievement", project: "Junior Achievement", cats: ["events"], tags: ["Production", "Videography", "Editing"], img: e("junior-achievement").poster, video: e("junior-achievement").hoverVideo },
  ];
  window.V2_FILTERS = [["all", "All"], ["commercial", "Commercial"], ["events", "Events"], ["social-issues", "Social Issues"], ["music", "Music"], ["design", "Design"]];
})();

// Home tile: image fills the frame, one small line with the client; on hover the clip plays, a fade rises and the work areas appear.
function V2Tile({ item, onOpen, fill }) {
  const vid = React.useRef(null);
  const [src, setSrc] = React.useState(null);
  const enter = () => { if (item.video) { setSrc(item.video); setTimeout(() => { const v = vid.current; if (v) { v.muted = true; v.play().catch(() => {}); } }, 30); } };
  const leave = () => { const v = vid.current; if (v) v.pause(); };
  // Touch screens have no hover: the first tap plays the clip and shows the hover state, the second tap opens the project.
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const off = (e) => { if (e.detail !== item.id) { setOn(false); leave(); } };
    window.addEventListener("v2-tile-on", off);
    return () => window.removeEventListener("v2-tile-on", off);
  }, [item.id]);
  const tap = (e) => {
    const touch = window.matchMedia && window.matchMedia("(hover: none)").matches;
    if (touch && item.video && !on) { e.preventDefault(); setOn(true); enter(); window.dispatchEvent(new CustomEvent("v2-tile-on", { detail: item.id })); return; }
    onOpen && onOpen();
  };
  const live = item.kind !== "none";
  const sans = "var(--v2-sans)";
  return (
    <div className={"v2-tile v2-home-tile" + (live ? " v2-live" : "") + (on ? " v2-on" : "")} onMouseEnter={enter} onMouseLeave={leave} onClick={live ? tap : undefined} style={{ position: "relative", borderRadius: "clamp(12px, 1.4vw, 20px)", overflow: "hidden", isolation: "isolate", aspectRatio: fill ? "auto" : "3 / 4", height: fill ? "100%" : "auto", overflow: "hidden", background: "#1A1918", cursor: live ? "pointer" : "default" }}>
      {item.img
        ? <img src={item.img} alt={item.client + ": " + item.project} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: item.pos || "50% 50%" }} />
        : <image-slot id={"v2-tile-" + item.id} placeholder={item.client + " cover"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}></image-slot>}
      {src && <video ref={vid} src={src} loop muted playsInline className="v2-tile-vid" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: item.homeVpos || "50% 50%" }}></video>}
      <div className="v2-tile-fade" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,14,13,0.7) 0%, rgba(15,14,13,0.25) 30%, rgba(15,14,13,0) 50%)", pointerEvents: "none" }}></div>
      <div data-v2="tile-cap" style={{ position: "absolute", left: "clamp(20px, 2.6vw, 40px)", right: "clamp(20px, 2.6vw, 40px)", bottom: "clamp(20px, 2.6vw, 40px)", display: "flex", flexDirection: "column", gap: "6px", pointerEvents: "none" }}>
        <div data-v2="tile-name" style={{ fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontStyle: "normal", fontWeight: 400, fontSize: "clamp(28px, 2.8vw, 44px)", lineHeight: 0.95, letterSpacing: "-0.01em", color: "#F4F2EC" }}>{item.client}</div>
        <div className="v2-tile-tags" style={{ fontFamily: sans, fontWeight: 400, fontSize: "clamp(13px, 1.1vw, 16px)", letterSpacing: "-0.05em", textTransform: "uppercase", color: "rgba(244,242,236,0.82)" }}>{item.project}</div>
      </div>
    </div>
  );
}
window.V2Tile = V2Tile;

// Ghost Note-style card: media on top, tags then client and project set beneath it.
// Tags on a Work card stay on one line: trailing tags are dropped until the rest fit.
function V2TagLine({ tags }) {
  const ref = React.useRef(null);
  const [n, setN] = React.useState(tags.length);
  React.useLayoutEffect(() => {
    const el = ref.current; if (!el) return;
    const fit = () => {
      const meas = el.querySelector("[data-meas]"); if (!meas) return;
      const w = el.clientWidth; let k = tags.length;
      while (k > 1) { meas.textContent = tags.slice(0, k).join("  |  "); if (meas.scrollWidth <= w) break; k--; }
      setN(k);
    };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(el);
    return () => ro.disconnect();
  }, [tags.join("|")]);
  return (
    <div ref={ref} style={{ position: "relative", paddingTop: "2px", whiteSpace: "nowrap", overflow: "hidden" }}>
      {tags.slice(0, n).join("  |  ")}
      <span data-meas="" aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, visibility: "hidden", whiteSpace: "pre" }}></span>
    </div>
  );
}
function V2Card({ item, ratio, onOpen, small }) {
  const vid = React.useRef(null);
  const [src, setSrc] = React.useState(null);
  const live = item.kind !== "none";
  const enter = () => { if (item.video) { setSrc(item.video); setTimeout(() => { const v = vid.current; if (v) { v.muted = true; v.play().catch(() => {}); } }, 30); } };
  const leave = () => { const v = vid.current; if (v) v.pause(); };
  // Touch screens have no hover: the first tap plays the clip and shows the hover state, the second tap opens the project.
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const off = (e) => { if (e.detail !== item.id) { setOn(false); leave(); } };
    window.addEventListener("v2-tile-on", off);
    return () => window.removeEventListener("v2-tile-on", off);
  }, [item.id]);
  const tap = (e) => {
    const touch = window.matchMedia && window.matchMedia("(hover: none)").matches;
    if (touch && item.video && !on) { e.preventDefault(); setOn(true); enter(); window.dispatchEvent(new CustomEvent("v2-tile-on", { detail: item.id })); return; }
    onOpen && onOpen();
  };
  const sans = "var(--v2-sans)";
  return (
    <div className={"v2-tile v2-home-tile v2-card" + (live ? " v2-live" : "") + (on ? " v2-on" : "")} onMouseEnter={enter} onMouseLeave={leave} onClick={live ? tap : undefined}
      style={{ position: "relative", aspectRatio: ratio, overflow: "hidden", borderRadius: small ? "10px" : "14px", background: "#1A1918", cursor: live ? "pointer" : "default" }}>
      {item.img
        ? <img src={item.img} alt={item.client + ": " + item.project} loading="lazy" decoding="async" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: item.pos || "50% 50%" }} />
        : <image-slot id={"v2-tile-" + item.id} placeholder={item.client + " cover"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}></image-slot>}
      {src && <video ref={vid} src={src} loop muted playsInline className="v2-tile-vid" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}></video>}
      <div className="v2-tile-fade" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,14,13,0.82) 0%, rgba(15,14,13,0.25) 38%, rgba(15,14,13,0) 60%)", pointerEvents: "none" }}></div>
      <div style={{ position: "absolute", left: "24px", right: "24px", bottom: "24px", display: "flex", flexDirection: "column", pointerEvents: "none" }}>
        <div data-v2="card-name" style={{ fontFamily: "\"V2 Serif Roman\", var(--v2-serif)", fontWeight: 400, fontStyle: "normal", fontSize: small ? "30px" : "clamp(34px, 3.6vw, 58px)", lineHeight: 1.02, letterSpacing: "-0.01em", color: "var(--v2-fg)" }}>{item.client}</div>
        <div className="v2-tile-tags" style={{ fontFamily: "var(--v2-sans)", fontWeight: 400, fontSize: "12px", lineHeight: 1.5, letterSpacing: "-0.05em", textTransform: "uppercase", color: "var(--v2-fg)" }}>
          <div style={{ paddingTop: "10px", fontWeight: 700 }}>{item.project}</div>
          <V2TagLine tags={item.tags} />
        </div>
      </div>
    </div>
  );
}
window.V2Card = V2Card;

function V2Work({ filter, setFilter, openItem }) {
  const V2 = window.V2;
  const list = window.V2_WORK.filter((w) => filter === "all" || w.cats.includes(filter));
  const featured = list.filter((w) => w.kind !== "none");
  const archive = list.filter((w) => w.kind === "none");
  const [more, setMore] = React.useState(false);
  const shownArchive = more ? archive : archive.slice(0, 6);
  return (
    <div style={{ paddingTop: "190px" }}>
      <h1 style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>Work by Akimbo Creative Haus</h1>
      <div data-v2="filters" style={{ display: "flex", flexWrap: "wrap", gap: "10px", padding: "0 56px 48px" }}>
        {window.V2_FILTERS.map(([id, label]) => (
          <a key={id} href={id === "all" ? "/work" : "/work/" + id} onClick={(e) => { e.preventDefault(); setFilter(id); }} className={"v2-pill v2-filter" + (filter === id ? " v2-pill-on" : "")}>{label}</a>
        ))}
      </div>

      {/* featured: strict three-column grid, every card the same size */}
      <div data-v2="featured" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "28px", padding: "0 56px" }}>
        {featured.map((w) => (
          <V2Card key={w.id} item={w} ratio="2 / 3" small onOpen={() => openItem(w)} />
        ))}
      </div>

      {archive.length > 0 && (
        <section style={{ padding: "140px 56px 40px" }}>
          <h2 style={{ margin: "0 0 40px", fontFamily: V2.serif, fontWeight: 600, fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1, letterSpacing: "-0.02em" }}>Work archive</h2>
          <div data-v2="archive" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: "28px" }}>
            {shownArchive.map((w) => <V2Card key={w.id} item={w} ratio="2 / 3" small onOpen={() => openItem(w)} />)}
          </div>
          {archive.length > 6 && !more && (
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "56px" }}>
              <a href="#" onClick={(e) => { e.preventDefault(); setMore(true); }} className="v2-pill">Show more</a>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
window.V2Work = V2Work;
