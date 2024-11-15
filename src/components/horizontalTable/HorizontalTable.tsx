/* eslint-disable prettier/prettier */
import { HTDisplay } from 'data/interfaces/Displays';
import HorizontalTableHeader from './HorizontalTableHeader';
import HTRowSe from './HTRowSe';
import HTRowNe from './HTRowNe';

interface HorizontalTable {
  year: number;
  prop: HTDisplay | null;
}

const HorizontalTable = ({ year, prop }: HorizontalTable) => {
  return (
    <div className="mx-5 mt-2 mb-5">
      {/* {visible && (
        <UnitCostCalculator2
          setVisible={setVisible}
          dataState={neBudgets[calculatorTarget].budget.nextYear}
          calculatorTarget={calculatorTarget}
          setUCState={setUCState}
        />
      )} */}

      <HorizontalTableHeader year={year} />

      <HTRowSe prop={prop} />
      {
        prop?.ne.map((e, i) => (<HTRowNe key={'htRowNe'+i} ne={e} />))  
      } 
      
      
     
    </div>
  );
};

export default HorizontalTable;
