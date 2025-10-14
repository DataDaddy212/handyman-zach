import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bikeListing',
  title: 'Bike Listing',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Bike Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: Rule => Rule.required(),
      placeholder: '$850',
    }),
    defineField({
      name: 'specs',
      title: 'Specifications',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Mountain Bike', value: 'mountain'},
          {title: 'Road Bike', value: 'road'},
          {title: 'Hybrid Bike', value: 'hybrid'},
          {title: 'Electric Bike', value: 'electric'},
          {title: 'Vintage Bike', value: 'vintage'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'string',
      options: {
        list: [
          {title: 'Excellent', value: 'excellent'},
          {title: 'Very Good', value: 'very-good'},
          {title: 'Good', value: 'good'},
          {title: 'Fair', value: 'fair'},
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'string',
      description: 'Frame size (e.g., Small, Medium, Large, or specific measurements)',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: Rule => Rule.min(1900).max(new Date().getFullYear()),
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
          ],
        },
      ],
    }),
    defineField({
      name: 'isAvailable',
      title: 'Available for Sale',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Bike',
      type: 'boolean',
      description: 'Show this bike prominently on the bikes page',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'images.0',
    },
    prepare(selection) {
      const {title, subtitle} = selection
      return {
        title: title,
        subtitle: subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Featured First',
      name: 'featuredDesc',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: '_createdAt', direction: 'desc'},
      ],
    },
  ],
})
