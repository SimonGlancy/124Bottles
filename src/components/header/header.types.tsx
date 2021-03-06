import { RefObject } from 'react';
import { FlatList } from 'react-native';
import { DrankPint } from '../../../App';
import { PintProps } from '../pint';

export interface HeaderProps {
  finishedPints: DrankPint[];
  toggleDrinks: (direction: '+' | '-') => void;
  scrollRef: RefObject<FlatList>;
  pints: PintProps[]
}