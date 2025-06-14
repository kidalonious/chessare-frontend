type Props = {
  params: { item: string }
};

export default function ItemPage({ params }: Props) {
  const { item } = params;
  return <div>{item}</div>;
}