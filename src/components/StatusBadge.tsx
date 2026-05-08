export default function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    pass: { label: 'ผ่านเกณฑ์', className: 'bg-green-100 text-green-800 border-green-300' },
    fail: { label: 'ไม่ผ่าน', className: 'bg-red-100 text-red-800 border-red-300' },
    no_data: { label: 'ไม่มีข้อมูล', className: 'bg-gray-100 text-gray-600 border-gray-300' },
    pending: { label: 'รอดำเนินการ', className: 'bg-amber-100 text-amber-800 border-amber-300' },
  };
  const { label, className } = config[status] || config.pending;
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${className}`}>
      {label}
    </span>
  );
}
