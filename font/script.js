const loginSection = document.getElementById("login-section");
const registerSection = document.getElementById("register-section");
const dashboardSection = document.getElementById("dashboard-section");
const gameSection = document.getElementById("game-section");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const startGameBtn = document.getElementById("start-game-btn");
const gamesTable = document.querySelector("#games-table tbody");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");
const usernameDisplay = document.getElementById("username-display");
const gameStatus = document.getElementById("game-status");
const cells = document.querySelectorAll(".cell");

let socket;
let currentUser;
let currentGameId;

showRegister.addEventListener("click", () => {
  loginSection.classList.add("hidden");
  registerSection.classList.remove("hidden");
});

showLogin.addEventListener("click", () => {
  registerSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (response.status === 200) {
    currentUser = await response.json();
    document.cookie = `token=${currentUser.token}`;
    showDashboard();
  } else {
    document.getElementById("login-error").textContent = "Invalid credentials.";
  }
});

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;

  const response = await fetch("http://localhost:4000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (response.status === 200) {
    registerSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  } else {
    document.getElementById("register-error").textContent =
      "Registration failed.";
  }
});

startGameBtn.addEventListener("click", async () => {
  const response = await fetch("http://localhost:4000/games/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  const game = await response.json();
  currentGameId = game.id;
  gameSection.classList.remove("hidden");
  gameStatus.textContent = "Waiting for opponent...";

  setupSocket();
});

function setupSocket() {
  socket = io("http://localhost:4000");

  socket.on("gameStarted", (data) => {
    gameStatus.textContent =
      data.player === "X" ? "Your turn" : "Waiting for opponent...";
  });

  socket.on("move", (data) => {
    updateBoard(data.move);
    if (data.status === "finished") {
      gameStatus.textContent = `${data.result}`;
    } else {
      gameStatus.textContent =
        data.move.player === currentUser.username
          ? "Your turn"
          : "Opponent's turn...";
    }
  });
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (gameStatus.textContent.includes("Your turn")) {
      const position = JSON.parse(cell.getAttribute("data-position"));
      socket.emit("makeMove", {
        gameId: currentGameId,
        player: currentUser.username,
        position,
      });
    }
  });
});

function updateBoard(move) {
  const cell = document.querySelector(
    `[data-position="[${move.position[0]},${move.position[1]}]"]`
  );
  cell.textContent = move.player;
}

async function showDashboard() {
  loginSection.classList.add("hidden");
  dashboardSection.classList.remove("hidden");
  usernameDisplay.textContent = currentUser.username;

  const gamesResponse = await fetch("http://localhost:4000/games", {
    method: "GET",
  });
  const games = await gamesResponse.json();

  gamesTable.innerHTML = "";
  games.forEach((game) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${game.id}</td><td>${game.status}</td>`;
    gamesTable.appendChild(row);
  });
}
