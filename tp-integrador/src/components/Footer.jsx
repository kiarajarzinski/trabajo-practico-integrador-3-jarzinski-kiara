export const Footer = () => {
    const year = new Date().getFullYear();
  return (
    <footer className="w-100 bg-primary text-white py-3 mt-auto shadow-sm">
      <div className="container d-flex flex-column flex-sm-row justify-content-between align-items-center text-center text-sm-start">
        <p className="mb-1 small">© {year} | Desarrollado por <span className="fw-bold">Jarzinski Kiara Itzel</span></p>
        <p className="mb-0 small text-white-50">Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};