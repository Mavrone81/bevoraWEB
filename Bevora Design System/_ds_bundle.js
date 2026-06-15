/* @ds-bundle: {"format":3,"namespace":"BevoraDesignSystem_cc741a","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Alert","sourcePath":"components/display/Alert.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Badge","sourcePath":"components/display/Badge.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"Stat","sourcePath":"components/display/Stat.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"SectionHeading","sourcePath":"components/marketing/SectionHeading.jsx"},{"name":"ServiceCard","sourcePath":"components/marketing/ServiceCard.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"21bba864d519","components/buttons/IconButton.jsx":"f45d918fcdf5","components/display/Alert.jsx":"58acb56d7d18","components/display/Avatar.jsx":"243a0d76d35f","components/display/Badge.jsx":"71b07f3f361e","components/display/Card.jsx":"e744be797d73","components/display/Stat.jsx":"106bdf407753","components/display/Tag.jsx":"26f876936b27","components/forms/Checkbox.jsx":"557679f3a4ef","components/forms/Input.jsx":"88c5770045fa","components/forms/Select.jsx":"3ba3295bd3df","components/forms/Switch.jsx":"b3976aedf566","components/forms/Textarea.jsx":"334cb740dfc2","components/marketing/SectionHeading.jsx":"f6e999131d2d","components/marketing/ServiceCard.jsx":"4c7c24d3cb99","ui_kits/website/app.jsx":"1f39ac8fbab3","ui_kits/website/contact-footer.jsx":"423d9d5c467e","ui_kits/website/header-hero.jsx":"2e5346154e7a","ui_kits/website/sections.jsx":"2f633598355c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BevoraDesignSystem_cc741a = window.BevoraDesignSystem_cc741a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Bevora primary button. Variants: primary (ink), accent (gold),
 * secondary (outline), ghost, danger. Sizes: sm | md | lg.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const sizes = {
    sm: {
      padding: "0 14px",
      height: 36,
      fontSize: 13,
      gap: 7,
      radius: "var(--radius-md)"
    },
    md: {
      padding: "0 20px",
      height: 44,
      fontSize: 15,
      gap: 8,
      radius: "var(--radius-md)"
    },
    lg: {
      padding: "0 28px",
      height: 54,
      fontSize: 16,
      gap: 10,
      radius: "var(--radius-lg)"
    }
  };
  const s = sizes[size] || sizes.md;
  const palettes = {
    primary: {
      bg: hover ? "var(--neutral-800)" : "var(--neutral-900)",
      fg: "var(--text-inverse)",
      border: "transparent",
      shadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)"
    },
    accent: {
      bg: active ? "var(--accent-active)" : hover ? "var(--accent-hover)" : "var(--accent)",
      fg: "var(--text-on-gold)",
      border: "transparent",
      shadow: hover ? "var(--shadow-gold)" : "var(--shadow-sm)"
    },
    secondary: {
      bg: hover ? "var(--bg-subtle)" : "var(--surface-card)",
      fg: "var(--text-primary)",
      border: hover ? "var(--border-strong)" : "var(--border-default)",
      shadow: "none"
    },
    ghost: {
      bg: hover ? "var(--bg-subtle)" : "transparent",
      fg: "var(--text-primary)",
      border: "transparent",
      shadow: "none"
    },
    danger: {
      bg: hover ? "#9c3727" : "var(--danger-500)",
      fg: "#fff",
      border: "transparent",
      shadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)"
    }
  };
  const p = palettes[variant] || palettes.primary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : "auto",
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      height: s.height,
      padding: s.padding,
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: s.fontSize,
      letterSpacing: "-0.005em",
      lineHeight: 1,
      color: p.fg,
      background: p.bg,
      border: `1.5px solid ${p.border}`,
      borderRadius: s.radius,
      boxShadow: focus ? "var(--ring)" : p.shadow,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transform: active && !disabled ? "scale(0.98)" : "scale(1)",
      transition: "background var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)",
      outline: "none",
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Square icon-only button. Pair with a Lucide <i data-lucide> glyph or
 * any SVG child. Variants mirror Button; sizes sm | md | lg.
 */
