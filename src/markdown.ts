import { remark } from "remark";
import html from "remark-html";

async function getREADME() {
  console.log("getREADME");
  const response = await fetch("/README.md");
  const readme = await response.text();
  const result = await remark().use(html).process(readme);
  return result.toString();
}

export const readmeContent = getREADME();

export async function addReadMe(content: string, parentElement?: HTMLElement) {
  const element = document.createElement("div");
  element.id = "markdown";
  element.innerHTML = content;
  if (parentElement) {
    parentElement.appendChild(element);
    return;
  }
  document.body.appendChild(element);
}

export function getSection(headingNumber: number, content: string) {
  const regex = new RegExp(`<h2>Day ${headingNumber}.*?(?=<h2>)`, "gmis");
  const matches = content.match(regex);
  if (matches) {
    return matches[0];
  }
}

export async function addREADMESection(section: number, element?: HTMLElement) {
  const result = await readmeContent;
  const content = getSection(section, result.toString());
  if (!content) {
    throw new Error("Day 1 content not found");
  }
  await addReadMe(content, element);
}
