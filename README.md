# FLAP — OTP Phone Verification UI

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://mrchandrayee.github.io/flap-otp-verification/)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML) [![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS) [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

A runnable reconstruction of the uploaded 5.6-second screen recording.

## What the video shows

- Dark verification card with the heading "Check your phone".
- Masked phone number: `+1 415 ••• •0142`.
- Four separate one-character OTP input boxes.
- Gold focus outline around the active input.
- Resend-code countdown.
- Invalid-code message: "That code didn't match. Try again."
- "Checking the code..." intermediate state.
- Success screen: "You're verified", four green `DONE` tiles and a Continue button.
- Three small code preview panels labelled HTML, CSS and JS.

## Implemented functionality

- Four-digit input with automatic focus advance.
- Backspace and left/right arrow navigation.
- Paste a complete four-digit code into the boxes.
- Invalid code feedback with shake animation.
- Correct demo code transitions to the verified screen.
- Resend countdown and reset interaction.
- Continue button shows a final welcome state.
- Responsive mobile layout and reduced-motion support.

## Demo OTP

Use **2479** to see the successful verification animation.

Any other four-digit code displays the invalid-code message.

## Run locally

No install or build step is required.

```bash
python -m http.server 8000
```

Open http://localhost:8000

## Project structure

```text
flap-otp-verification/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Security / source accuracy note

This is a front-end demo only. It does not send SMS, contact a phone provider, or perform real identity verification. The original video shows only small code excerpts; visible UI text and behavior are recreated, not represented as a verbatim extraction of the full original source.
