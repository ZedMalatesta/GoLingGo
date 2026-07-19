import { EventAIAnalytics } from '../models/Analytics';
import { LanguageEvent } from '../models/Event';

// Finished Warsaw events shown in the "past events" section; each has a
// mocked AI post-event report in mockPastAnalytics below.
export const mockPastEvents: LanguageEvent[] = [
  {
    id: 'past-1',
    title: 'Klub konwersacyjny angielskiego: podróże',
    description:
      'Rozmowy o podróżach w małych grupach — od wakacyjnych historii po plany na jesień.',
    language: 'en',
    level: 'B1-B2',
    format: 'speaking-club',
    isFree: false,
    price: '40 zł',
    city: 'Warszawa',
    venue: 'Kawiarnia „Poliglota”, ul. Nowy Świat 12',
    dateISO: '2026-07-07T19:00:00',
    organizer: 'Kawiarnia Poliglota',
    capacity: 12,
    attendees: 9,
  },
  {
    id: 'past-2',
    title: 'Niemiecki stolik konwersacyjny: lato',
    description:
      'Letnie spotkanie przy kawie — swobodne rozmowy po niemiecku o wakacjach i planach.',
    language: 'de',
    level: 'any',
    format: 'meetup',
    isFree: true,
    city: 'Warszawa',
    venue: 'Coworking Smart Office, Al. Jerozolimskie 28',
    dateISO: '2026-07-01T18:30:00',
    organizer: 'Społeczność Niemiecka Warszawa',
    capacity: 20,
    attendees: 12,
  },
  {
    id: 'past-3',
    title: 'Tandem hiszpańsko-polski: noche de verano',
    description:
      'Wieczór tandemowy na Pradze — pół godziny po hiszpańsku, pół po polsku.',
    language: 'es',
    level: 'A1-A2',
    format: 'tandem',
    isFree: true,
    city: 'Warszawa',
    venue: 'Klubokawiarnia „Casa”, ul. Ząbkowska 5',
    dateISO: '2026-06-24T20:00:00',
    organizer: 'Klub Hiszpański Warszawa',
    capacity: 16,
    attendees: 8,
  },
];

export const mockPastAnalytics: Record<string, EventAIAnalytics> = {
  'past-1': {
    rsvps: 12,
    attended: 9,
    averageRating: 4.7,
    sentiment: 88,
    summary:
      'Bardzo udane spotkanie: frekwencja 75%, rozmowy trwały dłużej niż plan, a większość uczestników deklaruje powrót. Temat „podróże” okazał się strzałem w dziesiątkę.',
    insights: [
      'Najwięcej uczestników miało poziom B1 — warto rozważyć drugi stolik tylko dla B1.',
      'Wtorek 19:00 daje o 20% wyższą frekwencję niż piątkowe terminy.',
      'Uczestnicy prosili o listę słówek przed spotkaniem — wyślij ją przy kolejnym RSVP.',
    ],
  },
  'past-2': {
    rsvps: 18,
    attended: 12,
    averageRating: 4.3,
    sentiment: 76,
    summary:
      'Dobre spotkanie z jednym problemem: no-show wyniósł 33%. Osoby, które dotarły, chwaliły luźną atmosferę, ale grupom mieszanym brakowało chwilami wspólnych tematów.',
    insights: [
      'Przypomnienie 2 godziny przed startem zmniejszyło no-show o połowę względem czerwca.',
      'Rozpiętość poziomów A2–C1 była za duża — podział na dwa stoliki poprawi rozmowy.',
      'Obecność jednego native speakera na stolik wyraźnie podnosi oceny spotkania.',
    ],
  },
  'past-3': {
    rsvps: 10,
    attended: 8,
    averageRating: 4.9,
    sentiment: 93,
    summary:
      'Najwyżej oceniane wydarzenie miesiąca: kameralna grupa, idealne proporcje języków i świetna energia. Format tandemowy 30/30 minut sprawdza się bez zarzutu.',
    insights: [
      'Pary dobrane wg poziomu rozmawiały średnio 15 minut dłużej niż pary losowe.',
      'Uczestnicy A1 najlepiej radzili sobie z kartami tematów — przygotuj ich więcej.',
      'Sobota 20:00 na Pradze przyciąga komplet — rozważ większą salę lub drugi termin.',
    ],
  },
};
