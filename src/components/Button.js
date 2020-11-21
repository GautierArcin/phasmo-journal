import "./Button.css";

const Button = ({ variant, types, title, description, onClick, active }) => (
  <button
    className={`button ${variant} ${active ? "active" : ""}`}
    title={description}
    onClick={onClick}
  >
    {title}
  </button>
);

export default Button;
