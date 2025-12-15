'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  try {
    const { theme, toggleTheme } = useTheme();

    return (
      <label className="flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          className="sr-only"
          aria-label="Toggle theme"
        />
        <span className="relative w-16 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full transition-colors">
          <span
            className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-transform duration-300 bg-white dark:bg-black shadow ${theme === 'dark' ? 'translate-x-8' : ''}`}
          />
          <span className="absolute left-2 top-2 text-yellow-400">
            <Sun className="w-4 h-4" />
          </span>
          <span className="absolute right-2 top-2 text-gray-800 dark:text-gray-200">
            <Moon className="w-4 h-4" />
          </span>
        </span>
      </label>
    );
  } catch {
    // Fallback during SSR or before ThemeProvider mounts
    return (
      <span className="relative w-16 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full opacity-50">
        <span className="absolute left-1 top-1 w-6 h-6 rounded-full bg-white dark:bg-black shadow" />
        <span className="absolute left-2 top-2 text-yellow-400">
          <Sun className="w-4 h-4" />
        </span>
        <span className="absolute right-2 top-2 text-gray-800 dark:text-gray-200">
          <Moon className="w-4 h-4" />
        </span>
      </span>
    );
  }
}
