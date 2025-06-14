type Props = {
  params: { item: string }
};

export default function ItemPage({ params }: Props) {
  const { item } = params;

  return (
    <div>
      <h1>Item Details for: {item}</h1>
    </div>
  );
}