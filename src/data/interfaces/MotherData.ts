interface MotherData {
  ptc_BSNS: PTC_BSNS;
}

interface PTC_BSNS {
  name: string;
  startDate: string;
  endDate: string;
  budgets: Budget[];
  brdn_BSNS: BRDN_BSNS[];
}

interface Budget {
  year: number;
  amount: number;
}

interface BRDN_BSNS {
  name: string;
  startDate: string;
  endDate: string;
  budgets: Budget[];
  sbjts: SBJT[];
}

interface SBJT {
  name: string;
  startDate: string;
  endDate: string;
  orgn_NM1: string | null;
  total_AMT: string | null;
  // pryy_AMT: string | null;
  orgn_NM2: string | null;
  pr1yyGovCtrbAmt: string | null;
  cyyGovCtrbAmt: string | null;
  demand_AMT: string | null;
  future_AMT: string | null;
  pr1yyDvlmGb: string | null;
  cyyDvlmGb: string | null;
  foreign: string | null;
  nation: string | null;
  limit: boolean;
}

export type { MotherData, Budget, SBJT };
