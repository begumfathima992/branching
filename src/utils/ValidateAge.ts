
export const ValidateAge = (date: Date | null) => {
  if (!date) return;
  let errroMessage: string | undefined;
  let currentDate = new Date();
  let parsedDate = new Date(date);
  let minDate = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  if (parsedDate && (parsedDate as Date).getTime() > minDate.getTime()) {
    errroMessage = "You must be greater than or equal to 18 years!";
  }
  return errroMessage;
};


