import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { PintProps } from '../pint';

export interface PintsListProps {
  pints: PintProps[];
  onMomentumScrollEnd: ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => void;
  currentIndex: number;
}