import { Center, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import SearchBar from "../SearchBar";

export const DashboardBanner = () => {
  const [city, setCity] = useState<string | null>(null);
  const { userDetails, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  return (
    <Center
      h={"100%"}
      sx={{ justifyContent: "flex-start" }}
      bg={"brand"}
      p={20}
    >
      <Stack c="#fff" spacing={10}>
        <Text fw={600} fz={28} tt={"capitalize"}>
          Welcome back, {user?.full_name}!
        </Text>
        <Text fz={18} c={"gray.4"}>
          Take your first step towards building successful{" "}
          {userDetails?.role === "LEARNER" ? "learning" : "teaching"} habits.
        </Text>
        {userDetails?.role === "LEARNER" && (
          <SearchBar
            setCity={setCity}
            onConfirm={() =>
              navigate("/dashboard/instructors", {
                state: {
                  city,
                },
              })
            }
          />
        )}
      </Stack>
    </Center>
  );
};
