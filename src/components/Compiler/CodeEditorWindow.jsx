import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { defineTheme } from "../../lib/defineTheme";
import PropTypes from "prop-types";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  useEffect(() => {
    if (theme) {
      defineTheme(theme);
    }
  }, [theme]);

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="60vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme || "vs-dark"}
        defaultValue="// Execute your code here"
        onChange={handleEditorChange}
      />
    </div>
  );
};

CodeEditorWindow.propTypes = {
  onChange: PropTypes.func.isRequired,
  language: PropTypes.string,
  code: PropTypes.string,
  theme: PropTypes.string,
};

export default CodeEditorWindow;
