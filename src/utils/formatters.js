export function formatSalary(amount, currency = "USD") {
  if (!amount) return "N/A";

  const numAmount = Number(amount);
  if (isNaN(numAmount)) return "N/A";

  if (numAmount >= 100000) {
    return `$${(numAmount / 1000).toFixed(0)}k`;
  }
  return `$${numAmount.toLocaleString()}`;
}

export function formatNumber(num) {
  if (!num) return "0";
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}

export function formatDate(date, format = "MMM DD, YYYY") {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const options = {
    MMM: { month: "short" },
    DD: { day: "2-digit" },
    YYYY: { year: "numeric" },
    HH: { hour: "2-digit" },
    mm: { minute: "2-digit" },
  };

  const parts = format.split(/[\s,]+/).reduce((acc, token) => {
    const fmt = options[token];
    if (fmt) {
      acc.push(token);
    }
    return acc;
  }, []);

  const intl = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return intl.format(d);
}

export function formatRelativeTime(date) {
  if (!date) return "";
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${Math.floor(months / 12)} year${Math.floor(months / 12) > 1 ? "s" : ""} ago`;
}

export function formatPhoneNumber(phone) {
  if (!phone) return "";
  const numbers = phone.replace(/\D/g, "");
  if (numbers.length === 10) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  }
  return phone;
}

export function truncateText(text, maxLength = 100) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
