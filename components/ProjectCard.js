// components/ProjectCard.js
import Link from 'next/link';

export default function ProjectCard({ p }) {
  return (
    <article className="product-card" style={{ cursor: 'pointer' }}>
      <img src={p.image} alt={p.title} className="product-img" />
      <h3 className="product-title">{p.title}</h3>
      <p className="product-desc">{p.scope}</p>
      <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
        <Link href={`/projects/${p.id}`}><a className="btn btn--outline">View details →</a></Link>
        <Link href="/contact"><a className="btn" style={{ marginLeft: 'auto' }}>Contact</a></Link>
      </div>
    </article>
  );
}

