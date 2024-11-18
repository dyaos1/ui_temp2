import { MotherData } from './interfaces/MotherData';
import the_data from './예시2.json';
import {
  DashboardDisplay,
  HTDisplay,
  SbjtListDisplay,
  SummaryTableDisplay,
} from './interfaces/Displays';
import { rounderNumber } from 'utils/rounder';
import { dateFormatChanger } from 'utils/dateFormatter';
import seperator from './seperator';
import { BaseData } from './interfaces/BaseData';

export default class DataClass {
  motherData: MotherData | null;
  year: number;
  bsnsCd: string;

  constructor(year: number, bsnsCd: string) {
    this.year = year;
    this.bsnsCd = bsnsCd;

    this.motherData = {
      ptc_BSNS: {
        name: the_data.ptc_BSNS.name,
        startDate: the_data.ptc_BSNS.startDate,
        endDate: the_data.ptc_BSNS.endDate,
        budgets: the_data.ptc_BSNS.budgets,
        brdn_BSNS: the_data.ptc_BSNS.brdn_BSNS.map((e) => {
          return {
            ...e,
            sbjts: e.sbjts.map((el) => {
              return {
                total_AMT: null,
                demand_AMT: null,
                future_AMT: null,
                limit: false,
                pr1yyDvlmGb: null,
                cyyDvlmGb: null,
                ...el,
              };
            }),
          };
        }),
      },
    };
    this.year = year;
  }

  async init() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/project/mother/${this.year}/${this.bsnsCd}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      if (!response.ok) {
        throw new Error('네트워크 응답이 OK가 아님');
      }
      // const message = await response.json();
      // const jsonData: BaseData[] = message.message;

