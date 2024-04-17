import { TextInput, Textarea, SimpleGrid, Group, Title, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

export function ContactForm() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validate: {
      name: (value) => value.trim().length < 2,
      email: (value) => !/^\S+@\S+$/.test(value),
      phone: (value) => /^\d{10}$/.test(value), // Validate phone number format
    },
  });

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1/phpinfo.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.values),
      });

      if (response.ok) {
        // Handle successful submission
        alert('Form submitted successfully!');
      } else {
        // Handle submission error
        alert('Failed to submit form. Please try again later.');
      }
    } catch (error) {
      // Handle network error
      console.error('Error:', error);
      alert('Network error. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Title order={2} size="h1" style={{ fontFamily: 'Greycliff CF, var(--mantine-font-family)' }} fw={900} ta="center">
        Contact Us
      </Title>

      <SimpleGrid breakpoints={[{ maxWidth: 'md', cols: 1 }]} mt="xl">
        <TextInput label="Name" name="name" {...form.getInputProps('name')} />
        <TextInput label="Email" name="email" {...form.getInputProps('email')} />
        <TextInput label="Phone" type="tel" name="phone" {...form.getInputProps('phone')} />
      </SimpleGrid>

      <Textarea mt="md" label="Message" maxRows={10} minRows={5} autosize name="message" {...form.getInputProps('message')} />

      <Group mt="xl">
        <Button type="submit" size="md">
          Send message
        </Button>
      </Group>
    </form>
  );
}
