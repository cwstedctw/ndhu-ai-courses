// tweaks.jsx — Tweaks 面板：配色、字體、流水濃淡。寫進 :root 的 CSS 變數。
const { useEffect } = React;

const PALETTES = /*EDITMODE-BEGIN*/{
  "洄瀾（預設）": ["#0E7C7B", "#0a5a59", "#D9A441", "#F4ECD8", "#FFFDF7", "#1A1A1A"],
  "深潭":        ["#0B5E5D", "#073f3e", "#C28F36", "#F6F1E3", "#FFFDF6", "#171717"],
  "晨霧":        ["#2A8C8A", "#1c6463", "#E0B45A", "#FAF6EC", "#FFFFFF", "#222019"]
}/*EDITMODE-END*/;

const FONTS = {
  "圓潤黑體":   '"Noto Sans TC", system-ui, sans-serif',
  "人文襯線":   '"Noto Serif TC", "Noto Sans TC", serif',
  "黑體＋襯線": 'mix'
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "洄瀾（預設）",
  "font": "圓潤黑體",
  "water": 0.55,
  "radius": 22
}/*EDITMODE-END*/;

function applyVars(t) {
  const root = document.documentElement.style;
  const p = PALETTES[t.palette] || PALETTES["洄瀾（預設）"];
  root.setProperty("--teal", p[0]);
  root.setProperty("--teal-deep", p[1]);
  root.setProperty("--gold", p[2]);
  root.setProperty("--cream", p[3]);
  root.setProperty("--card", p[4]);
  root.setProperty("--ink", p[5]);
  root.setProperty("--water", String(t.water));
  root.setProperty("--radius", t.radius + "px");

  if (t.font === "黑體＋襯線") {
    root.setProperty("--font-body", '"Noto Sans TC", system-ui, sans-serif');
    root.setProperty("--font-head", '"Noto Serif TC", "Noto Sans TC", serif');
  } else {
    const f = FONTS[t.font] || FONTS["圓潤黑體"];
    root.setProperty("--font-body", f);
    root.setProperty("--font-head", f);
  }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => { applyVars(t); }, [t]);

  return (
    <TweaksPanel title="調整外觀">
      <TweakSection label="配色" />
      <TweakColor
        label="主題色盤"
        value={PALETTES[t.palette]}
        options={Object.values(PALETTES)}
        onChange={(arr) => {
          const name = Object.keys(PALETTES).find(k => PALETTES[k].join() === arr.join());
          setTweak("palette", name || "洄瀾（預設）");
        }}
      />

      <TweakSection label="字體" />
      <TweakRadio
        label="字體風格"
        value={t.font}
        options={Object.keys(FONTS)}
        onChange={(v) => setTweak("font", v)}
      />

      <TweakSection label="質感" />
      <TweakSlider
        label="流水濃淡"
        value={t.water} min={0} max={1} step={0.05}
        onChange={(v) => setTweak("water", v)}
      />
      <TweakSlider
        label="圓角"
        value={t.radius} min={6} max={32} step={2} unit="px"
        onChange={(v) => setTweak("radius", v)}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<App />);
