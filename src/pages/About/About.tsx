import "./About.css";

function AboutPage() {
  return (
    <section className="about-page">

      <div className="about-hero">
        <h1 className="about-title">
          About Product Catalog
        </h1>

        <p className="about-subtitle">
          A modern ecommerce experience built with React and TypeScript.
        </p>
      </div>

      <div className="about-content">

        <div className="about-card">
          <h2>Project Story</h2>

          <p>
            Product Catalog was created as a frontend learning project focused
            on building a clean and scalable ecommerce interface.
          </p>

          <p>
            The goal of the project was not only to display products from an API,
            but also to implement real-world frontend features such as filtering,
            sorting, favorites, comparison tables, localStorage persistence,
            reusable components, and responsive layouts.
          </p>
        </div>

        <div className="about-card">
          <h2>Features</h2>

          <ul className="about-list">
            <li>Product search and filtering</li>
            <li>Favorites system</li>
            <li>Compare products functionality</li>
            <li>Responsive UI</li>
            <li>Toast notifications</li>
            <li>Reusable React components</li>
            <li>Custom hooks and utilities</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Tech Stack</h2>

          <div className="tech-stack">
            <span>React</span>
            <span>TypeScript</span>
            <span>React Router</span>
            <span>CSS</span>
            <span>LocalStorage</span>
            <span>DummyJSON API</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutPage;