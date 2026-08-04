# Integração com WhatsApp Business API

## 1. Visão Geral

Este documento descreve a integração realizada com a WhatsApp Business Platform (Meta)
para envio de mensagens via API, incluindo configuração, endpoints utilizados e
testes realizados (sucesso e erros).

## 2. Configuração

- **Plataforma:** Meta for Developers (WhatsApp Business Platform)
- **App:** DEV-ATTS
- **Tipo de conta:** Número de teste (sandbox)
- **Phone Number ID:** 1228894436975793
- **WhatsApp Business Account ID:** 1688086626654182

> ⚠️ O Access Token não é incluído neste documento por questões de segurança.
> Ele deve ser gerado no painel do Meta for Developers e armazenado apenas em
> variáveis de ambiente locais (.env), nunca versionado no repositório.

## 3. Endpoint utilizado

**Enviar mensagem (template)**

POST https://graph.facebook.com/v25.0/{phone_number_id}/messages

**Headers:**

| Header | Valor |
|---|---|
| Authorization | Bearer {access_token} |
| Content-Type | application/json |

**Body (exemplo — template hello_world):**
```json
{
  "messaging_product": "whatsapp",
  "to": "{numero_destinatario}",
  "type": "template",
  "template": {
    "name": "hello_world",
    "language": { "code": "en_US" }
  }
}
```

## 4. Teste de sucesso

Envio do template `hello_world` para número verificado retornou status **200**
com o `wamid` de confirmação. Print da resposta disponível em
`docs/evidencias/aula-03/`.

## 5. Erros provocados e documentados

### Erro 131030 — Destinatário não verificado
Ocorre ao tentar enviar mensagem para um número que não está na lista de
destinatários autorizados da conta de teste (sandbox). A API retorna a
mensagem "Recipient phone number not in allowed list".

### Erro 401 / code 190 — Token de autenticação inválido
Ocorre quando o Access Token enviado no header `Authorization` está
incorreto, malformado ou expirado. A API retorna `Authentication Error`
com status HTTP 401.

## 6. Segurança

- O arquivo `.env` está listado no `.gitignore` e não é versionado.
- O `.env.example` contém apenas os nomes das variáveis necessárias, sem valores reais.
- Nenhum token de acesso foi commitado neste repositório.

## 7. Evidências

Prints de configuração, testes e erros disponíveis em:
`docs/evidencias/aula-03/`