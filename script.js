/*
  Meet AI! interactive content
  Edit the objects and arrays in this file to change:
  - quiz questions
  - prompt lab examples
  - hotspot text
  - sorting game tasks
*/

const hotspotContent = {
  recommendations: {
    title: "Recommendations",
    text: "Video and music apps may use AI to suggest what you might like next by noticing patterns in what people watch or hear."
  },
  spellcheck: {
    title: "Spellcheck",
    text: "Writing tools can use AI to spot likely spelling mistakes and suggest words that fit your sentence."
  },
  voice: {
    title: "Voice Assistants",
    text: "A voice helper uses patterns to turn spoken words into text and guess what you asked."
  },
  translation: {
    title: "Translation",
    text: "Translation tools compare language patterns to turn words from one language into another."
  },
  filters: {
    title: "Photo Filters",
    text: "Photo apps can use AI to spot faces or backgrounds so they can add silly hats, sparkle effects, or blur behind you."
  },
  school: {
    title: "School Tools",
    text: "Some school tools use AI to read text aloud, help summarize, or suggest study ideas. A grown-up should still help check important work."
  }
};

const patternExplanations = {
  color: "Color helps a little, but it is weak by itself. A red toy and a red apple are both red, but only one is fruit.",
  seeds: "Nice pick. Seeds are a stronger clue because many fruits have them, so the AI learns a better pattern.",
  shape: "Shape can help sometimes, but many round things are not fruit. A ball is round too."
};

const safetyMessages = {
  private: "Smart move. Personal details should stay private unless a trusted adult says it is okay to share them.",
  adult: "Yes. Adults can help when something feels confusing, private, or too big to handle alone.",
  check: "Exactly. Big answers about health, school, money, or people should be checked by a human."
};

const sortTasks = [
  {
    text: "Sorting 1,000 photos by whether they show a dog or not",
    bucket: "ai",
    explanation: "AI is strong at quick pattern sorting when it has lots of examples."
  },
  {
    text: "Deciding how to help a sad friend after a hard day",
    bucket: "human",
    explanation: "People are better at empathy, feelings, and knowing the full story."
  },
  {
    text: "Checking many homework answers for repeated spelling mistakes",
    bucket: "ai",
    explanation: "AI can help find repeated patterns like common spelling errors."
  },
  {
    text: "Choosing a fair rule for a classroom problem",
    bucket: "human",
    explanation: "Fairness and judgment need people who can think about context and values."
  },
  {
    text: "Writing a first list of science project title ideas",
    bucket: "ai",
    explanation: "AI can be useful for brainstorming a first batch of ideas."
  }
];

/*
  Prompt Lab examples
  Change the promptPieces object to update the prompt-building activity.
*/
const promptPieces = {
  base: "Tell me about frogs.",
  goal: "Explain how frogs grow from eggs into adults",
  audience: "for a curious 9-year-old",
  details: "using simple words and 3 fun facts",
  format: "in a short bullet list",
  tone: "with a cheerful tone"
};

/*
  Quiz content
  Edit this array to change quiz questions and answers.
*/
const quizQuestions = [
  {
    question: "What is AI?",
    options: [
      "A tool made by people that learns patterns from examples",
      "A magical brain that knows everything",
      "A pet robot that has feelings"
    ],
    answer: 0,
    explanation: "Right. AI is a human-made tool that learns from examples. It is not magic and it is not all-knowing."
  },
  {
    question: "Which clue is safest to keep private?",
    options: [
      "Your favorite ice cream flavor",
      "Your home address",
      "Your favorite animal"
    ],
    answer: 1,
    explanation: "Correct. Personal information like your home address should stay private."
  },
  {
    question: "Why should people double-check important AI answers?",
    options: [
      "Because AI can guess wrong or make things up",
      "Because AI always tells jokes",
      "Because AI refuses to answer"
    ],
    answer: 0,
    explanation: "Yes. AI can sound sure even when it is wrong, so important answers need a human check."
  },
  {
    question: "Which task fits humans best?",
    options: [
      "Sorting thousands of pictures by pattern",
      "Understanding feelings in a tough conversation",
      "Spotting repeated spelling mistakes"
    ],
    answer: 1,
    explanation: "Exactly. Humans are better at empathy, fairness, and understanding the full situation."
  },
  {
    question: "Which prompt will usually help AI more?",
    options: [
      "Help",
      "Tell me stuff",
      "Explain volcanoes for a 10-year-old in 4 short bullet points"
    ],
    answer: 2,
    explanation: "Great job. Clear prompts with a goal, audience, and format usually lead to better answers."
  }
];

