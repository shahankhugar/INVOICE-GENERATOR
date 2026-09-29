const ACCESS_KEY = "apexQuotationAccess";
const ACCESS_CODE = "0818";

function unlock() {
  sessionStorage.setItem(ACCESS_KEY, "granted");
  document.documentElement.classList.remove("quotation-locked");
  document.getElementById("access-gate")?.remove();
  import("./app.js");
}

if (sessionStorage.getItem(ACCESS_KEY) === "granted") {
  unlock();
} else {
  document.documentElement.classList.add("quotation-locked");
  const gate = document.createElement("div");
  gate.id = "access-gate";
  gate.innerHTML = '<main class="access-card" aria-labelledby="access-title"><div class="access-brand">APEX<span>MEDIAS</span></div><p class="access-kicker">ADMIN PORTAL</p><h1 id="access-title">Quotation Studio</h1><p class="access-copy">Enter the team access code to continue.</p><form id="access-form"><label for="access-code">Access code</label><input id="access-code" name="code" type="password" inputmode="numeric" maxlength="4" autocomplete="one-time-code" required autofocus><p id="access-error" role="alert" aria-live="polite"></p><button type="submit">Open quotation builder</button></form><a href="/admin">Back to Admin Portal</a></main>';
  document.body.prepend(gate);
  document.getElementById("access-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("access-code");
    if (input.value === ACCESS_CODE) {
      unlock();
      return;
    }
    document.getElementById("access-error").textContent = "Incorrect access code.";
    input.select();
  });
}