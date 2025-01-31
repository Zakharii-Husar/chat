import { formatDistanceToNow } from 'date-fns';

export const formatUtcToLocal = (utcDate: string | Date, addSuffix: boolean = true) => {
  // If it's a string, parse it directly as UTC
  const date = typeof utcDate === 'string' 
    ? new Date(utcDate + 'Z')  // Append Z to force UTC interpretation
    : utcDate;

  // Now we can format it - the browser will automatically convert to local time
  return formatDistanceToNow(date, { addSuffix });
}; 