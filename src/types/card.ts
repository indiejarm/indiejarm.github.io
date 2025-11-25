export type CardType = 'Agent' | 'Item' | 'Order' | 'Facility';
export type CardSuit = 'Charm' | 'Combat' | 'Search' | 'Stealth' | 'System' | 'Transport';
export type CardTrigger = 'Ambush' | 'Complete' | 'Flip' | 'Payoff' | 'None';
export type CardSubtype = 'Animal' | 'Business' | 'Crime' | 'Gadget' | 'Law' | 'Military' | 'Politics' | 'Press' | 'Science' | 'Vehicle';

export interface Card {
  id: string;
  name: string;
  type: CardType;
  suits: CardSuit[]; // Array of 1-2 suits
  subtypes: CardSubtype[]; // Array of subtypes
  Intel: number;
  Strength: number;
  trigger: CardTrigger;
  description: string;
  image: string;
}

export interface DeckCard extends Card {
  quantity: number;
}