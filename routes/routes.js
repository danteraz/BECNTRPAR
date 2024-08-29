const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Importar db.js da pasta config
const QRCode = require('qrcode'); // Se for necessário para outras funcionalidades
/*
// No backend (id.js)
console.log('ROUTES.JS Valor de mensagem recebido');

// Rotas para Administradores
router.post('/administradores', async (req, res) => {
  const { nome, fone, email, senha, usuario } = req.body;

  console.log('ROUTES.JS POST');

  try {
    const [result] = await db.execute(
      'INSERT INTO administradores (nome, fone, email, senha, usuario) VALUES (?, ?, ?, ?, ?)',
      [nome, fone, email, senha, usuario]
    );
    res.status(201).json({ id: result.insertId, nome, fone, email, senha, usuario });
  } catch (error) {
    console.error('Erro ao cadastrar administrador:', error); // Log detalhado do erro
    res.status(500).json({ error: 'Erro ao cadastrar administrador', detalhes: error.message });
  }
});

// Rota PUT para atualização de administradores
router.put('/administradores/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, fone, email, senha, usuario, mensagem } = req.body;
  try {
    const [result] = await db.execute(
      'UPDATE administradores SET nome = ?, fone = ?, email = ?, senha = ?, usuario = ?, mensagem = ? WHERE idAdministrador = ?',
      [nome, fone, email, senha, usuario, mensagem, id]
    );
    res.status(200).json({ id, nome, fone, email, senha, usuario, mensagem });
  } catch (error) {
    console.error('Erro ao atualizar administrador:', error);
    res.status(500).json({ error: 'Erro ao atualizar administrador', detalhes: error.message });
  }
});

router.get('/administradores', async (req, res) => {

  console.log('ROUTES.JS GET');

  try {
    const [rows] = await db.query('SELECT * FROM administradores');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar administradores' });
  }
});
*/

// Rotas para Palestras
router.post('/palestras', async (req, res) => {
  const { titulo, dataPalestra, hora, localPalestra, organizador, assunto } = req.body;
  try {
    const qrData = `${titulo} - ${dataPalestra} ${hora} - ${localPalestra}`;
    const qrCode = await QRCode.toDataURL(qrData);

    const [result] = await db.execute(
      'INSERT INTO palestras (titulo, dataPalestra, hora, localPalestra, organizador, assunto, qrCode) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [titulo, dataPalestra, hora, localPalestra, organizador, assunto, qrCode]
    );
    res.status(201).json({ idPalestra: result.insertId, titulo, dataPalestra, hora, localPalestra, organizador, assunto, qrCode });
  } catch (error) {
    console.error('Erro ao cadastrar palestra:', error);
    res.status(500).json({ error: 'Erro ao cadastrar palestra', detalhes: error.message });
  }
});

router.get('/palestras', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM palestras');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar palestras' });
  }
});

// Rotas para Participantes
router.post('/participantes', async (req, res) => {
  const { nome, fone, email } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO participantes (nome, fone, email) VALUES (?, ?, ?)',
      [nome, fone, email]
    );
    res.status(201).json({ idParticipante: result.insertId, nome, fone, email });
  } catch (error) {
    console.error('Erro ao cadastrar participante:', error);
    res.status(500).json({ error: 'Erro ao cadastrar participante', detalhes: error.message });
  }
});

router.get('/participantes', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM participantes');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar participantes' });
  }
});

// Rotas para Presenças
router.post('/presencas', async (req, res) => {
  const { idPalestra, idParticipante } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO presencas (idPalestra, idParticipante) VALUES (?, ?)',
      [idPalestra, idParticipante]
    );
    res.status(201).json({ id: result.insertId, idPalestra, idParticipante });
  } catch (error) {
    console.error('Erro ao registrar presença:', error);
    res.status(500).json({ error: 'Erro ao registrar presença', detalhes: error.message });
  }
});

router.get('/presencas', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM presencas');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar presenças' });
  }
});

module.exports = router;
