type SaveDataTypes<T> = T;

export function saveDataInLocalStorage<T>(key: string, data: T) {
  return localStorage.setItem(key, JSON.stringify(data));
}

export function getDataFromLocalStorage(key: string) {
  const data = typeof window !== 'undefined' && localStorage.getItem(key);
  if (typeof data === 'string') {
    return JSON.parse(data);
  } else return null;
}

export function deleteLocalStorageData(key: string) {
  localStorage.removeItem(key);
}

// 두 날짜 간 총 일수 계산
export function calculateDaysBetween(date1: string, date2: string) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  const diffInMs = Math.abs(endDate.getTime() - startDate.getTime());

  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  // 기간 총 일수 반환
  return diffInDays + 1;
}

// 두 날짜 간 주말 일수 계산
export function countWeekendsBetween(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  let count = 0;

  for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
    let dayOfWeek = day.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // 0: Sunday, 6: Saturday
      count++;
    }
  }

  return count;
}

// 주기
export const convertCycleToKorean = (
  cycleType: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
) => {
  switch (cycleType) {
    case 'DAY':
      return '하루';
    case 'WEEK':
      return '일주일';
    case 'MONTH':
      return '한 달';
    case 'YEAR':
      return '일 년';
    default:
      return '';
  }
};

// 주기
export function convertCycleToNumber(
  cycleType: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
) {
  switch (cycleType) {
    case 'DAY':
      return 1;
    case 'WEEK':
      return 7;
    case 'MONTH':
      return 30;
    case 'YEAR':
      return 365;
    default:
      return 0;
  }
}

// 주말 제외한 주기 일수 계산
export function calculateCycleDaysExclWeekends(
  cycleType: 'DAY' | 'WEEK' | 'MONTH' | 'YEAR'
) {
  switch (cycleType) {
    case 'DAY':
      return 0;
    case 'WEEK':
      return 2;
    case 'MONTH':
      return 9;
    case 'YEAR':
      return 105;
    default:
      return 0;
  }
}

export function convertCountToKorean(countType: 'COUNT' | 'DURATION') {
  switch (countType) {
    case 'COUNT':
      return '회';
    case 'DURATION':
      return '시간';
    default:
      return '';
  }
}

// 전화번호 하이픈 추가
export function formatPhoneNumber(phoneNumber: string) {
  // 숫자만 남기고 나머지 문자 제거
  if (!phoneNumber) return '전화번호 정보 없음';

  const numericString = phoneNumber.replace(/\D/g, '');

  // 전화번호 패턴에 따라 포맷 변경
  if (numericString.length === 10) {
    return numericString.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  } else if (numericString.length === 11) {
    return numericString.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else {
    // 길이가 10 또는 11이 아닌 경우 원래 문자열 반환
    return phoneNumber;
  }
}
