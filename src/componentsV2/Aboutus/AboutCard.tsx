import { Card, Image, Text, Badge, Button, Group, Box } from '@mantine/core';

export const AboutCard = () => {
  return (
    <Box display="flex" >
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flex: 1 }}>
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={160}
            alt="Norway"
          />
        </Card.Section>
  
        <Group  mt="md" mb="xs">
          <Text fw={500}>Norway Fjord Adventures</Text>
      
        </Group>
  
        <Text size="sm" c="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway
        </Text>
  
        
      </Card>

      {/* Add two more Card components here with similar structure */}
      
      {/* Card 2 */}
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flex: 1 }}>
      <Group  mt="md" mb="xs">
          <Text fw={500}>Norway Fjord Adventures</Text>
      
        </Group>
  
        <Text size="sm" c="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway
        </Text>
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={160}
            alt="Norway"
          />
        </Card.Section>
  
        
  
        
      </Card>

      {/* Card 3 */}
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flex: 1 }}>
      <Group  mt="md" mb="xs">
          <Text fw={500}>Norway Fjord Adventures</Text>
      
        </Group>
  
        <Text size="sm" c="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway
        </Text>
        <Card.Section>
          <Image
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            height={160}
            alt="Norway"
          />
        </Card.Section>
  
        
  
        
      </Card>
    </Box>
  );
}
