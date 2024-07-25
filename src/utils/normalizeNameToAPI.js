export default function normalizeNameToAPI(text) {
  const nameWithoutDiacritics = text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const formattedName = nameWithoutDiacritics
    .trim()
    .toLowerCase()
    .replace(/ /g, "-");
  return formattedName;
}
