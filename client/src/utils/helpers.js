import imageCompression from "browser-image-compression";

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const compressToBase64 = async (file, maxWidth = 600, quality = 0.6) => {
  try {
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: maxWidth,
      useWebWorker: true,
      initialQuality: quality,
      fileType: "image/jpeg",
    };

    const compressedFile = await imageCompression(file, options);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        if ((base64.length * 0.75) / 1024 / 1024 > 1) {
          reject(new Error("Image still too large after compression"));
        } else {
          resolve(base64);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(compressedFile);
    });
  } catch (error) {
    throw error;
  }
};

// Add this utility function to your utils/helpers.js file or create a new utils file

export const getTimeAgo = (timestamp) => {
  const now = Date.now();
  const diffInMs = now - timestamp;

  const seconds = Math.floor(diffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }
  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  if (minutes > 0) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  }
  if (seconds > 30) {
    return `${seconds} sec${seconds > 1 ? "s" : ""} ago`;
  }

  return "Just now";
};
