import React, {
  createContext, useContext, useState, useMemo, useCallback,
} from 'react';
import { saveToStorage, getFromStorage } from '@/utils/storage';

const storedTheme = getFromStorage('theme');

const prefersDark = window.matchMedia
  && window.matchMedia('(prefers-color-scheme: dark)').matches;

const defaultDark = storedTheme === 'dark' || (storedTheme === null && prefersDark);

const setMode = (mode) => {
  document.documentElement.setAttribute('data-theme', mode);
  saveToStorage('theme', mode);
};

if (defaultDark) {
  setMode('dark');
}

export const ThemeContext = createContext({
  theme: defaultDark ? 'dark' : 'light',
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultDark ? 'dark' : 'light');

  const changeTheme = useCallback((mode) => {
    setMode(mode);
    setTheme(mode);
  }, [setTheme]);

  const toggleTheme = useCallback(
    () => (theme === 'light' ? changeTheme('dark') : changeTheme('light')),
    [theme, changeTheme],
  );

  const isDark = useMemo(() => theme === 'dark', [theme]);

  const values = useMemo(() => ({ isDark, theme, toggleTheme }), [isDark, theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };
