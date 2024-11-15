import { SBJT } from './interfaces/MotherData';
import { numberOrZero } from 'utils/validators';

const seperator = (sbjtList: SBJT[]) => {
  const result = {
    lastYear: {
      total: 0,
      initial: {
        count: 0,
        unitCost: 0,
        months: 9,
        sum: 0,
        toString: '',
      },
      concord: {
        count: 0,
        unitCost: 0,
        months: 12,
        sum: 0,
        toString: '',
      },
      closed: {
        count: 0,
        unitCost: 0,
        months: 12,
        sum: 0,
        toString: '',
      },
      ongoing: {
        count: 0,
        unitCost: 0,
        months: 12,
        sum: 0,
        toString: '',
      },
    },
    thisYear: {
      total: 0,
      initial: {
        count: 0,
        unitCost: 0,
        months: 9,
        sum: 0,
        toString: '',
      },
      concord: {
        count: 0,
        unitCost: 0,
        months: 12,
        sum: 0,
        toString: '',
      },
      closed: {
        count: 0,
        unitCost: 0,
        months: 12,
        sum: 0,
        toString: '',
      },
      ongoing: {
        count: 0,
        unitCost: 0,
        months: 12,
        sum: 0,
        toString: '',
      },
    },
    nextYear: {
      total: 0,
      initial: {
        count: 0,
        unitCost: 0,
        months: 9,
        sum: 0,
        toString: '',
      },
      concord: {
        count: 0,
        unitCost: 0,
        months: 12,
        sum: 0,
        toString: '',
      },
      closed: {
        count: 0,
        unitCost: 0,
        months: 12,
        sum: 0,
        toString: '',
      },
      ongoing: {
        count: 0,
        unitCost: 0,
        months: 12,
        sum: 0,
        toString: '',
      },
    },
  };

  sbjtList.map((e) => {
    if (e.pr1yyDvlmGb === '신규') {
      result.lastYear.initial.count += 1;
      result.lastYear.initial.sum += numberOrZero(e.pr1yyGovCtrbAmt);
      result.lastYear.total += numberOrZero(e.pr1yyGovCtrbAmt);
    } else if (e.pr1yyDvlmGb === '기일치') {
      result.lastYear.concord.count += 1;
      result.lastYear.concord.sum += numberOrZero(e.pr1yyGovCtrbAmt);
      result.lastYear.total += numberOrZero(e.pr1yyGovCtrbAmt);
    } else if (e.pr1yyDvlmGb === '계속') {
      result.lastYear.ongoing.count += 1;
      result.lastYear.ongoing.sum += numberOrZero(e.pr1yyGovCtrbAmt);
      result.lastYear.total += numberOrZero(e.pr1yyGovCtrbAmt);
    } else if (e.pr1yyDvlmGb === '종료') {
      result.lastYear.ongoing.count += 1;
      result.lastYear.ongoing.sum += numberOrZero(e.pr1yyGovCtrbAmt);
      result.lastYear.total += numberOrZero(e.pr1yyGovCtrbAmt);
    }

    if (e.cyyDvlmGb === '신규') {
      result.thisYear.initial.count += 1;
      result.thisYear.initial.sum += numberOrZero(e.pr1yyGovCtrbAmt);
      result.thisYear.total += numberOrZero(e.pr1yyGovCtrbAmt);
    } else if (e.cyyDvlmGb === '기일치') {
      result.thisYear.concord.count += 1;
      result.thisYear.concord.sum += numberOrZero(e.pr1yyGovCtrbAmt);
      result.thisYear.total += numberOrZero(e.pr1yyGovCtrbAmt);
    } else if (e.cyyDvlmGb === '계속') {
      result.thisYear.ongoing.count += 1;
      result.thisYear.ongoing.sum += numberOrZero(e.pr1yyGovCtrbAmt);
      result.thisYear.total += numberOrZero(e.pr1yyGovCtrbAmt);
    } else if (e.cyyDvlmGb === '종료') {
      result.thisYear.ongoing.count += 1;
      result.thisYear.ongoing.sum += numberOrZero(e.pr1yyGovCtrbAmt);
      result.thisYear.total += numberOrZero(e.pr1yyGovCtrbAmt);
    }

    const years = ['lastYear', 'thisYear'];
    const types = ['initial', 'concord', 'closed', 'ongoing'];
    for (const year of years) {
      for (const type of types) {
        const yearKey = year as 'lastYear' | 'thisYear' | 'nextYear';
        const typeKey = type as 'initial' | 'concord' | 'closed' | 'ongoing';
        result[`${yearKey}`][`${typeKey}`].unitCost = result[`${yearKey}`][
          `${typeKey}`
        ].count
          ? (result[`${yearKey}`][`${typeKey}`].sum /
              result[`${yearKey}`][`${typeKey}`].count /
              result[`${yearKey}`][`${typeKey}`].months) *
            12
          : 0;
        result[`${yearKey}`][`${typeKey}`].toString =
          result[`${yearKey}`][`${typeKey}`].count +
          ' 개 x ' +
          result[`${yearKey}`][`${typeKey}`].months +
          '/12 개월 x ' +
          result[`${yearKey}`][`${typeKey}`].unitCost +
          ' 백만 = ' +
          result[`${yearKey}`][`${typeKey}`].sum +
          ' 백만';
      }
    }
  });

  return result;
};

export default seperator;
