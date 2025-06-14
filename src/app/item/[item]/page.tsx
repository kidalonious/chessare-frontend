import { Metadata } from 'next';

type Props = {
  params: { item: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `Item: ${params.item}` };
}

export default async function ItemPage({ params }: Props) {
  const { item } = params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Item Details</h1>
      <p className="text-gray-600">You searched for: <strong>{item}</strong></p>
    </div>
  );
}