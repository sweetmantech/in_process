export const getCaptionClasses = (captionClassName: string, caption: string) => {
  return `${captionClassName} ${caption.includes("Start your process") ? "pr-10" : ""}`;
}; 