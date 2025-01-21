export const FormErrorMessage = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <p className="text-red-500 text-sm">{children}</p>;
};
