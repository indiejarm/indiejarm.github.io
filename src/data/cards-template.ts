import { Card } from '../types/card';
// Import images from the Figma file
import imgArt2 from "figma:asset/40bfc8757644e8de3cd8a3ebd7bd53dd17edce0d.png";
import imgArt3 from "figma:asset/3beb63a1724bb106db4d21f29b6d9a34b08bc2d2.png";
import imgArt4 from "figma:asset/bbb13a8f252cc8fb4ae188b213f24705d0b0d552.png";
// ... import more images as needed

/**
 * CARD TEMPLATE GUIDE
 * 
 * To add cards from the Figma import:
 * 1. Look at the Figma image grid and identify the card you want
 * 2. Find the corresponding imgArt number in /imports/Frame1.tsx
 * 3. Import that image at the top of this file
 * 4. Create a new card object below with the following fields:
 * 
 * - id: Unique identifier (string)
 * - name: Card name
 * - type: 'Agent' | 'Item' | 'Order' | 'Faciliy'
 * - suits: Array of 1-2 suits: ['Charm', 'Combat', 'Search', 'Stealth', 'System', 'Transport']
 * - subtypes: Array of subtypes: ['Animal', 'Business', 'Crime', 'Gadget', 'Law', 'Military', 'Politics', 'Press', 'Science', 'Vehicle']
 * - Intel: Number (0-10)
 * - Strength: Number (0-10)
 * - trigger: 'Ambush' | 'Complete' | 'Flip' | 'Payoff' | 'None'
 * - description: Card text/ability
 * - image: The imported image variable (e.g., imgArt2)
 */

export const CARDS_TEMPLATE: Card[] = [
  // Example single-suit card
  {
    id: '2',
    name: 'Example Agent',
    type: 'Agent',
    suits: ['Combat'],
    subtypes: ['Military'],
    Intel: 5,
    Strength: 7,
    trigger: 'Ambush',
    description: 'PLAY: Deal 2 damage',
    image: imgArt2,
  },
  // Example dual-suit card
  {
    id: '3',
    name: 'Example Spy',
    type: 'Agent',
    suits: ['Stealth', 'System'], // Dual-suit with gradient circle
    subtypes: ['Crime', 'Science'],
    Intel: 6,
    Strength: 4,
    trigger: 'Complete',
    description: 'FLIP: Draw two cards',
    image: imgArt3,
  },
  // Example item card
  {
    id: '4',
    name: 'Example Gadget',
    type: 'Item',
    suits: ['System'],
    subtypes: ['Gadget', 'Science'],
    Intel: 3,
    Strength: 0,
    trigger: 'Payoff',
    description: 'ATTACH: Target agent gains +2 Strength',
    image: imgArt4,
  },
  // Add more cards here following the template...
];

/**
 * To use these cards:
 * 1. Copy the cards you want from this template
 * 2. Paste them into /data/cards.ts CARDS array
 * 3. Update the card details based on what you see in the Figma design
 * 4. Make sure each card has a unique id
 */
