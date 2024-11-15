'use client';

import { YearlyUnitCostI } from 'data/interfaces/Displays';
import { isEmpty } from 'utils/isEmpty';

interface HTRowNeProps {
  ne: {
    name: string;
    budget: {
      lastYear: YearlyUnitCostI;
      thisYear: YearlyUnitCostI;
      nextYear: YearlyUnitCostI;
    };
  } | null;
}

const HTRowNe = ({ ne }: HTRowNeProps) => {
  const cellProp = 'col-span-2';
  const miniCellProp = 'col-span-1';
  const buttonProp = 'col-span-2';

  return (
    <div>
      {ne && (
        <div>
          <div className="grid grid-cols-12 text-center content-start items-start p-1">
            <div className={cellProp}>{ne.name || ''}</div>

            <div className={cellProp}>{ne.budget.lastYear.total || ''}</div>

            <div className={cellProp}>{ne.budget.thisYear.total || ''}</div>

            <input
              className={buttonProp + ' text-center'}
              value={ne.budget.nextYear.total || ''}
              onChange={(e) => console.log(e)}
            />

            <button className={buttonProp}></button>

            <div className={miniCellProp}>{}</div>

            <div className={miniCellProp}>{}</div>
          </div>
          <div>
            <div className="grid grid-cols-12 text-center content-start items-start p-1">
              <div className={cellProp}></div>

              <div className={cellProp}>
                <div>
                  {`${isEmpty(ne.budget.lastYear.initial?.toString) ? '' : '<신규과제>'}`}
                </div>
                <div className="text-sm text-left px-2 pb-2">
                  {`${isEmpty(ne.budget.lastYear.initial?.toString) ? '' : ne.budget.lastYear.initial.toString}`}
                </div>
                <div>
                  {`${ne.budget.lastYear.concord.toString + ne.budget.lastYear.closed.toString + ne.budget.lastYear.ongoing.toString == '' ? '' : '<계속과제>'}`}
                </div>
                <div className="row-span-2 text-sm text-left px-2 pb-2">
                  {`${(isEmpty(ne.budget.lastYear.concord?.toString) ? '' : ne.budget.lastYear.concord.toString + '\n') + (isEmpty(ne.budget.lastYear.closed?.toString) ? '' : ne.budget.lastYear.closed.toString + '\n') + (isEmpty(ne.budget.lastYear.ongoing?.toString) ? '' : ne.budget.lastYear.ongoing.toString + '\n')}`}
                </div>
              </div>

              <div className={cellProp}>
                <div>
                  {`${isEmpty(ne.budget.thisYear.initial?.toString) ? '' : '<신규과제>'}`}
                </div>
                <div className="text-sm text-left px-2 pb-2">
                  {`${isEmpty(ne.budget.thisYear.initial?.toString) ? '' : ne.budget.thisYear.initial.toString}`}
                </div>
                <div>
                  {`${ne.budget.thisYear.concord.toString + ne.budget.thisYear.closed.toString + ne.budget.thisYear.ongoing.toString == '' ? '' : '<계속과제>'}`}
                </div>
                <div className="row-span-2 text-sm text-left px-2 pb-2">
                  {`${(isEmpty(ne.budget.thisYear.concord?.toString) ? '' : ne.budget.thisYear.concord.toString + '\n') + (isEmpty(ne.budget.thisYear.closed?.toString) ? '' : ne.budget.thisYear.closed.toString + '\n') + (isEmpty(ne.budget.thisYear.ongoing?.toString) ? '' : ne.budget.thisYear.ongoing.toString + '\n')}`}
                </div>
              </div>

              <button className={buttonProp} onClick={(e) => console.log(e)}>
                <div>
                  {`${isEmpty(ne.budget.nextYear.initial?.toString) ? '' : '<신규과제>'}`}
                </div>
                <div className="text-sm text-left px-2 pb-2">
                  {`${isEmpty(ne.budget.nextYear.initial?.toString) ? '' : ne.budget.nextYear.initial.toString}`}
                </div>
                <div>
                  {`${ne.budget.nextYear.concord.toString + ne.budget.nextYear.closed.toString + ne.budget.nextYear.ongoing.toString == '' ? '' : '<계속과제>'}`}
                </div>
                <div className="row-span-2 text-sm text-left px-2 pb-2">
                  {`${(isEmpty(ne.budget.nextYear.concord?.toString) ? '' : ne.budget.nextYear.concord.toString + '\n') + (isEmpty(ne.budget.nextYear.closed?.toString) ? '' : ne.budget.nextYear.closed.toString + '\n') + (isEmpty(ne.budget.nextYear.ongoing?.toString) ? '' : ne.budget.nextYear.ongoing.toString + '\n')}`}
                </div>
              </button>

              <button className={buttonProp}></button>

              <div className={miniCellProp}>{}</div>

              <div className={miniCellProp}>{}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HTRowNe;
