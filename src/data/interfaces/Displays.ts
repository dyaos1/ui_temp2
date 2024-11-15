import { Budget } from './MotherData';

interface SummaryTableDisplay {
  name: string;
  budgets: Budget[];
}

interface DashboardDisplay {
  ptc_BSNS: {
    name: string;
    limitIn: {
      amount: number | null;
    };
    limitOut: {
      amount: number | null;
    };
  };
  brdn_BSNS: {
    name: string;
    limitIn: {
      amount: number | null;
      weight: number | null;
      initial: {
        count: number | null;
        sum: number | null;
        unitCost: number | null;
      };
      continuous: {
        count: number | null;
        sum: number | null;
        unitCost: number | null;
      };
    };
    limitOut: {
      amount: number | null;
      weight: number | null;
      initial: {
        count: number | null;
        sum: number | null;
        unitCost: number | null;
      };
      continuous: {
        count: number | null;
        sum: number | null;
        unitCost: number | null;
      };
    };
  }[];
}

interface HTDisplay {
  se: {
    name: string;
    budget: {
      lastYear: number | null;
      thisYear: number | null;
      nextYear: number | null;
    };
  };
  ne: {
    name: string;
    budget: {
      lastYear: YearlyUnitCostI;
      thisYear: YearlyUnitCostI;
      nextYear: YearlyUnitCostI;
    };
  }[];
}

interface YearlyUnitCostI {
  total: number | null;
  initial: UnitCostI;
  concord: UnitCostI;
  closed: UnitCostI;
  ongoing: UnitCostI;
}

interface UnitCostI {
  count: number | null;
  unitCost: number | null;
  months: number | null;
  sum: number | null;
  toString: string;
}

interface SbjtListDisplay {
  type: string;
  sbjtNo: string;
  name: string;
  period: string;
  mainOrg: string;
  subOrgs: string;
  lastYear: string;
  thisYear: string;
  demand: string;
  nextYear: string;
  nation: string;
  foreign: string;
}

export type {
  SummaryTableDisplay,
  DashboardDisplay,
  SbjtListDisplay,
  HTDisplay,
  UnitCostI,
  YearlyUnitCostI,
};
