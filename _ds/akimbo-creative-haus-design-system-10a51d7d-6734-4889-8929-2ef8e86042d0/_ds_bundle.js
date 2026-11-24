/* @ds-bundle: {"format":4,"namespace":"AkimboCreativeHausDesignSystem_10a51d","components":[{"name":"BoMark","sourcePath":"components/brand/BoMark.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"OvalKicker","sourcePath":"components/brand/OvalKicker.jsx"},{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"Card","sourcePath":"components/cards/Card.jsx"},{"name":"Tag","sourcePath":"components/cards/Tag.jsx"},{"name":"ContentCard","sourcePath":"components/deck/ContentCard.jsx"},{"name":"DeckContent","sourcePath":"components/deck/DeckContent.jsx"},{"name":"DeckCover","sourcePath":"components/deck/DeckCover.jsx"},{"name":"DeckDivider","sourcePath":"components/deck/DeckDivider.jsx"},{"name":"DeckSlide","sourcePath":"components/deck/DeckSlide.jsx"},{"name":"PageTab","sourcePath":"components/deck/PageTab.jsx"},{"name":"StatCard","sourcePath":"components/deck/StatCard.jsx"},{"name":"BulletList","sourcePath":"components/doc/BulletList.jsx"},{"name":"DocFooter","sourcePath":"components/doc/DocFooter.jsx"},{"name":"DocHeader","sourcePath":"components/doc/DocHeader.jsx"},{"name":"DocTitle","sourcePath":"components/doc/DocTitle.jsx"},{"name":"LabelValue","sourcePath":"components/doc/LabelValue.jsx"},{"name":"StatBlock","sourcePath":"components/doc/StatBlock.jsx"},{"name":"Box","sourcePath":"components/layout/Box.jsx"},{"name":"SectionLabel","sourcePath":"components/layout/SectionLabel.jsx"}],"sourceHashes":{"components/brand/BoMark.jsx":"af20fcbd280d","components/brand/Logo.jsx":"3809937ecc1e","components/brand/OvalKicker.jsx":"1d670fd0a031","components/buttons/Button.jsx":"46df239e88e5","components/cards/Card.jsx":"6576757a88cf","components/cards/Tag.jsx":"1b1c227eb476","components/deck/ContentCard.jsx":"361d73906df3","components/deck/DeckContent.jsx":"4b87b7891b70","components/deck/DeckCover.jsx":"7683cb08f8b2","components/deck/DeckDivider.jsx":"2166d949cf32","components/deck/DeckSlide.jsx":"cdee2dea1e1e","components/deck/PageTab.jsx":"233e973d22c2","components/deck/StatCard.jsx":"d05d25c6f3e3","components/doc/BulletList.jsx":"77237bde5f89","components/doc/DocFooter.jsx":"f96b95c275c6","components/doc/DocHeader.jsx":"c7b2fb2a185d","components/doc/DocTitle.jsx":"e49e04bdf971","components/doc/LabelValue.jsx":"758d24a1d59c","components/doc/StatBlock.jsx":"052e5232febf","components/layout/Box.jsx":"339aa27e8a5f","components/layout/SectionLabel.jsx":"c39ac2cc66f1"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AkimboCreativeHausDesignSystem_10a51d = window.AkimboCreativeHausDesignSystem_10a51d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/BoMark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * BoMark — Bo, the Akimbo mascot.
 * Usage rule: a different Bo per section, never repeated on a page, never decoration.
 *
 * BRANDING RULE: never place a dark-coloured Bo on a dark-coloured section
 * (near-black OR the brand red). Dark/red grounds must use the OUTLINED cream
 * Bo (`tone="cream"`) — the light line-art form. Solid fills (`red`, `black`
 * charcoal) are for light paper only. Every silhouette pose ships all three
 * (red, black, cream).
 *
 * COLOUR RULE: silhouette Bos are single-colour — red or charcoal on light,
 * cream outline on dark. `cherries` is the ONLY multi-colour Bo (red fruit +
 * green stems) and the ONLY place green appears; it is never recoloured.
 */