function IconButton({
  children,
  variant = "secondary",
  size = "md",
  disabled = false,
  "aria-label": ariaLabel,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [focus, setFocus] = React.useState(false);
  const dim = {
    sm: 36,
    md: 44,
    lg: 54
  }[size] || 44;
  const palettes = {
    primary: {
      bg: hover ? "var(--neutral-800)" : "var(--neutral-900)",
      fg: "#fff",
      border: "transparent"
    },
    accent: {
      bg: hover ? "var(--accent-hover)" : "var(--accent)",
      fg: "var(--text-on-gold)",
      border: "transparent"
    },
    secondary: {
      bg: hover ? "var(--bg-subtle)" : "var(--surface-card)",
      fg: "var(--text-primary)",
      border: hover ? "var(--border-strong)" : "var(--border-default)"
    },
    ghost: {
      bg: hover ? "var(--bg-subtle)" : "transparent",
      fg: "var(--text-secondary)",
      border: "transparent"
    }
  };
  const p = palettes[variant] || palettes.secondary;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: dim,
      height: dim,
      color: p.fg,
      background: p.bg,
      border: `1.5px solid ${p.border}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focus ? "var(--ring)" : "none",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "background var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)",
      outline: "none",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/display/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Inline notification banner. tones success | warning | danger | info. */
function Alert({
  children,
  tone = "info",
  title,
  style = {},
  ...rest
}) {
  const tones = {
    success: ["var(--success-50)", "var(--success-500)"],
    warning: ["var(--warning-50)", "var(--warning-500)"],
    danger: ["var(--danger-50)", "var(--danger-500)"],
    info: ["var(--info-50)", "var(--info-500)"]
  };
  const [bg, accent] = tones[tone] || tones.info;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: "flex",
      gap: 12,
      padding: "14px 16px",
      background: bg,
      borderRadius: "var(--radius-md)",
      borderLeft: `3px solid ${accent}`,
      fontFamily: "var(--font-sans)",
      color: "var(--text-primary)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: 8,
      height: 8,
      marginTop: 7,
      borderRadius: "50%",
      background: accent,
      flex: "0 0 8px"
    }
  }), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14,
      marginBottom: 2
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: "var(--text-secondary)",
      lineHeight: 1.5
    }
  }, children)));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Alert.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Avatar with image or initials fallback. sizes sm 32 | md 40 | lg 56. */
function Avatar({
  src,
  name = "",
  size = "md",
  style = {},
  ...rest
}) {
  const dim = {
    sm: 32,
    md: 40,
    lg: 56
  }[size] || 40;
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: dim,
      height: dim,
      flex: `0 0 ${dim}px`,
      borderRadius: "var(--radius-circle)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: dim * 0.38,
      color: "var(--text-on-gold)",
      background: src ? "var(--neutral-100)" : "var(--grad-gold-soft)",
      boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)",
      overflow: "hidden",
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }) : initials);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Small status pill. tones: neutral | gold | success | warning | danger | info. solid=true for filled. */
function Badge({
  children,
  tone = "neutral",
  solid = false,
  style = {},
  ...rest
}) {
  const tones = {
    neutral: {
      soft: ["var(--neutral-100)", "var(--neutral-700)"],
      solid: ["var(--neutral-900)", "#fff"]
    },
    gold: {
      soft: ["var(--gold-50)", "var(--gold-700)"],
      solid: ["var(--accent)", "var(--text-on-gold)"]
    },
    success: {
      soft: ["var(--success-50)", "var(--success-500)"],
      solid: ["var(--success-500)", "#fff"]
    },
    warning: {
      soft: ["var(--warning-50)", "#9a6206"],
      solid: ["var(--warning-500)", "#fff"]
    },
    danger: {
      soft: ["var(--danger-50)", "var(--danger-500)"],
      solid: ["var(--danger-500)", "#fff"]
    },
    info: {
      soft: ["var(--info-50)", "var(--info-500)"],
      solid: ["var(--info-500)", "#fff"]
    }
  };
  const [bg, fg] = (tones[tone] || tones.neutral)[solid ? "solid" : "soft"];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      height: 22,
      padding: "0 9px",
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 11.5,
      letterSpacing: "0.01em",
      lineHeight: 1,
      color: fg,
      background: bg,
      borderRadius: "var(--radius-pill)",
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Badge.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Surface container. interactive=true adds hover lift. accent=true adds a
 * gold top-rule for featured cards.
 */
function Card({
  children,
  interactive = false,
  accent = false,
  padding = "var(--space-6)",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      position: "relative",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
      padding,
      transform: hover ? "translateY(-3px)" : "none",
      transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
      overflow: "hidden",
      ...style
    }
  }, rest), accent && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      insetInline: 0,
      top: 0,
      height: 3,
      background: "var(--grad-gold-soft)"
    }
  }), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/Stat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Headline metric block. value in mono gold; label + optional caption below. */
function Stat({
  value,
  label,
  caption,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 600,
      fontSize: "var(--text-4xl)",
      lineHeight: 1,
      letterSpacing: "-0.02em",
      color: "var(--text-primary)"
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 14,
      color: "var(--text-brand)",
      textTransform: "uppercase",
      letterSpacing: "0.08em"
    }
  }, label), caption && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      color: "var(--text-tertiary)"
    }
  }, caption));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Stat.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Removable keyword tag/chip. onRemove shows an × affordance. */
function Tag({
  children,
  onRemove,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 28,
      padding: onRemove ? "0 6px 0 12px" : "0 12px",
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: 13,
      color: "var(--text-secondary)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-pill)",
      ...style
    }
  }, rest), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Remove",
    onClick: onRemove,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 18,
      height: 18,
      padding: 0,
      border: 0,
      cursor: "pointer",
      borderRadius: "var(--radius-circle)",
      background: "var(--neutral-100)",
      color: "var(--text-tertiary)",
      fontSize: 13,
      lineHeight: 1
    }
  }, "\xD7"));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox with label. Controlled via checked/onChange. */
function Checkbox({
  label,
  checked = false,
  onChange,
  id,
  disabled = false,
  style = {},
  ...rest
}) {
  const cid = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: cid,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flex: "0 0 20px",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-xs)",
      border: `1.5px solid ${checked ? "var(--accent)" : "var(--border-strong)"}`,
      background: checked ? "var(--accent)" : "var(--surface-card)",
      color: "var(--text-on-gold)",
      fontSize: 13,
      fontWeight: 800,
      lineHeight: 1,
      transition: "all var(--dur-fast) var(--ease-out)"
    }
  }, checked ? "✓" : ""), /*#__PURE__*/React.createElement("input", _extends({
    id: cid,
    type: "checkbox",
    checked: checked,
    onChange: onChange,
    disabled: disabled
  }, rest, {
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 14.5,
      color: "var(--text-primary)"
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text field with optional label, hint, error, and leading icon. */
function Input({
  label,
  hint,
  error,
  iconLeft,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const borderColor = error ? "var(--danger-500)" : focus ? "var(--accent)" : "var(--border-default)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: 13.5,
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      height: 46,
      padding: "0 14px",
      background: "var(--surface-card)",
      border: `1.5px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focus ? "var(--ring)" : "none",
      transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)"
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--text-tertiary)"
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: e => {
      setFocus(true);
      rest.onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur?.(e);
    }
  }, rest, {
    style: {
      flex: 1,
      border: 0,
      outline: 0,
      background: "transparent",
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      color: "var(--text-primary)"
    }
  }))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 12.5,
      color: error ? "var(--danger-500)" : "var(--text-tertiary)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Styled native select with label/hint. options: [{value,label}] or strings. */
