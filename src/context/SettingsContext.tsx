import { createContext, useContext, useEffect, useState } from 'react';
import {
  defaultTheme,
  preset1Theme,
  preset2Theme,
  preset3Theme,
} from '../theme/defaultTheme';

export const themes = {
  default: defaultTheme,
  preset1: preset1Theme,
  preset2: preset2Theme,
  preset3: preset3Theme,
};

interface SettingsContextProps {
  filter: string[];
  setFilter: React.Dispatch<React.SetStateAction<string[]>>;
  isAscending: boolean;
  setIsAscending: React.Dispatch<React.SetStateAction<boolean>>;
  sortMethod: string;
  setSortMethod: React.Dispatch<React.SetStateAction<string>>;
  categorize: boolean;
  setCategorize: React.Dispatch<React.SetStateAction<boolean>>;
  categorizeBy: string;
  setCategorizeBy: React.Dispatch<React.SetStateAction<string>>;
  cardsPerRow: number;
  setCardsPerRow: React.Dispatch<React.SetStateAction<number>>;
  theme: typeof defaultTheme;
  setTheme: (theme: typeof defaultTheme) => void;
  savedTheme: typeof defaultTheme;
  saveTheme: (themeToSave: typeof defaultTheme) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      'useSettingsContext must be used within a SettingsProvider'
    );
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialSettings: {
    filter: string[];
    sortMethod: string;
    isAscending: boolean;
    categorize: boolean;
    categorizeBy: string;
    cardsPerRow: number;
    theme: typeof defaultTheme;
    savedTheme: typeof defaultTheme;
  } = JSON.parse(
    localStorage.getItem('settings') ||
      `{ "filter": ["100%", "Finished", "Playing", "Queued", "Abandoned"], "sortMethod": "byname", "isAscending": true, "categorize": false, "categorizeBy":"state",  "cardsPerRow": "6", "theme": ${JSON.stringify(
        defaultTheme
      )}, "savedTheme": ${JSON.stringify(defaultTheme)}}`
  );

  const [filter, setFilter] = useState(initialSettings.filter);
  const [sortMethod, setSortMethod] = useState(initialSettings.sortMethod);
  const [isAscending, setIsAscending] = useState(initialSettings.isAscending);
  const [categorize, setCategorize] = useState(initialSettings.categorize);
  const [categorizeBy, setCategorizeBy] = useState(
    initialSettings.categorizeBy
  );
  const [cardsPerRow, setCardsPerRow] = useState(initialSettings.cardsPerRow);
  const [theme, setThemeState] = useState(initialSettings.theme);
  const [savedTheme, setSavedTheme] = useState(initialSettings.savedTheme);

  const setTheme = (theme: typeof defaultTheme) => {
    setThemeState(theme);
    localStorage.setItem(
      'settings',
      JSON.stringify({ ...initialSettings, theme })
    );
  };

  const saveTheme = (themeToSave: typeof defaultTheme) => {
    setSavedTheme(themeToSave);
    localStorage.setItem(
      'settings',
      JSON.stringify({ ...initialSettings, themeToSave })
    );
  };

  useEffect(() => {
    const settings = {
      filter: filter,
      sortMethod: sortMethod,
      isAscending: isAscending,
      categorize: categorize,
      categorizeBy: categorizeBy,
      cardsPerRow: cardsPerRow,
      theme: theme,
      savedTheme: savedTheme,
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [
    filter,
    sortMethod,
    isAscending,
    categorize,
    categorizeBy,
    cardsPerRow,
    theme,
    savedTheme,
  ]);

  const value: SettingsContextProps = {
    filter,
    setFilter,
    isAscending,
    setIsAscending,
    sortMethod,
    setSortMethod,
    categorize,
    setCategorize,
    categorizeBy,
    setCategorizeBy,
    cardsPerRow,
    setCardsPerRow,
    theme,
    setTheme,
    savedTheme,
    saveTheme,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
