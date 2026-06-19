import { setupNavigation } from "./navigation.js";
import { setupProgress } from "./progress.js";
import { setupInteractions } from "./interactions.js";
import { setupQuiz } from "./quiz.js";

const content = await fetch("./data/content.json").then((res) => res.json());
const resources = await fetch("./data/resources.json").then((res) => res.json());
const progress = setupProgress();

setupNavigation(content.tabs, (index, total) => progress.visit(index, total));
renderConcepts(content.concepts);
renderApplications(content.applications);
renderResources(resources);
setupInteractions();
setupQuiz();

function renderConcepts(concepts) {
  const root = document.querySelector("#concepts");
  root.innerHTML = concepts.map((item) => `
    <article class="concept-card">
      ${conceptVisual(item.visual)}
      <h3>${item.title}</h3>
      <p><strong>${item.keyword}</strong></p>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function conceptVisual(type) {
  const visuals = {
    landforms: `
      <svg class="concept-visual landform-visual" viewBox="0 0 360 150" role="img" aria-label="山地、河流、平原與海岸地形小動畫">
        <rect width="360" height="150" fill="#dff4fb" />
        <path d="M0 92 L74 34 L130 84 L186 42 L254 102 L360 76 L360 150 L0 150Z" fill="#86a26d" />
        <path d="M0 126 C56 114 100 128 154 116 C216 102 268 124 360 104 L360 150 L0 150Z" fill="#d8b36d" />
        <path class="water-flow" d="M184 52 C174 84 204 92 194 118 C188 132 168 140 150 150" fill="none" stroke="#2f81bd" stroke-width="14" stroke-linecap="round" />
        <circle class="place-dot a" cx="76" cy="86" r="5" />
        <circle class="place-dot b" cx="216" cy="114" r="5" />
        <circle class="place-dot c" cx="292" cy="106" r="5" />
      </svg>`,
    surfaceChange: `
      <svg class="concept-visual surface-change-visual" viewBox="0 0 360 150" role="img" aria-label="風化侵蝕搬運堆積流程小動畫">
        <rect width="360" height="150" fill="#eef7fb" />
        <path d="M0 112 C70 92 102 42 166 70 C228 96 274 118 360 96 L360 150 L0 150Z" fill="#8fa874" />
        <path class="crack-line" d="M104 66 l10 22 l14 -28 l14 34" fill="none" stroke="#493f37" stroke-width="4" />
        <path class="water-flow" d="M170 62 C160 92 198 98 190 126 C184 140 164 144 146 150" fill="none" stroke="#2f81bd" stroke-width="13" stroke-linecap="round" />
        <path class="transport-line" d="M190 104 C224 112 244 122 274 130" fill="none" stroke="#9a714f" stroke-width="6" stroke-dasharray="8 8" />
        <path class="sand-body" d="M246 130 C276 112 316 116 342 132 C308 146 274 146 246 130Z" fill="#d8b36d" />
        <circle class="sand-dot a" cx="116" cy="100" r="5" />
        <circle class="sand-dot b" cx="214" cy="112" r="5" />
        <circle class="sand-dot c" cx="292" cy="130" r="4" />
      </svg>`,
    hazardRisk: `
      <svg class="concept-visual hazard-visual" viewBox="0 0 360 150" role="img" aria-label="地震山崩土石流與淹水風險小動畫">
        <rect width="360" height="150" fill="#eef7fb" />
        <path d="M0 140 L116 40 L222 150 L0 150Z" fill="#8fa874" />
        <path class="debris-channel" d="M118 56 C136 82 158 102 190 130" fill="none" stroke="#8b6b45" stroke-width="14" stroke-linecap="round" />
        <path class="shake-mark left" d="M236 48 l12 -16 l8 20 l12 -16" />
        <path class="flood-line" d="M220 124 C252 108 300 128 360 110" fill="none" stroke="#2f81bd" stroke-width="14" stroke-linecap="round" />
        <rect x="258" y="96" width="42" height="30" fill="#d6b06d" stroke="#8b6b45" />
        <circle class="debris one" cx="126" cy="62" r="5" />
        <circle class="debris two" cx="152" cy="96" r="6" />
        <circle class="debris three" cx="184" cy="126" r="5" />
      </svg>`
  };
  return visuals[type] || "";
}

function renderApplications(applications) {
  const root = document.querySelector("#applications");
  root.innerHTML = applications.map((item) => `
    <article class="app-card">
      ${applicationVisual(item.visual)}
      <h3>${item.title}</h3>
      <p><strong>對應原理：</strong>${item.principle}</p>
      <p>${item.text}</p>
      <p><strong>想一想：</strong>${item.question}</p>
    </article>
  `).join("");
}

function applicationVisual(type) {
  const visuals = {
    riverBend: `
      <svg class="app-visual river-bend" viewBox="0 0 360 180" role="img" aria-label="河川彎道外側被侵蝕的小動畫">
        <rect width="360" height="180" fill="#e7f4f7" />
        <path d="M0 132 C54 106 92 78 138 72 C204 64 222 110 268 118 C300 124 326 116 360 104 L360 180 L0 180Z" fill="#8fa874" />
        <path d="M0 88 C48 78 84 56 128 48 C196 36 230 88 278 92 C306 94 334 86 360 78" fill="none" stroke="#2f81bd" stroke-width="34" stroke-linecap="round" />
        <path class="water-flow" d="M8 86 C58 76 92 58 132 52 C194 44 226 92 278 96 C306 98 330 90 352 82" fill="none" stroke="#6bb4da" stroke-width="10" stroke-linecap="round" />
        <path class="fast-bank" d="M216 72 C238 86 252 104 260 130" fill="none" stroke="#b94b43" stroke-width="8" stroke-linecap="round" />
        <path d="M214 130 C236 136 250 136 268 128" fill="none" stroke="#d8b36d" stroke-width="10" stroke-linecap="round" />
        <circle class="sand-dot a" cx="246" cy="104" r="5" />
        <circle class="sand-dot b" cx="276" cy="96" r="4" />
        <circle class="sand-dot c" cx="306" cy="88" r="4" />
      </svg>`,
    sandbar: `
      <svg class="app-visual sandbar" viewBox="0 0 360 180" role="img" aria-label="海浪搬運沙粒形成沙洲的小動畫">
        <rect width="360" height="180" fill="#dff4fb" />
        <path d="M0 104 C48 92 88 104 130 96 C196 84 248 104 360 86 L360 180 L0 180Z" fill="#2f81bd" opacity="0.72" />
        <path class="wave-line" d="M18 88 C52 76 86 100 120 88 C154 76 188 100 222 88 C256 76 292 100 342 88" fill="none" stroke="#f8fbf6" stroke-width="5" />
        <path class="wave-line soft" d="M18 118 C58 104 96 128 136 116 C176 104 216 126 256 116 C294 106 318 112 344 104" fill="none" stroke="#f8fbf6" stroke-width="4" opacity="0.75" />
        <path class="sand-body" d="M104 132 C150 106 232 106 292 132 C236 154 156 154 104 132Z" fill="#d8b36d" />
        <path d="M130 132 C174 124 218 124 262 132" fill="none" stroke="#c49655" stroke-width="4" stroke-linecap="round" />
        <circle class="sand-dot a" cx="126" cy="128" r="4" />
        <circle class="sand-dot b" cx="178" cy="120" r="4" />
        <circle class="sand-dot c" cx="238" cy="124" r="4" />
      </svg>`,
    rockfall: `
      <svg class="app-visual rockfall" viewBox="0 0 360 180" role="img" aria-label="岩石裂縫鬆動後落石的小動畫">
        <rect width="360" height="180" fill="#eef7fb" />
        <path d="M16 164 L138 44 L252 164Z" fill="#8fa874" />
        <path d="M122 56 l14 34 l18 -42 l16 48" fill="none" stroke="#493f37" stroke-width="5" stroke-linecap="round" />
        <path d="M156 78 C188 96 212 122 230 150" fill="none" stroke="#17544d" stroke-width="4" stroke-dasharray="8 8" />
        <circle class="fall-rock one" cx="158" cy="78" r="10" />
        <circle class="fall-rock two" cx="202" cy="118" r="9" />
        <circle class="fall-rock three" cx="230" cy="146" r="7" />
        <rect x="244" y="136" width="88" height="16" fill="#6a6258" />
        <path d="M248 152 L328 152" stroke="#f8fbf6" stroke-width="3" stroke-dasharray="10 9" />
      </svg>`,
    muddyStream: `
      <svg class="app-visual muddy-stream" viewBox="0 0 360 180" role="img" aria-label="豪雨後泥沙進入溪流的小動畫">
        <rect width="360" height="180" fill="#dceff8" />
        <path d="M0 140 C58 112 96 88 150 92 C220 98 262 128 360 108 L360 180 L0 180Z" fill="#83a36e" />
        <path d="M0 158 C68 142 122 138 178 146 C244 156 300 154 360 134 L360 180 L0 180Z" fill="#d8c48a" opacity="0.45" />
        <path class="rain rain-a" d="M62 22 l-14 28" />
        <path class="rain rain-b" d="M132 14 l-14 28" />
        <path class="rain rain-c" d="M214 24 l-14 28" />
        <path class="rain rain-d" d="M292 18 l-14 28" />
        <path class="mud-flow" d="M28 130 C92 106 132 110 184 120 C240 130 284 130 334 112" fill="none" stroke="#8b6b45" stroke-width="22" stroke-linecap="round" />
        <path class="water-flow" d="M40 128 C102 108 136 112 184 122 C238 132 282 130 326 116" fill="none" stroke="#6e95a5" stroke-width="7" stroke-linecap="round" opacity="0.75" />
        <circle class="sand-dot a" cx="116" cy="112" r="5" />
        <circle class="sand-dot b" cx="184" cy="120" r="5" />
        <circle class="sand-dot c" cx="252" cy="124" r="4" />
      </svg>`,
    earthquakeSafety: `
      <svg class="app-visual earthquake-safety" viewBox="0 0 360 180" role="img" aria-label="地震時趴下掩護穩住的小動畫">
        <rect width="360" height="180" fill="#f4f8fb" />
        <path class="shake-mark left" d="M54 54 l14 -18 l10 22 l14 -18" />
        <path class="shake-mark right" d="M270 54 l14 -18 l10 22 l14 -18" />
        <rect x="96" y="142" width="168" height="8" fill="#c8d7d1" />
        <rect class="desk" x="104" y="76" width="152" height="18" rx="4" />
        <rect class="desk" x="116" y="94" width="14" height="48" />
        <rect class="desk" x="232" y="94" width="14" height="48" />
        <circle cx="172" cy="116" r="13" fill="#f2c18d" />
        <path d="M146 132 C170 114 204 116 226 134" fill="none" stroke="#17544d" stroke-width="10" stroke-linecap="round" />
        <path d="M142 128 L126 142 M220 130 L242 142" stroke="#17544d" stroke-width="6" stroke-linecap="round" />
        <path class="quake" d="M100 152 C134 146 168 158 202 152 C236 146 270 158 304 152" fill="none" stroke="#b94b43" stroke-width="4" opacity="0.55" />
      </svg>`,
    debrisFlow: `
      <svg class="app-visual debris-flow" viewBox="0 0 360 180" role="img" aria-label="坡地土石流沿溪溝向下的小動畫">
        <rect width="360" height="180" fill="#e7f4f7" />
        <path d="M16 164 L148 42 L280 164Z" fill="#8fa874" />
        <path d="M146 54 C162 84 190 106 226 146" fill="none" stroke="#5c7256" stroke-width="26" stroke-linecap="round" opacity="0.6" />
        <path class="debris-channel" d="M146 56 C164 86 190 108 226 146" fill="none" stroke="#8b6b45" stroke-width="17" stroke-linecap="round" />
        <circle class="debris one" cx="150" cy="64" r="6" />
        <circle class="debris two" cx="180" cy="98" r="7" />
        <circle class="debris three" cx="220" cy="136" r="6" />
        <rect x="250" y="132" width="62" height="32" fill="#d6b06d" stroke="#8b6b45" />
        <path d="M250 132 L281 110 L312 132Z" fill="#b94b43" stroke="#8b6b45" />
      </svg>`
  };
  return visuals[type] || "";
}

function renderResources(resources) {
  const root = document.querySelector("#resources");
  root.innerHTML = resources.map((item) => `
    <article class="resource-item">
      <a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.title}</a>
      <p>${item.type}｜${item.grade}｜檢核日期：${item.checkedAt}</p>
      <p>${item.description}</p>
    </article>
  `).join("");
}
