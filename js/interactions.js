const processText = {
  weathering: "風化：岩石在原地慢慢裂開，變成較小碎塊。",
  erosion: "侵蝕：水流把坡面或河岸材料帶走，地形被切割。",
  deposition: "堆積：水流變慢，泥沙留下來，形成沙洲或平坦地。"
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

  document.querySelectorAll("[data-process]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-process]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      sediment.innerHTML = "";
      if (button.dataset.process === "weathering") {
        hill.setAttribute("d", "M0 205 C94 174 132 100 214 132 C250 112 300 148 332 150 C390 152 420 188 540 176 L540 260 L0 260Z");
        addPebbles(sediment, 7, "#6f7257");
      }
      if (button.dataset.process === "erosion") {
        hill.setAttribute("d", "M0 205 C105 168 150 92 236 122 C292 140 304 202 338 214 C392 236 444 188 540 176 L540 260 L0 260Z");
        addPebbles(sediment, 12, "#9a714f");
      }
      if (button.dataset.process === "deposition") {
        hill.setAttribute("d", "M0 205 C105 168 152 92 242 122 C318 146 354 196 540 176 L540 260 L0 260Z");
        addDelta(sediment);
      }
      feedback.textContent = processText[button.dataset.process];
    });
  });

  document.querySelector("[data-reset-process]").addEventListener("click", () => {
    document.querySelectorAll("[data-process]").forEach((item) => item.classList.remove("active"));
    hill.setAttribute("d", "M0 205 C105 168 152 92 242 122 C318 146 354 196 540 176 L540 260 L0 260Z");
    sediment.innerHTML = "";
    feedback.textContent = "請選擇一種作用。";
  });
}

function addPebbles(group, count, color) {
  for (let i = 0; i < count; i += 1) {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", String(170 + i * 22));
    c.setAttribute("cy", String(180 + (i % 3) * 17));
    c.setAttribute("r", String(5 + (i % 2) * 3));
    c.setAttribute("fill", color);
    group.append(c);
  }
}

function addDelta(group) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", "M210 230 C248 214 296 214 338 232 C304 248 252 252 210 230Z");
  path.setAttribute("fill", "#d8b36d");
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
  const play = () => {
    sim.classList.add("playing");
    sim.style.setProperty("--speed", speed.value);
    sim.querySelectorAll(".wave").forEach((wave) => {
      wave.style.animationDuration = `${2.4 / Number(speed.value)}s`;
    });
    feedback.textContent = "板塊互相推擠，能量釋放後震波向外傳開。";
  };
  document.querySelector("[data-play]").addEventListener("click", play);
  document.querySelector("[data-pause]").addEventListener("click", () => {
    sim.classList.remove("playing");
    feedback.textContent = "已暫停。";
  });
  document.querySelector("[data-replay]").addEventListener("click", () => {
    sim.classList.remove("playing");
    requestAnimationFrame(play);
  });
}
