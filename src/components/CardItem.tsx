import { Card } from '../types/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Zap, Gem, Plus, Bomb, Hourglass, MessageSquare, DollarSign, Minus } from 'lucide-react';

interface CardItemProps {
  card: Card;
  onClick: () => void;
  onAddToDeck: (card: Card) => void;
  onRemoveFromDeck?: (card: Card) => void;
  quantity?: number;
}

const suitColors = {
  Charm: 'bg-[#7D053F]',
  Combat: 'bg-[#AE2A00]',
  Search: 'bg-[#0F8D70]',
  Stealth: 'bg-[#4B2568]',
  System: 'bg-[#A69D0F]',
  Transport: 'bg-[#3EA6AC]',
};

const suitTextColors = {
  Charm: 'text-[#7D053F] border-[#7D053F]',
  Combat: 'text-[#AE2A00] border-[#AE2A00]',
  Search: 'text-[#0F8D70] border-[#0F8D70]',
  Stealth: 'text-[#4B2568] border-[#4B2568]',
  System: 'text-[#A69D0F] border-[#A69D0F]',
  Transport: 'text-[#3EA6AC] border-[#3EA6AC]',
};

const triggerIcons = {
  Ambush: Bomb,
  Complete: Hourglass,
  Flip: MessageSquare,
  Payoff: DollarSign,
  None: Minus,
};

export function CardItem({ card, onClick, onAddToDeck, onRemoveFromDeck, quantity }: CardItemProps) {
  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToDeck(card);
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemoveFromDeck) {
      onRemoveFromDeck(card);
    }
  };

  const canAddMore = !quantity || quantity < 2;
  const TriggerIcon = triggerIcons[card.trigger];

  // Create gradient style for dual-suit cards
  const getCircleStyle = () => {
    if (card.suits.length === 2) {
      const color1 = suitColors[card.suits[0]].replace('bg-', '');
      const color2 = suitColors[card.suits[1]].replace('bg-', '');
      return {
        background: `linear-gradient(135deg, rgb(var(--${color1})) 0%, rgb(var(--${color2})) 100%)`,
      };
    }
    return {};
  };

  const getCircleClass = () => {
    if (card.suits.length === 1) {
      return `${suitColors[card.suits[0]]}`;
    }
    // For dual suits, use inline style instead
    return 'bg-gradient-to-br from-[#7D053F] to-[#4B2568]';
  };

  // Get proper gradient colors for dual suits
  const getDualSuitGradient = () => {
    if (card.suits.length === 2) {
      const gradients: Record<string, string> = {
        'Charm-Combat': 'from-[#7D053F] to-[#AE2A00]',
        'Charm-Search': 'from-[#7D053F] to-[#0F8D70]',
        'Charm-Stealth': 'from-[#7D053F] to-[#4B2568]',
        'Charm-System': 'from-[#7D053F] to-[#A69D0F]',
        'Charm-Transport': 'from-[#7D053F] to-[#3EA6AC]',
        'Combat-Search': 'from-[#AE2A00] to-[#0F8D70]',
        'Combat-Stealth': 'from-[#AE2A00] to-[#4B2568]',
        'Combat-System': 'from-[#AE2A00] to-[#A69D0F]',
        'Combat-Transport': 'from-[#AE2A00] to-[#3EA6AC]',
        'Search-Stealth': 'from-[#0F8D70] to-[#4B2568]',
        'Search-System': 'from-[#0F8D70] to-[#A69D0F]',
        'Search-Transport': 'from-[#0F8D70] to-[#3EA6AC]',
        'Stealth-System': 'from-[#4B2568] to-[#A69D0F]',
        'Stealth-Transport': 'from-[#4B2568] to-[#3EA6AC]',
        'System-Transport': 'from-[#A69D0F] to-[#3EA6AC]',
      };
      const key = card.suits.sort().join('-');
      return gradients[key] || 'from-[#7D053F] to-[#4B2568]';
    }
    return suitColors[card.suits[0]];
  };

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer rounded-lg border bg-card transition-all hover:shadow-lg hover:scale-105"
    >
      <div className="aspect-[2/3] relative overflow-hidden rounded-t-lg">
        <ImageWithFallback
          src={card.image}
          alt={card.name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-2 right-2 w-8 h-8 rounded-full ${card.suits.length === 1 ? suitColors[card.suits[0]] : `bg-gradient-to-br ${getDualSuitGradient()}`} flex items-center justify-center`}>
          <TriggerIcon className="w-4 h-4 text-white" />
        </div>
        {quantity && quantity > 0 && (
          <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-black/80 flex items-center justify-center">
            <span className="text-white">×{quantity}</span>
          </div>
        )}
        <Button
          size="icon"
          className="absolute bottom-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          onClick={handleAddClick}
          disabled={!canAddMore}
        >
          <Plus className="w-4 h-4" />
        </Button>
        {onRemoveFromDeck && (
          <Button
            size="icon"
            className="absolute bottom-2 left-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            onClick={handleRemoveClick}
          >
            <Minus className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="flex-1 line-clamp-1">{card.name}</h3>
        </div>
        <div className="flex gap-1 flex-wrap">
          <Badge variant="outline" className="text-xs capitalize">
            {card.type}
          </Badge>
          {card.suits.map((suit) => (
            <Badge key={suit} variant="outline" className={`text-xs capitalize ${suitTextColors[suit]}`}>
              {suit}
            </Badge>
          ))}
        </div>
        <div className="flex gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>{card.Strength}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gem className="w-3 h-3" />
            <span>{card.Intel}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {card.description}
        </p>
      </div>
    </div>
  );
}