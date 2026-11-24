(function () {
  var did = false;
  function tx() { if (!did && window.Babel && window.Babel.transformScriptTags) { did = true; try { window.Babel.transformScriptTags(); } catch (e) { console.error(e); } } }
  function mount() {
    tx();
    var el = document.getElementById("v2-root");
    var ok = el && window.React && window.ReactDOM && window.AkimboCreativeHausDesignSystem_10a51d && window.AkimboCreativeHausDesignSystem_10a51d.BoMark
      && window.V2Nav && window.V2Footer && window.V2Home && window.V2Work && window.V2About && window.V2Contact && window.V2Partners && window.V2Book && window.WorkDetail && window.EventDetail && window.V2Project && window.V2_PROJECTS;
    if (!ok) { requestAnimationFrame(mount); return; }
    var h = window.React.createElement;
    var FILTERS = ["commercial", "events", "social-issues", "music", "design"];
    var SLUGS = { worldcup: "super-fog-world-cup", soundcu: "sound-credit-union", somethings: "somethings" };
    var LIVE = !/\/serve\//.test(location.pathname) && location.protocol !== "file:";
    function toPath(r) {
      if (r.name === "home") return "/";
      if (r.name === "work") return r.filter && r.filter !== "all" ? "/work/" + r.filter : "/work";
      if (r.name === "detail") return "/work/" + (SLUGS[r.id] || r.id);
      if (r.name === "project") return "/work/" + r.id;
      if (r.name === "eventdetail") return "/events/" + r.id;
      return "/" + r.name;
    }
    window.V2_PATH = function (r) { return toPath(r); };
    document.documentElement.lang = "en";
    function fromPath(p) {
      p = (p || "/").replace(/\/+$/, "") || "/";
      var m = p.match(/^\/work\/([^/]+)$/);
      if (m) {
        if (FILTERS.indexOf(m[1]) >= 0) return { name: "work", filter: m[1] };
        if (window.V2_PROJECTS && window.V2_PROJECTS[m[1]]) return { name: "project", id: m[1] };
        var id = Object.keys(SLUGS).find(function (k) { return SLUGS[k] === m[1]; }) || m[1];
        return { name: "detail", id: id };
      }
      m = p.match(/^\/events\/([^/]+)$/);
      if (m) return { name: "eventdetail", id: m[1] };
      var n = p.slice(1) || "home";
      return { name: ["work", "about", "contact", "partners", "book"].indexOf(n) >= 0 ? n : "home", filter: "all" };
    }
    function App() {
      var s = window.React.useState(function () { return window.V2_START || (LIVE ? fromPath(location.pathname) : { name: "home" }); });
      var route = s[0], setState = s[1];
      var go = function (r) { setState(r); if (LIVE) history.pushState(null, "", toPath(r)); window.scrollTo(0, 0); };
      window.React.useEffect(function () {
        if (!LIVE) return;
        var f = function () { setState(fromPath(location.pathname)); };
        window.addEventListener("popstate", f); return function () { window.removeEventListener("popstate", f); };
      }, []);
      window.React.useEffect(function () {
        var c = function (e) { var t = e.target.closest && e.target.closest('a[href="#book-a-call"]'); if (t) { e.preventDefault(); go({ name: "book", filter: "all" }); } };
        document.addEventListener("click", c); return function () { document.removeEventListener("click", c); };
      }, []);
      // Per-page meta: title, description, Open Graph, Twitter, canonical. Updated on every route change.
      window.React.useEffect(function () {
        var SITE = "Akimbo Creative Haus", DEF_DESC = "Intentional human-led creative, production, and post that move people and brands forward. Seattle + NYC.";
        var DEF_IMG = "assets/events-hero.jpg";
        var clip = function (t) { t = String(t || "").replace(/\s+/g, " ").trim(); return t.length > 155 ? t.slice(0, 152).replace(/\s+\S*$/, "") + "..." : t; };
        var abs = function (u) { try { return new URL(u, location.origin + "/").href; } catch (e) { return u; } };
        var title = SITE + " | Seattle + NYC", desc = DEF_DESC, img = DEF_IMG;
        var work = (window.V2_WORK || []).find(function (w) { return w.id === route.id; });
        if (route.name === "work") { title = "Work | " + SITE; desc = "Commercials, brand films, music, events and campaigns from Akimbo Creative Haus. Seattle + NYC."; }
        else if (route.name === "about") { title = "About | " + SITE; desc = "Akimbo was founded on the premise that caring deeply about the work breeds the best results. A Seattle + NYC creative production studio."; }
        else if (route.name === "contact") { title = "Contact | " + SITE; desc = "Got something big coming up? Start a project or schedule a meeting with Akimbo Creative Haus in Seattle and New York."; }
        else if (route.name === "partners") { title = "Partners | " + SITE; }
        else if (route.name === "book") { title = "Schedule a meeting | " + SITE; desc = "Pick a time to talk through your project with the Akimbo team."; }
        else if (route.name === "project") {
          var pr = (window.V2_PROJECTS || {})[route.id] || {};
          var intro = (pr.blocks || []).find(function (b) { return b.t === "intro"; }) || {};
          var hero = (pr.blocks || []).find(function (b) { return b.t === "hero" && b.img; });
          title = (pr.client ? pr.client + ": " : "") + (pr.title || "") + " | " + SITE;
          desc = clip(intro.text || (intro.paras || [])[0]) || DEF_DESC;
          img = (work && work.img) || (hero && hero.img) || DEF_IMG;
        } else if (route.name === "eventdetail") {
          var ev = (window.AKIMBO_EVENTS || []).find(function (e) { return e.id === route.id; }) || {};
          title = (ev.meta ? ev.meta + ": " : "") + (ev.title || "") + " | " + SITE;
          desc = clip(ev.body || ev.goal || ev.lead) || DEF_DESC;
          img = (work && work.img) || ev.poster || ev.headerImg || DEF_IMG;
        } else if (route.name === "detail") {
          var d = (window.AKIMBO_WORK || []).find(function (x) { return x.id === route.id; }) || {};
          title = (d.client ? d.client + ": " : "") + (work ? work.project : d.title || "") + " | " + SITE;
          desc = clip(d.lead || d.blurb) || DEF_DESC;
          img = (work && work.img) || d.heroImg || d.img || DEF_IMG;
        }
        var url = location.origin + location.pathname;
        document.title = title;
        var set = function (attr, key, val) { var el = document.head.querySelector("meta[" + attr + '="' + key + '"]'); if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); } el.setAttribute("content", val); };
        set("name", "description", desc);
        set("property", "og:type", "website"); set("property", "og:site_name", SITE);
        set("property", "og:title", title); set("property", "og:description", desc);
        set("property", "og:image", abs(img)); set("property", "og:url", url);
        set("name", "twitter:card", "summary_large_image"); set("name", "twitter:title", title);
        set("name", "twitter:description", desc); set("name", "twitter:image", abs(img));
        var can = document.head.querySelector('link[rel="canonical"]'); if (!can) { can = document.createElement("link"); can.rel = "canonical"; document.head.appendChild(can); } can.href = url;
      }, [route.name, route.id, route.filter]);
      var nav = function (id) { go({ name: id, filter: "all" }); };
      var openItem = function (w) {
        if (window.V2_PROJECTS[w.id]) go({ name: "project", id: w.id });
        else if (w.kind === "detail") go({ name: "detail", id: w.id });
        else if (w.kind === "event") go({ name: "eventdetail", id: w.id });
      };
      var current = route.name === "detail" || route.name === "eventdetail" || route.name === "project" ? "work" : route.name;
      var kids = [h(window.V2Nav, { key: "nav", current: current, onNav: nav })];
      var main;
      if (route.name === "home") main = h(window.V2Home, { onNav: nav, openItem: openItem });
      else if (route.name === "work") main = h(window.V2Work, { filter: route.filter || "all", setFilter: function (f) { go({ name: "work", filter: f }); }, openItem: openItem });
      else if (route.name === "about") main = h(window.V2About, { onNav: nav });
      else if (route.name === "contact") main = h(window.V2Contact, { onNav: nav });
      else if (route.name === "partners") main = h(window.V2Partners, {});
      else if (route.name === "book") main = h(window.V2Book, {});
      else if (route.name === "detail") main = h(window.WorkDetail, { id: route.id, onNav: nav, onOpen: function (id) { go({ name: "detail", id: id }); } });
      else if (route.name === "project") main = h(window.V2Project, { id: route.id, onOpen: function (id) { go({ name: "project", id: id }); } });
      else if (route.name === "eventdetail") main = h(window.EventDetail, { id: route.id, onNav: function (id) { nav(id === "events" ? "work" : id); }, onOpen: function (id) { go({ name: "eventdetail", id: id }); } });
      kids.push(h("main", { key: "main" + route.name + (route.id || "") + (route.filter || "") }, main));
      if (route.name !== "contact" && route.name !== "partners" && route.name !== "book") kids.push(h(window.V2Connect, { key: "cta", cta: { label: "Start a project", onClick: function () { window.__v2OpenAsk = true; nav("contact"); } }, title: route.name === "home" ? "Got something big coming up?" : route.name === "eventdetail" ? "Got an event coming up?" : "Have a project idea?", noRule: route.name === "work", withBo: route.name === "home" ? "bike" : route.name === "about" || route.name === "work" || route.name === "detail" || route.name === "eventdetail" || route.name === "project" ? "sitting" : false }));
      kids.push(h(window.V2Footer, { key: "foot", onNav: nav }));
      return h(window.React.Fragment, null, kids);
    }
    if (el.__v2root) return;
    el.__v2root = window.ReactDOM.createRoot(el);
    el.__v2root.render(h(App));
  }
  mount();
})();
