const stageMap = {
  PROD: 'PROD',
  DEV: 'DEV',
}

export type Stage = keyof typeof stageMap
