const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

export function formatRelativeTime(value: string | Date, now = new Date()) {
  const date = value instanceof Date ? value : new Date(value);
  const timestamp = date.getTime();

  if (Number.isNaN(timestamp)) {
    return "";
  }

  const diffMs = Math.max(0, now.getTime() - timestamp);

  if (diffMs < MINUTE) {
    return "Just now";
  }

  if (diffMs < HOUR) {
    return `${Math.floor(diffMs / MINUTE)}m`;
  }

  if (diffMs < DAY) {
    return `${Math.floor(diffMs / HOUR)}h`;
  }

  if (diffMs < WEEK) {
    return `${Math.floor(diffMs / DAY)}d`;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() === now.getFullYear() ? undefined : "numeric",
  });
}
