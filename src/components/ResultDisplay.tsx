import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { JanetLawResult } from '../utils/janetLaw'

interface ResultDisplayProps {
  result: JanetLawResult
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-primary">{label}年（{data.age}歳）</p>
          <p className="text-sm text-secondary">
            累積日: {data.cumulativeDays.toLocaleString()}日
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex flex-wrap gap-4 justify-stretch">
      <div className="flex-1 min-w-80">
        <div className="border border-border rounded-xl p-6 space-y-2 h-full">
          <div>
            <h3 className="text-base font-medium text-primary mb-0">累積日</h3>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary mb-0">
              {result.cumulativeDays.toLocaleString()}日
            </p>
          </div>
          <div className="pt-4">
            <div className="h-37">
              <ResponsiveContainer width="100%" height={148}>
                <LineChart data={result.yearlyData}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#EBEDF2" stopOpacity={1} />
                      <stop offset="50%" stopColor="#EBEDF2" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#5C738A"
                    strokeWidth={3}
                    dot={false}
                    fill="url(#lineGradient)"
                  />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 13, fontWeight: 700, fill: '#5C738A' }}
                    className="font-manrope"
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}