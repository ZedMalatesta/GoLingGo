import { EventReview } from '../models/Review';

// Reviews left by people who attended previous runs of these recurring
// events; content stays in the reviewer's own language (it is data).
export const mockReviews: Record<string, EventReview[]> = {
  'evt-1': [
    {
      id: 'rev-1',
      author: 'Anna K.',
      avatar: '🦉',
      level: 'B1',
      rating: 5,
      text: 'Bardzo przyjazna atmosfera! Moderator delikatnie wciąga do rozmowy nawet nieśmiałych. Idę już trzeci raz.',
      dateISO: '2026-07-07T21:30:00',
    },
    {
      id: 'rev-2',
      author: 'Marco',
      avatar: '😎',
      level: 'native',
      rating: 4,
      text: 'Nice crowd and good topics. Sometimes groups get a bit big, but the rotation keeps it fun.',
      dateISO: '2026-06-30T22:10:00',
    },
    {
      id: 'rev-3',
      author: 'Paweł',
      avatar: '☕',
      level: 'B2',
      rating: 5,
      text: 'Kawa świetna, rozmowy jeszcze lepsze. Przez cały wieczór naprawdę dużo mówisz, a nie tylko słuchasz.',
      dateISO: '2026-06-23T20:45:00',
    },
  ],
  'evt-2': [
    {
      id: 'rev-4',
      author: 'Olga',
      avatar: '🌍',
      level: 'A2',
      rating: 5,
      text: 'Kam als Anfängerin und fühlte mich sofort willkommen. Alle sprechen geduldig und langsam.',
      dateISO: '2026-07-08T20:00:00',
    },
    {
      id: 'rev-5',
      author: 'Darek',
      avatar: '🚀',
      level: 'B1',
      rating: 4,
      text: 'Dobry format, swobodna rozmowa bez sztywnego programu. Czasem brakuje tematów do dyskusji.',
      dateISO: '2026-07-01T21:15:00',
    },
  ],
  'evt-4': [
    {
      id: 'rev-6',
      author: 'Céline',
      avatar: '🌸',
      level: 'native',
      rating: 5,
      text: 'Toujours un plaisir — les courts métrages sont bien choisis et la discussion est vivante.',
      dateISO: '2026-06-27T22:00:00',
    },
    {
      id: 'rev-7',
      author: 'Igor',
      avatar: '📚',
      level: 'B2',
      rating: 4,
      text: 'Filmy ciekawe, dyskusja dynamiczna. Dla B1 może być ciężko, lepiej mieć pewne B2.',
      dateISO: '2026-06-20T21:40:00',
    },
  ],
  'evt-5': [
    {
      id: 'rev-8',
      author: 'Sofia',
      avatar: '🎧',
      level: 'C1',
      rating: 5,
      text: 'Sharp debates, great moderation, and genuinely challenging topics. The best advanced club in town.',
      dateISO: '2026-07-14T21:50:00',
    },
  ],
  'evt-6': [
    {
      id: 'rev-9',
      author: 'Marysia',
      avatar: '🌸',
      level: 'A1',
      rating: 5,
      text: 'Native speakerzy są bardzo cierpliwi, wszystko tłumaczą gestami i obrazkami. Po zajęciach wreszcie zapamiętałam tony!',
      dateISO: '2026-07-12T19:00:00',
    },
    {
      id: 'rev-10',
      author: 'Li Wei',
      avatar: '🙂',
      level: 'native',
      rating: 4,
      text: '大家都很认真，气氛轻松。希望更多人来练习！',
      dateISO: '2026-07-05T18:45:00',
    },
  ],
  'evt-7': [
    {
      id: 'rev-11',
      author: 'Krystyna',
      avatar: '☕',
      level: 'A2',
      rating: 5,
      text: 'Aperitivo pyszne, Włosi przy stole prawdziwi, błędy poprawiają z humorem. Bellissimo!',
      dateISO: '2026-07-09T22:20:00',
    },
  ],
  'evt-8': [
    {
      id: 'rev-12',
      author: 'James',
      avatar: '🌍',
      level: 'B1',
      rating: 5,
      text: "Best way to practice Polish in Warsaw. The moderators slow down when you're lost and the games are great fun.",
      dateISO: '2026-07-13T20:00:00',
    },
  ],
};
