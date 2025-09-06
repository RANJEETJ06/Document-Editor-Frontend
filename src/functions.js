
import { fetchUser } from "./APIs/userApi";

export const fetchData = async (setUser) => {
    try {
        const userData = await fetchUser();
        setUser(userData);
        console.log(userData);
    } catch (err) {
        console.error("Error fetching user:", err);
    }
};
export const typeCheckDocuments = (document) => {
    const filename = document.name;
    const extension = filename.substring(filename.lastIndexOf(".") + 1);
    return extension.toUpperCase();
}
export function formatBytes(content) {
    if (!content) return "0 B";
    const bytes = base64Size(content);
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = (bytes / Math.pow(k, i)).toFixed(2);
    return `${size} ${sizes[i]}`;
}
function base64Size(base64String) {
    if (!base64String) return 0;
    // Remove data URL prefix if present
    const cleaned = base64String.replace(/^data:.*;base64,/, "").replace(/\s/g, "");
    // Base64 length must be divisible by 4, but padding '=' may exist
    const padding = (cleaned.match(/=+$/) || [""])[0].length;
    // Calculate bytes: 3/4 of base64 length minus padding
    const bytes = (cleaned.length * 3) / 4 - padding;
    return bytes;
}
export function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now - past) / 1000);

    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
        { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
        }
    }
    return "just now";
}

export function textToBase64(text) {
    return btoa(text); // encode plain text into base64
}
export function base64ToText(base64) {
    try {
        return atob(base64); // decode base64 into plain text
    } catch (e) {
        console.error("Invalid base64 string", e);
        return "";
    }
}

export function filenameToText(filename) {
    const nameWithoutExt = filename.split('.').slice(0, -1).join('.');
    return nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1).toLowerCase();
}
