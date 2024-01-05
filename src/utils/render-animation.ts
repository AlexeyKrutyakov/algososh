import React from 'react';
import { ElementStates } from '../types';
import { delay } from './delay';
import { SHORT_DELAY_IN_MS } from '../constants/delays';

export const renderAnimation = async (
  setActiveCircleState: (value: React.SetStateAction<ElementStates>) => void
): Promise<void> => {
  setActiveCircleState(ElementStates.Changing);
  await delay(SHORT_DELAY_IN_MS);
  setActiveCircleState(ElementStates.Default);
};
