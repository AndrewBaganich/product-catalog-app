import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-left">
          <h2 className="footer-logo">
            Product Catalog
          </h2>

          <p className="footer-text">
            Simple ecommerce catalog built with React and TypeScript.
          </p>
        </div>

        <div className="footer-right">
          <p className="footer-copy">
            © 2026 Andrew Baganich.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;