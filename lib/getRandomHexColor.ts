const getRandomHexColor = () =>
  "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");

export default getRandomHexColor;
