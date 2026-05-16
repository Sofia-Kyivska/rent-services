import { v4 } from 'uuid';


export const socialLinks = [
  {
    id: v4(),
    title: 'Telephone',
    subtitle: '+380 (50) 012 83 74',
    img: '/social-links/Telephone.webp',
    href: 'tel:+380500128374',
    icon: '/sprite.svg#phone-new'
  },
  {
    id: v4(),
    title: 'Instagram',
    subtitle: 'SofiaRent_Kyiv',
    img: '/social-links/Instagram.webp',
    href: 'https://www.instagram.com/sofia.rent.kyiv',
    icon: '/sprite.svg#instagram-new'
  },
  {
    id: v4(),
    title: 'Facebook',
    subtitle: 'Sofia_Rent_Kyiv',
    img: '/social-links/Facebook.webp',
    href: '#',
    icon: '/sprite.svg#facebook-new'
  },
];
