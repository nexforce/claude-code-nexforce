# Nexforce Router para Claude Code

Recibo no terminal. Cada mudança de código que você faz com o Claude Code pelo
Nexforce Router mostra o custo em USD, no turno, no commit e no PR, e o
orçamento da sua chave fica visível antes de virar um erro de limite.

O painel ao lado da conversa traz:

- custo por modelo, com o modelo que a sessão pediu e o que o Router escolheu
  (`nexforce/auto → claude-sonnet-4-5`);
- custo por arquivo e por commit da sessão;
- orçamento da chave e do projeto, com quanto resta e quando volta;
- guardrails ativos e as chamadas que o Router recusou.

## Instalar

No prompt de uma sessão do Claude Code:

```
/plugin install nexforce-router --marketplace nexforce/claude-code-nexforce
```

Confirme com `y` para adicionar o marketplace e escolha o escopo.

## Conectar a chave

Se o seu Claude Code já fala com o Nexforce Router (via `ANTHROPIC_BASE_URL` em
`router.nexforce.ai`), o mod usa a mesma chave e não precisa de mais nada.

Senão, salve a chave `nfc_` no mod:

```
/plugin configure nexforce-router@nexforce
```

Cole a chave no campo "Chave do Nexforce Router". Ela fica no armazenamento
seguro do Claude Code. Depois rode `/reload-plugins` e `/nexforce`.

## Comandos

```
/nexforce          painel e conexão com o Router
/nexforce recibo   custo da sessão e desde o último commit
/nexforce trailer  liga ou desliga o custo carimbado no commit
/nexforce login    como salvar a chave do Router
```

## Privacidade

Por padrão o mod envia ao Router apenas repositório, branch, commit e
contagens. Caminho de arquivo, conteúdo, prompt e comando nunca saem sem o seu
consentimento explícito.
