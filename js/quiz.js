export async function setupQuiz() {
  const quiz = await fetch("./data/quiz.json").then((res) => res.json());
  const box = document.querySelector("#quizBox");
  let index = 0;
  let score = 0;
  let locked = false;

  function render() {
    locked = false;
    const item = quiz[index];
    box.innerHTML = `
      <p><strong>第 ${index + 1} 題 / ${quiz.length}</strong></p>
      <h3>${item.question}</h3>
      <div class="quiz-options"></div>
      <p class="feedback" id="quizFeedback"></p>
    `;
    const options = box.querySelector(".quiz-options");
    item.options.forEach((option, optionIndex) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", () => answer(optionIndex, button));
      options.append(button);
    });
  }

  function answer(optionIndex, button) {
    if (locked) return;
    locked = true;
    const item = quiz[index];
    const ok = optionIndex === item.answer;
    if (ok) score += 1;
    button.classList.add(ok ? "correct" : "wrong");
    box.querySelector("#quizFeedback").textContent = `${ok ? "答對了" : "還差一點"}：${item.explanation}`;
    const next = document.createElement("button");
    next.className = "primary";
    next.textContent = index === quiz.length - 1 ? "看結果" : "下一題";
    next.addEventListener("click", () => {
      index += 1;
      index < quiz.length ? render() : result();
    });
    box.append(next);
  }

  function result() {
    const advice = score >= 8 ? "很穩！你已能用證據說明地表變化與防災行動。" : "建議回到原理探索與生活應用，再觀察一次關鍵線索。";
    box.innerHTML = `
      <h3>闖關完成</h3>
      <p>答對 ${score} / ${quiz.length} 題。</p>
      <p class="feedback">${advice}</p>
      <button class="primary" id="retryQuiz">重新挑戰</button>
    `;
    box.querySelector("#retryQuiz").addEventListener("click", () => {
      index = 0;
      score = 0;
      render();
    });
  }

  render();
}
