type ICommonProps = {
  value: string | number | (string | number | boolean)[] | null;
  length?: number;
};

interface ValidationProps extends ICommonProps {
  message?: string;
  compareWith?: string;
  reg?: RegExp;
}

export const validateField = (props: ValidationProps): string | null => {
  const { message, value, length, reg, compareWith } = props;

  let errorMessage: string | undefined;
  if (value === null) errorMessage = "required";

  if (typeof value === "number") {
    if (!length)
      if (value === 0 || !value) errorMessage = message || "required";
    if (length) {
      if (String(value).length !== length) {
        errorMessage = message || "invalid value";
      }
    }
  } else if (Array.isArray(value)) {
    if (value.length === 0) errorMessage = message || "required";
  } else if (typeof value === "string") {
    if (!reg && !compareWith && !length) {
      if (!value) errorMessage = message || "required";
    } else {
      if (reg && !reg.test(value)) errorMessage = message || "invalid value";
      if (compareWith && compareWith.length > 1)
        if (value !== compareWith) errorMessage = message || "invalid value";
      if (length !== undefined && value.length !== length)
        errorMessage = message || "invalid value";
    }
  }

  return errorMessage || null;
};
