'use client';

import { Input } from '@/components/ui/inputs';
import { Textarea } from '@/components/ui/inputs/textarea';
import { Label } from '@/components/ui/label';
import {
  contactFormSchema,
  type ContactFormValues,
} from '@/features/marketing/schemas/contact-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ContactForm() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (_values: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    toast.success('Message sent successfully');
    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="Jhamse"
            disabled={isSubmitting}
            {...form.register('firstName')}
          />
          {form.formState.errors.firstName?.message && (
            <p className="mt-1.5 text-sm text-[var(--token-red-500)]">{form.formState.errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            disabled={isSubmitting}
            {...form.register('lastName')}
          />
          {form.formState.errors.lastName?.message && (
            <p className="mt-1.5 text-sm text-[var(--token-red-500)]">{form.formState.errors.lastName.message}</p>
          )}
        </div>
        <div className="col-span-full">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            disabled={isSubmitting}
            {...form.register('email')}
          />
          {form.formState.errors.email?.message && (
            <p className="mt-1.5 text-sm text-[var(--token-red-500)]">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div className="col-span-full">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            rows={6}
            placeholder="Type your message"
            disabled={isSubmitting}
            {...form.register('message')}
          />
          {form.formState.errors.message?.message && (
            <p className="mt-1.5 text-sm text-[var(--token-red-500)]">{form.formState.errors.message.message}</p>
          )}
        </div>
        <div className="col-span-full">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-500 hover:bg-primary-600 transition h-12 py-3 px-6 w-full font-medium text-[var(--token-white)] text-sm rounded-full disabled:opacity-75"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </div>
    </form>
  );
}
