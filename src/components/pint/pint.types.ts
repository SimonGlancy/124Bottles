export interface PintProps {
  name: 'Lager' | 'Guinness' | 'Cider' | 'Pale Ale' | 'Bitter';
  color: string;
  pintSize?: number;
  units: number;
  calories: number;
  onFinishPint: () => void;
}