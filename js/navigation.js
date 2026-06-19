export function setupNavigation(tabs, onChange) {
  const tabList = document.querySelector(".tabs");
  const panels = [...document.querySelectorAll(".panel")];
  let current = 0;

  tabs.forEach((tab, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.role = "tab";
    button.textContent = tab.label;
    button.dataset.target = tab.id;
    button.addEventListener("click", () => show(index));
    tabList.append(button);
  });

  const buttons = [...tabList.querySelectorAll("button")];

  function show(index) {
    current = Math.max(0, Math.min(index, tabs.length - 1));
    buttons.forEach((button, i) => button.setAttribute("aria-selected", String(i === current)));
    panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === tabs[current].id));
    document.querySelector("#pageStatus").textContent = `${current + 1} / ${tabs.length}`;
    onChange(current, tabs.length);
  }

  document.querySelector("[data-prev]").addEventListener("click", () => show(current - 1));
  document.querySelector("[data-next]").addEventListener("click", () => show(current + 1));
  document.querySelector("[data-start]").addEventListener("click", () => show(1));

  show(0);
  return { show };
}
