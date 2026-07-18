/**
 * Picks the correct plural form for a count. Two forms mean an
 * English-style [one, other] pair; three mean Slavic [one, few, many].
 * i18next's own plural support needs Intl.PluralRules, which Hermes
 * doesn't guarantee — this keeps grammar correct everywhere.
 */
export const pluralForm = (
  count: number,
  forms: readonly string[],
  locale: string,
): string => {
  if (forms.length < 3) {
    return count === 1 ? forms[0] : forms[forms.length - 1];
  }
  const mod10 = count % 10;
  const mod100 = count % 100;
  const few = mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14);
  if (locale === 'pl') {
    if (count === 1) {
      return forms[0];
    }
    return few ? forms[1] : forms[2];
  }
  if (mod10 === 1 && mod100 !== 11) {
    return forms[0];
  }
  return few ? forms[1] : forms[2];
};