const POSE_FILE = {
  leaping: {
    files: {
      red: "bo-leaping-red.png",
      black: "bo-leaping-black.png",
      cream: "bo-leaping-cream.png"
    }
  },
  walking: {
    files: {
      red: "bo-walking-red.png",
      black: "bo-walking-black.png",
      cream: "bo-walking-cream.png"
    }
  },
  together: {
    files: {
      red: "bos-together-red.png",
      black: "bos-together-black.png",
      cream: "bos-together-cream.png"
    }
  },
  dual: {
    files: {
      red: "dual-bos-red.png",
      black: "dual-bos-black.png",
      cream: "dual-bos-cream.png"
    }
  },
  flag: {
    files: {
      red: "bo-flag-red.png",
      black: "bo-flag-black.png",
      cream: "bo-flag-cream.png"
    }
  },
  point: {
    files: {
      red: "bo-point-red.png",
      black: "bo-point-black.png",
      cream: "bo-point-cream.png"
    }
  },
  stand: {
    files: {
      red: "bo-stand-red.png",
      black: "bo-stand-black.png",
      cream: "bo-stand-cream.png"
    }
  },
  relax: {
    files: {
      red: "bo-relax-red.png",
      black: "bo-relax-black.png",
      cream: "bo-relax-cream.png"
    }
  },
  super: {
    files: {
      red: "bo-super-red.png",
      black: "bo-super-black.png",
      cream: "bo-super-cream.png"
    }
  },
  sitting: {
    files: {
      red: "bos-sitting-red.png",
      black: "bos-sitting-black.png",
      cream: "bos-sitting-cream.png"
    }
  },
  pointRight: {
    files: {
      cream: "bo-point-right-cream.png"
    }
  },
  // cherries — the only multi-colour Bo; never recoloured (red fruit, green stems).
  cherries: {
    fixed: true,
    files: {
      color: "bo-cherries.png"
    }
  }
};
function BoMark({
  pose = "leaping",
  tone = "red",
  size = 160,
  basePath = "assets/illustrations",
  style = {},
  alt,
  ...rest
}) {
  const def = POSE_FILE[pose] || POSE_FILE.leaping;
  // cherries is fixed multi-colour art — ignore tone entirely.
  const file = def.fixed ? def.files.color : def.files[tone] || def.files.red || def.files.cream || Object.values(def.files)[0];
  return /*#__PURE__*/React.createElement("img", _extends({
    src: `${basePath}/${file}`,
    alt: alt || `Bo (${pose})`,
    style: {
      display: "block",
      width: `${size}px`,
      height: "auto",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { BoMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/BoMark.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const WORDMARK_FILE = {
  wordmark: {
    red: "wordmark-red.png",
    green: "wordmark-green.png",
    black: "wordmark-black.png",
    cream: "wordmark-cream.png"
  },
  centered: {
    red: "wordmark-centered-red.png",
    green: "wordmark-centered-green.png",
    black: "wordmark-centered-black.png",
    cream: "wordmark-centered-cream.png"
  },
  offset: {
    red: "wordmark-offset-red.png",
    green: "wordmark-offset-green.png",
    black: "wordmark-offset-black.png",
    cream: "wordmark-offset-cream.png"
  }
};

/**
 * Logo — the Akimbo wordmark. The primary lockup is "wordmark" (the akimbo
 * script alone); "centered" and "offset" add CREATIVE HAUS and are SECONDARY —
 * reach for them only when the full company lockup is needed. A single wordmark
 * is ONE colour only; a dark mark on light paper is the default. Pick `tone` to
 * match the ground (cream on dark).
 */
function Logo({
  lockup = "wordmark",
  tone = "black",
  height = 40,
  basePath = "assets/logos",
  style = {},
  alt = "Akimbo Creative Haus",
  ...rest
}) {
  const set = WORDMARK_FILE[lockup] || WORDMARK_FILE.wordmark;
  const file = set[tone] || set.black;
  return /*#__PURE__*/React.createElement("img", _extends({
    src: `${basePath}/${file}`,
    alt: alt,
    style: {
      display: "inline-block",
      height: `${height}px`,
      width: "auto",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/OvalKicker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const INK = {
  red: "var(--akimbo-red)",
  cream: "var(--akimbo-cream)",
  black: "var(--akimbo-black)",
  green: "var(--akimbo-green)"
};

/**
 * OvalKicker — a short Regards-script phrase ringed by a hand-drawn oval.
 * The deck's signature "kicker" above a headline ("a bit about us…",
 * "what can you do for us?", "case study 01: yonny", "the big question…").
 * One colour, matched to the ground: red/black on cream, cream on dark/red.
 */
function OvalKicker({
  children,
  tone = "red",
  size = 30,
  tilt = -3,
  style = {},
  ...rest
}) {
  const col = INK[tone] || INK.red;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      position: "relative",
      display: "inline-block",
      padding: "0.42em 0.9em",
      fontFamily: "var(--font-display)",
      fontSize: `${size}px`,
      lineHeight: 1,
      color: col,
      whiteSpace: "nowrap",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    "aria-hidden": "true",
    viewBox: "0 0 100 100",
    preserveAspectRatio: "none",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      overflow: "visible",
      transform: `rotate(${tilt}deg)`
    }
  }, /*#__PURE__*/React.createElement("ellipse", {
    cx: "50",
    cy: "50",
    rx: "48",
    ry: "42",
    fill: "none",
    stroke: col,
    strokeWidth: "2",
    vectorEffect: "non-scaling-stroke"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative"
    }
  }, children));
}
Object.assign(__ds_scope, { OvalKicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/OvalKicker.jsx", error: String((e && e.message) || e) }); }

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the locked Akimbo pill. Always pill-radius, with a hard offset block
 * shadow. Buttons DARKEN on hover, never lighten. Label is Futura Bold, uppercase,
 * tracked. Optional trailing arrow for external / forward actions.
 *
 * variant: "primary" (red fill, light grounds) | "charcoal" (charcoal fill, light grounds)
 *          | "onDark" (cream outline, for dark surfaces)
 *          | "link" (inline text link with arrow, no pill)
 * On light/paper grounds use red or charcoal — never green.
 */
function Button({
  variant = "primary",
  as = "button",
  href,
  arrow = false,
  disabled = false,
  children,
  style = {},
  ...rest
}) {
  const Tag = href ? "a" : as;
  const label = {
    fontFamily: "var(--font-condensed)",
    fontWeight: 700,
    fontSize: "13px",
    letterSpacing: "var(--ls-label)",
    textTransform: "uppercase",
    textDecoration: "none",
    lineHeight: 1
  };
  if (variant === "link") {
    return /*#__PURE__*/React.createElement(Tag, _extends({
      href: href,
      className: "ak-btn ak-btn--link",
      style: {
        ...label,
        color: "var(--link)",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        ...style
      }
    }, rest), children, arrow && /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\u2192"));
  }
  const base = {
    ...label,
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "15px 30px",
    borderRadius: "var(--radius-pill)",
    border: "2px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "transform .15s ease, box-shadow .15s ease, background .15s ease",
    userSelect: "none"
  };
  const variants = {
    primary: {
      background: "var(--btn-primary-bg)",
      color: "var(--btn-primary-text)",
      boxShadow: disabled ? "none" : "var(--shadow-block)"
    },
    charcoal: {
      background: "var(--btn-charcoal)",
      color: "var(--btn-charcoal-text)",
      boxShadow: disabled ? "none" : "var(--shadow-block)"
    },
    onDark: {
      background: "transparent",
      color: "var(--akimbo-cream)",
      border: "2px solid var(--btn-on-dark-border)",
      boxShadow: "none"
    }
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    disabled: href ? undefined : disabled,
    className: `ak-btn ak-btn--${variant}`,
    style: {
      ...base,
      ...(variants[variant] || variants.primary),
      ...style
    }
  }, rest), children, arrow && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2197"));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/cards/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — a plain paper tile. Radius 10 (never pill), 1px warm border, subtle
 * shadow. Set `hover` for the gentle lift used in web grids.
 */
function Card({
  hover = false,
  as = "div",
  href,
  children,
  style = {},
  ...rest
}) {
  const Tag = href ? "a" : as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    className: `ak-card${hover ? " ak-card--hover" : ""}`,
    style: {
      display: "block",
      background: "var(--surface-card)",
      border: "var(--border-card-width) solid var(--border-card)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-card)",
      overflow: "hidden",
      color: "inherit",
      textDecoration: "none",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Card.jsx", error: String((e && e.message) || e) }); }

// components/cards/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  red: {
    bg: "var(--red-tint)",
    fg: "var(--akimbo-red)"
  },
  green: {
    bg: "var(--green-tint)",
    fg: "var(--akimbo-green)"
  },
  solidGreen: {
    bg: "var(--btn-green)",
    fg: "var(--akimbo-cream)"
  },
  solidRed: {
    bg: "var(--akimbo-red)",
    fg: "var(--akimbo-cream)"
  }
};

/**
 * Tag — a small caps / channel-style chip. Pill radius. Prefix a channel-style
 * chip with `#` in the accent colour. Derived from the button + label styles.
 */
function Tag({
  tone = "red",
  channel = false,
  children,
  style = {},
  ...rest
}) {
  const t = TONES[tone] || TONES.red;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: "11px",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      lineHeight: 1,
      padding: "6px 12px",
      borderRadius: "var(--radius-pill)",
      background: t.bg,
      color: t.fg,
      ...style
    }
  }, rest), channel && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "#"), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/Tag.jsx", error: String((e && e.message) || e) }); }

// components/deck/ContentCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ContentCard — a rounded red card: uppercase heading, body copy, and a
 * drag-and-drop image slot at the bottom. The deck's "content strategy"
 * cards (Anchor / Amplify / Always-on). Give every card a unique slotId.
 *
 * Requires the <image-slot> element to be defined on the page (image-slot.js).
 */
function ContentCard({
  heading,
  body,
  slotId,
  placeholder = "Drop image",
  tone = "red",
  style = {},
  ...rest
}) {
  const bg = tone === "cream" ? "var(--akimbo-cream)" : "var(--akimbo-red)";
  const fg = tone === "cream" ? "var(--akimbo-red)" : "var(--akimbo-cream)";
  const dim = tone === "cream" ? "color-mix(in srgb, var(--akimbo-red) 78%, transparent)" : "color-mix(in srgb, var(--akimbo-cream) 82%, transparent)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: bg,
      borderRadius: "22px",
      padding: "26px 24px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      ...style
    }
  }, rest), heading && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headline)",
      fontWeight: 800,
      fontSize: "22px",
      lineHeight: 1.05,
      textTransform: "uppercase",
      color: fg
    }
  }, heading), body && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-medium)",
      fontSize: "14px",
      lineHeight: "var(--lh-body)",
      color: dim
    }
  }, body), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: "6px"
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: slotId,
    shape: "rounded",
    radius: "12",
    placeholder: placeholder,
    style: {
      display: "block",
      width: "100%",
      aspectRatio: "4 / 3"
    }
  })));
}
Object.assign(__ds_scope, { ContentCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/deck/ContentCard.jsx", error: String((e && e.message) || e) }); }

// components/deck/DeckSlide.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DeckSlide — the 1280×720 slide frame. `theme` picks the ground:
 *   light (warm cream) · dark (charcoal) · red (solid Akimbo red statement).
 * Red is for the biggest moments only — covers and top-level section breaks.
 * `accent` recolours highlights; `paper`/`ink` override surfaces.
 */
function DeckSlide({
  theme = "light",
  accent,
  paper,
  ink,
  padding = 72,
  children,
  style = {},
  ...rest
}) {
  const red = theme === "red";
  const dark = theme === "dark";
  const onDark = dark || red;
  const bg = paper || (red ? "var(--surface-statement)" : dark ? "var(--surface-dark)" : "var(--surface-paper)");
  const fg = ink || (onDark ? "var(--text-on-dark)" : "var(--text-body)");
  const defaultAccent = red ? "var(--akimbo-cream)" : "var(--akimbo-red)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      width: "1280px",
      height: "720px",
      boxSizing: "border-box",
      padding: `${padding}px`,
      background: bg,
      color: fg,
      overflow: "hidden",
      fontFamily: "var(--font-body)",
      ["--accent"]: accent || defaultAccent,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { DeckSlide });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/deck/DeckSlide.jsx", error: String((e && e.message) || e) }); }

// components/deck/DeckCover.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DeckCover — centred title slide: lockup, a big statement title, subtitle, meta.
 */
function DeckCover({
  title,
  subtitle,
  client,
  meta,
  theme = "light",
  accent,
  logoBasePath = "assets/logos",
  style = {},
  ...rest
}) {
  const dark = theme === "dark";
  const onDark = dark || theme === "red";
  return /*#__PURE__*/React.createElement(__ds_scope.DeckSlide, _extends({
    theme: theme,
    accent: accent,
    style: style
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      gap: "20px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    lockup: "wordmark",
    tone: onDark ? "cream" : "red",
    height: 44,
    basePath: logoBasePath
  }), client && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: "14px",
      letterSpacing: "var(--ls-label-wide)",
      textTransform: "uppercase",
      color: onDark ? "var(--text-on-dark-dim)" : "var(--text-label)"
    }
  }, client), title && /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "8px 0 0",
      fontFamily: "var(--font-display)",
      fontVariantLigatures: "none",
      fontFeatureSettings: '"liga" 0, "clig" 0, "dlig" 0, "calt" 0',
      fontWeight: 400,
      fontSize: "80px",
      lineHeight: 1.02,
      color: onDark ? "var(--text-on-dark)" : "var(--text-body)",
      maxWidth: "980px"
    }
  }, title, "."), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "720px",
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-medium)",
      fontSize: "19px",
      lineHeight: "var(--lh-body)",
      color: onDark ? "var(--text-on-dark-dim)" : "var(--text-label)"
    }
  }, subtitle), meta && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "12px",
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: "13px",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: onDark ? "var(--text-on-dark-dim)" : "var(--text-muted)"
    }
  }, meta)));
}
Object.assign(__ds_scope, { DeckCover });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/deck/DeckCover.jsx", error: String((e && e.message) || e) }); }

