export default function formatiingText (text) {
    const formattedName = text
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");

        return formattedName;
}