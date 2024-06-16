import { ChipColor } from "@/types";

export const roundedNumber = (num: number, decimal: number) => {
  return Math.floor(num * (10 ** decimal)) / (10 ** decimal);
}

export const omitText = (text: string | undefined, start: number, end: number) => {
  if (!text) return ''
  if (text.length < start + end) return text
  return text.substring(0, start) + '...' + text.substring(text.length - end, text.length)
}

export const calculateTimeDifference = (craetedAt: Date) => {
  const now = new Date()
  const timeZoneOffset = now.getTimezoneOffset()
  const adjustedTime = new Date(now.getTime() + timeZoneOffset * 60 * 1000)
  const adjustedCreatedAt = new Date(craetedAt.getTime() + craetedAt.getTimezoneOffset() * 60 * 1000)
  const differenceInMilliseconds = Math.abs(adjustedTime.getTime() - adjustedCreatedAt.getTime())
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000)
  const differenceInMinutes = Math.floor(differenceInSeconds / 60)
  const differenceInHours = Math.floor(differenceInMinutes / 60)
  const differenceInDays = Math.floor(differenceInHours / 24)
  const differenceInYears = Math.floor(differenceInDays / 365)

  if (differenceInMinutes < 1) {
    return 'just now'
  } else if (differenceInMinutes < 60) {
    return `${differenceInMinutes} mins ago`
  } else if (differenceInHours < 24) {
    const remainingMinutes = differenceInMinutes % 60
    return `${differenceInHours} hours ${remainingMinutes} mins ago`
  } else if (differenceInDays < 365) {
    const remainingHours = differenceInHours % 24
    return `${differenceInDays} days ${remainingHours} hours ago`
  } else {
    const remainingDays = differenceInDays % 365
    return `${differenceInYears} years ${remainingDays} days ago`
  }
}

export const getColor = (status: string): ChipColor => {
  switch (status) {
    case 'SUCCESS':
      return 'success'
    case 'ERROR':
      return 'danger'
    default:
      return 'secondary'
  }
}
