// client-side: send JSON to /api/contact
async function handleContactSubmit(e) {
  e.preventDefault();
  const statusEl = document.getElementById('formStatus');
  statusEl.textContent = 'Sending…';
  statusEl.style.color = 'var(--color-muted)';

  const form = e.target;
  const payload = {
    name: form.name.value || '',
    company: form.company.value || '',
    email: form.email.value || '',
    phone: form.phone.value || '',
    message: form.message.value || '',
    _subject: form._subject ? form._subject.value : 'Website enquiry'
  };

  // Basic validation
  if (!payload.name.trim() || !payload.email.trim() || !payload.message.trim() || !payload.phone.trim()) {
    statusEl.textContent = 'Please fill out required fields.';
    statusEl.style.color = '#c0392b';
    return;
  }

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      statusEl.textContent = 'Thank you — your message has been sent.';
      statusEl.style.color = 'green';
      form.reset();
    } else {
      const json = await res.json();
      statusEl.textContent = json?.error || 'Submission failed. Try again later.';
      statusEl.style.color = '#c0392b';
    }
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Network error. Try again later.';
    statusEl.style.color = '#c0392b';
  }
}
