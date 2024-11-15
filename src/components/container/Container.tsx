import Title from './Title';
import Content from './Content';
import { ReactNode } from 'react';
import Line from './Line';

interface ContainerProps {
  title: string;
  children: ReactNode;
}

export default function Container({ title, children }: ContainerProps) {
  return (
    <div className="p-2">
      <Title title={title} />
      <Content>{children}</Content>
      <Line />
    </div>
  );
}
