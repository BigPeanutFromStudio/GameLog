import { createContext, useContext, useEffect, useState } from 'react';
import { defaultTheme } from '../theme/defaultTheme';
import { preset1Theme } from '../theme/preset1Theme';
import { preset2Theme } from '../theme/preset2Theme';
import { preset3Theme } from '../theme/preset3Theme';

export const themes = {
  default: defaultTheme,
  preset1: preset1Theme,
  preset2: preset2Theme,
  preset3: preset3Theme,
};

interface SettingsContextProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  isAscending: boolean;
  setIsAscending: React.Dispatch<React.SetStateAction<boolean>>;
  sortMethod: string;
  setSortMethod: React.Dispatch<React.SetStateAction<string>>;
  categorize: boolean;
  setCategorize: React.Dispatch<React.SetStateAction<boolean>>;
  categorizeBy: string;
  setCategorizeBy: React.Dispatch<React.SetStateAction<string>>;
  cardScale: number[];
  setCardScale: React.Dispatch<React.SetStateAction<number[]>>;
  theme: typeof defaultTheme;
  setTheme: (theme: 'default' | 'preset1' | 'preset2' | 'preset3') => void;
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
    filter: string;
    sortMethod: string;
    isAscending: boolean;
    categorize: boolean;
    categorizeBy: string;
    cardScale: number[];
    theme: 'default' | 'preset1' | 'preset2' | 'preset3';
  } = JSON.parse(
    localStorage.getItem('settings') ||
      '{ "filter": "all", "sortMethod": "byname", "isAscending": true, "categorize": false, "categorizeBy":"state", "cardScale": [460, 215], "theme": "default" }'
  );

  console.log('Initial settings:', initialSettings);

  const [filter, setFilter] = useState(initialSettings.filter);
  const [sortMethod, setSortMethod] = useState(initialSettings.sortMethod);
  const [isAscending, setIsAscending] = useState(initialSettings.isAscending);
  const [categorize, setCategorize] = useState(initialSettings.categorize);
  const [categorizeBy, setCategorizeBy] = useState(
    initialSettings.categorizeBy
  );
  const [cardScale, setCardScale] = useState(initialSettings.cardScale);
  const [theme, setThemeState] = useState(themes[initialSettings.theme]);

  console.log('Initial theme:', themes[initialSettings.theme]);

  const setTheme = (theme: 'default' | 'preset1' | 'preset2' | 'preset3') => {
    setThemeState(themes[theme]);
    localStorage.setItem(
      'settings',
      JSON.stringify({ ...initialSettings, theme })
    );
  };

  useEffect(() => {
    const settings = {
      filter: filter,
      sortMethod: sortMethod,
      isAscending: isAscending,
      categorize: categorize,
      categorizeBy: categorizeBy,
      cardScale: cardScale,
      theme: Object.keys(themes).find(
        (key) => themes[key as keyof typeof themes] === theme
      ),
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [
    filter,
    sortMethod,
    isAscending,
    categorize,
    categorizeBy,
    cardScale,
    theme,
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
    cardScale,
    setCardScale,
    theme,
    setTheme,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
