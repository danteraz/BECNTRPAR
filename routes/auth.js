// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Verificar se existem administradores
router.get('/check-admins', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) as count FROM administradores');
    const count = rows[0].count;
    res.status(200).json({ exists: count > 0 });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao verificar administradores' });
  }
});

// Autenticar usuário
router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;
  try {
    const [rows] = await db.execute(
      'SELECT * FROM administradores WHERE usuario = ? AND senha = ?',
      [usuario, senha]
    );
    if (rows.length > 0) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ error: 'Usuário e/ou Senha inválido(s)' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao autenticar usuário' });
  }
});

// Verificar se o usuário existe
router.post('/check-user', async (req, res) => {
  const { usuario } = req.body;
  try {
    const [rows] = await db.execute(
      'SELECT * FROM administradores WHERE usuario = ?',
      [usuario]
    );
    res.status(200).json({ exists: rows.length > 0 });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao verificar usuário' });
  }
});

module.exports = router;
