/**
 * Scrolls smoothly to an element with the specified ID, with an optional offset
 * 
 * @param elementId - The ID of the element to scroll to
 * @param offset - Optional vertical offset in pixels (default: 0)
 */
export const scrollToElement = (elementId: string, offset: number = 0): void => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Element with id '${elementId}' not found`);
    return;
  }
  
  // Simple approach: use scrollIntoView with a subsequent offset adjustment
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  
  // Apply offset after a short delay to ensure scrollIntoView completes
  if (offset > 0) {
    setTimeout(() => {
      window.scrollBy(0, -offset);
    }, 100);
  }
}; 