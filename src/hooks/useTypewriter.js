import { useState, useEffect } from "react";

const useTypewriter = (text, speed = 50) => {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentText(text.slice(0, index));
      if (index < text.length) {
        setIndex(index + 1);
      }
    }, speed);

    return () => {
      clearTimeout(timer);
    };
  }, [index, speed, text]);

  return currentText;
};

export { useTypewriter };
