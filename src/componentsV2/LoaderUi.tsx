import { Center, CenterProps, Loader, LoaderProps } from "@mantine/core";

const LoaderUi = ({
  loadingProps,
  ...props
}: { loadingProps?: LoaderProps } & Partial<CenterProps>) => {
  return (
    <Center h={"45vh"} {...props}>
      <Loader variant="bars" size={"lg"} {...loadingProps} />
    </Center>
  );
};

export default LoaderUi;
