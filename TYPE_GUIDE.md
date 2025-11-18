# Type Field Guide

Your marketplace now supports a **four-level hierarchy** with an optional Type field:

## Structure:
```
📦 Section (Top Level)
  └── 📁 Category (Middle Level)
      └── 🏷️ Type (Optional Level)
          └── 🛍️ Product (Bottom Level)
```

### Example:
```
📦 Clothing & Apparel (Section)
  └── 📁 Men's Clothes (Category)
      ├── 🏷️ Jeans (Type)
      │   ├── 🛍️ Levi's 501
      │   └── 🛍️ Wrangler Classic
      ├── 🏷️ Shirts (Type)
      │   ├── 🛍️ Polo Shirt
      │   └── 🛍️ Dress Shirt
      └── 🏷️ T-Shirts (Type)
          └── 🛍️ Basic White Tee
```

## How to Use Types in Sanity

### Step 1: Create Types (After Creating Categories)

1. Open Sanity Studio
2. Go to **Type**
3. Click **Create new**
4. Fill in:
   - **Type Name**: e.g., "Jeans"
   - **Slug**: Auto-generate
   - **Description**: Brief description (optional)
   - **Category**: **REQUIRED** - Select the category (e.g., "Men's Clothes")
   - **Display Order**: Number (0, 1, 2, etc.) - order within the category
5. Click **Publish**

### Step 2: Assign Types to Products (Optional)

1. Go to **Product**
2. Create or edit a product
3. Fill in all required fields:
   - Images, Name, Slug, Price, Details
   - **Category**: Select category (required)
   - **Type**: Select type (optional) - Only types for the selected category will appear
4. Click **Publish**

## Important Notes

### Type is Optional
- **Not all products need a type**
- Some categories may not have types at all
- Products can exist without a type assigned

### Type Filtering
- When creating/editing a product, the Type dropdown will **only show types that belong to the selected category**
- This prevents selecting incorrect types
- If no category is selected, no types will be shown

### When to Use Types
Use types when a category has multiple distinct product variations:
- ✅ **Good for**: Clothing (Jeans, Shirts, T-Shirts), Electronics (Smartphones, Tablets)
- ❌ **Not needed for**: Unique products, one-off items, or categories with few variations

## Example Setup

### Section: Clothing & Apparel
**Category: Men's Clothes**
- Type: Jeans (Order: 0)
- Type: Shirts (Order: 1)
- Type: T-Shirts (Order: 2)
- Type: Jackets (Order: 3)

**Category: Women's Clothes**
- Type: Dresses (Order: 0)
- Type: Tops (Order: 1)
- Type: Pants (Order: 2)

### Section: Electronics & Technology
**Category: Smartphones**
- Type: iPhone (Order: 0)
- Type: Android (Order: 1)
- Type: Other (Order: 2)

**Category: Laptops**
- (No types needed - products can be added directly)

## Frontend Behavior

1. **Type Filter Appears**: When you select a category, if that category has types, a type filter will appear
2. **Filter by Type**: Click on a type to filter products
3. **All Products**: Click "All" to see all products in the category
4. **No Types**: If a category has no types, no type filter appears (products show directly)

## Best Practices

1. **Create types only when needed** - Not every category needs types
2. **Use clear, specific names** - "Jeans" not "Clothing Type 1"
3. **Order matters** - Use display order to organize types logically
4. **Consistent naming** - Keep type names consistent across categories
5. **Don't over-complicate** - If a category has only 2-3 product types, you might not need types at all

## Migration Notes

- Existing products without types will continue to work
- You can add types to existing products at any time
- Types are optional, so no migration is required

