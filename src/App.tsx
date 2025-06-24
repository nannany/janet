import { useState } from 'react'
import BirthdateForm from './components/BirthdateForm'
import ResultDisplay from './components/ResultDisplay'
import { calculateJanetLaw } from './utils/janetLaw'

function App() {
  const [, setBirthdate] = useState<Date | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleBirthdateSubmit = (date: Date) => {
    setBirthdate(date)
    const calculatedResult = calculateJanetLaw(date)
    setResult(calculatedResult)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="bg-background min-h-screen">
          <div className="px-4 md:px-20 lg:px-40 py-5">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center py-5 px-4">
                <h1 className="text-3xl font-bold text-primary mb-3">
                  ジャネー時間を計算する
                </h1>
                <p className="text-base text-primary px-4">
                  生年月日を入力し、ジャネーの法則に基づく認識時間を計算します。
                </p>
              </div>

              {/* Form */}
              <div className="px-4 py-3">
                <BirthdateForm onSubmit={handleBirthdateSubmit} />
              </div>

              {/* Results */}
              {result && (
                <div className="px-4 py-6">
                  <ResultDisplay result={result} />
                </div>
              )}

              {/* Description */}
              <div className="px-4 py-3">
                <p className="text-base text-primary leading-relaxed">
                  ジャネーの法則とは、主観的な時間の感じ方が年齢の逆数に比例するという心理学の法則です。つまり、年齢が高くなるほど時間が短く感じられるという現象を数式化したものです。例えば、10歳の子供にとって1年は人生の1/10ですが、50歳の大人にとって1年は人生の1/50に過ぎません。累積日とは、この年齢の逆数を用いて計算された、生まれてから現在までの主観的な時間の総量を表します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App