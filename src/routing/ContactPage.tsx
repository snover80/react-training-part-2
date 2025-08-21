import { useNavigate } from "react-router-dom";

// Usando el hook navigate, podemos decirle de manera programetica que vayamos a una pagina o ruta en especifico
const ContactPage = () => {
  const navigate = useNavigate();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        navigate("/");
      }}
    >
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ContactPage;
