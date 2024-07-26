export function formattingName(name) {
  const formattedName = name
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return formattedName;
};

export function formattingFirstName(name) {
  const firstName = name.split(/[\s-]/)[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
};

export function APIformattingName(name) {
  const nameWithoutDiacritics = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  const formattedName = nameWithoutDiacritics
    .trim()
    .toLowerCase()
    .replace(/ /g, "-");
  return formattedName;
};
