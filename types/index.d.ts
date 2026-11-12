// GET /v1/nexforce/me, as the Router returns it.
export type Budget = {
  scope: 'key' | 'project' | 'org'
  period: 'daily' | 'weekly' | 'monthly'
  resets_at: string
  on_limit: 'block' | 'alert'
  exceeded: boolean
  limit_usd: number | null
  spent_usd: number | null
  remaining_usd: number | null
}

export type GuardrailLayer = {
  allowed_models: string[] | null
  denied_models: string[] | null
  allowed_providers: string[] | null
  content_filters: { block: number; redact: number }
} | null

export type Me = {
  budgets: Budget[]
  guardrails: { key: GuardrailLayer; project: GuardrailLayer; org: GuardrailLayer }
}

export type Connection =
  | { state: 'no-key' }
  | { state: 'connected' }
  | { state: 'invalid' }
  | { state: 'inactive'; code: string }
  | { state: 'syncing' }
  | { state: 'offline' }
  | { state: 'unexpected'; status: number }

// The last answer of the Router. Never the key: its last 4 characters only.
export type RouterState = {
  checkedAt: number
  connection: Connection
  keyHint: string
  keySource: 'config' | 'env' | ''
  me: Me | null
  meAt: number
}

// `requested` is what the session asked for (nexforce/auto); `model` is what
// the Router answered with. Empty on state from before v0.2.5.
export type ModelLine = { requested: string; model: string; tokens: number; usd: number }

// What a turn cost, allocated to the files it changed (or to no file).
export type Spend = { tokens: number; usd: number; input: number; cacheRead: number; model: string }

export type FileLine = { path: string; added: number; removed: number }

export type CommitLine = {
  sha: string
  subject: string
  filesChanged: number
  added: number
  removed: number
  tokens: number
  usd: number
  cachePct: number
  model: string
  // False for a commit the mod did not see being made (a terminal, another
  // tool, or before the mod loaded): git knows it, the mod has no cost for it.
  isCosted?: boolean
}

// A model call the Router refused in this session (classic StopFailure).
export type Block = { at: number; error: string; details: string }

export type Panel = {
  // HEAD when the session started: "Arquivos" is the diff from it.
  baseline: string
  // False in a folder without git: "Arquivos" then comes from Edit and Write.
  hasGit: boolean
  models: ModelLine[]
  lastModel: string
  files: FileLine[]
  fileSpend: Record<string, Spend>
  noFileSpend: Spend
  commits: CommitLine[]
  pending: CommitLine
  blocks: Block[]
}

// The running counts, in the session's state so a reload does not zero them.
export type Tally = {
  isInitialized: boolean
  usdAtTurnStart: number
  usdAtLastCommit: number
  usdSeen: number
  turnFiles: string[]
  turn: Spend
  turnStartLines: Record<string, number>
  sinceCommit: Spend
  modelTokensSinceCommit: Record<string, number>
}

declare module 'claude-code' {
  interface PluginState {
    'nexforce-router': {
      isTrailerOn: boolean
      isPaneOpenedOnce: boolean
      panel: Panel
      tally: Tally
      router: RouterState
      // Budget warning level the dev dismissed, per scope (80, 90, 100).
      dismissed: Record<string, number>
    }
  }
}
