export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/images/logo/logo-footer.svg" alt="Wonder+ Pipes logo" width="140"/>
          <p className="muted">Manufacturing: G-153-54, Bagru Industrial Area (Ext), Jaipur, Rajasthan</p>
        </div>
        <div className="footer-links">
          <h4>Quick links</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Phone: <a href="tel:+919351428939">9351428939</a></p>
          <p>Email: <a href="mailto:rgpolymers.jpr@gmail.com">rgpolymers.jpr@gmail.com</a></p>
        </div>
      </div>
      <div className="site-credit">
        <div className="container">
          <small>© {new Date().getFullYear()} Wonder+ Pipes & Fittings — All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
