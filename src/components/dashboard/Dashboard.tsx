/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAppDispatch } from 'app/hooks';
import { DashboardDisplay } from 'data/interfaces/Displays';
import {
  countChanged,
  demandChanged,
  sumChanged,
  unitCostChanged,
} from 'feature/dashboardSlice';
import { isNumber } from '../../utils/validators';

interface dashboardProp {
  prop: DashboardDisplay | null;
}

export default function Dashboard({ prop }: dashboardProp) {
  const dispatch = useAppDispatch();

  const whenDemandChange = (e: any) => {
    const value = e.target.value;
    if (!isNumber(value)) {
      return false;
    }
    dispatch(demandChanged(value));
  };

  const whenNeAmountChange = (e: any) => {
    const target = e.currentTarget.dataset.value;
    console.log(target);
  };

  const whenCountChange = (e: any) => {
    const value = e.target.value;
    if (!isNumber(value)) {
      return false;
    }
    const target = e.currentTarget.dataset.value;
    const [idx, initialOrContinous] = target.split('-');
    dispatch(countChanged({ idx, initialOrContinous, value }));
  };

  const whenSumChange = (e: any) => {
    const value = e.target.value;
    if (!isNumber(value)) {
      return false;
    }
    const target = e.currentTarget.dataset.value;
    const [idx, initialOrContinous] = target.split('-');
    dispatch(sumChanged({ idx, initialOrContinous, value }));
  };

  const whenUnitCostChange = (e: any) => {
    const value = e.target.value;
    if (!isNumber(value)) {
      return false;
    }
    const target = e.currentTarget.dataset.value;
    const [idx, initialOrContinous] = target.split('-');
    dispatch(unitCostChanged({ idx, initialOrContinous, value }));
  };

  return (
    <div className="mx-5 mt-2 mb-5">
      <div className="grid grid-cols-5 bg-slate-300 text-center items-center font-semibold p-1">
        <div className="col-span-1">사업명</div>
        <div className="col-span-2">실링금액</div>
        <div className="col-span-2">한도외</div>
      </div>

      <div className="grid grid-cols-5 text-center items-center font-semibold bg-slate-100 p-1">
        <div className="col-span-1">{prop?.ptc_BSNS.name || ''}</div>
        <div className="col-span-2">
          <div className="p-1 justify-center items-center content-center text-center">
            <input
              className=""
              value={prop?.ptc_BSNS.limitIn.amount || ''}
              onChange={whenDemandChange}
            />
            <button className="mx-2" onClick={(e) => console.log(e)}>
              적용
            </button>
            <button className="mx-2">초기화</button>
          </div>
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-2 col-start-2">
          <input value={'test'} />
        </div>
      </div>

      {prop?.brdn_BSNS?.map((e, i) => (
        <div
          className="text-center items-center border-t-1 border-solid border-black"
          key={`dashboard-${i}`}
        >
          <div className="grid grid-cols-5 bg-slate-100 p-1">
            <div className="col-span-1">{e.name}</div>
            <div className="col-span-2 grid grid-rows-3 text-left">
              <div className="justify-center items-center content-center text-center">
                <input
                  className="px-1"
                  data-value={`${i}-limitIn-amount`}
                  value={e.limitIn.amount == null ? '' : e.limitIn.amount || 0}
                  onChange={whenNeAmountChange}
                />
              </div>
              <div className="grid grid-cols-7 p-1">
                <div className="col-span-1">신규</div>
                <div className="col-span-1 px-1 text-right">갯수:</div>
                <input
                  className="col-span-1 px-1"
                  value={
                    e.limitIn.initial.count == null
                      ? ''
                      : e.limitIn.initial.count || 0
                  }
                  data-value={`${i}-initial-count`}
                  onChange={whenCountChange}
                />
                <div className="col-span-1 px-1 text-right">총액:</div>
                <input
                  className="col-span-1"
                  value={
                    e.limitIn.initial.sum == null
                      ? ''
                      : e.limitIn.initial.sum || 0
                  }
                  data-value={`${i}-initial-sum`}
                  onChange={whenSumChange}
                />
                <div className="col-span-1 px-1 text-right">평단가:</div>
                <input
                  className="col-span-1"
                  value={
                    e.limitIn.initial.unitCost == null
                      ? ''
                      : e.limitIn.initial.unitCost || 0
                  }
                  data-value={`${i}-initial-unitCost`}
                  onChange={whenUnitCostChange}
                />
              </div>
              <div className="grid grid-cols-7 p-1">
                <div className="col-span-1">계속</div>
                <div className="col-span-1 px-1 text-right">갯수:</div>
                <div className="col-span-1 px-1 text-left">
                  {e.limitIn.continuous.count == null
                    ? ''
                    : e.limitIn.continuous.count || 0}
                </div>
                <div className="col-span-1 px-1 text-right">총액:</div>
                <input
                  className="col-span-1"
                  value={
                    e.limitIn.continuous.sum == null
                      ? ''
                      : e.limitIn.continuous.sum || 0
                  }
                  data-value={`${i}-continuous-sum`}
                  onChange={whenSumChange}
                />
                <div className="col-span-1 px-1 text-right">평단가:</div>
                <input
                  className="col-span-1"
                  value={
                    e.limitIn.continuous.unitCost == null
                      ? ''
                      : e.limitIn.continuous.unitCost || 0
                  }
                  data-value={`${i}-continuous-unitCost`}
                  onChange={whenUnitCostChange}
                />
              </div>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      ))}
      <p>
        (설명)
        <br />
        1. 한도외는 미구현() <br />
        2. 해당 인터페이스의 목적은 (1) 총 요구금액을 내역사업에 배분. 신규사업
        신규사업 총액과 갯수의 결정. (3) 그에 따라서 자연스럽게 계속사업 총액의
        까지가 목적이므로 기일치|계속|종료 로 세분하지 않고 전부 계속사업으로
        묶어서 총액과 단가만 확인할 수 있도록 하였음 (계속사업의 세분은 아래
        가로장표서 확인가능) 3.
      </p>
    </div>
  );
}
