import FileSaver from 'file-saver';
import { game, states } from '../types';
import { defaultTheme } from '../theme/defaultTheme';

export const saveData = (
  games: game[],
  filter: string,
  sortMethod: string,
  isAscending: boolean,
  categorize: boolean,
  categorizeBy: string,
  cardScale: number[],
  theme: typeof defaultTheme
) => {
  const settings = {
    filter: filter,
    sortMethod: sortMethod,
    isAscending: isAscending,
    categorize: categorize,
    categorizeBy: categorizeBy,
    cardScale: cardScale,
    theme: theme,
  };
  const blob = new Blob(
    [JSON.stringify({ settings: settings, games: games })],
    { type: 'application/json' }
  );

  FileSaver.saveAs(blob, 'data.json');
};

export const loadData = (
  data: string,
  setGames: React.Dispatch<React.SetStateAction<game[]>>,
  setFilter: React.Dispatch<React.SetStateAction<string>>,
  setSortMethod: React.Dispatch<React.SetStateAction<string>>,
  setIsAscending: React.Dispatch<React.SetStateAction<boolean>>,
  setCategorize: React.Dispatch<React.SetStateAction<boolean>>,
  setCategorizeBy: React.Dispatch<React.SetStateAction<string>>,
  setCardScale: React.Dispatch<React.SetStateAction<number[]>>,
  setTheme: (theme: typeof defaultTheme) => void
) => {
  const jsonData = JSON.parse(data);

  setGames([...jsonData.games]);
  setFilter(jsonData.settings.filter);
  setSortMethod(jsonData.settings.sortMethod);
  setIsAscending(jsonData.settings.isAscending);
  setCategorize(jsonData.settings.categorize);
  setCategorizeBy(jsonData.settings.categorizeBy);
  setCardScale(jsonData.settings.cardScale);
  setTheme(jsonData.settings.theme);
};

export const getFilteredGames = (
  games: game[],
  name: string | null,
  filter: string | states
) => {
  let filteredGames = [...games];
  if (name !== null && name !== '') {
    filteredGames = games.filter((game) =>
      game.name.toLocaleLowerCase().startsWith(name.toLocaleLowerCase())
    );
  }
  if (filter === 'all') {
    return filteredGames;
  } else {
    filter = filter === 'FinishedFully' ? '100%' : filter;
    return filteredGames.filter((game) => game.state == filter);
  }
};
