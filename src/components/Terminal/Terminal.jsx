import PropTypes from "prop-types";
import "./Terminal.css";

const Terminal = (props) => {
  return (
    <>
      <div className="window">
        <div className="controls">
          <button className="buttons close" id="close" />
          <button className="buttons maximize" href="#" />
          <button className="buttons minimize" href="#" />
        </div>
        <div className="bash">
          <div id="span">{props.generatedCode}</div>
        </div>
      </div>
    </>
  );
};

Terminal.propTypes = {
  generatedCode: PropTypes.object.isRequired, // add prop validation
};

export default Terminal;
