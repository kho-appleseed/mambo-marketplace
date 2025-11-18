import React from 'react'
import {
  AiOutlineShopping, AiOutlineHome, AiOutlineBook,
  AiOutlineCar, AiOutlineTool, AiOutlineGift,
  AiOutlinePhone, AiOutlineHeart, AiOutlineStar,
  AiOutlineTablet, AiOutlineLaptop, AiOutlineAudio,
  AiOutlineAppstore
} from 'react-icons/ai'
import { 
  FaGamepad, FaRunning, FaPaw, FaTshirt, FaShoePrints,
  FaShoppingBag, FaGem, FaTv, FaCouch, FaUtensils,
  FaBasketballBall, FaBicycle, FaMusic, FaCamera, FaBaby,
  FaHammer, FaPlane, FaHeadphones, FaMobileAlt,
  FaClock, FaBlender, FaBath, FaBed
} from 'react-icons/fa'
import { 
  MdOutlineSportsEsports, MdOutlineSpa, MdOutlineToys,
  MdOutlineSchool, MdOutlineFitnessCenter
} from 'react-icons/md'

/**
 * Get icon component for a section or category by name
 * @param {string} name - The name of the section or category
 * @param {number} size - Icon size in pixels (default: 24)
 * @returns {React.Element} - Icon component
 */
