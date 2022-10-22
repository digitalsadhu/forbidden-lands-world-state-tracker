export type WeatherData = {
  rain: string;
  wind: string;
  cold: string;
}

export type Data = {
  day: number;
  quarterDay: number;
  turn: number;
  round: number;
  dayList: DayData[];
  selectedOptionsList: SelectedOptionsData[];
}

export type DayData = {
  day: number;
  quarterDay: number;
  turn: number;
  round: number;
  quarterDayList: QuarterDayData[];
  weather: WeatherData;
}

export type QuarterDayData = {
  quarterDay: number;
  turn: number;
  round: number;
  turnList: TurnData[];
  dark: boolean;
}

export type TurnData = {
  turn: number;
  round: number;
  roundList: RoundData[];
}

export type RoundData = {
  round: number;
}

export type SelectedOptionsData = {
  day: number;
  quarterDay: number;
  turn: number;
  round: number;
  key: string;
  options: any;
}
