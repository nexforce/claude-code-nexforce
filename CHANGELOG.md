# Changelog do nexforce-router

Mod do Nexforce Router para Claude Code. Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/), versões em [SemVer](https://semver.org/lang/pt-BR/).

A versão aparece em três lugares, que andam juntos: `version` em `.claude-plugin/plugin.json`, `VERSION` em `hooks/register.tsx` (mostrada abaixo do banner do painel e no `/nexforce`) e o título da entrada neste arquivo.

## [0.2.6] - 2026-11-12

### Alterado
- Versão de manutenção, sem mudança no comportamento do painel.

## [0.2.5] - 2026-11-12

### Alterado
- Modelos: cada linha mostra o modelo que a sessão pediu e o que o Router escolheu, `nexforce/auto → claude-sonnet-4-5`. O pedido vem de `e.model` e a resposta de `usage.model`, os dois no mesmo `turn.step`. Quando o pedido e a resposta são o mesmo modelo, mostra um só.

## [0.2.4] - 2026-11-12

### Alterado
- Painel: os títulos das seções voltaram ao laranja do Claude Code.
- Cada seção é separada por uma linha tracejada na cor `subtle`, como o Claude Code separa o bloco do Diff. A linha é uma fileira de `╌` cortada na borda do painel, igual em todas as telas.

## [0.2.3] - 2026-11-12

### Alterado
- Painel mais minimalista: sem caixas com borda, cada seção é só um título em negrito e uma linha em branco.
- Orçamento numa linha só: `~USD 175,63/200,00 - Reset em 30/11`. O rótulo (`chave`, `projeto`) só aparece quando há mais de um orçamento.
- Commitado e Sem commit voltaram a ser um bloco só, **Commits**: os commits da sessão e, logo depois, o que ainda não foi commitado, sob o título `sem commit`.
- Guardrails: a linha diz de que camada é a regra e conta filtros, `regra da chave: 1 filtro de redação`. Antes `chave: 1 de redação` parecia "chave número 1"; `chave` é a camada (chave, projeto ou organização), não um número.

## [0.2.2] - 2026-11-12

### Alterado
- Painel: a seção Commits virou duas, **Commitado** (os commits da sessão, do mais antigo ao mais novo, com sha, assunto, arquivos alterados, linhas e custo) e **Sem commit** (o que ainda não foi commitado, como era).
- Os commits vêm do `git log` desde o início da sessão, não só dos que o Claude Code fez pela ferramenta Bash: commit feito no terminal, por outra ferramenta ou antes de o mod carregar também aparece. Esses mostram `custo não medido pelo mod`, porque o mod só tem tokens e custo do commit que viu acontecer.

## [0.2.1] - 2026-11-12

### Adicionado
- Seção Orçamento no painel, acima de Modelos: uma linha por orçamento (chave e projeto) com quanto resta, o limite e quando volta, e a organização só quando estourou. Saiu do cabeçalho.

### Corrigido
- Painel no Claude Code Desktop: o banner em blocos quebrava e os traços entre as seções passavam da largura. Fora do terminal o título é o texto NEXFORCE, e cada seção é uma caixa com borda desenhada pela própria tela.

## [0.2.0] - 2026-11-12

### Adicionado
- Painel Nexforce ao lado da conversa: banner, versão, conexão, orçamento e as seções Modelos, Commits, Arquivos e Guardrails. Abre sozinho uma vez por sessão.
- Orçamento na linha de status, lido de `GET /v1/nexforce/me` no máximo uma vez por minuto: `orçamento da chave ~USD 178,27 de USD 200,00 │ sessão │ ritmo │ branch`. Org estourada aparece como `org sem orçamento`.
- Faixa de aviso de orçamento acima do prompt a 80%, 90% e 100%, com ritmo, data em que volta e se o Router bloqueia ou só avisa. `ok` esconde até o próximo patamar.
- Seção Guardrails no painel: regras ativas por camada, aviso quando o modelo da sessão está fora do permitido e chamadas recusadas pelo Router na sessão.
- Custo carimbado no commit, opcional: `Nexforce-Cost` e `Nexforce-Tokens`.
- Subcomandos `/nexforce recibo`, `/nexforce trailer` e `/nexforce login`.

### Alterado
- `/nexforce` passa a abrir o painel, além de mostrar a conexão.
- Valores sempre em USD.

## [0.1.0] - 2026-11-12

### Adicionado
- Instalação pelo marketplace do repositório.
- `/nexforce` mostra a conexão com o Router: conectado, chave recusada, chave desativada, Router sincronizando, sem resposta, sem chave. A chave aparece só com os 4 últimos caracteres.
- Chave do `userConfig` ou a mesma que o Claude Code já manda ao Router; uma chave de outro host nunca vai ao Router.
- `/nexforce login` explica como salvar a chave.
