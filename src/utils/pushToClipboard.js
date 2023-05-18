export default function pushToClipboard(content) {
    if (!navigator.clipboard) {
        // Clipboard API not available
        return;
    }
    return navigator.clipboard.writeText(content);
}
