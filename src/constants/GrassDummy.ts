const today = new Date();
const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0');

export const GRASS_DUMMY = [
  {
    time: '01:00:00',
    createdAt: `2024-${currentMonth}-12T07:58:20.808Z`,
  },
  {
    time: '00:30:00',
    createdAt: `2024-${currentMonth}-16T07:58:20.808Z`,
  },
  {
    time: '10:00:00',
    createdAt: `2024-${currentMonth}-27T07:58:20.808Z`,
  },
  {
    time: '00:00:30',
    createdAt: `2024-${currentMonth}-01T07:58:20.808Z`,
  },
];
