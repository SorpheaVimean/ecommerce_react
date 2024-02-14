import PropTypes from "prop-types";

export const Btncompo = ({ label, type, onClick, icon }) => {
  const buttonClasses =
    type === "primary"
      ? "bg-BgBtn hover:bg-BgBtnHover text-white  py-3 rounded-lg mt-2 px-4"
      : "   border border-dashed border-BgBtn hover:bg-BgBtn hover:text-white duration-300 text-black  py-3 rounded-lg mt-2 px-4";
      
  return (
    <button className={buttonClasses} onClick={onClick}>
      {icon}
      {label}
    </button>
  );
};

Btncompo.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["primary", "secondary"]).isRequired,
  onClick: PropTypes.func,
};
