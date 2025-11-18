// Brand Colors
export const colors = {
  // Primary Brand Colors
  primary: '#FF8C00',      // Primary orange (main brand color) - Mambo Marketplace
  secondary: '#324d67',    // Dark blue-gray (text/headings)
  
  // Background Colors
  background: {
    white: '#ffffff',
    light: '#ebebeb',      // Light gray background
    medium: '#dcdcdc',     // Medium gray background
    dark: '#000000',
    overlay: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    transparent: 'transparent',
  },
  
  // Text Colors
  text: {
    primary: '#324d67',    // Main text color
    secondary: '#5f5f5f',  // Secondary text (lighter)
    black: '#000000',
    white: '#ffffff',
    light: '#eee',         // Very light gray text
    gray: 'gray',
  },
  
  // Accent Colors
  accent: {
    red: '#f02d34',
    green: 'rgb(49, 168, 49)', // Success green
    orange: '#FF8C00',     // Primary orange (main accent)
  },
  
  // UI Element Colors
  ui: {
    border: 'gray',
    buttonPrimary: '#FF8C00',    // Orange primary button
    buttonSecondary: '#ffffff',
    buttonText: '#ffffff',
    buttonOutline: '#FF8C00',    // Orange outline
    cartBadge: '#FF8C00',        // Orange cart badge
    cartBadgeText: '#eee',
  },
};

// CSS Variables for use in styles
export const cssVariables = Object.keys(colors).reduce((acc, category) => {
  if (typeof colors[category] === 'object') {
    Object.keys(colors[category]).forEach(key => {
      const value = colors[category][key];
      const varName = `--color-${category}-${key}`.replace(/([A-Z])/g, '-$1').toLowerCase();
      acc[varName] = value;
    });
  } else {
    const varName = `--color-${category}`.replace(/([A-Z])/g, '-$1').toLowerCase();
    acc[varName] = colors[category];
  }
  return acc;
}, {});

export default colors;

