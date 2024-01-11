const codes = document.querySelectorAll<HTMLInputElement>(".code");

codes[0].focus();

codes.forEach((code, idx) => {
  // listen for keypress
  code.addEventListener("keydown", (e) => {
    if (Number(e.key) >= 0 && Number(e.key) <= 9) {
      // before entering number in input, clear the value
      codes[idx].value = "";

      if (idx === codes.length - 1) {
        return;
      }
      setTimeout(() => codes[idx + 1].focus(), 10);
    } else if (e.key === "Backspace") {
      if (idx === 0) {
        return;
      }
      // when deleing, focus on previous input
      setTimeout(() => codes[idx - 1].focus(), 10);
    }
  });
});
