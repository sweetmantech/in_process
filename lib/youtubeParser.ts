const youtubeParser = (url: string) => {
  const regExp =
    /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|live\/|watch\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length == 11 ? match[1] : false;
};

export default youtubeParser;
