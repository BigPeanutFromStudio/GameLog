import FileSaver from 'file-saver';
import { game, states } from '../types';

export const saveData = (
  games: game[],
  filter: string,
  sortMethod: string,
  isAscending: boolean,
  categorize: boolean,
  categorizeBy: string,
  cardScale: number[],
  theme: string
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
  setCardScale: React.Dispatch<React.SetStateAction<number[]>>,
  setTheme: (theme: 'default' | 'preset1' | 'preset2' | 'preset3') => void
) => {
  const jsonData = JSON.parse(data);
  console.log(jsonData.settings.theme);

  setGames([...jsonData.games]);
  setFilter(jsonData.settings.filter);
  setSortMethod(jsonData.settings.sortMethod);
  setIsAscending(jsonData.settings.isAscending);
  setCategorize(jsonData.settings.categorize);
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
