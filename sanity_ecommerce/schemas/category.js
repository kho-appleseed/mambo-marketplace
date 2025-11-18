export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Category Name',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Brief description of the category'
        },
        {
            name: 'image',
            title: 'Category Image',
            type: 'image',
            options: {
                hotspot: true
            },
            description: 'Optional image to represent this category'
        },
        {
            name: 'section',
            title: 'Section',
            type: 'reference',
            to: [{ type: 'section' }],
            validation: Rule => Rule.required(),
            description: 'Select which section this category belongs to'
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this category should appear within its section (lower numbers appear first)',
            validation: Rule => Rule.integer().min(0)
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'section.name',
            media: 'image'
        },
        prepare({ title, subtitle, media }) {
            return {
                title,
                subtitle: subtitle ? `Category in ${subtitle}` : 'Category',
                media
            }
        }
    },
    orderings: [
        {
            title: 'Order',
            name: 'orderAsc',
            by: [
                { field: 'order', direction: 'asc' }
            ]
        }
    ]
}

