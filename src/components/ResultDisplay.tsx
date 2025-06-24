import { Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, ComposedChart } from 'recharts'
import { JanetLawResult } from '../utils/janetLaw'
import { useState } from 'react'

interface ResultDisplayProps {
  result: JanetLawResult
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      setHoveredYear(data.year)
      return (
        <div className="bg-white border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-primary">{label}年（{data.age}歳）</p>
          <p className="text-sm text-secondary">
            累積日: {data.cumulativeDays.toLocaleString()}日
          </p>
        </div>
      )
    } else {
      setHoveredYear(null)
    }
    return null
  }

  // ホバー時の塗りつぶし用データを生成
  const getAreaData = () => {
    if (!hoveredYear) return result.yearlyData.map(d => ({ ...d, fillValue: 0 }))
    
    return result.yearlyData.map(d => ({
      ...d,
      fillValue: d.year <= hoveredYear ? d.value : null
    }))
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
                <ComposedChart data={getAreaData()}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#EBEDF2" stopOpacity={1} />
                      <stop offset="50%" stopColor="#EBEDF2" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#088738" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#088738" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="fillValue"
                    stroke="none"
                    fill="url(#fillGradient)"
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#5C738A"
                    strokeWidth={3}
                    dot={false}
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
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}