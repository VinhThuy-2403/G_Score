import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import EmptyState from './EmptyState';

// 4 màu xám/đen desaturated theo spec
const LEVEL_COLORS = {
  gte8: '#111111',       // đen đậm — mức cao nhất
  from6to8: '#4A4A4A',   // xám đậm
  from4to6: '#888888',   // xám vừa
  lt4: '#C0C0C0',        // xám nhạt — mức thấp nhất
};

const LEVEL_LABELS = {
  gte8: '≥ 8 điểm',
  from6to8: '6 – 8 điểm',
  from4to6: '4 – 6 điểm',
  lt4: '< 4 điểm',
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '13px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}
      >
        <p style={{ margin: 0, fontWeight: 600 }}>{payload[0].payload.label}</p>
        <p style={{ margin: '4px 0 0', color: 'var(--text-secondary)' }}>
          {payload[0].value.toLocaleString('vi-VN')} thí sinh
        </p>
      </div>
    );
  }
  return null;
};

const ScoreLevelChart = ({ data, loading }) => {
  if (loading) {
    return (
      <EmptyState icon="⏳" text="Đang tải dữ liệu..." />
    );
  }

  if (!data) {
    return (
      <EmptyState icon="📊" text="Chọn môn học để xem thống kê phổ điểm." />
    );
  }

  const chartData = Object.entries(data.levels).map(([key, value]) => ({
    key,
    label: LEVEL_LABELS[key],
    value,
    color: LEVEL_COLORS[key],
  }));

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: 0, marginBottom: '20px' }}>
        Môn: <strong style={{ color: 'var(--text-primary)' }}>{data.subjectName}</strong>
        {' · '}Tổng số thí sinh có điểm:{' '}
        <strong style={{ color: 'var(--text-primary)' }}>
          {Object.values(data.levels).reduce((a, b) => a + b, 0).toLocaleString('vi-VN')}
        </strong>
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 0, right: 60, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F0F0" />
          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: 'var(--text-secondary)' }}
            tickFormatter={(v) => v.toLocaleString('vi-VN')}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={80}
            tick={{ fontSize: 13, fill: 'var(--text-primary)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={28} label={{ position: 'right', fontSize: 12, fill: 'var(--text-secondary)', formatter: (v) => v.toLocaleString('vi-VN') }}>
            {chartData.map((entry) => (
              <Cell key={entry.key} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreLevelChart;
