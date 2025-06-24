import { differenceInYears, subYears, getYear } from 'date-fns'

export interface JanetLawResult {
  cumulativeDays: number
  yearsLived: number
  pastTenYearsPercentage: number
  yearlyData: Array<{
    year: number
    value: number
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
  
  // 過去10年間の割合計算
  const tenYearsAgo = subYears(today, 10)
  const tenYearsAgoAge = Math.max(1, differenceInYears(tenYearsAgo, birthdate))
  
  let pastTenYearsDays = 0
  for (let age = tenYearsAgoAge; age <= yearsLived; age++) {
    const subjectiveTime = 1 / age
    pastTenYearsDays += subjectiveTime * 365.25
  }
  
  const pastTenYearsPercentage = (pastTenYearsDays / cumulativeDays) * 100
  
  // チャート用のデータ（過去10年分）
  const yearlyData = []
  const startYear = Math.max(2014, getYear(today) - 9)
  const endYear = getYear(today)
  
  for (let year = startYear; year <= endYear; year++) {
    const ageAtYear = year - getYear(birthdate)
    if (ageAtYear > 0) {
      const subjectiveValue = 1 / ageAtYear
      yearlyData.push({
        year,
        value: subjectiveValue * 100 // パーセンテージ表示用
      })
    }
  }
  
  return {
    cumulativeDays: Math.round(cumulativeDays),
    yearsLived,
    pastTenYearsPercentage: Math.round(pastTenYearsPercentage),
    yearlyData
  }
}