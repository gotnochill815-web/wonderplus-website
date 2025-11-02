import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import fs from 'fs';
import path from 'path';

export default function Products({ products }) {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="section-title">Products</h1>
          <p className="section-sub">Explore our product lines. Click any item for a short spec and to request a quote.</p>

          <div style={{margin:'1rem 0 1.25rem', display:'flex', gap:'.5rem', flexWrap:'wrap'}}>
            <button className="btn btn--outline" data-filter="all" aria-pressed="true">All</button>
            <button className="btn btn--outline" data-filter="upvc">uPVC</button>
            <button className="btn btn--outline" data-filter="sn8">SN8</button>
            <button className="btn btn--outline" data-filter="perforated">Perforated</button>
            <button className="btn btn--outline" data-filter="fittings">Fittings</button>
          </div>

          <div id="products-grid" className="product-grid" aria-live="polite">
            {products.map(p => <ProductCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const buttons = document.querySelectorAll('[data-filter]');
          const grid = document.getElementById('products-grid');
          const items = Array.from(grid.children);

          buttons.forEach(btn=>{
            btn.addEventListener('click', ()=>{
              buttons.forEach(b=>b.setAttribute('aria-pressed','false'));
              btn.setAttribute('aria-pressed','true');
              const filter = btn.dataset.filter;
              if(filter==='all'){ items.forEach(i=> i.style.display='block'); return; }
              items.forEach(i=>{
                const txt = i.querySelector('.product-title')?.textContent?.toLowerCase() || '';
                // simple category filter using data-attr on image src or title; better: embed data-category as attribute
                if(i.innerHTML.includes(\`"${filter}"\`) || txt.includes(filter)) i.style.display='block';
                else i.style.display='none';
              });
            });
          });
        })();
      `}} />
    </Layout>
  );
}

export async function getStaticProps(){
  const dataPath = path.join(process.cwd(), 'public', 'data', 'products.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const products = JSON.parse(raw);
  return { props: { products } };
}
