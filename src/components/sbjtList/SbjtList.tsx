import { SbjtListDisplay } from 'data/interfaces/Displays';
import SbjtListHeader from './SbjtListHeader';
import SbjtListRow from './SbjtListRow';

interface SbjtListProps {
  year: number;
  prop: SbjtListDisplay[] | null;
}
const SbjtList = ({ year, prop }: SbjtListProps) => {
  return (
    <div className="mx-5 mt-2 mb-5">
      <SbjtListHeader year={year} />
      {prop &&
        prop.map((e, i) => (
          <SbjtListRow
            key={'과제리스트' + i}
            type={e.type}
            sbjtNo={e.sbjtNo}
            name={e.name}
            period={e.period}
            mainOrg={e.mainOrg}
            subOrgs={e.subOrgs}
            lastYear={e.lastYear}
            thisYear={e.thisYear}
            demand={e.demand}
            nextYear={e.nextYear}
            nation={e.nation}
            foreign={e.foreign}
          />
        ))}
    </div>
  );
};

export default SbjtList;
