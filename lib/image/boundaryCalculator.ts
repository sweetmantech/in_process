import type { Position } from './imageCropper';

interface Boundaries {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export class BoundaryCalculator {
  static calculateBoundaries(
    containerWidth: number,
    containerHeight: number,
    scale: number
  ): Boundaries {
    // Calculate scaled image dimensions
    const scaledImageWidth = containerWidth * scale;
    const scaledImageHeight = containerHeight * scale;
    
    // Calculate boundaries to prevent empty space in crop area
    let minX = 0, maxX = 0, minY = 0, maxY = 0;
    
    if (scale > 1) {
      // Image is zoomed in - calculate boundaries based on extra size
      const extraWidth = scaledImageWidth - containerWidth;
      const extraHeight = scaledImageHeight - containerHeight;
      
      // When zoomed, the image is centered, so boundaries are symmetric around center
      const centerX = -extraWidth / 2;
      const centerY = -extraHeight / 2;
      
      // RESTRICTED: Only allow movement to right and bottom (not left and top)
      // This means the image can only be dragged to show more of the right/bottom parts
      minX = centerX; // Cannot drag left (stays at center)
      maxX = centerX + extraWidth; // Can drag right by deltaX
      minY = centerY; // Cannot drag up (stays at center)
      maxY = centerY + extraHeight; // Can drag down by deltaY
    } else {
      // Image is at normal size or smaller - no movement allowed
      minX = maxX = 0;
      minY = maxY = 0;
    }
    
    return { minX, maxX, minY, maxY };
  }

  static constrainPosition(
    newPosition: Position,
    boundaries: Boundaries
  ): Position {
    return {
      x: Math.max(boundaries.minX, Math.min(boundaries.maxX, newPosition.x)),
      y: Math.max(boundaries.minY, Math.min(boundaries.maxY, newPosition.y))
    };
  }
} 