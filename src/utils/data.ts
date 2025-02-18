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
  theme: typeof defaultTheme,
  saveMode: number // 0 - all, 1 - theme, 2 - settings, 3 - games
) => {
  const settings = {
    filter: filter,
    sortMethod: sortMethod,
    isAscending: isAscending,
    categorize: categorize,
    categorizeBy: categorizeBy,
    cardScale: cardScale,
  };

  let dataToSave: string = '';

  switch (saveMode) {
    case 0:
      dataToSave = JSON.stringify({
        theme: theme,
        settings: settings,
        games: games,
      });
      break;
    case 1:
      dataToSave = JSON.stringify({ theme: theme });
      break;
    case 2:
      dataToSave = JSON.stringify({ settings: settings });
      break;
    case 3:
      dataToSave = JSON.stringify({ games: games });
  }

  const blob = new Blob([dataToSave], { type: 'application/json' });

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

  if (jsonData.games) {
    setGames([...jsonData.games]);
  }
  if (jsonData.settings) {
    setFilter(jsonData.settings.filter);
    setSortMethod(jsonData.settings.sortMethod);
    setIsAscending(jsonData.settings.isAscending);
    setCategorize(jsonData.settings.categorize);
    setCategorizeBy(jsonData.settings.categorizeBy);
    setCardScale(jsonData.settings.cardScale);
  }
  if (jsonData.theme) {
    setTheme(jsonData.theme);
  }
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
