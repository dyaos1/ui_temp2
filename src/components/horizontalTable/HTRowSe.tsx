'use client';

import { HTDisplay } from 'data/interfaces/Displays';

interface HTRowSeProps {
  prop: HTDisplay | null;
}

const HTRowSe = ({ prop }: HTRowSeProps) => {
  const cellProp = 'col-span-2 font-semibold';
  const miniCellProp = 'col-span-1 font-semibold';
  const buttonProp = 'col-span-2 font-semibold';

  return (
    <div className="grid grid-cols-12 text-center content-start items-start p-1">
      <div className={cellProp}>{prop?.se.name || ''}</div>

      <div className={cellProp}>{prop?.se.budget.lastYear || ''}</div>

      <div className={cellProp}>{prop?.se.budget.thisYear || ''}</div>

      <input
        className={buttonProp + ' text-center'}
        value={prop?.se.budget.nextYear?.toString() || ''}
        onChange={(e) => console.log(e)}
      />

      <button className={buttonProp}></button>

      <div className={miniCellProp}>{}</div>

      <div className={miniCellProp}>{}</div>
    </div>
  );
};

export default HTRowSe;
