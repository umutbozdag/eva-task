const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatDate(inputDate: string | Date | number): string {
  const date = new Date(inputDate);

  const dayOfWeek = daysOfWeek[date.getDay()];

  const fullDate = getDate(date);

  const formattedDate = `${dayOfWeek}, ${fullDate}`;
  return formattedDate;
}

function getDayName(inputDate: string | Date): string {
  const date = new Date(inputDate);

  const dayOfWeek = daysOfWeek[date.getDay()];

  return dayOfWeek;
}

function getDate(inputDate: string | Date): string {
  const date = new Date(inputDate);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${month}-${day}-${year}`;
  return formattedDate;
}

export { formatDate, getDayName, getDate };
