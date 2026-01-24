import React from 'react';
import { Stethoscope, Smile, Syringe, HeartPulse, ScanFace, Baby } from 'lucide-react';
import { Service, Doctor, Review, Transformation } from './types';

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'General Dentistry',
    description: 'Routine check-ups, cleanings, and preventative care to keep your smile healthy.',
    icon: <Stethoscope className="w-6 h-6" />,
    priceStart: '$80',
    pricingDetails: [
      { item: 'New Patient Exam', price: '$80' },
      { item: 'Routine Cleaning', price: '$120' },
      { item: 'Digital X-Rays', price: '$50' },
      { item: 'Fluoride Treatment', price: '$40' },
      { item: 'Composite Filling (1 Surface)', price: '$150' }
    ]
  },
  {
    id: '2',
    title: 'Cosmetic Dentistry',
    description: 'Whitening, veneers, and smile makeovers to give you the confidence you deserve.',
    icon: <Smile className="w-6 h-6" />,
    priceStart: '$200',
    pricingDetails: [
      { item: 'Professional Teeth Whitening', price: '$350' },
      { item: 'Take-Home Whitening Kit', price: '$200' },
      { item: 'Porcelain Veneer (Per Tooth)', price: '$1,200' },
      { item: 'Composite Bonding', price: '$300' },
      { item: 'Full Smile Makeover', price: 'Consultation Required' }
    ]
  },
  {
    id: '3',
    title: 'Orthodontics',
    description: 'Invisalign and traditional braces to align your teeth perfectly.',
    icon: <ScanFace className="w-6 h-6" />,
    priceStart: '$1500',
    pricingDetails: [
      { item: 'Invisalign Consultation', price: 'Free' },
      { item: 'Invisalign Full Treatment', price: '$3,500 - $5,500' },
      { item: 'Traditional Metal Braces', price: '$3,000 - $5,000' },
      { item: 'Ceramic Braces', price: '$3,500 - $6,000' },
      { item: 'Retainers (Per Arch)', price: '$250' }
    ]
  },
  {
    id: '4',
    title: 'Dental Implants',
    description: 'Permanent, natural-looking replacements for missing teeth.',
    icon: <HeartPulse className="w-6 h-6" />,
    priceStart: '$900',
    pricingDetails: [
      { item: 'Implant Consultation', price: '$100' },
      { item: 'Single Implant Placement', price: '$1,800' },
      { item: 'Implant Crown', price: '$1,200' },
      { item: 'Bone Grafting', price: '$400 - $800' },
      { item: 'All-on-4 (Per Arch)', price: '$15,000+' }
    ]
  },
  {
    id: '5',
    title: 'Pediatric Dentistry',
    description: 'Gentle, fun, and educational care for our youngest patients.',
    icon: <Baby className="w-6 h-6" />,
    priceStart: '$60',
    pricingDetails: [
      { item: 'Child Exam & Cleaning', price: '$90' },
      { item: 'Sealants (Per Tooth)', price: '$50' },
      { item: 'Fluoride Varnish', price: '$35' },
      { item: 'Space Maintainer', price: '$300' },
      { item: 'Nitrous Oxide (Laughing Gas)', price: '$80' }
    ]
  },
  {
    id: '6',
    title: 'Root Canals',
    description: 'Expert endodontic therapy to save damaged teeth and relieve pain.',
    icon: <Syringe className="w-6 h-6" />,
    priceStart: '$400',
    pricingDetails: [
      { item: 'Emergency Exam', price: '$100' },
      { item: 'Anterior Root Canal', price: '$600' },
      { item: 'Premolar Root Canal', price: '$800' },
      { item: 'Molar Root Canal', price: '$1,000' },
      { item: 'Post and Core', price: '$350' }
    ]
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-vakalova',
    name: 'Dr. Elena Vakalova',
    specialty: 'Lead Dentist & Cosmetic Specialist',
    bio: 'With over 15 years of experience, Dr. Vakalova specializes in creating beautiful, natural smiles using the latest minimally invasive techniques.',
    image: 'https://picsum.photos/id/64/400/500'
  },
  {
    id: 'dr-smith',
    name: 'Dr. James Chen',
    specialty: 'Orthodontist',
    bio: 'Dr. Chen is a certified Invisalign provider and expert in corrective orthodontics for both teens and adults.',
    image: 'https://picsum.photos/id/91/400/500'
  }
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    rating: 5,
    text: 'The best dental experience I have ever had. Dr. Vakalova is incredibly gentle and the clinic is stunning.',
    date: 'Oct 2023'
  },
  {
    id: '2',
    author: 'Michael Torres',
    rating: 5,
    text: 'State-of-the-art equipment and a very friendly staff. I actually look forward to my cleanings now!',
    date: 'Sep 2023'
  },
  {
    id: '3',
    author: 'Emily Blunt',
    rating: 4,
    text: 'Great service, managed to book an emergency appointment on the same day. Very grateful.',
    date: 'Aug 2023'
  }
];

export const TRANSFORMATIONS: Transformation[] = [
  {
    id: '1',
    title: 'Smile Makeover',
    description: 'Complete upper arch restoration using porcelain veneers.',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Invisalign Correction',
    description: '12 months of Invisalign treatment to correct crowding and alignment.',
    beforeImage: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1609607847926-da4702f01fef?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Teeth Whitening',
    description: 'In-office Zoom whitening session, 3 shades lighter in one hour.',
    beforeImage: 'https://images.unsplash.com/photo-1588776814546-1b447543d438?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&q=80&w=800' // using similar visually for demo
  }
];
