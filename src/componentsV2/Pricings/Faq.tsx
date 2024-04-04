import { Accordion, Stack, Text, Title } from "@mantine/core";
import React from "react";
import { faqs } from "../../constants/data";

export const Faq = () => {
  return (
    <Stack py={80}>
      <Title
        fz={{ md: 42, sm: 34, base: 28 }}
        ta={"center"}
        fw={500}
        sx={(theme) => ({
          fontFamily: theme.other.fonts.secondary,
        })}
      >
        Frequently Asked Questions
      </Title>
      <Accordion mt={30} multiple px={{ md: 150, base: 0 }}>
        {faqs.map((q) => (
          <Accordion.Item value={q.title} key={q.title}>
            <Accordion.Control p={0}>
              <Text fw={500} c={"secondary"} fz={{ sm: 18 , base: 15}}>
                {q.title}
              </Text>
            </Accordion.Control>
            <Accordion.Panel fz={{md: 16, base: 14}} p={0} c={"secondary"}>
              {q.content}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Stack>
  );
};
