import {
  Button,
  ButtonProps,
  Grid,
  Select,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useState } from "react";
import { BiCurrentLocation } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { useAppSelector } from "../store/hooks";

interface SearchBarProps {
  btnProps?: Partial<ButtonProps>;
  withBorder?: boolean;
  form?: UseFormReturnType<{
    price: string[];
    experience: string[];
    city: string;
  }>;
  onConfirm?: () => void;
  setCity?: (city: string | null) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  btnProps,
  withBorder,
  form,
  setCity,
  onConfirm,
}) => {
  const [currentCity, setCurrentCity] = useState<string | undefined | null>(
    form?.values.city
  );

  const { cities } = useAppSelector((state) => state.user);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Grid
      bg={"#fff"}
      mt={20}
      sx={(theme) => ({
        borderRadius: "30px",
        border: withBorder ? `1px solid ${theme.colors.gray[4]}` : "none",
      })}
      align={"center"}
    >
      <Grid.Col
        sm={4}
        span={2}
        sx={(theme) => ({
          borderRight: `1px solid ${theme.colors.gray[4]}`,
          [theme.fn.smallerThan("sm")]: {
            display: "flex",
            justifyContent: "center",
          },
        })}
      >
        <Button
          fw={600}
          leftIcon={<BiCurrentLocation />}
          fz={14}
          c={"brand"}
          display={"flex"}
          bg={"transparent"}
          onClick={() => {
            setCurrentCity(String(user?.address));
            setCity && setCity(String(user?.address));
          }}
          sx={{
            ":hover": {
              background: "transparent",
            },
          }}
          styles={(theme) => ({
            leftIcon: {
              [theme.fn.smallerThan("sm")]: {
                display: "none",
              },
            },
          })}
          // onClick={handleLocationDetection}
        >
          <ThemeIcon
            fz={20}
            c="brand"
            bg={"transparent"}
            display={{ sm: "none", base: "block" }}
            mx={"auto"}
          >
            <BiCurrentLocation />
          </ThemeIcon>
          <Text display={{ sm: "block", base: "none" }}>
          Detect Current Location 
          </Text>
        </Button>
      </Grid.Col>
      <Grid.Col sm={6} span={10}>
        <Select
          icon={<IoLocationOutline />}
          value={currentCity}
          placeholder="Search Location"
          styles={{
            input: {
              border: "none",
            },
            rightSection: {
              display: "none",
            },
          }}
          data={
            cities
              ? [
                  { label: "All", value: "all" },
                  ...cities?.data?.map((c) => ({
                    label: c,
                    value: c,
                  })),
                ]
              : []
          }
          onChange={(text) => {
            setCurrentCity(text);
            setCity && setCity(text);
          }}
          searchable
          clearable
        />
      </Grid.Col>
      <Grid.Col sm={2} span={12}>
        <Button
          w={{ sm: "auto", base: "100%" }}
          onClick={() => {
            currentCity && form && form.setFieldValue("city", currentCity);
            onConfirm && onConfirm();
          }}
          ml="auto"
          display={"block"}
          h={40}
          className="searcColor"
          radius={"xl"}
          {...btnProps}
        >
          SEARCH
        </Button>
      </Grid.Col>
    </Grid>
  );
};

export default SearchBar;

// const handleLocationDetection = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;

//         try {
//           const response = await axios.get(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
//           );

//           if (response.data.results.length > 0) {
//             const formattedAddress = response.data.results[0].formatted_address;
//             setLocation(formattedAddress);
//           }
//         } catch (error) {
//           console.error("Error getting location:", error);
//         }
//       },
//       (error) => {
//         console.error("Error getting location:", error);
//       }
//     );
//   } else {
//     console.error("Geolocation is not supported by this browser.");
//   }
// };
