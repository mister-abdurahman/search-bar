export interface ICampaignDuration {
  openedLongSearchBar: boolean;
  startDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}
export interface IPrefferedLocations {
  openedLongSearchBar: boolean;
  selectedLocations: string[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
}
export interface IRadius {
  openedLongSearchBar: boolean;
  kmValue: number;
  setKmValue: React.Dispatch<React.SetStateAction<number>>;
}
export interface IButton {
  openedLongSearchBar: boolean;
  kmValue: number;
  startDate: Date | null;
  endDate: Date | null;
  selectedLocations: string[];
}
