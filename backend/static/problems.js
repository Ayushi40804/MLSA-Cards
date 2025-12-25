// Get auth from localStorage
const wallet = localStorage.getItem('mlsa_wallet');
const token = localStorage.getItem('mlsa_token');
const chainId = localStorage.getItem('mlsa_chainId');

const loadProblemBtn = document.getElementById("loadProblemBtn");
const submitAnswerBtn = document.getElementById("submitAnswerBtn");
const newProblemBtn = document.getElementById("newProblemBtn");
const problemContainer = document.getElementById("problemContainer");
const problemCategory = document.getElementById("problemCategory");
const problemPoints = document.getElementById("problemPoints");
const problemQuestion = document.getElementById("problemQuestion");
const problemStats = document.getElementById("problemStats");
const answerInput = document.getElementById("answerInput");
const answerResult = document.getElementById("answerResult");

let currentProblemId = null;

// Debug: Check token
console.log("Token present:", !!token);

// Enable load problem button if token exists
if (token && loadProblemBtn) {
  loadProblemBtn.disabled = false;
}

async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
}

async function loadProblem() {
  try {
    console.log("Loading problem...");
    const resp = await authFetch("/game/problems");
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const json = await resp.json();
    console.log("Problem response:", json);

    if (!json.id) {
      answerResult.innerHTML = `<div class="result-correct">${json.message}</div>`;
      problemContainer.style.display = "none";
      return;
    }

    currentProblemId = json.id;
    problemCategory.textContent = json.category;
    problemPoints.textContent = `+${json.points} pts`;
    problemQuestion.textContent = json.question;
    problemStats.textContent = `Solved: ${json.total_solved} / ${json.total_problems}`;
    answerInput.value = "";
    answerResult.innerHTML = "";
    problemContainer.style.display = "grid";
  } catch (err) {
    console.error("Error loading problem:", err);
    answerResult.innerHTML = `<div class="result-incorrect">Error: ${err.message}</div>`;
  }
}

async function submitAnswer() {
  try {
    if (!currentProblemId) {
      answerResult.innerHTML = `<div class="result-incorrect">Load a problem first</div>`;
      return;
    }
    const answer = answerInput.value.trim();
    if (!answer) {
      answerResult.innerHTML = `<div class="result-incorrect">Please enter an answer</div>`;
      return;
    }

    const resp = await authFetch("/game/solve", {
      method: "POST",
      body: JSON.stringify({ problem_id: currentProblemId, answer }),
    });
    const json = await resp.json();

    if (json.correct) {
      answerResult.innerHTML = `<div class="result-correct">${json.message} (+${json.points_earned} points)</div>`;
      window.updateNavPoints();
      setTimeout(loadProblem, 1500);
    } else {
      answerResult.innerHTML = `<div class="result-incorrect">${json.message}</div>`;
    }
  } catch (err) {
    answerResult.innerHTML = `<div class="result-incorrect">Error: ${err.message}</div>`;
  }
}

// Event listeners
loadProblemBtn.onclick = loadProblem;
submitAnswerBtn.onclick = submitAnswer;
newProblemBtn.onclick = loadProblem;

answerInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    submitAnswer();
  }
});
