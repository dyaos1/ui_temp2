import { useAppDispatch, useAppSelector } from 'app/hooks';
import Container from './container/Container';
import SummaryTable from './summaryTable/SummaryTable';
import { setSummaryTable } from 'feature/summaryTableSlice';
import DataClass from 'data/DataClass';
import { useEffect } from 'react';
import Dashboard from './dashboard/Dashboard';
import { setDashboard } from 'feature/dashboardSlice';
import SbjtList from './sbjtList/SbjtList';
import { setSbjtList } from 'feature/sbjtListSlice';
import HorizontalTable from './horizontalTable/HorizontalTable';
import { setHorizontalTable } from 'feature/horizontalTableSlice';

export default function Home() {
  const motherDataClass = new DataClass(2024, 'B10009');

  // 개요 테이블
  const summaryTableDisplay = useAppSelector(
    (state) => state.summaryTable.value,
  );
  const dispatch = useAppDispatch();

  // 입력 테이블
  const dashboardDisplay = useAppSelector((state) => state.dashboard.value);

  // 세부내역표
  const htDisplay = useAppSelector((state) => state.horizontalTable.value);

  // 과제 리스트
  const sbjtList = useAppSelector((state) => state.sbjtList.value);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setSummaryTable(motherDataClass.toSummaryTable()));
      dispatch(setDashboard(motherDataClass.toDashboardDisplay()));
      dispatch(setSbjtList(motherDataClass.toSbjtList()));
      dispatch(setHorizontalTable(motherDataClass.toHorizontalTableDisplay()));
    }, 1000);
  }, []);

  return (
    <div>
      <Container title="개요">
        {<SummaryTable prop={summaryTableDisplay} />}
      </Container>
      <Container title="임시입력인터페이스">
        {<Dashboard prop={dashboardDisplay} />}
      </Container>
      <Container title="가로장표">
        {<HorizontalTable year={2024} prop={htDisplay} />}
      </Container>
      <Container title="과제리스트">
        {<SbjtList year={2024} prop={sbjtList} />}
      </Container>
    </div>
  );
}