// components/deck/PageTab.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * PageTab — the folded-corner page-number tab that lives in the top-right of
 * every deck slide. Inverse of the ground: a red tab with a cream number on
 * cream/charcoal slides; a cream tab with a red number on red / photo slides.
 */
function PageTab({
  number,
  tone = "red",
  size = 128,
  style = {},
  ...rest
}) {
  const tab = tone === "cream" ? "var(--akimbo-cream)" : "var(--akimbo-red)";
  const ink = tone === "cream" ? "var(--akimbo-red)" : "var(--akimbo-cream)";
  const num = typeof number === "number" ? String(number).padStart(2, "0") : number;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      width: `${size}px`,
      height: `${size * 0.72}px`,
      background: tab,
      clipPath: "polygon(0 0, 100% 0, 100% 100%)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: `${size * 0.1}px`,
      right: `${size * 0.14}px`,
      fontFamily: "var(--font-headline)",
      fontWeight: 800,
      fontSize: `${size * 0.28}px`,
      lineHeight: 1,
      color: ink
    }
  }, num));
}
Object.assign(__ds_scope, { PageTab });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/deck/PageTab.jsx", error: String((e && e.message) || e) }); }

// components/deck/DeckDivider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DeckDivider — the top-level section break: an oval script kicker, a big
 * Regards title, a supporting line, a Bo, and the corner page tab. Charcoal by
 * default; use theme="red" for the biggest section moments only. On both dark
 * grounds the Bo is cream (never a dark Bo on a dark/red ground).
 */
