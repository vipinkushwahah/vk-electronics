import "./Button.scss";

type ButtonProps = {
  text: string;
};

export const Button = ({ text }: ButtonProps) => {
  return <button className="custom-button">{text}</button>;
};

