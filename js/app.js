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
      <svg class="app-visual river-bend" viewBox="0 0 360 150" role="img" aria-label="河川彎道外側被侵蝕的小動畫">
        <rect width="360" height="150" fill="#e7f4f7" />
        <path d="M0 118 C88 92 82 34 164 34 C238 34 236 122 360 98 L360 150 L0 150Z" fill="#8fa874" />
        <path class="water-flow" d="M0 106 C86 76 94 50 162 54 C224 58 238 102 360 82" fill="none" stroke="#2f81bd" stroke-width="22" stroke-linecap="round" />
        <path class="fast-bank" d="M204 58 C232 72 242 94 250 116" fill="none" stroke="#b94b43" stroke-width="7" stroke-linecap="round" />
        <circle class="sand-dot a" cx="250" cy="104" r="5" />
        <circle class="sand-dot b" cx="278" cy="96" r="4" />
        <circle class="sand-dot c" cx="306" cy="88" r="4" />
      </svg>`,
    sandbar: `
      <svg class="app-visual sandbar" viewBox="0 0 360 150" role="img" aria-label="海浪搬運沙粒形成沙洲的小動畫">
        <rect width="360" height="150" fill="#dff4fb" />
        <path d="M0 104 C58 88 94 100 142 92 C210 80 260 104 360 86 L360 150 L0 150Z" fill="#2f81bd" opacity="0.68" />
        <path class="wave-line" d="M20 94 C58 80 96 108 134 94 C172 80 210 108 248 94 C286 80 324 108 360 94" fill="none" stroke="#f8fbf6" stroke-width="5" />
        <path class="sand-body" d="M120 118 C170 96 236 96 292 120 C238 140 170 140 120 118Z" fill="#d8b36d" />
        <circle class="sand-dot a" cx="132" cy="116" r="4" />
        <circle class="sand-dot b" cx="178" cy="110" r="4" />
        <circle class="sand-dot c" cx="232" cy="112" r="4" />
      </svg>`,
    rockfall: `
      <svg class="app-visual rockfall" viewBox="0 0 360 150" role="img" aria-label="岩石裂縫鬆動後落石的小動畫">
        <rect width="360" height="150" fill="#eef7fb" />
        <path d="M0 138 L122 42 L226 150 L0 150Z" fill="#8fa874" />
        <path d="M116 52 l12 28 l18 -36 l14 42" fill="none" stroke="#493f37" stroke-width="5" />
        <path d="M164 78 C190 92 208 112 218 136" fill="none" stroke="#17544d" stroke-width="4" stroke-dasharray="8 8" />
        <circle class="fall-rock one" cx="162" cy="76" r="10" />
        <circle class="fall-rock two" cx="196" cy="112" r="8" />
        <rect x="236" y="112" width="94" height="14" fill="#6a6258" />
      </svg>`,
    muddyStream: `
      <svg class="app-visual muddy-stream" viewBox="0 0 360 150" role="img" aria-label="豪雨後泥沙進入溪流的小動畫">
        <rect width="360" height="150" fill="#dceff8" />
        <path d="M0 120 C80 92 98 70 170 78 C240 86 278 116 360 96 L360 150 L0 150Z" fill="#83a36e" />
        <path class="rain rain-a" d="M70 20 l-14 28" />
        <path class="rain rain-b" d="M142 12 l-14 28" />
        <path class="rain rain-c" d="M220 20 l-14 28" />
        <path class="mud-flow" d="M20 112 C96 88 128 90 176 98 C236 108 284 112 340 94" fill="none" stroke="#8b6b45" stroke-width="20" stroke-linecap="round" />
        <circle class="sand-dot a" cx="124" cy="96" r="5" />
        <circle class="sand-dot b" cx="188" cy="100" r="5" />
        <circle class="sand-dot c" cx="250" cy="106" r="4" />
      </svg>`,
    earthquakeSafety: `
      <svg class="app-visual earthquake-safety" viewBox="0 0 360 150" role="img" aria-label="地震時趴下掩護穩住的小動畫">
        <rect width="360" height="150" fill="#f4f8fb" />
        <rect class="desk" x="118" y="72" width="126" height="16" rx="4" />
        <rect class="desk" x="128" y="88" width="12" height="42" />
        <rect class="desk" x="222" y="88" width="12" height="42" />
        <circle cx="178" cy="104" r="13" fill="#f2c18d" />
        <path d="M160 118 C182 106 206 108 222 124" fill="none" stroke="#17544d" stroke-width="9" stroke-linecap="round" />
        <path class="shake-mark left" d="M84 50 l14 -18 l10 22 l14 -18" />
        <path class="shake-mark right" d="M272 54 l14 -18 l10 22 l14 -18" />
      </svg>`,
    debrisFlow: `
      <svg class="app-visual debris-flow" viewBox="0 0 360 150" role="img" aria-label="坡地土石流沿溪溝向下的小動畫">
        <rect width="360" height="150" fill="#e7f4f7" />
        <path d="M0 140 L138 34 L270 150 L0 150Z" fill="#8fa874" />
        <path class="debris-channel" d="M128 48 C146 78 172 92 198 124" fill="none" stroke="#8b6b45" stroke-width="18" stroke-linecap="round" />
        <circle class="debris one" cx="132" cy="56" r="6" />
        <circle class="debris two" cx="162" cy="86" r="7" />
        <circle class="debris three" cx="198" cy="122" r="6" />
        <rect x="232" y="112" width="70" height="28" fill="#d6b06d" stroke="#8b6b45" />
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
