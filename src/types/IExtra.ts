export type IStates = {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso3: string;
    iso2: string;
    states: {
      name: string;
      state_code: string;
    }[];
  };
};

export type ICities = {
  error: boolean;
  msg: string;
  data: string[];
};

