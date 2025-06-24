import { differenceInYears, getYear } from 'date-fns'

export interface JanetLawResult {
  cumulativeDays: number
  yearsLived: number
  yearlyData: Array<{
    year: number
    value: number
    cumulativeDays: number
  }>
}

export function calculateJanetLaw(birthdate: Date): JanetLawResult {
  const today = new Date()
  const yearsLived = differenceInYears(today, birthdate)
  
  // ジャネーの法則による累積日数計算
  // 各年の主観的時間 = 1 / その年の年齢
  let cumulativeDays = 0
  
  for (let age = 1; age <= yearsLived; age++) {
    const subjectiveTime = 1 / age
    cumulativeDays += subjectiveTime * 365.25 // 1年を365.25日として計算
  }
  
  
  // チャート用のデータ（生まれた年から現在まで）
  const yearlyData = []
  const birthYear = getYear(birthdate)
  const currentYear = getYear(today)
  
  for (let year = birthYear + 1; year <= currentYear; year++) {
    const ageAtYear = year - birthYear
    const subjectiveValue = 1 / ageAtYear
    
    // その年までの累積日数を計算
    let cumulativeDaysUpToYear = 0
    for (let age = 1; age <= ageAtYear; age++) {
      const yearlySubjectiveTime = 1 / age
      cumulativeDaysUpToYear += yearlySubjectiveTime * 365.25
    }
    
    yearlyData.push({
      year,
      value: subjectiveValue * 100, // パーセンテージ表示用
      cumulativeDays: Math.round(cumulativeDaysUpToYear)
    })
  }
  
  return {
    cumulativeDays: Math.round(cumulativeDays),
    yearsLived,
    yearlyData
  }
}