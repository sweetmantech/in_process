interface Position {
  x: number;
  y: number;
}

interface CropResult {
  croppedImageUrl: string;
}

export class ImageCropper {
  static async cropImage(
    imageSrc: string,
    position: Position,
    scale: number
  ): Promise<CropResult> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = imageSrc;
      
      img.onload = () => {
        // Set canvas size to match the original image dimensions
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate the source rectangle in the original image
        const sourceX = -position.x / scale;
        const sourceY = -position.y / scale;
        const sourceWidth = canvas.width / scale;
        const sourceHeight = canvas.height / scale;

        // Draw the cropped portion of the image
        ctx.drawImage(
          img,
          sourceX, sourceY, sourceWidth, sourceHeight, // source rectangle
          0, 0, canvas.width, canvas.height // destination rectangle
        );

        // Convert to data URL
        const croppedImageUrl = canvas.toDataURL("image/png");
        resolve({ croppedImageUrl });
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
    });
  }
}

export type { Position, CropResult }; 