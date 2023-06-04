import PropTypes from "prop-types";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { customStyles } from "../../constants/customStyles";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  const options = Object.entries(monacoThemes).map(([themeId, themeName]) => ({
    label: themeName,
    value: themeId,
  }));

  const selectedTheme = options.find((option) => option.value === theme);

  return (
    <Select
      placeholder={`Select Theme`}
      options={options}
      value={selectedTheme}
      styles={customStyles}
      onChange={handleThemeChange}
    />
  );
};

ThemeDropdown.propTypes = {
  handleThemeChange: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
};

export default ThemeDropdown;