function DeckDivider({
  kicker,
  title,
  subtitle,
  page,
  theme = "dark",
  accent,
  bo = true,
  boPose = "leaping",
  boTone = "cream",
  boBasePath = "assets/illustrations",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement(__ds_scope.DeckSlide, _extends({
    theme: theme,
    accent: accent,
    style: style
  }, rest), page != null && /*#__PURE__*/React.createElement(__ds_scope.PageTab, {
    number: page,
    tone: theme === "red" ? "cream" : "red"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "0"
    }
  }, kicker && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "26px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.OvalKicker, {
    tone: "cream",
    size: 30
  }, kicker)), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontVariantLigatures: "none",
      fontFeatureSettings: '"liga" 0, "clig" 0, "dlig" 0, "calt" 0',
      fontWeight: 400,
      fontSize: "104px",
      lineHeight: 0.98,
      color: "var(--text-on-dark)",
      maxWidth: "900px"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "28px 0 0",
      maxWidth: "600px",
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-medium)",
      fontSize: "18px",
      lineHeight: "var(--lh-body)",
      color: "var(--text-on-dark-dim)"
    }
  }, subtitle)), bo && /*#__PURE__*/React.createElement(__ds_scope.BoMark, {
    pose: boPose,
    tone: boTone,
    size: boPose === "leaping" ? 300 : 240,
    basePath: boBasePath,
    style: {
      position: "absolute",
      right: "64px",
      bottom: "56px"
    }
  }));
}
Object.assign(__ds_scope, { DeckDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/deck/DeckDivider.jsx", error: String((e && e.message) || e) }); }

// components/deck/StatCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatCard — a results figure on a rounded card: a big Futura Condensed
 * ExtraBold number over a tracked label. The deck's red stat cards
 * ("150K / YOUTUBE VIEWS"). Sits on charcoal or cream slides.
 */
function StatCard({
  value,
  label,
  tone = "red",
  align = "left",
  style = {},
  ...rest
}) {
  const bg = tone === "cream" ? "var(--akimbo-cream)" : "var(--akimbo-red)";
  const fg = tone === "cream" ? "var(--akimbo-red)" : "var(--akimbo-cream)";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: bg,
      borderRadius: "20px",
      padding: "34px 30px 30px",
      textAlign: align,
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headline)",
      fontWeight: 800,
      fontSize: "76px",
      lineHeight: 0.94,
      letterSpacing: "var(--ls-display)",
      color: fg
    }
  }, value), label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headline)",
      fontWeight: 800,
      fontSize: "22px",
      lineHeight: 1.04,
      textTransform: "uppercase",
      color: fg
    }
  }, label));
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/deck/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/doc/BulletList.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const MARK = {
  red: "var(--akimbo-red)",
  green: "var(--akimbo-green)",
  black: "var(--akimbo-black)"
};