      // this.motherData = {
      //   ptc_BSNS: {
      //     name: jsonData.ptc_BSNS.name,
      //     startDate: jsonData.ptc_BSNS.startDate,
      //     endDate: jsonData.ptc_BSNS.endDate,
      //     budgets: jsonData.ptc_BSNS.budgets,
      //     brdn_BSNS: jsonData.ptc_BSNS.brdn_BSNS.map((e: any) => {
      //       return {
      //         ...e,
      //         sbjts: e.sbjts.map((el: any) => {
      //           return {
      //             total_AMT: null,
      //             demand_AMT: null,
      //             future_AMT: null,
      //             limit: false,
      //             pr1yyDvlmGb: null,
      //             cyyDvlmGb: null,
      //             ...el,
      //           };
      //         }),
      //       };
      //     }),
      //   },
      // };
    } catch (error) {
      console.log('fetch 실패로 인하여 테스트 데이터로 전환합니다.');
      this.motherData = {
        ptc_BSNS: {
          name: the_data.ptc_BSNS.name,
          startDate: the_data.ptc_BSNS.startDate,
          endDate: the_data.ptc_BSNS.endDate,
          budgets: the_data.ptc_BSNS.budgets,
          brdn_BSNS: the_data.ptc_BSNS.brdn_BSNS.map((e) => {
            return {
              ...e,
              sbjts: e.sbjts.map((el) => {
                return {
                  total_AMT: null,
                  demand_AMT: null,
                  future_AMT: null,
                  limit: false,
                  pr1yyDvlmGb: null,
                  cyyDvlmGb: null,
                  ...el,
                };
              }),
            };
          }),
        },
      };
    }
  }

  toSummaryTable(): SummaryTableDisplay {
    const se = JSON.parse(JSON.stringify(this.motherData?.ptc_BSNS));
    const tableData: { year: number; amount: number }[] = [
      { year: this.year - 4, amount: -1 },
      { year: this.year - 3, amount: -1 },
      { year: this.year - 2, amount: -1 },
      { year: this.year - 1, amount: -1 },
      { year: this.year, amount: -1 },
    ];

    // eslint-disable-next-line
    se.budgets.map((e: any) => {
      const idx = tableData.findIndex((el) => el.year === e.year);
      if (idx >= 0) {
        tableData[idx].amount = e.amount;
      }
    });

    return { name: se.name, budgets: tableData };
  }

  toDashboardDisplay() {
    const lastYearSeAmount =
      this.motherData?.ptc_BSNS.budgets.find((e) => e.year == this.year)
        ?.amount || 0;

    const result: DashboardDisplay = {
      ptc_BSNS: {
        name: this.motherData?.ptc_BSNS.name || '',
        limitIn: {
          amount:
            this.motherData?.ptc_BSNS.budgets.find(
              (e) => e.year == this.year + 1,
            )?.amount || null,
        },
        limitOut: {
          amount: null,
        },
      },
      brdn_BSNS: this.motherData
        ? this.motherData.ptc_BSNS.brdn_BSNS.map((e) => {
            const newSbjts = e.sbjts.filter(
              (el) => el.startDate.split('.')[0] === (this.year + 1).toString(),
            );
            const continueSbjts = e.sbjts.filter(
              (el) =>
                Number(el.startDate.split('.')[0]) < this.year + 1 &&
                this.year + 1 <= Number(el.endDate.split('.')[0]),
            );

            const newCount = newSbjts.length;
            const newSum = newSbjts.reduce(
              (acc, cur) => acc + (cur.demand_AMT ? Number(cur.demand_AMT) : 0),
              0,
            );

            const continueCount = continueSbjts.length;
            const continueSum = continueSbjts.reduce(
              (acc, cur) => acc + (cur.demand_AMT ? Number(cur.demand_AMT) : 0),
              0,
            );

            const lastYearNeAmount =
              e.budgets.find(
                (el) => el.year === this.year && this.year < Number(e.endDate),
              )?.amount || 0;
            const weight =
              lastYearSeAmount !== 0 ? lastYearNeAmount / lastYearSeAmount : 0;
            return {
              name: e.name,
              limitIn: {
                amount:
                  e.budgets.find((e) => e.year === this.year + 1)?.amount ||
                  null,
                weight: weight,
                initial: {
                  count: newCount,
                  sum: rounderNumber(newSum),
                  unitCost: rounderNumber((newSum / newCount / 9) * 12),
                },
                continuous: {
                  count: continueCount,
                  sum: rounderNumber(continueSum),
                  unitCost: rounderNumber(continueSum / continueCount),
                },
              },
              limitOut: {
                amount: null,
                weight: weight,
                initial: {
                  count: null,
                  sum: null,
                  unitCost: null,
                },
                continuous: {
                  count: null,
                  sum: null,
                  unitCost: null,
                },
              },
            };
          })
        : null,
    };
    return result;
  }

  toHorizontalTableDisplay(): HTDisplay {
    const neList =
      this.motherData?.ptc_BSNS.brdn_BSNS.map((e) => {
        return {
          name: e.name,
          budget: seperator(e.sbjts),
        };
      }) || null;

    const result: HTDisplay = {
      se: {
        name: this.motherData?.ptc_BSNS.name || '',
        budget: {
          lastYear:
            this.motherData?.ptc_BSNS.budgets.find(
              (e) => e.year === this.year - 1,
            )?.amount || null,
          thisYear:
            this.motherData?.ptc_BSNS.budgets.find((e) => e.year === this.year)
              ?.amount || null,
          nextYear:
            this.motherData?.ptc_BSNS.budgets.find(
              (e) => e.year === this.year + 1,
            )?.amount || null,
        },
      },
      ne: neList,
    };

    return result;
  }

  toSbjtList(): SbjtListDisplay[] {
    const result: SbjtListDisplay[] = [
      {
        type: '세부사업',
        sbjtNo: '',
        name: `${this.motherData?.ptc_BSNS.name}`,
        period: `${this.motherData?.ptc_BSNS.startDate}~${this.motherData?.ptc_BSNS.endDate}`,
        mainOrg: '-',
        subOrgs: '-',
        // lastYear: (this.motherData?.se.budgets.find((it) => it.year === this.year-1)?.amount || "").toString(),
        lastYear: (
          this.motherData?.ptc_BSNS.budgets
            .filter((it) => it.year < this.year)
            .reduce((acc, cur) => acc + cur.amount, 0) || ''
        ).toString(),
        thisYear: (
          this.motherData?.ptc_BSNS.budgets.find((it) => it.year === this.year)
            ?.amount || ''
        ).toString(),
        demand: (
          this.motherData?.ptc_BSNS.budgets.find(
            (it) => it.year === this.year + 1,
          )?.amount || ''
        ).toString(),
        //nextYear: (this.motherData?.ptc_BSNS.budgets.find((it) => it.year === this.year+2)?.amount || "").toString(),
        nextYear: (
          this.motherData?.ptc_BSNS.budgets
            .filter((it) => it.year > this.year + 1)
            .reduce((acc, cur) => acc + cur.amount, 0) || ''
        ).toString(),
        nation: '-',
        foreign: '-',
      },
    ];

    this.motherData?.ptc_BSNS.brdn_BSNS.map((e) => {
      result.push({
        type: '내역사업',
        sbjtNo: '',
        name: `${e.name}`,
        period: `${e.startDate}~${e.endDate}`,
        mainOrg: '-',
        subOrgs: '-',
        //lastYear: (e.budgets.find((it) => it.year === this.year-1)?.amount || "").toString(),
        lastYear: (
          e.budgets
            .filter((it) => it.year < this.year)
            .reduce((acc, cur) => acc + cur.amount, 0) || ''
        ).toString(),

        thisYear: (
          e.budgets.find((it) => it.year === this.year)?.amount || ''
        ).toString(),
        demand: (
          e.budgets.find((it) => it.year === this.year + 1)?.amount || ''
        ).toString(),
        // nextYear: (e.budgets.find((it) => it.year === this.year+2)?.amount || "").toString(),
        nextYear: (
          e.budgets
            .filter((it) => it.year > this.year + 1)
            .reduce((acc, cur) => acc + cur.amount, 0) || ''
        ).toString(),
        nation: '-',
        foreign: '-',
      });
      e.sbjts.map((el, idx) => {
        const period = `${dateFormatChanger(el.startDate) || el.startDate}~${dateFormatChanger(el.endDate) || el.startDate}\n(${el.total_AMT || ''})`;
        result.push({
          type: '과제',
          sbjtNo: idx.toString(),
          name: `${el.name}`,
          period: period,
          mainOrg: el.orgn_NM1 || '-',
          subOrgs: (el.orgn_NM2 || '-').replace(/,\s/g, '\n'),
          //lastYear: (el.budgets.find((it) => it.year === this.year-1)?.amount || "").toString(),
          lastYear: el.pr1yyGovCtrbAmt || '',
          thisYear: el.cyyGovCtrbAmt || '',
          demand: el.demand_AMT || '',
          // nextYear: (el.budgets.find((it) => it.year === this.year+2)?.amount || "").toString(),
          nextYear: el.future_AMT || '',
          nation: el.nation || '-',
          foreign: el.foreign || '-',
        });
      });
    });
    return result;
  }
}