export const getSectionIcon = (name, size = 24) => {
  const iconMap = {
    // Sections
    'Electronics & Technology': <AiOutlinePhone size={size} />,
    'Fashion & Apparel': <AiOutlineShopping size={size} />,
    'Home & Living': <AiOutlineHome size={size} />,
    'Gaming & Entertainment': <FaGamepad size={size} />,
    'Beauty & Personal Care': <AiOutlineStar size={size} />,
    'Sports & Outdoors': <FaRunning size={size} />,
    'Books & Media': <AiOutlineBook size={size} />,
    'Automotive': <AiOutlineCar size={size} />,
    'Pet Supplies': <FaPaw size={size} />,
    'Baby & Kids': <AiOutlineHeart size={size} />,
    'Tools & Hardware': <AiOutlineTool size={size} />,
    'Gift & Specialty': <AiOutlineGift size={size} />,
    // Electronics & Technology Categories
    'Smartphones': <FaMobileAlt size={size} />,
    'Tablets': <AiOutlineTablet size={size} />,
    'Laptops': <AiOutlineLaptop size={size} />,
    'Headphones': <FaHeadphones size={size} />,
    'Speakers': <AiOutlineAudio size={size} />,
    'Smart Watches': <FaClock size={size} />,
    'Earbuds': <FaHeadphones size={size} />,
    'Audio Accessories': <AiOutlineAudio size={size} />,
    'Phone Accessories': <FaMobileAlt size={size} />,
    // Fashion & Apparel Categories
    "Men's Clothing": <FaTshirt size={size} />,
    "Women's Clothing": <FaTshirt size={size} />,
    'Shoes': <FaShoePrints size={size} />,
    'Sneakers': <FaShoePrints size={size} />,
    'Boots': <FaShoePrints size={size} />,
    'Bags & Luggage': <FaShoppingBag size={size} />,
    'Fashion Accessories': <AiOutlineShopping size={size} />,
    'Jewelry': <FaGem size={size} />,
    // Home & Living Categories
    'Furniture': <FaCouch size={size} />,
    'Kitchen & Dining': <FaUtensils size={size} />,
    'Home Decor': <AiOutlineHome size={size} />,
    'Bedding': <FaBed size={size} />,
    'Bath': <FaBath size={size} />,
    'Lighting': <AiOutlineStar size={size} />,
    'Storage': <AiOutlineAppstore size={size} />,
    // Sports & Outdoors Categories
    'Fitness Equipment': <MdOutlineFitnessCenter size={size} />,
    'Outdoor Gear': <FaRunning size={size} />,
    'Sports Apparel': <FaTshirt size={size} />,
    'Team Sports': <FaBasketballBall size={size} />,
    'Cycling': <FaBicycle size={size} />,
    // Beauty & Personal Care Categories
    'Skincare': <MdOutlineSpa size={size} />,
    'Makeup': <MdOutlineSpa size={size} />,
    'Hair Care': <AiOutlineStar size={size} />,
    'Fragrances': <AiOutlineStar size={size} />,
    // Books & Media Categories
    'Books': <AiOutlineBook size={size} />,
    'Music': <FaMusic size={size} />,
    'Movies & TV': <FaTv size={size} />,
    // Baby & Kids Categories
    'Baby Gear': <FaBaby size={size} />,
    'Toys & Games': <MdOutlineToys size={size} />,
    'School Supplies': <MdOutlineSchool size={size} />,
    // Tools & Hardware Categories
    'Power Tools': <FaHammer size={size} />,
    'Hand Tools': <AiOutlineTool size={size} />,
    // Other common categories
    'Gaming': <MdOutlineSportsEsports size={size} />,
    'Cameras': <FaCamera size={size} />,
    'Appliances': <FaBlender size={size} />,
    'Travel': <FaPlane size={size} />
  }
  
  // Try exact match first
  if (iconMap[name]) {
    return iconMap[name]
  }
  
  // Try partial matches for flexibility
  const lowerName = name.toLowerCase()
  if (lowerName.includes('electronics') || lowerName.includes('technology')) {
    return <AiOutlinePhone size={size} />
  }
  if (lowerName.includes('fashion') || lowerName.includes('apparel') || lowerName.includes('clothing')) {
    return <AiOutlineShopping size={size} />
  }
  if (lowerName.includes('home') || lowerName.includes('living')) {
    return <AiOutlineHome size={size} />
  }
  if (lowerName.includes('gaming') || lowerName.includes('entertainment')) {
    return <FaGamepad size={size} />
  }
  if (lowerName.includes('beauty') || lowerName.includes('personal care')) {
    return <AiOutlineStar size={size} />
  }
  if (lowerName.includes('sports') || lowerName.includes('outdoors')) {
    return <FaRunning size={size} />
  }
  if (lowerName.includes('book') || lowerName.includes('media')) {
    return <AiOutlineBook size={size} />
  }
  if (lowerName.includes('automotive') || lowerName.includes('car') || lowerName.includes('motorcycle')) {
    return <AiOutlineCar size={size} />
  }
  if (lowerName.includes('pet') || lowerName.includes('dog') || lowerName.includes('cat')) {
    return <FaPaw size={size} />
  }
  if (lowerName.includes('baby') || lowerName.includes('kids') || lowerName.includes('kid')) {
    return <AiOutlineHeart size={size} />
  }
  if (lowerName.includes('tool') || lowerName.includes('hardware')) {
    return <AiOutlineTool size={size} />
  }
  if (lowerName.includes('gift') || lowerName.includes('specialty')) {
    return <AiOutlineGift size={size} />
  }
  // Category-specific matches
  if (lowerName.includes('smartphone') || lowerName.includes('phone') && !lowerName.includes('accessories')) {
    return <FaMobileAlt size={size} />
  }
  if (lowerName.includes('tablet') || lowerName.includes('ipad')) {
    return <AiOutlineTablet size={size} />
  }
  if (lowerName.includes('laptop') || lowerName.includes('notebook') || lowerName.includes('computer')) {
    return <AiOutlineLaptop size={size} />
  }
  if (lowerName.includes('headphone') || lowerName.includes('headset')) {
    return <FaHeadphones size={size} />
  }
  if (lowerName.includes('speaker')) {
    return <AiOutlineAudio size={size} />
  }
  if (lowerName.includes('watch') || lowerName.includes('timepiece')) {
    return <FaClock size={size} />
  }
  if (lowerName.includes('earbud') || lowerName.includes('earphone')) {
    return <FaHeadphones size={size} />
  }
  if (lowerName.includes('men') || lowerName.includes("man's")) {
    return <FaTshirt size={size} />
  }
  if (lowerName.includes('women') || lowerName.includes("woman's")) {
    return <FaTshirt size={size} />
  }
  if (lowerName.includes('shoe') || lowerName.includes('sneaker') || lowerName.includes('boot') || lowerName.includes('footwear')) {
    return <FaShoePrints size={size} />
  }
  if (lowerName.includes('bag') || lowerName.includes('luggage') || lowerName.includes('suitcase')) {
    return <FaShoppingBag size={size} />
  }
  if (lowerName.includes('jewelry') || lowerName.includes('ring') || lowerName.includes('necklace')) {
    return <FaGem size={size} />
  }
  if (lowerName.includes('furniture') || lowerName.includes('couch') || lowerName.includes('sofa') || lowerName.includes('chair')) {
    return <FaCouch size={size} />
  }
  if (lowerName.includes('kitchen') || lowerName.includes('dining') || lowerName.includes('cookware')) {
    return <FaUtensils size={size} />
  }
  if (lowerName.includes('bedding') || lowerName.includes('bed') || lowerName.includes('pillow')) {
    return <FaBed size={size} />
  }
  if (lowerName.includes('bath') || lowerName.includes('bathroom')) {
    return <FaBath size={size} />
  }
  if (lowerName.includes('fitness') || lowerName.includes('workout') || lowerName.includes('exercise')) {
    return <MdOutlineFitnessCenter size={size} />
  }
  if (lowerName.includes('sport') && !lowerName.includes('apparel')) {
    return <FaRunning size={size} />
  }
  if (lowerName.includes('basketball') || lowerName.includes('football') || lowerName.includes('soccer')) {
    return <FaBasketballBall size={size} />
  }
  if (lowerName.includes('bike') || lowerName.includes('bicycle') || lowerName.includes('cycling')) {
    return <FaBicycle size={size} />
  }
  if (lowerName.includes('skincare') || lowerName.includes('makeup') || lowerName.includes('beauty')) {
    return <MdOutlineSpa size={size} />
  }
  if (lowerName.includes('book')) {
    return <AiOutlineBook size={size} />
  }
  if (lowerName.includes('music')) {
    return <FaMusic size={size} />
  }
  if (lowerName.includes('movie') || lowerName.includes('tv') || lowerName.includes('television')) {
    return <FaTv size={size} />
  }
  if (lowerName.includes('toy') || lowerName.includes('game') && !lowerName.includes('gaming')) {
    return <MdOutlineToys size={size} />
  }
  if (lowerName.includes('tool') || lowerName.includes('hardware')) {
    return <AiOutlineTool size={size} />
  }
  if (lowerName.includes('camera')) {
    return <FaCamera size={size} />
  }
  if (lowerName.includes('appliance')) {
    return <FaBlender size={size} />
  }
  if (lowerName.includes('travel')) {
    return <FaPlane size={size} />
  }
  
  // Default icon
  return <AiOutlineShopping size={size} />
}

/**
 * SectionIcon component - Reusable icon component for sections
 * @param {Object} props
 * @param {string} props.sectionName - The name of the section
 * @param {number} props.size - Icon size in pixels (default: 24)
 * @returns {React.Element} - Icon component
 */
export const SectionIcon = ({ sectionName, size = 24 }) => {
  return getSectionIcon(sectionName, size)
}

