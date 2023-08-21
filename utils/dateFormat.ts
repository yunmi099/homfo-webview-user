export function formatDateToCustomFormat(date: string) {
    const parsedDate = new Date(date);
    if (parsedDate !== undefined) {
      const year = parsedDate.getFullYear().toString().padStart(4, '0');
      const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
      const day = parsedDate.getDate().toString().padStart(2, '0');
      return `${year}.${month}.${day}`;
    } else {
      return ''; // 혹은 다른 기본값을 반환하거나 오류 처리를 진행할 수 있습니다.
    }
  }
  