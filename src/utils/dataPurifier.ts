const DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const SPECIAL_CHAR_REGEX = /([A-Z])/g;

const REGEX = /[^A-Za-z0-9 ]/g;
const TIME_REGEX = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;

export const dataPurifier = (inpt: number | string | Date) => {
  if (inpt === undefined || !inpt || inpt === "") return null;
  if (typeof inpt === "string" && TIME_REGEX.test(inpt)) {
    return inpt;
  }
  if (typeof inpt === "string" && /^\d{4}-\d{2}-\d{2}$/.test(inpt)) {
    return inpt;
  }
  if (
    typeof inpt === "string" &&
    !DATE_REGEX.test(inpt) &&
    !EMAIL_REGEX.test(inpt)
  ) {
    if (SPECIAL_CHAR_REGEX.test(inpt) || REGEX.test(inpt)) {
      return inpt
        .replace(SPECIAL_CHAR_REGEX, " $1")
        .replace(REGEX, " ")
        .split(" ")
        .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
        .join(" ");
    } else if (inpt.includes(" ")) {
      return inpt
        .split(" ")
        .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
        .join(" ");
    } else {
      return inpt.charAt(0).toUpperCase() + inpt.slice(1);
    }
  }
  if (
    typeof inpt === "string" &&
    DATE_REGEX.test(inpt) &&
    !EMAIL_REGEX.test(inpt)
  ) {
    const date = new Date(inpt);
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  }
  if (
    typeof inpt === "string" &&
    EMAIL_REGEX.test(inpt) &&
    !DATE_REGEX.test(inpt)
  ) {
    return inpt;
  }
  if (!isNaN(Number(inpt))) {
    return Number(inpt);
  }

  return inpt.toString();
};
