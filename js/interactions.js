const processText = {
  weathering: "風化：岩石在原地受到陽光、雨水與植物根影響而裂開，位置沒有先被搬走。",
  erosion: "侵蝕與搬運：水流速度變快時切割坡面，並把泥沙沿河道帶往下游。",
  deposition: "堆積：水流到低平處速度變慢，搬不動的泥沙就留下來，形成沙洲或平坦地。"
};

const evidenceText = {
  base: [
    "觀察地形分成上游坡面、中游河岸、下游平原。",
    "看水流箭頭，判斷材料可能往哪裡移動。",
    "比較材料是留在原地、被帶走，或在低處留下。"
  ],
  weathering: [
    "裂縫出現在上游坡面岩層，不是河道裡。",
    "植物根和日曬雨淋讓岩石變碎，碎石仍留在坡腳附近。",
    "重點判斷：岩石先被破壞，還沒有被水流搬遠。"
  ],
  erosion: [
    "中游彎道外側標成紅色，代表水流較容易沖刷凹岸。",
    "咖啡色虛線沿河道移動，表示泥沙被搬運往下游。",
    "重點判斷：地形被削深，材料位置改變。"
  ],
  deposition: [
    "下游地勢變平，水流速度降低。",
    "粗細不同的泥沙留在河口附近，形成沙洲或沖積扇。",
    "重點判斷：材料停止移動並累積成新的地形。"
  ]
};

const matches = [
  { id: "quake", scene: "教室突然劇烈搖晃，櫃子可能倒下。", answer: "地震" },
  { id: "debris", scene: "山區連日豪雨，溪水混著大量泥沙。", answer: "土石流" },
  { id: "landslide", scene: "山坡上出現裂縫，路邊有新落石。", answer: "山崩" }
];

export function setupInteractions() {
  setupProcess();
  setupMatch();
  setupSimulation();
}

function setupProcess() {
  const hill = document.querySelector("#hillShape");
  const sediment = document.querySelector("#sediment");
  const feedback = document.querySelector("#processFeedback");
  const evidence = document.querySelector("#evidenceList");
  const layers = [...document.querySelectorAll(".process-layer")];

  const terrain = {
    base: "M0 318 C95 284 160 220 245 166 C315 122 395 92 485 118 C594 150 638 226 728 254 C790 274 836 272 900 258 L900 420 L0 420Z",
    weathering: "M0 318 C95 284 160 220 245 166 C302 132 374 102 436 112 C468 116 478 136 504 146 C602 184 650 230 728 254 C790 274 836 272 900 258 L900 420 L0 420Z",
    erosion: "M0 318 C95 284 160 220 245 166 C315 122 395 92 485 118 C574 146 610 222 684 260 C758 298 836 276 900 258 L900 420 L0 420Z",
    deposition: "M0 318 C95 284 160 220 245 166 C315 122 395 92 485 118 C594 150 638 226 728 254 C790 274 836 272 900 258 L900 420 L0 420Z"
  };

  function showLayer(name) {
    layers.forEach((layer) => {
      const visible = layer.dataset.layer === "base" || layer.dataset.layer === name;
      layer.classList.toggle("hidden", !visible);
    });
    const items = evidenceText[name || "base"];
    evidence.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
  }

  document.querySelectorAll("[data-process]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-process]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      sediment.innerHTML = "";
      showLayer(button.dataset.process);
      if (button.dataset.process === "weathering") {
        hill.setAttribute("d", terrain.weathering);
        addPebbles(sediment, 8, "#6f7257", 292, 250);
      }
      if (button.dataset.process === "erosion") {
        hill.setAttribute("d", terrain.erosion);
        addMovingSediment(sediment);
      }
      if (button.dataset.process === "deposition") {
        hill.setAttribute("d", terrain.deposition);
        addDelta(sediment);
      }
      feedback.textContent = processText[button.dataset.process];
    });
  });

  document.querySelector("[data-reset-process]").addEventListener("click", () => {
    document.querySelectorAll("[data-process]").forEach((item) => item.classList.remove("active"));
    hill.setAttribute("d", terrain.base);
    sediment.innerHTML = "";
    showLayer("");
    feedback.textContent = "請選擇一種作用。";
  });

  showLayer("");
}

