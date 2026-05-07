export type Slot = {
  startTime: string;
  endTime: string;
};

export type ScheduleGroup = {
  date: Date;
  dateString: string;
  slots: Slot[];
};