function Select({
  label,
  hint,
  options = [],
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const sid = id || React.useId();
  const opts = options.map(o => typeof o === "string" ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: sid,
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: 13.5,
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: sid,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
      width: "100%",
      height: 46,
      padding: "0 38px 0 14px",
      appearance: "none",
      WebkitAppearance: "none",
      background: "var(--surface-card)",
      border: `1.5px solid ${focus ? "var(--accent)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focus ? "var(--ring)" : "none",
      outline: 0,
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      color: "var(--text-primary)",
      cursor: "pointer",
      transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)"
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: "absolute",
      right: 14,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--text-tertiary)",
      fontSize: 12
    }
  }, "\u25BE")), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 12.5,
      color: "var(--text-tertiary)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle switch. Controlled via checked/onChange. */
function Switch({
  checked = false,
  onChange,
  label,
  disabled = false,
  id,
  style = {},
  ...rest
}) {
  const sid = id || React.useId();
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: sid,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      width: 42,
      height: 24,
      flex: "0 0 42px",
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--accent)" : "var(--neutral-300)",
      transition: "background var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: checked ? 21 : 3,
      width: 18,
      height: 18,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-sm)",
      transition: "left var(--dur-base) var(--ease-spring)"
    }
  })), /*#__PURE__*/React.createElement("input", _extends({
    id: sid,
    type: "checkbox",
    role: "switch",
    checked: checked,
    onChange: onChange,
    disabled: disabled
  }, rest, {
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 14.5,
      color: "var(--text-primary)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multi-line text field with label/hint/error. */
function Textarea({
  label,
  hint,
  error,
  id,
  rows = 4,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const tid = id || React.useId();
  const borderColor = error ? "var(--danger-500)" : focus ? "var(--accent)" : "var(--border-default)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: tid,
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: 13.5,
      color: "var(--text-primary)"
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: tid,
    rows: rows,
    onFocus: e => {
      setFocus(true);
      rest.onFocus?.(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur?.(e);
    }
  }, rest, {
    style: {
      resize: "vertical",
      padding: "12px 14px",
      background: "var(--surface-card)",
      border: `1.5px solid ${borderColor}`,
      borderRadius: "var(--radius-md)",
      boxShadow: focus ? "var(--ring)" : "none",
      outline: 0,
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      lineHeight: 1.5,
      color: "var(--text-primary)",
      transition: "border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)"
    }
  })), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 12.5,
      color: error ? "var(--danger-500)" : "var(--text-tertiary)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/marketing/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Kicker + heading + optional subtitle block. align left | center. */
function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  style = {},
  ...rest
}) {
  const centered = align === "center";
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: centered ? "center" : "flex-start",
      textAlign: centered ? "center" : "left",
      maxWidth: centered ? 640 : "none",
      margin: centered ? "0 auto" : 0,
      ...style
    }
  }, rest), kicker && /*#__PURE__*/React.createElement("span", {
    className: "bv-kicker"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)"
    }
  }), kicker), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-3xl)",
      fontWeight: 800,
      letterSpacing: "-0.015em",
      lineHeight: 1.1,
      color: "var(--text-primary)"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-lg)",
      lineHeight: 1.55,
      color: "var(--text-secondary)"
    }
  }, subtitle));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Feature/service tile: gold icon chip, title, description, optional link.
 * Pass a Lucide glyph name to `icon` (renders <i data-lucide>) or any node.
 */
function ServiceCard({
  icon,
  title,
  children,
  href,
  linkLabel = "Learn more",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const glyph = typeof icon === "string" ? /*#__PURE__*/React.createElement("i", {
    "data-lucide": icon,
    style: {
      width: 24,
      height: 24
    }
  }) : icon;
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 14,
      padding: "var(--space-6)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-sm)",
      transform: hover ? "translateY(-3px)" : "none",
      transition: "box-shadow var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 52,
      height: 52,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-md)",
      color: "var(--gold-700)",
      background: "var(--gold-50)",
      border: "1px solid var(--gold-200)"
    }
  }, glyph), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--text-xl)",
      fontWeight: 700,
      color: "var(--text-primary)",
      letterSpacing: "-0.01em"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      lineHeight: 1.55,
      color: "var(--text-secondary)"
    }
  }, children), href && /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      marginTop: "auto",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 14,
      color: "var(--text-brand)",
      textDecoration: "none"
    }
  }, linkLabel, /*#__PURE__*/React.createElement("span", {
    style: {
      transform: hover ? "translateX(3px)" : "none",
      transition: "transform var(--dur-base) var(--ease-out)"
    }
  }, "\u2192")));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app.jsx
try { (() => {
/* Bevora website — app composition. */
function App() {
  React.useEffect(() => {
    const id = setInterval(() => window.lucide && window.lucide.createIcons(), 120);
    setTimeout(() => clearInterval(id), 1200);
    return () => clearInterval(id);
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(TrustBar, null), /*#__PURE__*/React.createElement(Services, null), /*#__PURE__*/React.createElement(StatsBand, null), /*#__PURE__*/React.createElement(WhyBevora, null), /*#__PURE__*/React.createElement(Contact, null)), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/contact-footer.jsx
try { (() => {
/* Bevora website — Contact CTA + Footer. */
const {
  Input,
  Textarea,
  Select,
  Button,
  Alert
} = window.BevoraDesignSystem_cc741a;
function Contact() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    company: "",
    service: "Managed IT support",
    message: ""
  });
  const set = k => e => setForm({
    ...form,
    [k]: e.target.value
  });
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: "var(--section-y) 0",
      background: "var(--bg-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "0 var(--gutter)",
      display: "grid",
      gridTemplateColumns: ".9fr 1.1fr",
      gap: 56,
      alignItems: "start"
    },
    className: "bv-contact-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "bv-kicker"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--accent)"
    }
  }), "Get started"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "var(--text-3xl)",
      letterSpacing: "-0.015em",
      lineHeight: 1.1,
      color: "var(--text-primary)",
      margin: "12px 0 0"
    }
  }, "Let's talk about your IT"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-lg)",
      lineHeight: 1.6,
      color: "var(--text-secondary)",
      margin: "16px 0 0",
      maxWidth: "40ch"
    }
  }, "Book a free 30-minute assessment. We'll review your setup and show you exactly where it can be safer, faster and cheaper to run."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      marginTop: 32
    }
  }, [["phone", "+65 6123 4567"], ["mail", "hello@bevorasg.com"], ["map-pin", "71 Robinson Road, Singapore"]].map(([ic, tx]) => /*#__PURE__*/React.createElement("div", {
    key: tx,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 38,
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--gold-700)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": ic,
    style: {
      width: 18,
      height: 18
    }
  })), tx)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-md)",
      padding: "var(--space-8)"
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
      padding: "12px 0"
    }
  }, /*#__PURE__*/React.createElement(Alert, {
    tone: "success",
    title: "Thanks \u2014 we'll be in touch"
  }, "An engineer will reply within one business day to schedule your assessment."), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => setSent(false)
  }, "Send another message")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Name",
    placeholder: "Your name",
    value: form.name,
    onChange: set("name"),
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Work email",
    placeholder: "you@company.com",
    value: form.email,
    onChange: set("email"),
    iconLeft: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "mail",
      style: {
        width: 16,
        height: 16
      }
    }),
    required: true
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Company",
    placeholder: "Company name",
    value: form.company,
    onChange: set("company")
  }), /*#__PURE__*/React.createElement(Select, {
    label: "What can we help with?",
    value: form.service,
    onChange: set("service"),
    options: ["Managed IT support", "Cloud & migration", "Cybersecurity", "Backup & disaster recovery", "Network & infrastructure", "Something else"]
  }), /*#__PURE__*/React.createElement(Textarea, {
    label: "Tell us a little more",
    rows: 3,
    placeholder: "A sentence or two about your setup\u2026",
    value: form.message,
    onChange: set("message")
  }), /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    variant: "accent",
    size: "lg",
    fullWidth: true,
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right",
      style: {
        width: 18,
        height: 18
      }
    })
  }, "Request my free assessment")))));
}
function Footer() {
  const cols = [["Services", ["Managed IT", "Cloud & migration", "Cybersecurity", "Backup & DR", "Networking"]], ["Company", ["About", "Why Bevora", "Careers", "Case studies", "Contact"]], ["Resources", ["IT health check", "Security guide", "Pricing", "Support portal"]]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "#222327",
      color: "rgba(255,255,255,.7)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "var(--space-16) var(--gutter) var(--space-8)",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
      gap: 40
    },
    className: "bv-footer-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/bevora-mark.png",
    alt: "Bevora",
    style: {
      width: 40,
      height: 40,
      borderRadius: 9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 22,
      color: "#fff"
    }
  }, "Bevora")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      lineHeight: 1.6,
      marginTop: 16,
      maxWidth: "32ch",
      color: "rgba(255,255,255,.55)"
    }
  }, "The IT partner that keeps Singapore's growing teams running \u2014 quietly, reliably, around the clock.")), cols.map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--gold-300)",
      marginBottom: 14
    }
  }, h), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "rgba(255,255,255,.62)",
      textDecoration: "none"
    }
  }, i)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(255,255,255,.1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "20px var(--gutter)",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12,
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      color: "rgba(255,255,255,.45)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Bevora \xB7 BevoraSG.com"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit"
    }
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit"
    }
  }, "Terms"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: "inherit"
    }
  }, "Status")))));
}
Object.assign(window, {
  Contact,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/contact-footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/header-hero.jsx
try { (() => {
/* Bevora website — Header + Hero. Registers on window for app.jsx. */
const {
  Button,
  IconButton,
  Badge
} = window.BevoraDesignSystem_cc741a;
function Logo({
  dark = false
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      textDecoration: "none"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/bevora-mark.png",
    alt: "Bevora",
    style: {
      width: 40,
      height: 40,
      borderRadius: 9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 22,
      letterSpacing: "-0.02em",
      color: dark ? "#fff" : "var(--text-primary)"
    }
  }, "Bevora"));
}
function Header({
  onNav
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const el = document.querySelector("[data-scroll]") || window;
    const onScroll = () => setScrolled((el.scrollTop || window.scrollY || 0) > 12);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["Services", "Why Bevora", "Industries", "Contact"];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: scrolled ? "rgba(255,255,255,.82)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
      transition: "all var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "16px var(--gutter)",
      display: "flex",
      alignItems: "center",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("nav", {
    style: {
      marginLeft: "auto",
      display: "flex",
      gap: 28
    },
    className: "bv-desktop-nav"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#" + l.toLowerCase().replace(/\s/g, ""),
    onClick: () => onNav?.(l),
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: 14.5,
      color: "var(--text-secondary)",
      textDecoration: "none"
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "bv-desktop-nav",
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "sm",
    style: {
      whiteSpace: "nowrap"
    },
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right",
      style: {
        width: 16,
        height: 16
      }
    })
  }, "Free assessment")), /*#__PURE__*/React.createElement("div", {
    className: "bv-mobile-nav",
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    variant: "ghost",
    "aria-label": "Menu",
    onClick: () => setOpen(!open)
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": open ? "x" : "menu",
    style: {
      width: 22,
      height: 22
    }
  })))), open && /*#__PURE__*/React.createElement("div", {
    className: "bv-mobile-nav",
    style: {
      padding: "0 var(--gutter) 18px",
      display: "flex",
      flexDirection: "column",
      gap: 4
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#" + l.toLowerCase().replace(/\s/g, ""),
    onClick: () => setOpen(false),
    style: {
      padding: "12px 0",
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      color: "var(--text-primary)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, l)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    fullWidth: true
  }, "Get a free assessment"))));
}
function StatusPanel() {
  const rows = [["Microsoft 365", "Operational", "success"], ["Azure Cloud", "Operational", "success"], ["Endpoint security", "Operational", "success"], ["Backup & DR", "Syncing", "warning"], ["Network", "Operational", "success"]];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,.04)",
      border: "1px solid rgba(255,255,255,.12)",
      borderRadius: "var(--radius-xl)",
      padding: "var(--space-6)",
      backdropFilter: "blur(8px)",
      boxShadow: "var(--shadow-xl)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--gold-300)"
    }
  }, "Live monitoring"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: 13,
      color: "rgba(255,255,255,.7)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--success-500)",
      boxShadow: "0 0 0 4px rgba(46,125,87,.25)"
    },
    className: "bv-pulse"
  }), "All systems")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, rows.map(([name, status, tone]) => /*#__PURE__*/React.createElement("div", {
    key: name,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 0",
      borderBottom: "1px solid rgba(255,255,255,.08)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: 14.5,
      color: "rgba(255,255,255,.92)"
    }
  }, name), /*#__PURE__*/React.createElement(Badge, {
    tone: tone
  }, status)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 600,
      fontSize: 26,
      color: "#fff"
    }
  }, "99.98%"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 12,
      color: "rgba(255,255,255,.55)"
    }
  }, "Uptime \xB7 12 mo")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 600,
      fontSize: 26,
      color: "#fff"
    }
  }, "<15", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: "var(--gold-300)"
    }
  }, "min")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 12,
      color: "rgba(255,255,255,.55)"
    }
  }, "Avg response"))));
}
function Hero() {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      position: "relative",
      background: "var(--grad-graphite)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "radial-gradient(rgba(255,255,255,.05) 1px, transparent 1px)",
      backgroundSize: "26px 26px",
      opacity: .6
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -120,
      right: -80,
      width: 460,
      height: 460,
      background: "var(--grad-gold)",
      filter: "blur(120px)",
      opacity: .28,
      borderRadius: "50%"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      maxWidth: 1120,
      margin: "0 auto",
      padding: "clamp(3.5rem,7vw,6rem) var(--gutter)",
      display: "grid",
      gridTemplateColumns: "1.05fr .95fr",
      gap: 56,
      alignItems: "center"
    },
    className: "bv-hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "bv-kicker",
    style: {
      color: "var(--gold-300)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: "var(--gold-400)"
    }
  }), "IT Services \xB7 Singapore"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(2.6rem,5.4vw,4.4rem)",
      lineHeight: 1.04,
      letterSpacing: "-0.025em",
      color: "#fff",
      margin: "18px 0 0"
    }
  }, "Systems that", /*#__PURE__*/React.createElement("br", null), "just ", /*#__PURE__*/React.createElement("span", {
    style: {
      background: "var(--grad-gold-soft)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    }
  }, "work.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-lg)",
      lineHeight: 1.6,
      color: "rgba(255,255,255,.72)",
      margin: "22px 0 0",
      maxWidth: "46ch"
    }
  }, "Bevora is the IT partner that keeps your business running \u2014 managed support, cloud, and security, watched around the clock so you never have to think about it."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 14,
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "arrow-right",
      style: {
        width: 18,
        height: 18
      }
    })
  }, "Book a consultation"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "secondary",
    style: {
      background: "rgba(255,255,255,.06)",
      borderColor: "rgba(255,255,255,.2)",
      color: "#fff"
    },
    iconLeft: /*#__PURE__*/React.createElement("i", {
      "data-lucide": "play",
      style: {
        width: 16,
        height: 16
      }
    })
  }, "See our services")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 28,
      marginTop: 40,
      flexWrap: "wrap"
    }
  }, [["200+", "Clients across SG"], ["24/7", "Monitoring & support"], ["10 yrs", "Keeping teams online"]].map(([v, l]) => /*#__PURE__*/React.createElement("div", {
    key: l
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 600,
      fontSize: 22,
      color: "var(--gold-300)"
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      color: "rgba(255,255,255,.55)"
    }
  }, l))))), /*#__PURE__*/React.createElement(StatusPanel, null)));
}
Object.assign(window, {
  Logo,
  Header,
  Hero,
  StatusPanel
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/header-hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections.jsx
try { (() => {
/* Bevora website — Trust, Services, Stats, Why. */
const {
  SectionHeading,
  ServiceCard,
  Stat
} = window.BevoraDesignSystem_cc741a;
function TrustBar() {
  const names = ["Meridian Group", "Sapphire Health", "Northwind Logistics", "Orchard Retail", "Vantage Legal"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderBottom: "1px solid var(--border-subtle)",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "26px var(--gutter)",
      display: "flex",
      alignItems: "center",
      gap: 32,
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-tertiary)"
    }
  }, "Trusted by teams across Singapore"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 30,
      flexWrap: "wrap"
    }
  }, names.map(n => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 16,
      color: "var(--neutral-300)",
      letterSpacing: "-0.01em"
    }
  }, n)))));
}
function Services() {
  const items = [["life-buoy", "Managed IT support", "A responsive help desk and on-site team that fixes issues — often before you notice them."], ["cloud", "Cloud & migration", "Move to Microsoft 365 and Azure with zero downtime and a plan that fits your budget."], ["shield-check", "Cybersecurity", "Endpoint hardening, real-time threat monitoring and a rapid response when it matters."], ["database-backup", "Backup & disaster recovery", "Automated, tested backups so a bad day never becomes a lost week."], ["network", "Network & infrastructure", "Design, install and maintain the wired and wireless backbone your office runs on."], ["cpu", "IT consulting", "Senior engineers who plan your roadmap and right-size every investment."]];
  return /*#__PURE__*/React.createElement("section", {
    id: "services",
    style: {
      padding: "var(--section-y) 0",
      background: "var(--bg-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "0 var(--gutter)"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    kicker: "What we do",
    title: "One partner for everything IT",
    subtitle: "From the help desk to the data centre, Bevora runs the technology so your team can run the business.",
    align: "center"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 20,
      marginTop: 48
    },
    className: "bv-svc-grid"
  }, items.map(([icon, title, body]) => /*#__PURE__*/React.createElement(ServiceCard, {
    key: title,
    icon: icon,
    title: title,
    href: "#",
    linkLabel: "Learn more"
  }, body)))));
}
function StatsBand() {
  const stats = [["99.98%", "Uptime", "Across managed infrastructure"], ["<15min", "Response", "Average ticket first-response"], ["200+", "Clients", "Served across Singapore"], ["24/7", "Coverage", "Monitoring, every day"]];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--grad-graphite)",
      padding: "var(--section-y) 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "0 var(--gutter)",
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 28
    },
    className: "bv-stats-grid"
  }, stats.map(([v, l, c]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 600,
      fontSize: "clamp(2.2rem,4vw,3rem)",
      lineHeight: 1,
      letterSpacing: "-0.02em",
      color: "#fff"
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 13,
      letterSpacing: ".09em",
      textTransform: "uppercase",
      color: "var(--gold-300)"
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 13.5,
      color: "rgba(255,255,255,.55)"
    }
  }, c)))));
}
function WhyBevora() {
  const points = [["Fixed monthly pricing", "No surprise invoices — one predictable fee that covers your whole stack."], ["A team that knows you", "A named engineer who understands your setup, not a different voice every call."], ["Security built in", "Every plan includes monitoring, patching and backups as standard."], ["Singapore-based, on-site ready", "Remote-first support backed by engineers who can be at your door."]];
  return /*#__PURE__*/React.createElement("section", {
    id: "whybevora",
    style: {
      padding: "var(--section-y) 0",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1120,
      margin: "0 auto",
      padding: "0 var(--gutter)",
      display: "grid",
      gridTemplateColumns: ".9fr 1.1fr",
      gap: 56,
      alignItems: "center"
    },
    className: "bv-why-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    kicker: "Why Bevora",
    title: "The dependable choice for growing teams",
    subtitle: "We earn trust the boring way: by being there, being clear, and keeping things running."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 18,
      marginTop: 32
    }
  }, points.map(([t, d]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: "0 0 28px",
      width: 28,
      height: 28,
      borderRadius: "var(--radius-circle)",
      background: "var(--gold-50)",
      border: "1px solid var(--gold-200)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--gold-700)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "check",
    style: {
      width: 16,
      height: 16
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontWeight: 700,
      fontSize: 16,
      color: "var(--text-primary)"
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 14.5,
      lineHeight: 1.55,
      color: "var(--text-secondary)",
      marginTop: 2
    }
  }, d)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--grad-gold)",
      borderRadius: "var(--radius-2xl)",
      padding: 2,
      boxShadow: "var(--shadow-lg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-graphite)",
      borderRadius: "calc(var(--radius-2xl) - 2px)",
      padding: "var(--space-10)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 18,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/bevora-mascot.svg",
    alt: "Bevora beaver mascot",
    style: {
      width: 132,
      height: 132
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 700,
      fontSize: 22,
      color: "#fff"
    }
  }, "Industrious by nature"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      lineHeight: 1.6,
      color: "rgba(255,255,255,.7)",
      maxWidth: "34ch"
    }
  }, "Like our mascot, we build things that last and keep them in good repair. That's the whole job."))))));
}
Object.assign(window, {
  TrustBar,
  Services,
  StatsBand,
  WhyBevora
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

})();