const state = {
  sortIndex: 0,
  sortScore: 0,
  sortAnswered: 0,
  quizIndex: 0,
  quizScore: 0,
  activeHotspot: null
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupNav() {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const links = navLinks.querySelectorAll("a");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  setupActiveNav(links);
}

function setupActiveNav(links) {
  const sections = Array.from(links)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const setActiveLink = () => {
    let currentId = sections[0]?.id;

    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      if (top <= 160) currentId = section.id;
    });

    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  };

  setActiveLink();
  window.addEventListener("scroll", setActiveLink, { passive: true });
}

function setupProgressBar() {
  const progressBar = document.getElementById("progressBar");
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const width = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    progressBar.style.width = `${width}%`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
}

function setupRevealAnimations() {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal").forEach((section) => section.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
}

function setupFlipCard() {
  const flipCard = document.getElementById("flipCard");
  flipCard.addEventListener("click", () => {
    const flipped = flipCard.classList.toggle("is-flipped");
    flipCard.setAttribute("aria-pressed", String(flipped));
  });
}

function setupPatternDemo() {
  const buttons = document.querySelectorAll("#patternChoices .choice-chip");
  const patternResult = document.getElementById("patternResult");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      patternResult.textContent = patternExplanations[button.dataset.pattern];
    });
  });
}

function setupHotspots() {
  const hotspotButtons = document.querySelectorAll(".hotspot");
  const hotspotTitle = document.getElementById("hotspotTitle");
  const hotspotText = document.getElementById("hotspotText");
  const hotspotPanel = document.getElementById("hotspotPanel");

  hotspotButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = hotspotContent[button.dataset.hotspot];
      hotspotButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      state.activeHotspot = button.dataset.hotspot;
      hotspotTitle.textContent = content.title;
      hotspotText.textContent = content.text;
      hotspotPanel.focus();
    });
  });

  if (hotspotButtons[0]) hotspotButtons[0].click();
}

function renderSortTask() {
  const sortTask = document.getElementById("sortTask");
  const sortScore = document.getElementById("sortScore");

  if (state.sortIndex >= sortTasks.length) {
    sortTask.textContent = "You sorted all the tasks. Nice thinking!";
    sortScore.textContent = `Final sorter score: ${state.sortScore} / ${state.sortAnswered}`;
    document.getElementById("aiBucket").disabled = true;
    document.getElementById("humanBucket").disabled = true;
    return;
  }

  sortTask.textContent = sortTasks[state.sortIndex].text;
  sortScore.textContent = `Score: ${state.sortScore} / ${state.sortAnswered}`;
}

function handleSortGuess(bucket) {
  const current = sortTasks[state.sortIndex];
  const feedback = document.getElementById("sortFeedback");
  const correct = current.bucket === bucket;

  state.sortAnswered += 1;
  if (correct) state.sortScore += 1;

  feedback.textContent = `${correct ? "Nice sort!" : "Good try."} ${current.explanation}`;
  feedback.className = `sort-feedback ${correct ? "correct" : "incorrect"}`;
  state.sortIndex += 1;
  if (feedback.animate) {
    feedback.animate(
      [
        { opacity: 0.55, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: prefersReducedMotion ? 1 : 260, easing: "ease-out" }
    );
  }
  renderSortTask();
}

function setupSortGame() {
  document.getElementById("aiBucket").addEventListener("click", () => handleSortGuess("ai"));
  document.getElementById("humanBucket").addEventListener("click", () => handleSortGuess("human"));
  renderSortTask();
}

function setupSafetyRules() {
  const buttons = document.querySelectorAll(".rule-badge");
  const ruleMessage = document.getElementById("ruleMessage");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      ruleMessage.textContent = safetyMessages[button.dataset.rule];
    });
  });
}

function buildPromptText() {
  const checkedValues = Array.from(document.querySelectorAll('#promptOptions input:checked')).map((input) => input.value);
  const strongPrompt = document.getElementById("strongPromptText");
  const promptTip = document.getElementById("promptTip");

  if (checkedValues.length === 0) {
    strongPrompt.textContent = "Tell me about frogs.";
    promptTip.textContent = "This is still broad, so the answer may be fuzzy.";
    return;
  }

  const parts = [promptPieces.goal];

  ["audience", "details", "format", "tone"].forEach((key) => {
    if (checkedValues.includes(key)) parts.push(promptPieces[key]);
  });

  if (!checkedValues.includes("goal")) {
    parts.unshift("Tell me about frogs");
  }

  strongPrompt.textContent = `${parts.join(" ")}.`;

  if (checkedValues.length <= 2) {
    promptTip.textContent = "Better. A few clues help the AI head in the right direction.";
  } else if (checkedValues.length <= 4) {
    promptTip.textContent = "Nice. The prompt is clearer, more detailed, and easier to answer well.";
  } else {
    promptTip.textContent = "Excellent. Now the AI knows the topic, audience, details, format, and tone.";
  }
}

