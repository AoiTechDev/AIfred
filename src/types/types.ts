//TU TEN TYP TRZEBA OGARNAC JAK CHCCEMY PRZECHOWYWAC, zamysł taki mialem ze to bedzie tablica objektow
// i trzeba ogarnac jakie pola bedzie musial miec ten objekt i co tak na prawde potrzebujemy

export type CurrentDay = Array<SingleEvent>;

export type SingleEvent = {
  summary?: string;
  description?: string;

  start: Date;
  end: Date;
};

export type CurrentDayEvent = {
  id: string;
  summary: string;
  description: string;
  start: {
    dateTime: Date;
  };
  end: {
    dateTime: Date;
  };
};

export type Weight = "Super Important" | "Important" | "Not So Important";