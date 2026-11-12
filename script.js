const inputs = [...document.querySelectorAll(".otp-box")];
const form = document.querySelector("#otpForm");
const card = document.querySelector("#verificationCard");
const title = document.querySelector("#title");
const intro = document.querySelector("#intro");
const statusText = document.querySelector("#status");
const resendButton = document.querySelector("#resendButton");
const countdown = document.querySelector("#countdown");
const successPanel = document.querySelector("#successPanel");
const continueButton = document.querySelector("#continueButton");

const DEMO_CODE = "2479"; // Local demo only; no SMS or backend verification.
let seconds = 29;
let timerId;

function startCountdown() {
  clearInterval(timerId);
  seconds = 29;
  resendButton.disabled = true;
  updateCountdown();
  timerId = setInterval(() => {
    seconds -= 1;
    updateCountdown();
    if (seconds <= 0) {
      clearInterval(timerId);
      resendButton.disabled = false;
      countdown.textContent = "Resend";
    }
  }, 1000);
}
function updateCountdown() {
  countdown.textContent = `0:${String(seconds).padStart(2, "0")}`;
}

function codeValue() {
  return inputs.map(input => input.value).join("");
}
function setStatus(message, kind = "") {
  statusText.textContent = message;
  statusText.className = `status ${kind}`.trim();
}
function resetError() {
  card.classList.remove("invalid");
  setStatus("");
}
function verifyCode() {
  const value = codeValue();
  if (value.length !== inputs.length) return;
  if (value === DEMO_CODE) {
    title.textContent = "You're verified";
    intro.textContent = "Your number is confirmed on this device.";
    form.hidden = true;
    successPanel.hidden = false;
    card.classList.add("verified");
    setStatus("Verification successful", "success");
    return;
  }
  card.classList.remove("invalid");
  void card.offsetWidth;
  card.classList.add("invalid");
  setStatus("That code didn't match. Try again.", "error");
  inputs.forEach(input => input.value = "");
  inputs[0].focus();
}

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    resetError();
    input.value = input.value.replace(/\D/g, "").slice(-1);
    if (input.value && index < inputs.length - 1) inputs[index + 1].focus();
    if (codeValue().length === inputs.length) verifyCode();
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Backspace" && !input.value && index > 0) {
      inputs[index - 1].value = "";
      inputs[index - 1].focus();
    }
    if (event.key === "ArrowLeft" && index > 0) inputs[index - 1].focus();
    if (event.key === "ArrowRight" && index < inputs.length - 1) inputs[index + 1].focus();
    if (event.key === "Enter") verifyCode();
  });
  input.addEventListener("paste", event => {
    const pasted = (event.clipboardData || window.clipboardData).getData("text").replace(/\D/g, "").slice(0, inputs.length);
    if (!pasted) return;
    event.preventDefault();
    pasted.split("").forEach((digit, i) => inputs[i].value = digit);
    const next = Math.min(pasted.length, inputs.length - 1);
    inputs[next].focus();
    if (pasted.length === inputs.length) verifyCode();
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();
  verifyCode();
});

resendButton.addEventListener("click", () => {
  if (resendButton.disabled) return;
  inputs.forEach(input => input.value = "");
  inputs[0].focus();
  setStatus("Demo code refreshed. Use 2479.", "success");
  startCountdown();
});

continueButton.addEventListener("click", () => {
  title.textContent = "Welcome aboard";
  intro.textContent = "Your demo phone verification is complete.";
  successPanel.innerHTML = `<div class="success-code"><span>✓</span></div><p class="status success">You're all set.</p>`;
});

startCountdown();
window.addEventListener("load", () => inputs[0].focus());
