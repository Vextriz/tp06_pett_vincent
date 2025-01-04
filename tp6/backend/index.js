const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secretKey = 'key';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulated data (instead of a database)
let clients = [
    { id: 1, username: 'admin', password: 'admin' },
    { id:2, username: 'vpett', password: 'vpett'}
];
let products = [
    { id: 1, name: 'Product A', category: 'Category 1', price: 100, stock: 10 },
    { id: 2, name: 'Product B', category: 'Category 2', price: 150, stock: 5 },
    { id: 3, name: 'Product C', category: 'Category 3', price: 200, stock: 0 }
];


// Routes

// Login API

app.get('/', (req, res) => {
  res.send('Bienvenue sur le serveur Node.js !');
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = clients.find(u => u.username === username);
  if (!user) {
    return res.status(404).json({ message: 'Utilisateur non trouvé' });
  }

  if (password != user.password) {
    console.log("Password : ",password)
    console.log("User Password : ",user.password)
    return res.status(401).json({ message: 'Mot de passe incorrect' });
  }

  // Générer un jeton JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    secretKey,
    { expiresIn: '1h' } // Durée de validité : 1 heure
  );

  res.json({ message: 'Connexion réussie', token });
});

// Get Products API
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/clients',(req,res) => {
    res.json(clients)
})
// Create a new client account
app.post('/api/client', (req, res) => {
    const client = req.body;
    client.id = clients.length + 1; // Simulate ID generation
    clients.push(client);
    res.json({ message: 'Client created successfully', client });
});

// Update client information
app.put('/api/client/:id', (req, res) => {
    const { id } = req.params;
    const updatedClient = req.body;
    const index = clients.findIndex(u => u.id == id);
    if (index !== -1) {
        clients[index] = { ...clients[index], ...updatedClient };
        res.json({ message: 'Client updated successfully', client: clients[index] });
    } else {
        res.status(404).json({ message: 'Client not found' });
    }
});

// Middleware pour vérifier le jeton JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    req.user = user;
    next();
  });
};

// Exemple : Protéger la route des produits
app.get('/api/products', authenticateToken, (req, res) => {
  res.json(products);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