/**
 * BulletList — copy list with small round brand markers. `tone` colours the dots.
 */
function BulletList({
  items = [],
  tone = "red",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("ul", _extends({
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)",
      ...style
    }
  }, rest), items.map((item, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: "flex",
      gap: "var(--space-3)",
      alignItems: "baseline"
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      flex: "none",
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: MARK[tone] || MARK.red,
      transform: "translateY(-2px)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-medium)",
      fontSize: "var(--type-body)",
      lineHeight: "var(--lh-body)",
      color: "var(--text-body)"
    }
  }, item))));
}
Object.assign(__ds_scope, { BulletList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/doc/BulletList.jsx", error: String((e && e.message) || e) }); }

// components/doc/DocFooter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DocFooter — hairline top rule, brand line left, context right.
 * `docType` prints after a mid-dot next to the brand line.
 */
function DocFooter({
  left = "Akimbo Creative Haus",
  docType,
  right,
  style = {},
  ...rest
}) {
  const cell = {
    fontFamily: "var(--font-body)",
    fontWeight: "var(--fw-medium)",
    fontSize: "var(--type-small)",
    color: "var(--text-muted)"
  };
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "var(--rule-hairline)",
      background: "var(--divider)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-6)",
      paddingTop: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: cell
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-label)"
    }
  }, left), docType && /*#__PURE__*/React.createElement("span", null, " \xB7 ", docType)), right && /*#__PURE__*/React.createElement("div", {
    style: {
      ...cell,
      textAlign: "right"
    }
  }, right)));
}
Object.assign(__ds_scope, { DocFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/doc/DocFooter.jsx", error: String((e && e.message) || e) }); }

// components/doc/DocHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const RULE_TONE = {
  red: "var(--akimbo-red)",
  green: "var(--akimbo-green)",
  black: "var(--akimbo-black)"
};

/**
 * DocHeader — the letterhead: wordmark lockup left, meta right, over the 3px
 * red rule. `tone` recolours the rule (and picks a matching mark).
 */
function DocHeader({
  docType,
  preparedFor,
  date,
  meta = [],
  tone = "red",
  logoBasePath = "assets/logos",
  style = {},
  ...rest
}) {
  const rows = [...(docType ? [{
    label: "Document",
    value: docType
  }] : []), ...(preparedFor ? [{
    label: "Prepared for",
    value: preparedFor
  }] : []), ...(date ? [{
    label: "Date",
    value: date
  }] : []), ...meta];
  const markTone = tone === "green" ? "green" : tone === "black" ? "black" : "red";
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    lockup: "wordmark",
    tone: markTone,
    height: 34,
    basePath: logoBasePath
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-8)",
      textAlign: "right"
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: "11px",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--text-label)"
    }
  }, r.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-medium)",
      fontSize: "var(--type-body)",
      color: "var(--text-body)",
      marginTop: "2px"
    }
  }, r.value))))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: "var(--rule-weight)",
      background: RULE_TONE[tone] || RULE_TONE.red,
      marginTop: "var(--space-4)"
    }
  }));
}
Object.assign(__ds_scope, { DocHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/doc/DocHeader.jsx", error: String((e && e.message) || e) }); }

// components/doc/LabelValue.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * LabelValue — tracked-caps label left, value right, over hairline dividers.
 * Pass `rows: {label, value}[]` for a stack, or a single `label`/`value`.
 * The closest primitive to a data table (no full table component exists).
 */
function LabelValue({
  rows,
  label,
  value,
  divided = true,
  style = {},
  ...rest
}) {
  const data = rows || [{
    label,
    value
  }];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      ...style
    }
  }, rest), data.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: "var(--space-6)",
      padding: "var(--space-3) 0",
      borderTop: divided && i === 0 ? "var(--rule-hairline) solid var(--divider)" : undefined,
      borderBottom: divided ? "var(--rule-hairline) solid var(--divider)" : undefined
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: "11px",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--text-label)"
    }
  }, r.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-medium)",
      fontSize: "var(--type-body)",
      color: "var(--text-body)",
      textAlign: "right"
    }
  }, r.value))));
}
Object.assign(__ds_scope, { LabelValue });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/doc/LabelValue.jsx", error: String((e && e.message) || e) }); }

