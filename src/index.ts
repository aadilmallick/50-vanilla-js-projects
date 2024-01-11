import { readmeContent } from "./markdown";

async function convertREADME() {
  const result = await readmeContent;
  const element = document.getElementById("markdown");
  if (!element) {
    throw new Error("Element not found");
  }

  element.innerHTML = result.toString();
}

convertREADME();
