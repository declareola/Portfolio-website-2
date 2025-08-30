
import React, { createContext, useState, ReactNode } from 'react';

type CursorVariant = 'default' | 'hover' | 'text';

interface CursorContextType {
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
}

export const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [variant, setVariant] = useState<CursorVariant>('default');

  // FIX: Removed the redundant 'setVariant' function declaration.
  // The 'setVariant' function returned by the 'useState' hook is sufficient and
  // the previous implementation caused a redeclaration error and infinite recursion.

  return (
    <CursorContext.Provider value={{ variant, setVariant }}>
      {children}
    </CursorContext.Provider>
  );
};
