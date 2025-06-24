import { Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, ComposedChart } from 'recharts'
import { JanetLawResult } from '../utils/janetLaw'
import { useState, useEffect } from 'react'

interface ResultDisplayProps {
  result: JanetLawResult
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null)
  const [clickStartYear, setClickStartYear] = useState<number | null>(null)
  const [clickEndYear, setClickEndYear] = useState<number | null>(null)
  const [selectedRange, setSelectedRange] = useState<{ start: number; end: number; days: number } | null>(null)

  // Escキーでリセット
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        resetSelection()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // 区間の累積日数を計算
  const calculateRangeDays = (startYear: number, endYear: number): number => {
    const start = Math.min(startYear, endYear)
    const end = Math.max(startYear, endYear)
    
    const startData = result.yearlyData.find(d => d.year === start)
    const endData = result.yearlyData.find(d => d.year === end)
    
    if (!startData || !endData) return 0
    
    return endData.cumulativeDays - (startData.cumulativeDays - (1 / startData.age * 365.25))
  }

  // 選択をリセット
  const resetSelection = () => {
    setClickStartYear(null)
    setClickEndYear(null)
    setSelectedRange(null)
  }

  // クリックハンドラー
  const handleChartClick = (data: any) => {
    if (data && data.activeLabel) {
      const year = data.activeLabel
      
      if (clickStartYear === null) {
        // 1回目のクリック: 開始点を設定
        setClickStartYear(year)
        setSelectedRange(null)
      } else {
        // 2回目のクリック: 終了点を設定して計算
        setClickEndYear(year)
        const days = calculateRangeDays(clickStartYear, year)
        setSelectedRange({
          start: Math.min(clickStartYear, year),
          end: Math.max(clickStartYear, year),
          days: Math.round(days)
        })
        // 選択完了後はリセット
        setClickStartYear(null)
        setClickEndYear(null)
      }
    }
  }

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
          {clickStartYear !== null && (
            <p className="text-sm text-blue-600 mt-1">
              期間選択中... (Escでリセット)
            </p>
          )}
        </div>
      )
    } else {
      setHoveredYear(null)
    }
    return null
  }

  // ホバー時の塗りつぶし用データを生成
  const getAreaData = () => {
    if (clickStartYear !== null && !clickEndYear) {
      // 開始点選択後の表示（開始点から現在のホバー位置まで）
      if (hoveredYear) {
        const start = Math.min(clickStartYear, hoveredYear)
        const end = Math.max(clickStartYear, hoveredYear)
        return result.yearlyData.map(d => ({
          ...d,
          fillValue: d.year >= start && d.year <= end ? d.value : null
        }))
      } else {
        // ホバーしていない場合は開始点のみ表示
        return result.yearlyData.map(d => ({
          ...d,
          fillValue: d.year === clickStartYear ? d.value : null
        }))
      }
    } else if (!hoveredYear) {
      return result.yearlyData.map(d => ({ ...d, fillValue: null }))
    }
    
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
                <ComposedChart 
                  data={getAreaData()}
                  onClick={handleChartClick}
                >
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#EBEDF2" stopOpacity={1} />
                      <stop offset="50%" stopColor="#EBEDF2" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#088738" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#088738" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="selectGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="fillValue"
                    stroke="none"
                    fill={clickStartYear !== null ? "url(#selectGradient)" : "url(#fillGradient)"}
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
          
          {/* 期間選択の説明 */}
          {clickStartYear !== null && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700">
                開始年: {clickStartYear}年 | もう一度クリックして終了年を選択してください (Escでリセット)
              </p>
            </div>
          )}
          
          {/* 選択された区間の情報表示 */}
          {selectedRange && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="text-sm font-medium text-green-900 mb-1">
                選択期間: {selectedRange.start}年 〜 {selectedRange.end}年
              </h4>
              <p className="text-sm text-green-700">
                期間累積日: {selectedRange.days.toLocaleString()}日
              </p>
              <button 
                onClick={resetSelection}
                className="mt-2 text-xs text-green-600 hover:text-green-800 underline"
              >
                リセット
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}