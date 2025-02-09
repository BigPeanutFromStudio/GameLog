import { createContext, useContext, useEffect, useState } from 'react';

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
  setCategorizeBy: (categorizeBy: string) => void;
  cardScale: number[];
  setCardScale: React.Dispatch<React.SetStateAction<number[]>>;
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
  const initialSettings = JSON.parse(
    localStorage.getItem('settings') ||
      '{ "filter": "all", "sortMethod": "byname", "isAscending": true, "categorize": false, "categorizeBy":"state", "cardScale": [460, 215]}'
  );

  const [filter, setFilter] = useState(initialSettings.filter);
  const [sortMethod, setSortMethod] = useState(initialSettings.sortMethod);
  const [isAscending, setIsAscending] = useState(initialSettings.isAscending);
  const [categorize, setCategorize] = useState(initialSettings.categorize);
  const [categorizeBy, setCategorizeBy] = useState(
    initialSettings.categorizeBy
  );
  const [cardScale, setCardScale] = useState(initialSettings.cardScale);

  useEffect(() => {
    const settings = {
      filter: filter,
      sortMethod: sortMethod,
      isAscending: isAscending,
      categorize: categorize,
      categorizeBy: categorizeBy,
      cardScale: cardScale,
    };
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [filter, sortMethod, isAscending, categorize, categorizeBy, cardScale]);

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
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