// components/doc/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatBlock — a headline figure with a tracked-caps label and optional caption.
 * variant "muted" (default) or "red" (accented hero figure).
 */
function StatBlock({
  value,
  label,
  caption,
  variant = "muted",
  align = "left",
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-headline)",
      fontWeight: 800,
      fontSize: "var(--type-stat)",
      lineHeight: "var(--lh-tight)",
      letterSpacing: "var(--ls-display)",
      color: variant === "red" ? "var(--akimbo-red)" : "var(--text-body)"
    }
  }, value), label && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)",
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: "var(--type-section)",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: "var(--text-label)"
    }
  }, label), caption && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-1)",
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-medium)",
      fontSize: "var(--type-small)",
      color: "var(--text-muted)"
    }
  }, caption));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/doc/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONE_COLOR = {
  red: "var(--text-accent)",
  green: "var(--akimbo-green)",
  muted: "var(--text-muted)",
  warm: "var(--text-label)",
  onDark: "var(--text-on-dark)"
};

/**
 * SectionLabel — the uppercase, letter-tracked kicker that sits above titles and
 * box headers. Red by default. Futura Bold caps, wide tracking.
 */
function SectionLabel({
  tone = "red",
  as = "div",
  wide = false,
  children,
  style = {},
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: "var(--type-section)",
      letterSpacing: wide ? "var(--ls-label-wide)" : "var(--ls-label)",
      lineHeight: "var(--lh-snug)",
      textTransform: "uppercase",
      color: TONE_COLOR[tone] || TONE_COLOR.red,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/deck/DeckContent.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DeckContent — the content-slide master. An optional oval script kicker and/or
 * tracked label sit above the headline; the headline is either a condensed
 * Futura ExtraBold caps line (default) or a big Regards display line
 * (titleFont="display"). The corner page tab lives top-right; an optional Bo
 * anchors the lower-right. Cream and charcoal are the workhorse grounds.
 */
function DeckContent({
  kicker,
  label,
  title,
  titleFont = "condensed",
  titleSize,
  subtitle,
  project,
  page,
  year = new Date().getFullYear(),
  theme = "light",
  accent,
  tab = true,
  mark = false,
  bo = false,
  boPose = "walking",
  boBasePath = "assets/illustrations",
  logoBasePath = "assets/logos",
  children,
  style = {},
  ...rest
}) {
  const red = theme === "red";
  const dark = theme === "dark";
  const onDark = dark || red;
  const dim = onDark ? "var(--text-on-dark-dim)" : "var(--text-muted)";
  const display = titleFont === "display";
  const condensedColor = onDark ? "var(--text-on-dark)" : "var(--akimbo-red)";
  const displayColor = onDark ? "var(--text-on-dark)" : "var(--text-body)";
  const boTone = onDark ? "cream" : "black";
  return /*#__PURE__*/React.createElement(__ds_scope.DeckSlide, _extends({
    theme: theme,
    accent: accent,
    style: style
  }, rest), tab && page != null && /*#__PURE__*/React.createElement(__ds_scope.PageTab, {
    number: page,
    tone: red ? "cream" : "red"
  }), mark && /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    lockup: "wordmark",
    tone: onDark ? "cream" : "black",
    height: 24,
    basePath: logoBasePath,
    style: {
      position: "absolute",
      top: "56px",
      left: "72px",
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "1000px"
    }
  }, kicker && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "18px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.OvalKicker, {
    tone: onDark ? "cream" : "red",
    size: 28
  }, kicker)), label && /*#__PURE__*/React.createElement(__ds_scope.SectionLabel, {
    tone: onDark ? "onDark" : "red",
    style: {
      color: onDark ? "var(--text-on-dark)" : undefined,
      marginBottom: "var(--space-3)"
    }
  }, label), title && (display ? /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontVariantLigatures: "none",
      fontFeatureSettings: '"liga" 0, "clig" 0, "dlig" 0, "calt" 0',
      fontWeight: 400,
      fontSize: titleSize || "88px",
      lineHeight: 0.98,
      color: displayColor,
      maxWidth: "1000px"
    }
  }, title) : /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-headline)",
      fontWeight: 800,
      fontSize: titleSize || "72px",
      lineHeight: "var(--lh-tight)",
      letterSpacing: "var(--ls-display)",
      textTransform: "uppercase",
      color: condensedColor
    }
  }, title)), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "18px 0 0",
      maxWidth: "680px",
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-medium)",
      fontSize: "17px",
      lineHeight: "var(--lh-body)",
      color: onDark ? "var(--text-on-dark-dim)" : "var(--text-label)"
    }
  }, subtitle)), children && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-7)"
    }
  }, children), bo && /*#__PURE__*/React.createElement(__ds_scope.BoMark, {
    pose: boPose,
    tone: boTone,
    size: 200,
    basePath: boBasePath,
    style: {
      position: "absolute",
      right: "56px",
      bottom: "48px"
    }
  }), (project || page != null && !tab) && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "72px",
      right: "72px",
      bottom: "48px",
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--font-condensed)",
      fontWeight: 700,
      fontSize: "12px",
      letterSpacing: "var(--ls-label)",
      textTransform: "uppercase",
      color: dim
    }
  }, /*#__PURE__*/React.createElement("span", null, project), /*#__PURE__*/React.createElement("span", null, year)));
}
Object.assign(__ds_scope, { DeckContent });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/deck/DeckContent.jsx", error: String((e && e.message) || e) }); }