function setupPromptLab() {
  document.getElementById("weakPromptText").textContent = promptPieces.base;
  document.getElementById("buildPrompt").addEventListener("click", buildPromptText);
}

function renderQuizQuestion() {
  const current = quizQuestions[state.quizIndex];
  const quizProgress = document.getElementById("quizProgress");
  const quizQuestion = document.getElementById("quizQuestion");
  const quizOptions = document.getElementById("quizOptions");
  const quizFeedback = document.getElementById("quizFeedback");
  const nextButton = document.getElementById("nextQuestion");

  quizProgress.textContent = `Question ${state.quizIndex + 1} of ${quizQuestions.length}`;
  quizQuestion.textContent = current.question;
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";
  nextButton.classList.add("hidden");

  quizOptions.innerHTML = current.options.map((option, index) => `
    <label class="quiz-option">
      <input type="radio" name="quizOption" value="${index}">
      <span>${option}</span>
    </label>
  `).join("");

  const quizSubmit = document.getElementById("quizSubmit");
  quizSubmit.textContent = "Check My Answer";
}

function showBadge() {
  const badgeStatus = document.getElementById("badgeStatus");
  const badgeSpot = document.getElementById("badgeSpot");
  const badgeIcon = badgeSpot.querySelector(".badge-icon");
  const score = state.quizScore;
  const total = quizQuestions.length;
  const percent = score / total;

  let title = "Curious Checker";
  if (percent === 1) title = "AI Safety Superstar";
  else if (percent >= 0.8) title = "Pattern Pro";
  else if (percent >= 0.6) title = "Thoughtful Explorer";

  badgeStatus.textContent = `You scored ${score} out of ${total}. Badge earned: ${title}!`;
  badgeIcon.textContent = "AI+";
  badgeSpot.classList.add("badge-earned");
  makeConfetti();
}

function makeConfetti() {
  const confetti = document.getElementById("confetti");
  confetti.innerHTML = "";
  const colors = ["#ff84b7", "#ffd84d", "#46b8ff", "#89efcf", "#8c79ff"];

  for (let i = 0; i < 18; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 95}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    confetti.appendChild(piece);
  }
}

function setupQuiz() {
  const quizForm = document.getElementById("quizForm");
  const quizFeedback = document.getElementById("quizFeedback");
  const nextButton = document.getElementById("nextQuestion");

  renderQuizQuestion();

  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = quizForm.querySelector('input[name="quizOption"]:checked');

    if (!selected) {
      quizFeedback.textContent = "Pick an answer first.";
      quizFeedback.className = "quiz-feedback incorrect";
      return;
    }

    const current = quizQuestions[state.quizIndex];
    const isCorrect = Number(selected.value) === current.answer;

    if (isCorrect) state.quizScore += 1;

    quizFeedback.textContent = current.explanation;
    quizFeedback.className = `quiz-feedback ${isCorrect ? "correct" : "incorrect"}`;
    Array.from(quizForm.querySelectorAll("input")).forEach((input) => {
      input.disabled = true;
    });
    nextButton.classList.remove("hidden");
    document.getElementById("quizSubmit").disabled = true;
    nextButton.focus();
  });

  nextButton.addEventListener("click", () => {
    state.quizIndex += 1;
    document.getElementById("quizSubmit").disabled = false;

    if (state.quizIndex >= quizQuestions.length) {
      document.getElementById("quizQuestion").textContent = "Quiz complete!";
      document.getElementById("quizProgress").textContent = "All 5 questions finished";
      document.getElementById("quizOptions").innerHTML = "";
      document.getElementById("quizFeedback").textContent = "You made it to the end. Keep being curious and careful with AI.";
      document.getElementById("quizSubmit").classList.add("hidden");
      nextButton.classList.add("hidden");
      showBadge();
      return;
    }

    renderQuizQuestion();
  });
}

function init() {
  setupNav();
  setupProgressBar();
  setupRevealAnimations();
  setupFlipCard();
  setupPatternDemo();
  setupHotspots();
  setupSortGame();
  setupSafetyRules();
  setupPromptLab();
  setupQuiz();
}

document.addEventListener("DOMContentLoaded", init);
