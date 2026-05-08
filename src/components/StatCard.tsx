interface StatCardProps {
  label: string;
  value: string | number;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  icon?: React.ReactNode;
}
export default function StatCard({ label, value, color = 'blue', icon }: StatCardProps) {
  const colors = {
    blue: 'bg-blue-50 border-blue-200 text-blue-800',
    green: 'bg-green-50 border-green-200 text-green-800',
    red: 'bg-red-50 border-red-200 text-red-800',
    yellow: 'bg-amber-50 border-amber-200 text-amber-800',
    gray: 'bg-gray-50 border-gray-200 text-gray-600',
  };
  return (
    <div className={`rounded-2xl border p-5 text-center ${colors[color]}`}>
      {icon && <div className="flex justify-center mb-2">{icon}</div>}
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-sm mt-1 font-medium">{label}</div>
    </div>
  );
}
