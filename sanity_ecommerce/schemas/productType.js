export default {
    name: 'productType',
    title: 'Product Type',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Type Name',
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
            description: 'Brief description of the type'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: Rule => Rule.required(),
            description: 'Select which category this type belongs to'
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Order in which this type should appear within its category (lower numbers appear first)',
            validation: Rule => Rule.integer().min(0)
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'category.name',
            media: 'image'
        },
        prepare({ title, subtitle, media }) {
            return {
                title,
                subtitle: subtitle ? `Product Type in ${subtitle}` : 'Product Type',
                media
            }
        }
    },
    orderings: [
        {
            title: 'Order',
            name: 'productTypeOrderAsc',
            by: [
                { field: 'order', direction: 'asc' }
            ]
        }
    ]
}

