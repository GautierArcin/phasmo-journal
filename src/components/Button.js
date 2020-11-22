import "./Button.css";

const Button = ({
  variant,
  types,
  title,
  description,
  onClick,
  active,
  unactive,
}) => (
  <button
    className={`button ${variant} ${active ? "active" : ""} ${
      unactive ? "unactive" : ""
    }`}
    title={description}
    onClick={onClick}
  >
    {title}
  </button>
);

export default Button;
