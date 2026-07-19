import { EventReview } from '../models/Review';

// Reviews left by people who attended previous runs of these recurring
// Warsaw events; all texts are in Polish for the Poland-focused demo.
export const mockReviews: Record<string, EventReview[]> = {
  'evt-1': [
    {
      id: 'rev-1',
      author: 'Anna K.',
      avatarUrl: 'https://i.pravatar.cc/100?img=47',
      level: 'B1',
      rating: 5,
      text: 'Bardzo przyjazna atmosfera! Moderator delikatnie wciąga do rozmowy nawet nieśmiałych. Idę już trzeci raz.',
      dateISO: '2026-07-07T21:30:00',
    },
    {
      id: 'rev-2',
      author: 'Marco',
      avatarUrl: 'https://i.pravatar.cc/100?img=12',
      level: 'native',
      rating: 4,
      text: 'Świetna ekipa i dobre tematy. Czasem grupy robią się trochę za duże, ale rotacja przy stolikach ratuje sytuację.',
      dateISO: '2026-06-30T22:10:00',
    },
    {
      id: 'rev-3',
      author: 'Paweł',
      avatarUrl: 'https://i.pravatar.cc/100?img=59',
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
      avatarUrl: 'https://i.pravatar.cc/100?img=44',
      level: 'A2',
      rating: 5,
      text: 'Przyszłam jako początkująca i od razu poczułam się mile widziana. Wszyscy mówią cierpliwie i powoli.',
      dateISO: '2026-07-08T20:00:00',
    },
    {
      id: 'rev-5',
      author: 'Darek',
      avatarUrl: 'https://i.pravatar.cc/100?img=68',
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
      avatarUrl: 'https://i.pravatar.cc/100?img=45',
      level: 'native',
      rating: 5,
      text: 'Zawsze z przyjemnością — krótkie metraże są świetnie dobrane, a dyskusja bardzo żywa.',
      dateISO: '2026-06-27T22:00:00',
    },
    {
      id: 'rev-7',
      author: 'Igor',
      avatarUrl: 'https://i.pravatar.cc/100?img=51',
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
      avatarUrl: 'https://i.pravatar.cc/100?img=26',
      level: 'C1',
      rating: 5,
      text: 'Ostre debaty, świetna moderacja i naprawdę wymagające tematy. Najlepszy klub dla zaawansowanych w Warszawie.',
      dateISO: '2026-07-14T21:50:00',
    },
  ],
  'evt-6': [
    {
      id: 'rev-9',
      author: 'Marysia',
      avatarUrl: 'https://i.pravatar.cc/100?img=32',
      level: 'A1',
      rating: 5,
      text: 'Native speakerzy są bardzo cierpliwi, wszystko tłumaczą gestami i obrazkami. Po zajęciach wreszcie zapamiętałam tony!',
      dateISO: '2026-07-12T19:00:00',
    },
    {
      id: 'rev-10',
      author: 'Li Wei',
      avatarUrl: 'https://i.pravatar.cc/100?img=60',
      level: 'native',
      rating: 4,
      text: 'Wszyscy są bardzo zaangażowani, a atmosfera swobodna. Zapraszam więcej osób do wspólnych ćwiczeń!',
      dateISO: '2026-07-05T18:45:00',
    },
  ],
  'evt-7': [
    {
      id: 'rev-11',
      author: 'Krystyna',
      avatarUrl: 'https://i.pravatar.cc/100?img=25',
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
      avatarUrl: 'https://i.pravatar.cc/100?img=13',
      level: 'B1',
      rating: 5,
      text: 'Najlepszy sposób na ćwiczenie polskiego w Warszawie. Moderatorzy zwalniają, kiedy się gubisz, a gry to świetna zabawa.',
      dateISO: '2026-07-13T20:00:00',
    },
  ],
};
