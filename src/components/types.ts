export interface Banner {
  id?: number | null;
  bannerId: number | null;
  startDate: Date | string;
  endDate: Date | string;
  content: string;
  display: boolean;
  [index: string]: any;
}

export const initBanner: Banner = {
  bannerId: null,
  content: '',
  display: true,
  endDate: new Date(),
  id: null,
  startDate: new Date()
};

export interface State {
  loading: boolean;
  messageType: string;
  message: string;
}

export const initState: State = {
  loading: true,
  message: '',
  messageType: ''
};
