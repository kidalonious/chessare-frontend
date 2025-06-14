export default function ItemPage({ params }: { params: { item: string } }) {
  const { item } = params;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Item Details</h1>
      <p className="text-gray-600">You searched for: <strong>{item}</strong></p>
    </div>
  );
}