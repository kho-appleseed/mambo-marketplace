export default {
    name: 'section',
    title: 'Section',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Section Name',
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
            description: 'Brief description of the section'
        },
        {
            name: 'image',
            title: 'Section Image',
            type: 'image',
            options: {
                hotspot: true
            },
            description: 'Optional image to represent this section'
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this section should appear (lower numbers appear first)',
            validation: Rule => Rule.integer().min(0)
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'description',
            media: 'image'
        }
    },
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [
                { field: 'order', direction: 'asc' }
            ]
        }
    ]
}

