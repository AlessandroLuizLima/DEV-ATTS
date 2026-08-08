const express = require('express');
const router = express.Router();

/**
 * GET /webhook
 * Endpoint de verificação (challenge) exigido por provedores como Meta/WhatsApp.
 * O provedor envia hub.mode, hub.verify_token e hub.challenge via query string.
 * Se o token bater com o configurado no .env, devolvemos o challenge em texto puro.
 */
router.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const verifyToken = process.env.WEBHOOK_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('[webhook] Verificação bem-sucedida.');
    return res.status(200).send(challenge);
  }

  console.warn('[webhook] Falha na verificação: token inválido ou modo incorreto.');
  return res.sendStatus(403);
});

/**
 * POST /webhook
 * Endpoint de recepção de eventos/payloads.
 * Por enquanto apenas loga e confirma o recebimento (200).
 * A persistência em banco será implementada no encontro de webhooks.
 */
router.post('/', (req, res) => {
  console.log('[webhook] Payload recebido:', JSON.stringify(req.body, null, 2));

  // TODO (encontro de webhooks): persistir em tabela mensagens
  // (id_externo, status, payload_bruto)

  return res.sendStatus(200);
});

module.exports = router;