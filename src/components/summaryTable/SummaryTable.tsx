import { SummaryTableDisplay } from 'data/interfaces/Displays';

interface SummaryTableProps {
  prop: SummaryTableDisplay | null;
}

export default function SummaryTable({ prop }: SummaryTableProps) {
  return (
    <div className="px-5 pt-2 pb-5">
      <div className="grid grid-cols-6 p-1 text-center bg-slate-300 font-bold">
        <div className="">사업명</div>
        {prop &&
          prop.budgets.map((e, i) => (
            <div
              key={'summaryTableHeader' + i}
              className=""
            >{`${e.year}년`}</div>
          ))}
      </div>

      <div className="grid grid-cols-6 p-1 text-center">
        <div className="">{prop ? prop.name : ''}</div>
        {prop &&
          prop.budgets.map((e, i) => (
            <div key={'summaryTableContent' + i} className="">
              {e.amount > -1 ? (e?.amount).toString() : ''}
            </div>
          ))}
      </div>
    </div>
  );
}
