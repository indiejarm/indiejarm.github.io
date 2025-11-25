import { Card } from "../types/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Plus, Minus, Zap, Gem, Bomb, Hourglass, MessageSquare, DollarSign, Minus as MinusIcon } from "lucide-react";

interface CardDetailProps {
  card: Card | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToDeck: (card: Card) => void;
  onRemoveFromDeck: (card: Card) => void;
  deckQuantity: number;
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
  None: MinusIcon,
};

export function CardDetail({
  card,
  isOpen,
  onClose,
  onAddToDeck,
  onRemoveFromDeck,
  deckQuantity,
}: CardDetailProps) {
  if (!card) return null;

  const TriggerIcon = triggerIcons[card.trigger];

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{card.name}</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <div className="aspect-[2/3] relative overflow-hidden rounded-lg border-2">
              <ImageWithFallback
                src={card.image}
                alt={card.name}
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute top-4 right-4 w-12 h-12 rounded-full ${card.suits.length === 1 ? suitColors[card.suits[0]] : `bg-gradient-to-br ${getDualSuitGradient()}`} flex items-center justify-center shadow-lg`}
              >
                <TriggerIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm text-muted-foreground mb-2">
                Type & Suit
              </h4>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="capitalize">
                  {card.type}
                </Badge>
                {card.suits.map((suit) => (
                  <Badge key={suit} variant="outline" className={`capitalize ${suitTextColors[suit]}`}>
                    {suit}
                  </Badge>
                ))}
              </div>
            </div>

            {card.subtypes.length > 0 && (
              <div>
                <h4 className="text-sm text-muted-foreground mb-2">
                  Subtypes
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {card.subtypes.map((subtype) => (
                    <Badge key={subtype} variant="outline" className="capitalize">
                      {subtype}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {card.trigger !== 'None' && (
              <div>
                <h4 className="text-sm text-muted-foreground mb-2">
                  Trigger
                </h4>
                <Badge variant="outline" className="capitalize flex items-center gap-2 w-fit">
                  <TriggerIcon className="w-4 h-4" />
                  {card.trigger}
                </Badge>
              </div>
            )}

            <div>
              <h4 className="text-sm text-muted-foreground mb-2">
                Stats
              </h4>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-muted-foreground" />
                  <span>Strength: {card.Strength}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-muted-foreground" />
                  <span>Intel: {card.Intel}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm text-muted-foreground mb-2">
                Description
              </h4>
              <p className="text-sm">{card.description}</p>
            </div>

            <div>
              <h4 className="text-sm text-muted-foreground mb-2">
                Deck Management
              </h4>
              <div className="flex items-center gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRemoveFromDeck(card)}
                  disabled={deckQuantity === 0}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center">
                  {deckQuantity} in deck
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddToDeck(card)}
                  disabled={deckQuantity >= 2}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Maximum 2 copies per deck
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}