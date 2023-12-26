import PropTypes from "prop-types";
export const Button = ({ label, type, onClick }) => {
  const buttonClasses =
    type === "primary"
      ? "w-[199px] h-[51px] px-[21.26px] py-[12.76px] bg-green-500 rounded-lg shadow justify-center items-center gap-[8.51px] inline-flex"
      : "w-[199px] h-[51px] px-[21.26px] py-[12.76px] bg-green-200 rounded-lg shadow justify-center items-center gap-[8.51px] inline-flex";

  return (
    <button className={buttonClasses} onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
  onClick: PropTypes.func,
};
