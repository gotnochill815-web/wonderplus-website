import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import fs from 'fs';
import path from 'path';

export default function Home({ products }) {
  return (
    <Layout>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <h1 className="hero-title">Reliable uPVC Pipes & Plumbing Solutions — Built for Performance</h1>
            <p className="hero-sub">Manufacturing world-class uPVC, SN8 and perforated pipes for plumbing, irrigation and sewerage. ISO 9001:2015 certified — supplier to NHAI, PWD and other large projects.</p>
            <div className="hero-cta">
              <a href="/products" className="btn">View Products</a>
              <a href="/contact" className="btn btn--alt">Request Quote</a>
            </div>
            <ul className="quick-facts">
              <li><strong>Capacity:</strong> ~200 MT / month</li>
              <li><strong>Certifications:</strong> BIS, ISI, ISO 9001</li>
              <li><strong>Manufacturing:</strong> Bagru Industrial Area, Jaipur</li>
            </ul>
          </div>

          <div className="hero-media" aria-hidden="true">
            <img src="/images/factory/hero-pipes.jpg" alt="Stacks of manufactured uPVC pipes" className="hero-img" />
          </div>
        </div>
      </section>

      <section className="section section--alt" id="products">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-sub">uPVC, SN8, Perforated & Industrial fittings — reliable, tested, and ready for large projects.</p>
          <div className="product-grid">
            {products.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps(){
  const dataPath = path.join(process.cwd(), 'public', 'data', 'products.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const products = JSON.parse(raw);
  return { props: { products } };
}
