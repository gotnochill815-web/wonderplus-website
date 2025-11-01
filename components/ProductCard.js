import Link from 'next/link';

export default function ProductCard({p}){
  return (
    <article className="product-card">
      <img src={p.image.replace(/^assets\/images/, '/images')} alt={p.title} className="product-img" />
      <h3 className="product-title">{p.title}</h3>
      <p className="product-desc">{p.short}</p>
      <div style={{display:'flex', gap:'.5rem', alignItems:'center'}}>
        <a href={`#${p.id}`} className="product-link">View details →</a>
        <Link href="/contact"><a className="btn btn--outline" style={{marginLeft:'auto'}}>Request Quote</a></Link>
      </div>
    </article>
  );
}
