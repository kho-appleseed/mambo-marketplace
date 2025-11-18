export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true
            }
        },
        {
            name: 'name',
            title: 'Name',
            type:'string'
        },
        {
            name: 'slug',
            title: 'Slug',
            type:'slug',
            options: {
                source: 'name',
                maxLength: 96
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number'
        },
        {
            name: 'details',
            title: 'Details',
            type:'string'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: Rule => Rule.required()
        },
        {
            name: 'productType',
            title: 'Product Type',
            type: 'reference',
            to: [{ type: 'productType' }],
            description: 'Optional: Select a product type for this product (e.g., Jeans, Shirts). Some products may not require a product type.',
            options: {
                filter: ({ document }) => {
                    // Only show product types that belong to the selected category
                    if (document?.category) {
                        const categoryId = typeof document.category === 'object' 
                            ? document.category._id 
                            : document.category
                        return {
                            filter: 'category._ref == $categoryId',
                            params: { categoryId }
                        }
                    }
                    // If no category selected, don't show any product types
                    return {
                        filter: '_id == "no-types"'
                    }
                }
            }
        }
    ]
}