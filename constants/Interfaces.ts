export interface ICard {
    id: string,
    code: string
}

export interface ISwitch {
    label: string;
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
  }