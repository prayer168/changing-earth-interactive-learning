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
      <h3>${item.title}</h3>
      <p><strong>${item.keyword}</strong></p>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function renderApplications(applications) {
  const root = document.querySelector("#applications");
  root.innerHTML = applications.map((item) => `
    <article class="app-card">
      <h3>${item.title}</h3>
      <p><strong>對應原理：</strong>${item.principle}</p>
      <p>${item.text}</p>
      <p><strong>想一想：</strong>${item.question}</p>
    </article>
  `).join("");
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
