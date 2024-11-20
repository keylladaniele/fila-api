const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Fila armazenada na memória
let queue = [];

// Middleware para interpretar JSON
app.use(express.json());

// Adicionar jogador à fila
app.post('/add', (req, res) => {
  const player = req.query.name; // Obtém o nome do jogador via query string
  if (!player) return res.status(400).send('O nome do jogador é obrigatório!');
  if (!queue.includes(player)) {
    queue.push(player);
    res.send(`${player} foi adicionado à fila!`);
  } else {
    res.send(`${player} já está na fila!`);
  }
});

// Listar a fila
app.get('/list', (req, res) => {
  res.send(queue.length ? queue.join(', ') : 'A fila está vazia!');
});

// Remover jogador da fila
app.post('/remove', (req, res) => {
  const player = req.query.name; // Obtém o nome do jogador via query string
  if (!player) return res.status(400).send('O nome do jogador é obrigatório!');
  queue = queue.filter((p) => p !== player);
  res.send(`${player} foi removido da fila!`);
});

// Limpar fila
app.post('/clear', (req, res) => {
  queue = [];
  res.send('A fila foi limpa!');
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});

// Rota principal
app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Fila! Use os endpoints: /add, /list, /remove, /clear');
  });
  