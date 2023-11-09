import dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.tz.setDefault('Asia/Seoul');
dayjs.locale(ko);

export const setDate = (date: number | string | Date) => {
  const diff = dayjs().diff(date, 'days');

  if (diff >= 7) {
    return dayjs(date).tz().format('YYYY년 M월 D일 HH:mm:ss');
  } else {
    return dayjs(date).tz().fromNow();
  }
};
