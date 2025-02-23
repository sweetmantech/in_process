import { useEffect, useState } from "react";

const useRandomColor = () => {
  const [color, setColor] = useState("rgb(0, 0, 0)");

  useEffect(() => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    setColor(`rgb(${r}, ${g}, ${b})`);
  }, []);

  return color;
};

export default useRandomColor;