function addPebbles(group, count, color, startX, startY) {
  for (let i = 0; i < count; i += 1) {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", String(startX + i * 24));
    c.setAttribute("cy", String(startY + (i % 3) * 18));
    c.setAttribute("r", String(6 + (i % 2) * 4));
    c.setAttribute("fill", color);
    group.append(c);
  }
}

function addMovingSediment(group) {
  const points = [
    [438, 220, 7],
    [466, 250, 6],
    [392, 326, 7],
    [300, 352, 5],
    [226, 370, 5]
  ];
  points.forEach(([cx, cy, r]) => {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", String(cx));
    c.setAttribute("cy", String(cy));
    c.setAttribute("r", String(r));
    c.setAttribute("fill", "#9a714f");
    group.append(c);
  });
}

function addDelta(group) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M86 360 C150 326 234 326 308 354 C252 388 152 396 86 360Z");
  path.setAttribute("fill", "#d8b36d");
  path.setAttribute("stroke", "#bf9254");
  path.setAttribute("stroke-width", "3");
  group.append(path);
}

function setupMatch() {
  const root = document.querySelector("#matchGame");
  const feedback = document.querySelector("#matchFeedback");
  let selected = null;

  function render() {
    root.innerHTML = `<div class="match-column" id="scenes"></div><div class="match-column" id="targets"></div>`;
    const scenes = root.querySelector("#scenes");
    const targets = root.querySelector("#targets");
    matches.forEach((item) => {
      const scene = document.createElement("button");
      scene.className = "match-item";
      scene.draggable = true;
      scene.textContent = item.scene;
      scene.dataset.id = item.id;
      scene.addEventListener("click", () => {
        selected = item.id;
        root.querySelectorAll(".match-item").forEach((el) => el.classList.toggle("selected", el.dataset.id === selected));
      });
      scene.addEventListener("dragstart", (event) => event.dataTransfer.setData("text/plain", item.id));
      scenes.append(scene);
    });
    ["地震", "土石流", "山崩"].forEach((answer) => {
      const target = document.createElement("button");
      target.className = "drop-target";
      target.textContent = answer;
      target.dataset.answer = answer;
      target.addEventListener("dragover", (event) => event.preventDefault());
      target.addEventListener("drop", (event) => check(event.dataTransfer.getData("text/plain"), target));
      target.addEventListener("click", () => selected && check(selected, target));
      targets.append(target);
    });
    feedback.textContent = "";
  }

  function check(id, target) {
    const item = matches.find((match) => match.id === id);
    const ok = item.answer === target.dataset.answer;
    target.classList.toggle("correct", ok);
    target.classList.toggle("wrong", !ok);
    feedback.textContent = ok ? `答對了：${item.scene} 需要注意${item.answer}。` : "再想想：觀察情境裡的關鍵線索。";
    selected = null;
    root.querySelectorAll(".match-item").forEach((el) => el.classList.remove("selected"));
  }

  document.querySelector("[data-reset-match]").addEventListener("click", render);
  render();
}

function setupSimulation() {
  const sim = document.querySelector(".plate-sim");
  const feedback = document.querySelector("#simFeedback");
  const speed = document.querySelector("#speedRange");
  const steps = [...document.querySelectorAll(".sim-steps li")];
  let stepTimer = null;

  function setStep(index) {
    steps.forEach((step, stepIndex) => step.classList.toggle("active", stepIndex === index));
  }

  function runSteps() {
    clearInterval(stepTimer);
    let index = 0;
    setStep(index);
    const interval = 750 / Number(speed.value);
    stepTimer = setInterval(() => {
      index = (index + 1) % steps.length;
      setStep(index);
    }, interval);
  }

  const play = () => {
    sim.classList.add("playing");
    sim.style.setProperty("--speed", speed.value);
    sim.querySelectorAll(".wave").forEach((wave) => {
      wave.style.animationDuration = `${2.4 / Number(speed.value)}s`;
    });
    runSteps();
    feedback.textContent = "板塊互相推擠，能量釋放後震波向外傳開。";
  };
  document.querySelector("[data-play]").addEventListener("click", play);
  document.querySelector("[data-pause]").addEventListener("click", () => {
    sim.classList.remove("playing");
    clearInterval(stepTimer);
    feedback.textContent = "已暫停。";
  });
  document.querySelector("[data-replay]").addEventListener("click", () => {
    sim.classList.remove("playing");
    clearInterval(stepTimer);
    setStep(0);
    requestAnimationFrame(play);
  });

  setStep(0);
}
