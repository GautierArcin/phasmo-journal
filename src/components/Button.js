import "./Button.css";

const Button = ({
  variant,
  types,
  title,
  description,
  onClick,
  active,
  unactive,
  selected,
}) => (
  <button
    className={`button ${variant} ${active ? "active" : ""} ${
      unactive ? "unactive" : ""
    } ${selected ? "selected" : ""}`}
    title={description}
    onClick={onClick}
  >
    {title}
  </button>
);

export default Button;
