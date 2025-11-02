// pages/quality.js
import Head from 'next/head';
import Layout from '../components/Layout';
import { useState } from 'react';

// Certificate image list (matches your /assets/images/certificates folder)
const CERTIFICATES = [
  { file: '/assets/images/certificates/Screenshot 2025-10-31 231236.png', title: 'ISO 9001:2015', subtitle: 'Quality Management System' },
  { file: '/assets/images/certificates/Screenshot 2025-10-31 231318.png', title: 'BIS Certificate (1)', subtitle: 'Bureau of Indian Standards' },
  { file: '/assets/images/certificates/Screenshot 2025-10-31 231329.png', title: 'BIS Certificate (2)', subtitle: 'Bureau of Indian Standards' },
  { file: '/assets/images/certificates/Screenshot 2025-10-31 231348.png', title: 'Test Report (1)', subtitle: 'Dimensional & Visual Test' },
  { file: '/assets/images/certificates/Screenshot 2025-10-31 231358.png', title: 'Test Report (2)', subtitle: 'Hydrostatic & Mechanical Test' },
];

export default function Quality() {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const openLightbox = (i) => setLightbox({ open: true, index: i });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prev = () => setLightbox(s => ({ ...s, index: (s.index - 1 + CERTIFICATES.length) % CERTIFICATES.length }));
  const next = () => setLightbox(s => ({ ...s, index: (s.index + 1) % CERTIFICATES.length }));

  return (
    <Layout>
      <Head>
        <title>Quality & Certifications — Wonder+ Pipes</title>
        <meta
          name="description"
          content="Wonder+ Pipes — Quality certifications, ISO 9001:2015, BIS/ISI approvals, and internal test reports."
        />
      </Head>

      {/* === QUALITY POLICY SECTION === */}
      <section className="section">
        <div className="container">
          <h1 className="section-title">Quality & Certifications</h1>
          <p className="section-sub">
            Our commitment to quality — accredited laboratories, certified processes and standards-compliant manufacturing.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>
            <div>
              <h3>Certifications</h3>
              <ul>
                <li><strong>BIS / ISI</strong> — Manufactured as per ISI 4985 and IS 15328.</li>
                <li><strong>ISO 9001:2015</strong> — Certified quality management system.</li>
                <li><strong>CIPET</strong> — Process & equipment certification.</li>
                <li><strong>GreenCo Platinum</strong> — Sustainability compliance certification.</li>
              </ul>

              <h3 style={{ marginTop: '.8rem' }}>Testing & Lab</h3>
              <p>
                We conduct dimensional, tensile, impact, and hydrostatic tests on every batch. 
                Our laboratory is equipped with vacuum tanks, extrusion monitoring systems, and
                cutting machines that ensure consistency in pipe quality and mechanical strength.
              </p>

              <h3 style={{ marginTop: '.8rem' }}>Quality Policy</h3>
              <p>
                Wonder+ Pipes maintains strict incoming material checks, in-process QC, and 
                pre-dispatch inspections to ensure conformance to standards and customer expectations.
                Detailed test certificates accompany each major dispatch for complete transparency.
              </p>
            </div>

            <aside>
              <div className="card" style={{ padding: '1rem', marginBottom: '1rem' }}>
                <h4>Testing Lab Snapshot</h4>
                <img
                  src="/assets/images/factory/lab.jpg"
                  alt="Quality lab"
                  style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 8, marginTop: '.5rem' }}
                />
              </div>

              <div className="card" style={{ padding: '1rem' }}>
                <h4>Quality Contact</h4>
                <p className="muted">For technical queries or certification requests, contact our Quality Head:</p>
                <p><strong>quality@wonderplus.example</strong></p>
                <p className="muted">Phone: <a href="tel:+919351428939">9351428939</a></p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* === CERTIFICATES GRID === */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="section-title">Certificates & Accreditations</h2>
          <p className="section-sub">
            Click any certificate to view it in full size.
          </p>

          <div className="certificates-grid" style={{ marginTop: '1rem' }}>
            {CERTIFICATES.map((c, i) => (
              <div
                className="certificate-card"
                key={c.file}
                onClick={() => openLightbox(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
              >
                <img src={c.file} alt={c.title} />
                <h4>{c.title}</h4>
                <p className="muted">{c.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === LIGHTBOX === */}
      {lightbox.open && (
        <div className="modal" style={{ display: 'flex' }} onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="modal-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '90vw', padding: 0 }}>
            <button className="modal-close" aria-label="Close" onClick={closeLightbox}>✕</button>
            <div style={{ position: 'relative', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
              <img
                src={CERTIFICATES[lightbox.index].file}
                alt={CERTIFICATES[lightbox.index].title}
                style={{ width: '100%', height: '70vh', objectFit: 'contain', background: '#f8fafc' }}
              />
              <div style={{ position: 'absolute', left: 8, top: 8 }}>
                <strong style={{ color: '#fff', textShadow: '0 1px 3px rgba(0,0,0,.6)' }}>
                  {CERTIFICATES[lightbox.index].title}
                </strong>
              </div>
              <div style={{ position: 'absolute', right: 8, top: 8, display: 'flex', gap: 8 }}>
                <button className="btn btn--outline" onClick={prev}>Prev</button>
                <button className="btn btn--outline" onClick={next}>Next</button>
              </div>
            </div>
            <div style={{ padding: '.75rem' }}>
              <p style={{ margin: 0 }}>
                <strong>{CERTIFICATES[lightbox.index].title}</strong> —{' '}
                <span className="muted">{CERTIFICATES[lightbox.index].subtitle}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
