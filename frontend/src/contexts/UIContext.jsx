// This file defines a React context and provider for managing UI-related state, such as navigation and popup visibility.

import { createContext, useState } from 'react';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <UIContext.Provider value={{ isNavOpen, setIsNavOpen, isPopupOpen, setIsPopupOpen }}>
      {children}
    </UIContext.Provider>
  );
};
