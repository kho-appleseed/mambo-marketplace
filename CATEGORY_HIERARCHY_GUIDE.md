# Category Hierarchy Guide

Your marketplace now supports **parent categories** and **subcategories**! This allows you to organize products in a hierarchical structure.

## How It Works

### Structure Example:
```
📱 Electronics (Parent Category)
  ├── Smartphones (Subcategory)
  ├── Tablets (Subcategory)
  └── Laptops (Subcategory)

👕 Fashion (Parent Category)
  ├── Men's Clothing (Subcategory)
  ├── Women's Clothing (Subcategory)
  └── Shoes (Subcategory)
```

## How to Create Categories in Sanity

### Step 1: Create Parent Categories First

1. Open Sanity Studio
2. Go to **Category**
3. Click **Create new**
4. Fill in:
   - **Category Name**: e.g., "Electronics"
   - **Slug**: Auto-generate
   - **Description**: Brief description
   - **Category Image**: Upload image
   - **Parent Category**: Leave empty (this makes it a parent)
5. Click **Publish**

### Step 2: Create Subcategories

1. Go to **Category** again
2. Click **Create new**
3. Fill in:
   - **Category Name**: e.g., "Smartphones"
   - **Slug**: Auto-generate
   - **Description**: Brief description
   - **Category Image**: Upload image
   - **Parent Category**: Select the parent (e.g., "Electronics")
4. Click **Publish**

## Example Category Structure

### Electronics & Technology
- **Electronics** (Parent)
  - Smartphones
  - Tablets
  - Laptops
  - Headphones
  - Speakers
  - Smart Watches

### Fashion & Apparel
- **Fashion** (Parent)
  - Men's Clothing
  - Women's Clothing
  - Shoes
  - Sneakers
  - Boots
  - Bags & Luggage

### Home & Living
- **Home** (Parent)
  - Furniture
  - Home Decor
  - Kitchen & Dining
  - Bedding
  - Bath & Body

## How It Works on the Frontend

1. **Main Categories Display**: Only parent categories are shown initially
2. **Subcategories Appear**: When you click a parent category, its subcategories appear below
3. **Product Filtering**: 
   - Clicking a parent shows products from the parent AND all its subcategories
   - Clicking a subcategory shows only products from that subcategory
4. **Visual Hierarchy**: Subcategories are displayed in a separate section with a "Subcategories" title

## Best Practices

### ✅ Do:
- Create parent categories for major product groups
- Use subcategories for specific product types
- Keep hierarchy to 2 levels (parent → subcategory)
- Use clear, descriptive names

### ❌ Don't:
- Create subcategories of subcategories (only 2 levels supported)
- Create too many parent categories (aim for 5-10 main categories)
- Leave parent category empty for subcategories

## Tips

1. **Start Simple**: Begin with 5-7 main parent categories
2. **Add Subcategories Gradually**: Add subcategories as your product catalog grows
3. **Consistent Naming**: Use consistent naming conventions
4. **Good Images**: Use clear, representative images for both parents and subcategories

## Example Setup

### Recommended Parent Categories:
1. Electronics
2. Fashion
3. Home & Living
4. Beauty & Personal Care
5. Sports & Outdoors
6. Books & Media
7. Automotive

Each parent can have 3-8 subcategories depending on your product range.

## Need Help?

- Check `SANITY_CATEGORIES.md` for a complete list of category suggestions
- Remember: Products must be assigned to either a parent category OR a subcategory (not both)

