import { Card, Image, Text, Badge, Button, Group, Box } from '@mantine/core';

export const AboutCard = () => {
  return (
    <Box display="flex" >
    <Card  padding="lg" style={{ flex: 1 }} mx={8}>
    <Group  mt="md" mb="xs">
          <Text fw={600} ff={"Merriweather"} fz={{ sm: 25, xs: 10, base: 16 }}>01</Text>
      
        </Group>
      <Group  mt="md" mb="xs" ff={"Merriweather"} fz={{ sm: 25, xs: 10, base: 16 }}>
          <Text fw={600}>User-Centric Approach</Text>
      
        </Group>
      
  
        <Text size="sm" c="dimmed" fz={{ sm: 14, base: 12 }}>
         Our app is designed with you in mind.We prioritize users feedback and continuously improve the app to meet your evolving needs.
        </Text>
        <Card.Section>
        <Image
        sx={(theme) => ({
          [theme.fn.smallerThan("md")]: {
            order: 1,
          },
        })}
        src={"images/img3.jpg"}
        alt="choose us"
      />
        </Card.Section>
  
        
  
        
      </Card>  

      {/* Add two more Card components here with similar structure */}
      
      {/* Card 2 */}
      <Card  padding="lg" style={{ flex: 1 }} mx={8} >
      <Group  mt="md" mb="xs">
          <Text fw={600} ff={"Merriweather"} fz={{ sm: 25, xs: 10, base: 16 }}>02</Text>
      
        </Group>
        <Group  mt="md" mb="xs" ff={"Merriweather"} fz={{ sm: 25, xs: 10, base: 16 }}>
          <Text fw={600}>User-Centric Approach</Text>
      
        </Group>
      
  
        <Text size="sm" c="dimmed" fz={{ sm: 14, base: 12 }}>
         Our app is designed with you in mind.We prioritize users feedback and continuously improve the app to meet your evolving needs.
        </Text>
        
        <Card.Section>
          <Image
          sx={(theme) => ({
            [theme.fn.smallerThan("md")]: {
              order: 1,
            },
          })}
          src={"images/img5.jpg"}
          alt="choose us"
        />
        </Card.Section>
  
        
      </Card>

      {/* Card 3 */}
      <Card  padding="lg" style={{ flex: 1 }} mx={8}>
      <Group  mt="md" mb="xs">
          <Text fw={600} ff={"Merriweather"} fz={{ sm: 25, xs: 10, base: 16 }}>03</Text>
      
        </Group>
        <Group  mt="md" mb="xs" ff={"Merriweather"} fz={{ sm: 25, xs: 10, base: 16 }}>
          <Text fw={600}>User-Centric Approach</Text>
      
        </Group>
      
  
        <Text size="sm" c="dimmed" fz={{ sm: 14, base: 12 }}>
         Our app is designed with you in mind.We prioritize users feedback and continuously improve the app to meet your evolving needs.
        </Text>
        <Card.Section>
          <Image
          sx={(theme) => ({
            [theme.fn.smallerThan("md")]: {
              order: 1,
            },
          })}
          src={"images/img4.jpg"}
          alt="choose us"
        />
        </Card.Section>
  
        
  
        
      </Card>
    </Box>
  );
}
