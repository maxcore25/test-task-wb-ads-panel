export type AdStatsItem = {
  nmId: number;
  clicks: number;
  ctr: number;
  cpc: number;
};

export type AdStats = {
  summary: {
    clicks: number;
    ctr: number;
    cpc: number;
  };
  list: AdStatsItem[];
};

export type AdStatsFormData = {
  advert: number;
  date: Date;
};
