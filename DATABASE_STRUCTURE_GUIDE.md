# Database Structure Guide - Three Level Hierarchy

Your marketplace now uses a **three-level hierarchy**:

## Structure:
```
📦 Section (Top Level)
  └── 📁 Category (Middle Level)
      └── 🛍️ Product (Bottom Level)
```

### Example:
```
📦 Electronics & Technology (Section)
  ├── 📁 Smartphones (Category)
  │   ├── 🛍️ iPhone 15 Pro
  │   ├── 🛍️ Samsung Galaxy S24
  │   └── 🛍️ Google Pixel 8
  ├── 📁 Tablets (Category)
  │   ├── 🛍️ iPad Pro
  │   └── 🛍️ Samsung Galaxy Tab
  └── 📁 Laptops (Category)
      ├── 🛍️ MacBook Pro
      └── 🛍️ Dell XPS 15

📦 Fashion & Apparel (Section)
  ├── 📁 Men's Clothing (Category)
  ├── 📁 Women's Clothing (Category)
  └── 📁 Shoes (Category)
```

## How to Set Up in Sanity

### Step 1: Create Sections First

1. Open Sanity Studio
2. Go to **Section**
3. Click **Create new**
4. Fill in:
   - **Section Name**: e.g., "Electronics & Technology"
   - **Slug**: Auto-generate
   - **Description**: Brief description (optional)
   - **Section Image**: Upload image (optional)
   - **Display Order**: Number (0, 1, 2, etc.) - lower numbers appear first
5. Click **Publish**

### Step 2: Create Categories (Assigned to Sections)

1. Go to **Category**
2. Click **Create new**
3. Fill in:
   - **Category Name**: e.g., "Smartphones"
   - **Slug**: Auto-generate
   - **Description**: Brief description (optional)
   - **Category Image**: Upload image (optional)
   - **Section**: **REQUIRED** - Select the section (e.g., "Electronics & Technology")
   - **Display Order**: Number (0, 1, 2, etc.) - order within the section
4. Click **Publish**

### Step 3: Create Products (Assigned to Categories)

1. Go to **Product**
2. Click **Create new**
3. Fill in:
   - **Image**: Upload product images
   - **Name**: Product name
   - **Slug**: Auto-generate
   - **Price**: Product price
   - **Details**: Product description
   - **Category**: **REQUIRED** - Select the category (e.g., "Smartphones")
4. Click **Publish**

## Example Setup

### Section 1: Electronics & Technology
**Order: 0**

Categories:
- Smartphones (Order: 0)
- Tablets (Order: 1)
- Laptops (Order: 2)
- Gaming Consoles (Order: 3)
- Headphones (Order: 4)
- Smart Watches (Order: 5)

### Section 2: Fashion & Apparel
**Order: 1**

Categories:
- Men's Clothing (Order: 0)
- Women's Clothing (Order: 1)
- Shoes (Order: 2)
- Sneakers (Order: 3)
- Bags & Luggage (Order: 4)

### Section 3: Home & Living
**Order: 2**

Categories:
- Furniture (Order: 0)
- Home Decor (Order: 1)
- Kitchen & Dining (Order: 2)
- Bedding (Order: 3)

## Key Points

1. **Sections must be created first** - Categories cannot exist without a section
2. **Categories must be assigned to a section** - This is required
3. **Products must be assigned to a category** - This is required
4. **Display Order** - Use numbers to control the order sections and categories appear (0 = first, 1 = second, etc.)

## Frontend Display

- **Sections** are displayed as large headers with their name and description
- **Categories** are displayed as cards under their respective section
- **Products** are filtered when you click on a category
- Sections are sorted by their `order` field (ascending)
- Categories within each section are sorted by their `order` field (ascending)

## Migration Notes

If you have existing data:
1. Create sections first
2. Update existing categories to assign them to sections
3. Products remain assigned to categories (no change needed)

## Best Practices

- Use clear, descriptive section names
- Keep sections to 5-10 main sections
- Each section should have 3-8 categories
- Use display order numbers to organize sections and categories logically
- Add descriptions to help users understand what's in each section/category

