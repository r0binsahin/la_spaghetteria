interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  buttonLabel: string;
}

export const ComponentWithButton = ({
  children,
  onClick,
  buttonLabel,
}: ButtonProps) => (
  <div>
    {children}
    <button onClick={onClick}>{buttonLabel}</button>
  </div>
);
