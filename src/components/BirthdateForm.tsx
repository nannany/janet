import { useState } from 'react'

interface BirthdateFormProps {
  onSubmit: (date: Date) => void
}

export default function BirthdateForm({ onSubmit }: BirthdateFormProps) {
  const [birthdateInput, setBirthdateInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (birthdateInput.trim()) {
      const dateString = birthdateInput.trim()
      
      // yyyyMMdd形式のみ対応
      const datePattern = /^(\d{4})(\d{2})(\d{2})$/
      const match = dateString.match(datePattern)
      
      if (match) {
        const year = parseInt(match[1])
        const month = parseInt(match[2]) - 1 // 月は0から始まる
        const day = parseInt(match[3])
        
        const parsedDate = new Date(year, month, day)
        
        if (!isNaN(parsedDate.getTime())) {
          onSubmit(parsedDate)
        } else {
          alert('正しい日付を入力してください（例: 19900101）')
        }
      } else {
        alert('yyyyMMdd形式で入力してください（例: 19900101）')
      }
    }
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center items-end">
      <div className="flex-1 min-w-64 max-w-md">
        <div className="space-y-2">
          <label className="block text-base font-medium text-primary">
            生年月日
          </label>
          <div className="bg-background border border-border rounded-xl p-4">
            <input
              type="text"
              value={birthdateInput}
              onChange={(e) => setBirthdateInput(e.target.value)}
              placeholder="19900101"
              className="w-full bg-transparent text-base text-secondary placeholder-secondary outline-none"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-center py-3">
        <button
          onClick={handleSubmit}
          className="bg-accent hover:bg-accent/80 transition-colors rounded-[20px] px-4 py-2.5 min-w-[84px] h-10"
        >
          <span className="text-sm font-bold text-primary">計算</span>
        </button>
      </div>
    </div>
  )
}