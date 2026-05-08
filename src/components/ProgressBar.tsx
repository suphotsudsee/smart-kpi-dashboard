export default function ProgressBar({ 
  value, 
  max = 100, 
  target = 100,
  showTarget = true,
  size = 'md' 
}: { 
  value: number; 
  max?: number; 
  target?: number;
  showTarget?: boolean;
  size?: 'sm' | 'md';
}) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  const passed = pct >= target;
  const height = size === 'sm' ? 'h-2' : 'h-2.5';
  
  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`${height} rounded-full transition-all duration-500 ${
            passed ? 'bg-green-500' : pct > 0 ? 'bg-red-400' : 'bg-gray-300'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showTarget && (
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{pct.toFixed(2)}%</span>
          <span>เป้าหมาย {target}%</span>
        </div>
      )}
    </div>
  );
}
