export interface Banner {
  id?: number | null;
  bannerId: number | null;
  startDate: Date | string;
  endDate: Date | string;
  content: string;
  display: boolean;
  [index : string]: any
}

export const initBanner: Banner = {
  id: null,
  bannerId: null,
  startDate: new Date(),
  endDate: new Date(),
  content: '',
  display: true
}

export interface State {
  loading: boolean;
  error: boolean;
  message: string;
}

export const initState: State = {
    loading: true,
    error: false,
    message: ''
}