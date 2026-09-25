import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory sample data
const products = [
  {
    id: 1,
    name: 'Starter Plan',
    price: 9,
    description: 'For individuals getting started.',
  },
  {
    id: 2,
    name: 'Team Plan',
    price: 29,
    description: 'For small teams that collaborate.',
  },
  {
    id: 3,
    name: 'Enterprise Plan',
    price: 99,
    description: 'For organizations at scale.',
  },
];

// Collected contact submissions (in-memory only)
const messages = [];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sample message endpoint consumed by the Home page
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the Node.js + Express backend!' });
});

// Sample product catalog consumed by the Products page
app.get('/api/products', (req, res) => {
  res.json({ products });
});

// Contact form submission consumed by the Contact page
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: 'name, email, and message are all required.' });
  }

  const entry = { id: messages.length + 1, name, email, message };
  messages.push(entry);

  return res
    .status(201)
    .json({ success: true, message: `Thanks, ${name}! We'll be in touch.` });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server running on http://localhost:${PORT}`);
});

export default app;
