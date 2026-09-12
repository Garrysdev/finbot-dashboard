---
tags: [finbot, historico, seed]
---

# Histórico Base — antes do primeiro Relatório Semanal automático

Este ficheiro existe para que o agente do relatório semanal (routine agendada) tenha contexto do
que já foi decidido, testado ou corrigido antes de 12/09/2026 — para **nunca propor de novo algo
já feito ou já rejeitado**. Não é um relatório semanal em si; é o ponto de partida.

## Correções e decisões já aplicadas (09/09 a 12/09/2026)

- **09/09**: projeto mudou de caminho G:\→D:\, partiu 5 tarefas agendadas do Windows (falhavam em
  silêncio). Corrigido — todas as tarefas usam agora o caminho D:\ correto.
- **05/09**: bug de tick value do Ouro (XAUUSD) inflacionava o P/L registado em 8,61x. Corrigido no
  código dos EAs; o histórico anterior a essa data continua com o valor errado nos registos antigos
  (afeta cálculos que somem todo o histórico, ex. o disjuntor).
- **11/09**: dois dos três bloqueios do disjuntor (`bot_circuit_breaker.py`) eram inválidos por
  causa do bug acima — o 777151 (Gold M15 1k) era na verdade lucrativo. O 777151 voltou a
  bloquear-se sozinho horas depois porque o disjuntor soma histórico desde 2020 (inclui o período
  do bug). **Ainda por resolver**: mudar o disjuntor para janela móvel em vez de "desde sempre" —
  já identificado, ainda não implementado. Não propor "corrigir os bloqueios inválidos" sem
  verificar se esta correção de fundo já foi feita.
- **11/09**: construído o watchdog autónomo da frota (`fleet_watchdog.py` +
  `fleet_watchdog_deadman.py`, tarefas `FinBot_Fleet_Watchdog` 15/15min e `FinBot_Watchdog_DeadMan`
  60/60min). Cobre heartbeat, kill files, símbolos não negociáveis, AlgoTrading, e vigia as
  próprias tarefas agendadas. Não propor "criar um sistema de vigilância" — já existe.
- **11/09**: reconstruído por completo o FinBot Sports — a versão anterior inventava jogos e odds
  (`random.shuffle` + odd do próprio modelo inflacionada por número aleatório). Substituído por
  dados reais da The Odds API (`ODDS_API_KEY` no `.env`). Não propor "verificar se as odds são
  reais" — já verificado e corrigido.
- **11/09**: dois bugs reais apanhados por backtest no Dixon-Coles: (1) erro de escala que
  sub-estimava golos em ~27% e inflacionava artificialmente apostas "Menos de 2.5" — corrigido; (2)
  amostra pequena sem regularização em equipas com histórico parcial dava EVs de 40-115% —
  mitigado com tecto de sanidade (`MAX_EV_SANITY_CAP=0.25`, `MAX_ACCA_EV≈0.625`). Não propor
  "verificar se o modelo está bem calibrado" sem primeiro ver se o desvio já está dentro do
  esperado (1-3pp nas 7 ligas domésticas, validado).
- **11/09**: preço de execução restrito só à Pinnacle (decisão do Rui — quer valores que
  correspondam ao que conseguiria executar numa conta real). Não propor voltar a "melhor odd entre
  várias casas".
- **11/09**: tecto de exposição da carteira (`MAX_PORTFOLIO_EXPOSURE_PCT=1.0`, nunca mais que 1x a
  banca em aberto) e correção da independência nas múltiplas (rejeita pernas que partilhem
  qualquer equipa, não só o mesmo fixture_id).
- **11/09→12/09**: UEFA Champions League ligada via transferência de rating a partir das 7 ligas
  domésticas (`models/cross_league_transfer.py`), validada contra 144 jogos reais da fase de liga
  2024/25 (dataset GitHub `tarekmasryo/Football-Matches-Results-2024-25-Dataset`). Tecto de EV mais
  apertado para a UEFA (`UEFA_EV_SANITY_CAP=0.15`). **Liga Europa continua desativada** — sem fonte
  de histórico própria para validar. Não propor "adicionar competições UEFA" sem verificar que a
  Champions já está e porque a Europa League não está.
- **Combinado, não construído ainda**: Ténis ATP e NBA — o Rui pediu para ficarem para depois da
  UEFA. Nenhum dos dois tem histórico carregado nem modelo. Não é reaproveitamento (como a UEFA),
  é construção de raiz.
- **12/09**: relatório semanal reconstruído — a tarefa anterior (`FinBot_Weekly_Report_20260904`)
  era um disparo único, nunca repetia. Corrigido para tarefa semanal a sério, e adicionada a
  secção de balanço do FinBot Sports com análise estratégica. Esta própria routine (o agente que
  está a ler este ficheiro agora) é a evolução seguinte disso — pedida pelo Rui explicitamente
  porque queria uma análise redigida por mim, não uma tabela.

## Regra permanente para todos os relatórios seguintes

Antes de escrever qualquer proposta de alteração, ler os relatórios anteriores em `reports/`
(ordenados por data) e verificar se a mesma ideia já foi proposta, testada, aceite ou rejeitada.
Se já foi tratada, dizer isso explicitamente em vez de a repetir como se fosse nova.
