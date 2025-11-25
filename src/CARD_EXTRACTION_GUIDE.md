# Card Extraction Guide for S.P.I.E.S. Deckbuilder

## Overview
This guide explains how to add cards from your Figma import to the deckbuilder app.

## What's Been Implemented

### ✅ Completed Features

1. **Subtype Field** - Added as an array with values:
   - Animal, Business, Crime, Gadget, Law, Military, Politics, Press, Science, Vehicle

2. **Collapsible Filters** - All filter sections are now collapsible accordions:
   - Card Type, Suit, Subtype, Trigger, Strength, Intel

3. **Colored Suit Badges** - Suit badges now match their respective colors:
   - Charm: Pink
   - Combat: Red
   - Search: Green
   - Stealth: Violet
   - System: Yellow
   - Transport: Blue

4. **Dual-Suit Gradients** - Cards with 2 suits show a gradient circle in the top-right

5. **Trigger Icons in Circle** - The top-right circle now shows the trigger icon instead of gem:
   - Ambush: Bomb 💣
   - Complete: Hourglass ⏳
   - Flip: Speech Bubble 💬
   - Payoff: Dollar Sign 💰
   - None: Horizontal Line ➖

6. **Enhanced Filtering** - Subtype filtering works alongside all other filters

## Card Data Structure

Each card requires these fields:

\`\`\`typescript
{
  id: string;              // Unique identifier (e.g., '1', '2', '3')
  name: string;            // Card name
  type: CardType;          // 'Agent' | 'Item' | 'Order' | 'Faciliy'
  suits: CardSuit[];       // Array of 1-2: ['Charm', 'Combat', 'Search', 'Stealth', 'System', 'Transport']
  subtypes: CardSubtype[]; // Array: ['Animal', 'Business', 'Crime', 'Gadget', 'Law', 'Military', 'Politics', 'Press', 'Science', 'Vehicle']
  Intel: number;           // 0-10
  Strength: number;        // 0-10
  trigger: CardTrigger;    // 'Ambush' | 'Complete' | 'Flip' | 'Payoff' | 'None'
  description: string;     // Card ability text
  image: string;           // Image URL or import
}
\`\`\`

## How to Add Cards from Figma

### Step 1: Locate Your Card Images
Your Figma import includes individual card images. They're available in \`/imports/Frame1.tsx\` as:
- \`imgArt2\` through \`imgArt228\`
- Plus \`imgArt1\` and \`imgArt15\` from svg imports

### Step 2: Import the Image
At the top of \`/data/cards.ts\`, add:

\`\`\`typescript
import imgArtX from "figma:asset/[hash].png";
\`\`\`

Copy the exact import line from \`/imports/Frame1.tsx\`.

### Step 3: Create the Card Entry
Add to the CARDS array in \`/data/cards.ts\`:

\`\`\`typescript
{
  id: '2',
  name: 'Sniper',
  type: 'Agent',
  suits: ['Combat', 'Stealth'],  // Dual-suit = gradient circle!
  subtypes: ['Military', 'Crime'],
  Intel: 6,
  Strength: 8,
  trigger: 'Ambush',
  description: 'PLAY: Deal 3 damage to target',
  image: imgArt2,
},
\`\`\`

### Step 4: Extract Card Info from Image
Unfortunately, I cannot automatically read text from images. You'll need to:
1. Look at each card in the Figma design
2. Manually extract the information (name, stats, abilities, etc.)
3. Add it to the card data structure

## Example: Complete Card Set

\`\`\`typescript
import { Card } from '../types/card';
import imgArt2 from "figma:asset/40bfc8757644e8de3cd8a3ebd7bd53dd17edce0d.png";
import imgArt3 from "figma:asset/3beb63a1724bb106db4d21f29b6d9a34b08bc2d2.png";
import imgArt4 from "figma:asset/bbb13a8f252cc8fb4ae188b213f24705d0b0d552.png";

export const CARDS: Card[] = [
  {
    id: '1',
    name: 'Field Agent',
    type: 'Agent',
    suits: ['Stealth'],
    subtypes: ['Crime'],
    Intel: 5,
    Strength: 6,
    trigger: 'None',
    description: 'PLAY: Draw a card',
    image: imgArt2,
  },
  {
    id: '2',
    name: 'Hacker',
    type: 'Agent',
    suits: ['System', 'Stealth'],  // Dual-suit
    subtypes: ['Science', 'Crime'],
    Intel: 8,
    Strength: 3,
    trigger: 'Complete',
    description: 'FLIP: Disable target item',
    image: imgArt3,
  },
  {
    id: '3',
    name: 'Surveillance Van',
    type: 'Item',
    suits: ['Transport'],
    subtypes: ['Vehicle', 'Gadget'],
    Intel: 4,
    Strength: 0,
    trigger: 'Payoff',
    description: 'PAY: Look at opponent hand',
    image: imgArt4,
  },
  // Continue with more cards...
];
\`\`\`

## Tips for Efficient Card Entry

1. **Batch Import Images**: Import all images you need at once at the top of the file
2. **Use Template**: Reference \`/data/cards-template.ts\` for structure
3. **Check IDs**: Ensure each card has a unique ID
4. **Dual Suits**: Remember to use an array even for single suits: \`['Combat']\` not \`'Combat'\`
5. **Test Filters**: After adding cards, test that they appear in correct filters

## Visual Guide

### Card Preview Features
- **Top-left corner**: Quantity in deck (if added)
- **Top-right circle**: 
  - Background: Suit color (single) or gradient (dual)
  - Icon: Trigger symbol
- **Badges**: Type, Suits (colored), Subtypes, Trigger (if not None)
- **Stats**: Strength (⚡) and Intel (💎)
- **Bottom-right**: Quick-add button (on hover)

### Collapsible Filters
All filter sections can be collapsed to save space. Click the section header to expand/collapse.

## Regarding Dynamic Figma Updates

You asked: "Is it possible to load images from a Figma file and have them dynamically update?"

**Short Answer**: Not automatically, but you can re-import when needed.

**Options**:
1. **Manual Re-import** (Current): Import updated design from Figma whenever you make changes
2. **Figma API** (Advanced): Set up a backend (e.g., with Supabase) that:
   - Fetches latest designs from Figma API
   - Updates card images automatically
   - Requires API keys and periodic polling/webhooks

For a card game in development, manual re-import is usually sufficient since card designs don't change constantly once finalized.

## Need Help?

If you encounter any issues:
1. Check that all imports are correct
2. Verify each card has all required fields
3. Ensure IDs are unique
4. Check console for any errors
5. Test filters to ensure cards appear correctly

---

**Happy Deckbuilding! 🎴**
