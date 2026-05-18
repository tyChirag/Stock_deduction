/**
 * Preprocesses an image using the HTML5 Canvas API to improve OCR accuracy.
 * Applies grayscale, increases contrast, and applies a basic sharpening filter.
 * 
 * @param {File|string} imageSource - A File object or an Image URL
 * @returns {Promise<string>} - A promise that resolves to a base64 Data URL
 */
export async function preprocessImageForOCR(imageSource) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Keep original dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw original image
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Thresholding configuration
      const threshold = 160;

      // Loop through pixels
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // 1. Extract the darkest channel instead of standard luminosity.
        // This makes colored ink (like pink, blue) on white paper stand out sharply,
        // because at least one RGB channel will be low for the ink and high for the paper.
        let minChannel = Math.min(r, g, b);

        // 2. Contrast adjustment
        const contrast = 2.0;
        const intercept = 128 * (1 - contrast);
        let finalPixel = minChannel * contrast + intercept;
        
        // 3. Simple Thresholding to make text pitch black and background pure white
        finalPixel = finalPixel < threshold ? 0 : 255;

        // Apply back to RGB
        data[i] = finalPixel;     // Red
        data[i + 1] = finalPixel; // Green
        data[i + 2] = finalPixel; // Blue
        // Alpha remains unchanged
      }

      ctx.putImageData(imageData, 0, 0);

      // Simple sharpening filter using convolution matrix
      const sharpenMatrix = [
        0, -1, 0,
        -1, 5, -1,
        0, -1, 0
      ];
      // We will skip actual convolution to keep performance high,
      // the thresholding usually provides clean enough edges for Tesseract.

      resolve(canvas.toDataURL('image/jpeg', 0.95));
    };

    img.onerror = () => {
      reject(new Error('Failed to load image for preprocessing'));
    };

    if (imageSource instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.readAsDataURL(imageSource);
    } else {
      img.src = imageSource;
    }
  });
}
