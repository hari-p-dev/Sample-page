import { useState } from 'react';

const initialForm = { name: '', email: '', message: '' };

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('submitting');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      setStatus('success');
      setFeedback(data.message);
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setFeedback(err.message);
    }
  };

  return (
    <section>
      <h1>Contact</h1>
      <p>Send us a message. This posts to the Express backend.</p>

      <form className="card form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Message
          <textarea
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            required
          />
        </label>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending...' : 'Send message'}
        </button>

        {status === 'success' && <p className="message">{feedback}</p>}
        {status === 'error' && <p className="error">{feedback}</p>}
      </form>
    </section>
  );
}

export default Contact;
