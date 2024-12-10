import { useMemo } from 'react';

const useFormatDate = (dateString) => {
  return useMemo(() => {
    if (!dateString) return ''; // Return an empty string if no date is provided
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options); // Example: 'DD/MM/YYYY'
  }, [dateString]);
};

export default useFormatDate;
