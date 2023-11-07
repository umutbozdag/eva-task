interface Day {
  label: string;
  value: number;
}

const days: Day[] = [
  {
    label: "Last 7 Days",
    value: 7,
  },
  {
    label: "Last 14 Days",
    value: 14,
  },
  {
    label: "Last 30 Days",
    value: 30,
  },
  {
    label: "Last 60 Days",
    value: 60,
  },
];

export default days;
