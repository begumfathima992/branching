import {
  Box,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  createStyles,
  getStylesRef,
} from "@mantine/core";
import { FaUserGraduate } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { useAppDispatch } from "../../../store/hooks";
import { registerUser } from "../../../store/slices/authSlice";
import { IRole } from "../../../types/IAuth";
import Extra from "../Extra";

type IData = {
  title: IRole;
  icon: React.ReactNode;
  content: string;
};

const data: IData[] = [
  {
    title: "INSTRUCTOR",
    icon: <GiSteeringWheel />,
    content:
      "Your expertise and enthusiasm shape the next generation of safe drivers, empowering them with the skills and confidence they need to navigate the roads.",
  },
  {
    title: "LEARNER",
    icon: <FaUserGraduate />,
    content:
      "Being a student is about embracing the opportunity to learn and grow and taking control of your journey, guided by the wisdom and expertise of a skilled instructor.",
  },
];

const Step1 = ({
  setStep,
  role,
  setRole,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setRole: React.Dispatch<React.SetStateAction<IRole>>;
  role: IRole;
}) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Box ta={"left"}>
        <Text fz={24} c={"secondary"} fw={600}>
          Ready to Begin Your Driving Journey?
        </Text>
        <Text c={"secondary"} fz={15}>
          here are two types of people in this world. Those who choose to be
          instructors, and those who choose to be their students.
        </Text>
      </Box>
      <Stack ta="left" py={30}>
        {data.map((d) => (
          <Card {...d} key={d.title} setTrole={setRole} role={role} />
        ))}
      </Stack>
      <Button
        size="lg"
        fullWidth
        fw={400}
        onClick={() => {
          if (!role) {
            alert("please select your role");
            return;
          }
          dispatch(registerUser({ role }));
          setStep(2);
        }}
      >
        Submit
      </Button>
      <Extra
        extraText="Already have an account?"
        btnText="Login"
        href="/login"
      />
    </>
  );
};

const useStyle = createStyles((theme) => ({
  cardWrapper: {
    cursor: "pointer",
    transition: "all 0.5s ease",
    ":hover": {
      background: theme.colors.gray[3],
      [`& .${getStylesRef("text")}`]: {
        color: theme.colors.brand,
      },
    },
  },
  text: { ref: getStylesRef("text"), transition: "all 0.5s ease" },
}));

type CardProps = (typeof data)[0] & {
  setTrole: React.Dispatch<React.SetStateAction<IRole>>;
  role: string;
};

const Card = ({ title, icon, content, setTrole, role }: CardProps) => {
  const { classes } = useStyle();

  return (
    <Paper
      bg={role === title ? "transparent" : "#fff"}
      onClick={() => setTrole(title)}
      radius={"md"}
      p={10}
      sx={(theme) => ({
        borderStyle: "solid",
        borderWidth: 1,
        borderColor:
          role === title ? theme.colors.brand[0] : theme.colors.gray[4],
      })}
      className={classes.cardWrapper}
    >
      <Group align="flex-start" noWrap>
        <ThemeIcon
          bg="transparent"
          c={role === title ? "brand" : "secondary"}
          fz="2rem"
          className={classes.text}
        >
          {icon}
        </ThemeIcon>
        <Box>
          <Text
            c={role === title ? "brand" : "secondary"}
            fw={600}
            fz={24}
            className={classes.text}
          >
            {title}
          </Text>
          <Text fz={14} c={"secondary"} mt={5}>
            {content}
          </Text>
        </Box>
      </Group>
    </Paper>
  );
};

export default Step1;
