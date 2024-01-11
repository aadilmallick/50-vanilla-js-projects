const faqs = document.querySelectorAll(".faq");
faqs.forEach((faq) => {
  const faqToggle = faq.querySelector(".faq-toggle") as HTMLButtonElement;
  faqToggle.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});
