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
        
        {/* Footer */}
        <footer className="mt-8 py-6 border-t border-gray-200">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center space-x-2 text-secondary">
              <span className="text-sm">Source code available on</span>
              <a 
                href="https://github.com/nannany/janet" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-sm font-medium text-primary hover:text-success transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>
            </div>
            <p className="mt-2 text-xs text-secondary">
              MIT License © 2025
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App