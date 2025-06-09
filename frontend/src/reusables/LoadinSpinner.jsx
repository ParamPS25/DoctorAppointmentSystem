import PropTypes from "prop-types";

const LoadingSpinner = ({small = false}) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className={`${small ? "size-6":"size-12"} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}></div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  small: PropTypes.bool
};

export default LoadingSpinner;