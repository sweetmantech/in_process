const tiktokParser = (url: string): string | false => {
  // TikTok URL patterns:
  // https://www.tiktok.com/@username/video/1234567890
  // https://vm.tiktok.com/xxxxx
  // https://tiktok.com/@username/video/1234567890

  // Extract video ID from standard TikTok URLs
  const standardPattern = /tiktok\.com\/@[\w.]+\/video\/(\d+)/;
  const match = url.match(standardPattern);

  if (match && match[1]) {
    return match[1];
  }

  // For shortened URLs (vm.tiktok.com), we'll need to resolve them
  // For now, return false and let the oEmbed API handle it
  return false;
};

export default tiktokParser;
