import {
  Button,
  ButtonProps,
  Checkbox,
  CheckboxProps,
  FileInput,
  FileInputProps,
  Group,
  MultiSelect,
  MultiSelectProps,
  NumberInput,
  NumberInputProps,
  PasswordInput,
  PasswordInputProps,
  Radio,
  RadioGroupProps,
  RadioProps,
  Select,
  SelectProps,
  SimpleGrid,
  Stack,
  TextInput,
  TextInputProps,
  Textarea,
  TextareaProps,
} from "@mantine/core";
import { DateInput, DateInputProps } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { UseFormInput } from "@mantine/form/lib/types";
import { dataPurifier } from "../utils/dataPurifier";

type ITextInput = { type: "text" | "email" } & Partial<TextInputProps>;
type IPasswordInput = { type: "password" } & Partial<PasswordInputProps>;
type INumberInput = { type: "number" } & Partial<NumberInputProps>;
type IDateInput = { type: "date" } & Partial<DateInputProps>;
type IRadioInput = { type: "radio" } & Partial<RadioProps>;
type ISelectInput = {
  type: "select";
  data: SelectProps["data"];
} & Partial<SelectProps>;
type IMultiSelectInput = {
  type: "multiselect";
  data: MultiSelectProps["data"];
} & Partial<MultiSelectProps>;
type IUrlInput = { type: "url" } & Partial<TextInputProps>;
type IFileInput = {
  type: "file";
  onChange?: FileInputProps["onChange"];
  accept?: FileInputProps["accept"];
} & Partial<TextInputProps>;
type ITextAreaInput = { type: "textarea" } & Partial<TextareaProps>;
type ICheckboxInput = { type: "checkbox" } & Partial<CheckboxProps>;
type IRadioGroupInput = {
  type: "radioGroup";
  defaultValue?: RadioGroupProps["defaultValue"];
  values: { value: string; label: string }[];
  radioInputProps?: Partial<Omit<RadioProps, "type">>;
} & Partial<RadioGroupProps>;

type CustomFormProps<T extends Record<string, unknown>> = UseFormInput<T> & {
  initialValues: T;
  isLoading?: boolean;
  inputfields: {
    [key in keyof T]:
      | ITextAreaInput
      | ITextInput
      | INumberInput
      | IDateInput
      | ISelectInput
      | IMultiSelectInput
      | IRadioGroupInput
      | IUrlInput
      | ICheckboxInput
      | IFileInput
      | IPasswordInput
      | IRadioInput;
  };
  btnText?: string;
  cols?: number;
  submitBtn?: boolean;
  withLabel?: boolean;
  buttonProps?: ButtonProps;
};

export function useCustomForm<T extends Record<string, unknown>>(
  input: CustomFormProps<T>
) {
  const {
    inputfields,
    isLoading,
    cols,
    btnText,
    buttonProps,
    submitBtn = true,
    withLabel = false,
    ...rest
  } = input;
  const form = useForm({
    ...rest,
  });

  const FormInputs = Object.keys(form.values).map((item, index) => {
    const { type, ...rest } = inputfields[item];
    if (type === "text" || type === "email" || type === "url") {
      return (
        <TextInput
          type={type}
          key={index}
          label={withLabel && dataPurifier(item)}
          {...form.getInputProps(item)}
          {...(rest as TextInputProps)}
        />
      );
    }
    if (type === "password") {
      return (
        <PasswordInput
          key={index}
          label={withLabel && dataPurifier(item)}
          {...form.getInputProps(item)}
          {...(rest as PasswordInputProps)}
        />
      );
    }
    if (type === "number") {
      return (
        <NumberInput
          key={index}
          label={withLabel && dataPurifier(item)}
          type={"number"}
          {...form.getInputProps(item)}
          {...(rest as NumberInputProps)}
        />
      );
    }
    if (type === "date") {
      return (
        <DateInput
          label={withLabel && dataPurifier(item)}
          {...(rest as DateInputProps)}
          key={index}
          {...form.getInputProps(item)}
        />
      );
    }
    if (type === "select") {
      return (
        <Select
          size="md"
          searchable={false}
          label={withLabel && dataPurifier(item)}
          {...(rest as SelectProps)}
          {...form.getInputProps(item)}
          key={index}
        />
      );
    }
    if (type === "multiselect") {
      return (
        <MultiSelect
          searchable={false}
          label={withLabel && dataPurifier(item)}
          {...(rest as MultiSelectProps)}
          {...form.getInputProps(item)}
          key={index}
        />
      );
    }
    if (type === "radioGroup") {
      return (
        <Radio.Group
          {...form.getInputProps(item)}
          {...(rest as RadioGroupProps)}
          key={index}
          defaultValue={
            (inputfields[item] as RadioGroupProps)?.defaultValue as string
          }
        >
          <Group>
            {(inputfields[item] as IRadioGroupInput).values.map((r) => (
              <Radio
                {...(inputfields[item] as IRadioGroupInput).radioInputProps}
                key={r.value}
                value={r.value}
                label={r.label}
              />
            ))}
          </Group>
        </Radio.Group>
      );
    }
    if (type === "radio") {
      return (
        <Radio
          label={withLabel && dataPurifier(item)}
          {...form.getInputProps(item)}
          {...(rest as RadioProps)}
          key={index}
        />
      );
    }
    if (type === "checkbox") {
      return (
        <Checkbox
          label={withLabel && dataPurifier(item)}
          {...form.getInputProps(item, { type: "checkbox" })}
          {...(rest as CheckboxProps)}
          key={index}
        />
      );
    }
    if (type === "file") {
      return (
        <FileInput
          label={withLabel && dataPurifier(item)}
          {...form.getInputProps(item)}
          {...(rest as FileInputProps)}
          key={index}
        />
      );
    }
    if (type === "textarea") {
      return (
        <Textarea
          label={withLabel && dataPurifier(item)}
          sx={{ flexGrow: 1, gridColumn: cols ? `1/ span ${cols}` : "" }}
          styles={{
            label: {
              textTransform: "capitalize",
            },
          }}
          minRows={2}
          autosize
          key={index}
          {...form.getInputProps(item)}
          {...(rest as TextareaProps)}
        />
      );
    }
  });

  const btn = (
    <Button
      type="submit"
      loading={isLoading}
      loaderPosition="center"
      {...buttonProps}
    >
      {!isLoading && (btnText ? btnText : "submit")}
    </Button>
  );

  if (cols) {
    return {
      render: (
        <>
          <SimpleGrid
            cols={cols || 2}
            sx={{ alignItems: "flex-start" }}
            breakpoints={[{ maxWidth: "xs", cols: 1 }]}
          >
            {FormInputs}
          </SimpleGrid>
          {submitBtn && btn}
        </>
      ),
      form,
    };
  } else {
    return {
      form,
      render: (
        <Stack>
          {FormInputs} {submitBtn && btn}
        </Stack>
      ),
    };
  }
}
export default useCustomForm;