// components/doc/DocTitle.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DocTitle — the top-of-document title block: a red kicker, an uppercase
 * condensed H1, an optional red accent subtitle, and an optional lead paragraph.
 */
function DocTitle({
  label,
  title,
  subtitle,
  lead,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement(__ds_scope.SectionLabel, {
    tone: "red",
    style: {
      marginBottom: "var(--space-3)"
    }
  }, label), title && /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-headline)",
      fontWeight: 800,
      fontSize: "var(--type-h1)",
      lineHeight: "var(--lh-tight)",
      letterSpacing: "var(--ls-display)",
      textTransform: "uppercase",
      color: "var(--text-body)"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)",
      fontFamily: "var(--font-display)",
      fontVariantLigatures: "none",
      fontFeatureSettings: '"liga" 0, "clig" 0, "dlig" 0, "calt" 0',
      fontSize: "26px",
      lineHeight: "var(--lh-snug)",
      color: "var(--text-accent)"
    }
  }, subtitle), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-4) 0 0",
      maxWidth: "58ch",
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-medium)",
      fontSize: "var(--type-body-lg)",
      lineHeight: "var(--lh-body)",
      color: "var(--text-body)"
    }
  }, lead));
}
Object.assign(__ds_scope, { DocTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/doc/DocTitle.jsx", error: String((e && e.message) || e) }); }

// components/layout/Box.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Box — the workhorse bordered card with an optional red uppercase header.
 * `callout` gives emphasis: a 3px red left border + warm red-tint fill.
 * Cards use radius 10 and are never pill.
 */
function Box({
  title,
  callout = false,
  children,
  style = {},
  bodyStyle = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: callout ? "var(--surface-callout)" : "var(--surface-card)",
      border: callout ? "none" : "var(--border-card-width) solid var(--border-card)",
      borderLeft: callout ? "var(--callout-border) solid var(--akimbo-red)" : undefined,
      borderRadius: "var(--radius-md)",
      boxShadow: callout ? "none" : "var(--shadow-card)",
      padding: "var(--space-6)",
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement(__ds_scope.SectionLabel, {
    tone: "red",
    as: "div",
    style: {
      marginBottom: "var(--space-3)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-medium)",
      fontSize: "var(--type-body)",
      lineHeight: "var(--lh-body)",
      color: "var(--text-body)",
      ...bodyStyle
    }
  }, children));
}
Object.assign(__ds_scope, { Box });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Box.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BoMark = __ds_scope.BoMark;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.OvalKicker = __ds_scope.OvalKicker;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.ContentCard = __ds_scope.ContentCard;

__ds_ns.DeckContent = __ds_scope.DeckContent;

__ds_ns.DeckCover = __ds_scope.DeckCover;

__ds_ns.DeckDivider = __ds_scope.DeckDivider;

__ds_ns.DeckSlide = __ds_scope.DeckSlide;

__ds_ns.PageTab = __ds_scope.PageTab;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.BulletList = __ds_scope.BulletList;

__ds_ns.DocFooter = __ds_scope.DocFooter;

__ds_ns.DocHeader = __ds_scope.DocHeader;

__ds_ns.DocTitle = __ds_scope.DocTitle;

__ds_ns.LabelValue = __ds_scope.LabelValue;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Box = __ds_scope.Box;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

})();
