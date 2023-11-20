const FormLayout = ({ children }) => {
  return (
    <div className="m-4  d-flex justify-content-center">
      <div className="row">{children}</div>
    </div>
  );
};

export default FormLayout;
