// pages/projects.js
import fs from 'fs';
import path from 'path';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';

export default function Projects({ projects }) {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="section-title">Projects & Case Studies</h1>
          <p className="section-sub">Selected infrastructure and commercial projects where Wonder+ Pipes supplied materials and technical support.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem', marginTop: '1rem' }} className="product-grid">
            {projects.map(p => (
              <ProjectCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'projects.json');
  const raw = fs.readFileSync(dataPath, 'utf8');
  const projects = JSON.parse(raw);
  return { props: { projects } };
}
