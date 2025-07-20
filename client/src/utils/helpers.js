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
