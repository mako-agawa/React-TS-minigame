'use client';

import { MonsterCount } from '@/lib/monster';
import { redirect } from 'next/dist/server/api-utils';
import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

type ContextType = {
  playerHp: number;
  enemyHp: number;
  enemyId: number;
  reset: VoidFunction;
  attack: (target: 'player' | 'enemy') => void;
};

const Context = createContext<ContextType>({} as ContextType);

export function StageProvider({ children }: { children: ReactNode }) {
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [enemyHp, setEnemyHp] = useState<number>(100);

  const enemyId = useMemo(() => {
    return Math.floor(Math.random() * MonsterCount) + 1;
  }, []);

  const reset = () => {
    setPlayerHp(100);
    setEnemyHp(100);
  }

  const attack = (target: 'player' | 'enemy') => {
    if (target === 'player' ) {
      setPlayerHp((prev) => Math.max(prev - 10, 0));
      } else {
      setEnemyHp((prev) => Math.max(prev - 10, 0));
    }
  }
  

  return (
    <Context.Provider
      value={{
        playerHp,
        enemyHp,
        attack,
        enemyId,
        reset,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useStage = () => useContext(Context);