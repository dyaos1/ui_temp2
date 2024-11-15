interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return <div className="text-lg font-semibold">{title}</div>;
}
