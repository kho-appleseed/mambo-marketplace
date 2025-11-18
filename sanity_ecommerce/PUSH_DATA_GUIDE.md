# Push Data to Sanity from IDE Guide

You can push data to Sanity programmatically using scripts! This is useful for:
- Bulk importing data
- Seeding initial data
- Migrating data
- Automated data updates

## Setup

### 1. Install Dependencies

First, install the required packages in the `sanity_ecommerce` folder:

```bash
cd sanity_ecommerce
npm install @sanity/client dotenv
```

### 2. Get Your Sanity API Token

1. Go to https://sanity.io/manage
2. Select your project (ecxekts7)
3. Go to **API** → **Tokens**
4. Click **Add API token**
5. Name it (e.g., "Data Push Token")
6. Give it **Editor** permissions (or **Admin** for full access)
7. Copy the token

### 3. Set Environment Variable

Create a `.env.local` file in the `sanity_ecommerce` folder:

```env
SANITY_API_TOKEN=your_token_here
```

**Important**: Add `.env.local` to `.gitignore` to keep your token safe!

## Available Scripts

### 1. `pushData.mjs` - Utility Functions

This file exports helper functions you can use in your scripts:

```javascript
import { createDocument, createDocuments, fetchDocuments, updateDocument, deleteDocument } from './pushData.mjs'

// Create a single document
await createDocument({
  _type: 'section',
  name: 'New Section',
  slug: { current: 'new-section' },
  order: 0
})

// Create multiple documents
await createDocuments([doc1, doc2, doc3])

// Fetch existing documents
const sections = await fetchDocuments('section')

// Update a document
await updateDocument('documentId', { name: 'Updated Name' })

// Delete a document
await deleteDocument('documentId')
```

### 2. `seedSections.mjs` - Seed Sections

Seeds example sections:
```bash
node scripts/seedSections.mjs
```

### 3. `seedCategories.mjs` - Seed Categories

Seeds example categories (requires sections to exist first):
```bash
node scripts/seedCategories.mjs
```

## Creating Your Own Script

Create a new file in `sanity_ecommerce/scripts/` (e.g., `myScript.mjs`):

```javascript
import { createDocuments, fetchDocuments } from './pushData.mjs'

async function myDataPush() {
  // Your data here
  const myData = [
    {
      _type: 'section',
      name: 'My Section',
      slug: { current: 'my-section' },
      order: 0
    }
  ]

  // Check if it exists
  const existing = await fetchDocuments('section')
  const newData = myData.filter(item => 
    !existing.some(e => e.slug.current === item.slug.current)
  )

  if (newData.length > 0) {
    await createDocuments(newData)
    console.log('✅ Done!')
  } else {
    console.log('⚠️  All data already exists')
  }
}

myDataPush()
```

Then run:
```bash
node scripts/myScript.mjs
```

## Data Structure Examples

### Section
```javascript
{
  _type: 'section',
  name: 'Electronics & Technology',
  slug: { current: 'electronics-technology' },
  description: 'Latest electronics',
  order: 0
}
```

### Category
```javascript
{
  _type: 'category',
  name: 'Smartphones',
  slug: { current: 'smartphones' },
  description: 'Latest smartphones',
  section: {
    _type: 'reference',
    _ref: 'sectionIdHere'  // Get from existing section
  },
  order: 0
}
```

### Product Type
```javascript
{
  _type: 'productType',
  name: 'Jeans',
  slug: { current: 'jeans' },
  description: 'Denim jeans',
  category: {
    _type: 'reference',
    _ref: 'categoryIdHere'  // Get from existing category
  },
  order: 0
}
```

### Product
```javascript
{
  _type: 'product',
  name: 'iPhone 15 Pro',
  slug: { current: 'iphone-15-pro' },
  price: 999,
  details: 'Latest iPhone',
  category: {
    _type: 'reference',
    _ref: 'categoryIdHere'
  },
  productType: {
    _type: 'reference',
    _ref: 'productTypeIdHere'  // Optional
  },
  image: [
    {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'imageAssetId'  // Need to upload image first
      }
    }
  ]
}
```

## Tips

1. **Always check for existing data** before creating to avoid duplicates
2. **Use references** for relationships (section, category, productType)
3. **Get IDs first**: Fetch existing documents to get their `_id` for references
4. **Test with one item** before bulk importing
5. **Keep tokens secure**: Never commit `.env.local` to git

## Uploading Images

For products with images, you'll need to:
1. Upload images to Sanity first using the Sanity Asset API
2. Use the returned asset `_id` as a reference in your product

Or simply use the Sanity Studio UI to add products with images, and use scripts for text data like sections, categories, and product types.

## Troubleshooting

### "Token not found" error
- Make sure `.env.local` exists in `sanity_ecommerce` folder
- Check that `SANITY_API_TOKEN` is set correctly
- Verify the token has write permissions

### "Permission denied" error
- Your token needs **Editor** or **Admin** permissions
- Create a new token with proper permissions

### "Reference not found" error
- Make sure referenced documents (sections, categories) exist first
- Create them in order: Sections → Categories → Product Types → Products

