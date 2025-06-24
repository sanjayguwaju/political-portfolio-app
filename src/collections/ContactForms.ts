import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'

export const ContactForms: CollectionConfig = {
  slug: 'contact-forms',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'subject', 'createdAt'],
    group: 'Content',
  },
  access: {
    read: authenticated,
    create: () => true, // Anyone can create (submit forms)
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Full Name',
      admin: {
        description: 'The full name of the person submitting the form',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
      admin: {
        description: 'The email address of the person submitting the form',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
      label: 'Phone Number',
      admin: {
        description: 'Optional phone number',
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
      label: 'Subject',
      admin: {
        description: 'The subject of the inquiry',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
      admin: {
        description: 'The message content',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Replied',
          value: 'replied',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
      ],
      admin: {
        description: 'The status of this contact form submission',
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        description: 'IP address of the form submitter',
        readOnly: true,
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        description: 'User agent of the form submitter',
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}
