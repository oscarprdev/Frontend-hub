'use client';

import { Button } from '../components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useEffect } from 'react';

enum THEME {
  LIGHT = 'light',
  DARK = 'dark',
}

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = React.useState<THEME | null>(null);
  const { setTheme } = useTheme();

  useEffect(() => {
    setCurrentTheme(
      document.querySelector('html')?.classList.contains('dark') ? THEME.DARK : THEME.LIGHT
    );
  }, []);

  const handleToggleThemeClick = () => {
    React.startTransition(() => {
      setCurrentTheme(currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
      setTheme(currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
    });
  };

  return (
    <>
      {currentTheme && (
        <Button variant="outline" size="icon" onClick={handleToggleThemeClick}>
          {currentTheme === THEME.LIGHT ? <Moon /> : <Sun />}
        </Button>
      )}
    </>
  );
};

export default ThemeToggle;
