import Layout from '../components/Layout';

export default function About(){
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'1fr 380px', gap:'2rem', alignItems:'start'}}>
            <div>
              <h1 className="section-title">About Wonder+ Pipes</h1>
              <p className="section-sub">Certified manufacturer of uPVC SWR, SN8 and perforated pipes for plumbing, irrigation and sewerage. Headquartered in Jaipur, we combine ISO-certified processes with precision extrusion machinery to deliver consistent quality for large infrastructure projects.</p>
              <h3>Our Vision</h3>
              <p>To be a trusted partner for infrastructure and construction industries by delivering reliable piping solutions that combine durability, cost-efficiency and compliance to industry standards.</p>
              <h3>Key Strengths</h3>
              <ul>
                <li>ISO 9001:2015 quality management systems</li>
                <li>ISI & BIS certified products</li>
                <li>Supplier to government infrastructure projects and contractors</li>
                <li>Experienced manufacturing team & quality lab</li>
              </ul>
            </div>
            <aside>
              <div className="card" style={{padding:'1rem'}}>
                <h4>Quick Facts</h4>
                <ul className="muted">
                  <li><strong>Established:</strong> 2012</li>
                  <li><strong>Monthly Capacity:</strong> ~200 MT</li>
                  <li><strong>Location:</strong> Bagru Industrial Area, Jaipur</li>
                  <li><strong>Contact:</strong> 9351428939</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
