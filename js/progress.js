const KEY = "changing-earth-progress";

export function setupProgress() {
  const saved = Number(localStorage.getItem(KEY) || 0);
  update(saved);

  return {
    visit(index, total) {
      const percent = Math.round(((index + 1) / total) * 100);
      const next = Math.max(Number(localStorage.getItem(KEY) || 0), percent);
      localStorage.setItem(KEY, String(next));
      update(next);
    }
  };
}

function update(value) {
  document.querySelector("#progress").value = value;
  document.querySelector("#progressText").textContent = `${value}%`;
}
