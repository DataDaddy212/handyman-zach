import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'email',
          title: 'Email',
          type: 'string',
          validation: Rule => Rule.email().required(),
        }),
        defineField({
          name: 'toEmail',
          title: 'Contact Form Email',
          type: 'string',
          description: 'Email address where contact form submissions are sent',
          validation: Rule => Rule.email().required(),
        }),
      ],
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Service Areas',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Saugerties', value: 'Saugerties'},
          {title: 'Kingston', value: 'Kingston'},
          {title: 'Woodstock', value: 'Woodstock'},
          {title: 'Catskill', value: 'Catskill'},
        ],
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'businessName',
      subtitle: 'tagline',
    },
  },
})
