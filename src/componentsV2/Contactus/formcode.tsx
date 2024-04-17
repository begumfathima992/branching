import { TextInput, Textarea, SimpleGrid, Group, Title, Button } from '@mantine/core';
import { useForm } from '@mantine/form';


export function ContactForm() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: Number,
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.length === 10,
    },
  });

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <Title
        order={2}
        size="h1"
        style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }}
        fw={900}
        ta="center"
      >
      Contact Us
      </Title>
   

      <SimpleGrid   breakpoints={[{ maxWidth: "md", cols: 1 }]} mt="xl">
        <TextInput
          label="Name"
        
          name="name"
          
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Email"
          
          name="email"
         
          {...form.getInputProps('email')}
        />
      </SimpleGrid>

      <TextInput
        label="Phone"
     type="tel"
        mt="md"
        name="subject"
  
        {...form.getInputProps('subject')}
      />
  
      <Textarea
        mt="md"
        label="Message"
      
        maxRows={10}
        minRows={5}
        autosize
        name="message"
    
        {...form.getInputProps('message')}
      />

      <Group  mt="xl">
        <Button type="submit" size="md">
          Send message
        </Button>
      </Group>
    </form>
  );
}