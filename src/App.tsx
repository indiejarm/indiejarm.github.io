import { useState, useMemo } from "react";
import { Card, DeckCard } from "./types/card";
import { CARDS } from "./data/cards";
import { CardItem } from "./components/CardItem";
import { CardDetail } from "./components/CardDetail";
import { DeckList } from "./components/DeckList";
import {
  CardFilters,
  FilterState,
} from "./components/CardFilters";
import { ScrollArea } from "./components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import {
  Library,
  Layers,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function App() {
  const [deck, setDeck] = useState<DeckCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(true);
  const [isDeckOpen, setIsDeckOpen] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    searchname: "",
    searcheffect: "",
    types: [],
    suits: [],
    subtypes: [],
    triggers: [],
    strengthRange: [0, 10],
    intelRange: [0, 10],
  });

  const filteredCards = useMemo(() => {
   return CARDS.filter((card) => {
      if (
        filters.searchname &&
        !card.name
          .toLowerCase()
          .includes(filters.searchname.toLowerCase())
      ) {
        return false;
      }
     if (
        filters.searcheffect &&
        !card.description
          .toLowerCase()
          .includes(filters.searcheffect.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.types.length > 0 &&
        !filters.types.includes(card.type)
      ) {
        return false;
      }
      // Check if any of the card's suits match the selected filters
      if (
        filters.suits.length > 0 &&
        !card.suits.some((suit) => filters.suits.includes(suit))
      ) {
        return false;
      }
      // Check if any of the card's subtypes match the selected filters
      if (
        filters.subtypes.length > 0 &&
        !card.subtypes.some((subtype) =>
          filters.subtypes.includes(subtype),
        )
      ) {
        return false;
      }
      if (
        filters.triggers.length > 0 &&
        !filters.triggers.includes(card.trigger)
      ) {
        return false;
      }
      if (
        card.Strength < filters.strengthRange[0] ||
        card.Strength > filters.strengthRange[1]
      ) {
        return false;
      }
      if (
        card.Intel < filters.intelRange[0] ||
        card.Intel > filters.intelRange[1]
      ) {
        return false;
      }
      return true;
    });
  }, [filters]);

  const handleAddToDeck = (card: Card) => {
    setDeck((prevDeck) => {
      const existingCard = prevDeck.find(
        (c) => c.id === card.id,
      );
      if (existingCard) {
        if (existingCard.quantity >= 3) return prevDeck;
        return prevDeck.map((c) =>
          c.id === card.id
            ? { ...c, quantity: c.quantity + 1 }
            : c,
        );
      }
      return [...prevDeck, { ...card, quantity: 1 }];
    });
  };

  const handleRemoveFromDeck = (card: Card) => {
    setDeck((prevDeck) => {
      const existingCard = prevDeck.find(
        (c) => c.id === card.id,
      );
      if (!existingCard) return prevDeck;
      if (existingCard.quantity <= 1) {
        return prevDeck.filter((c) => c.id !== card.id);
      }
      return prevDeck.map((c) =>
        c.id === card.id
          ? { ...c, quantity: c.quantity - 1 }
          : c,
      );
    });
  };

  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setIsDetailOpen(true);
  };

  const handleClearDeck = () => {
    setDeck([]);
  };

  const getDeckQuantity = (cardId: string) => {
    const deckCard = deck.find((c) => c.id === cardId);
    return deckCard ? deckCard.quantity : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <h1 className="flex items-center gap-2">
            <Layers className="w-6 h-6" />
            S.P.I.E.S.
          </h1>
          <p className="text-sm text-muted-foreground">
            Deckbuilding App
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[280px_1fr_320px] gap-6">
          <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-120px)]">
            <CardFilters
              filters={filters}
              onFiltersChange={setFilters}
            />
          </aside>

          <main>
            <Tabs defaultValue="collection" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger
                  value="collection"
                  className="gap-2"
                >
                  <Library className="w-4 h-4" />
                  Card Pool ({filteredCards.length})
                </TabsTrigger>
                <TabsTrigger
                  value="deck"
                  className="gap-2 lg:hidden"
                >
                  <Layers className="w-4 h-4" />
                  Deck (
                  {deck.reduce(
                    (sum, card) => sum + card.quantity,
                    0,
                  )}
                  )
                </TabsTrigger>
              </TabsList>

              <TabsContent value="collection">
                <ScrollArea className="h-[calc(100vh-240px)]">
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
                    {filteredCards.map((card) => (
                      <CardItem
                        key={card.id}
                        card={card}
                        onClick={() => handleCardClick(card)}
                        onAddToDeck={handleAddToDeck}
                        onRemoveFromDeck={handleRemoveFromDeck}
                        quantity={getDeckQuantity(card.id)}
                      />
                    ))}
                  </div>
                  {filteredCards.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>
                        No cards found matching your filters
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="deck" className="lg:hidden">
                <div className="h-[calc(100vh-240px)]">
                  <DeckList
                    deck={deck}
                    onAddCard={handleAddToDeck}
                    onRemoveCard={handleRemoveFromDeck}
                    onClearDeck={handleClearDeck}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </main>

          <aside className="hidden lg:block lg:sticky lg:top-6 lg:h-[calc(100vh-120px)]">
            <DeckList
              deck={deck}
              onAddCard={handleAddToDeck}
              onRemoveCard={handleRemoveFromDeck}
              onClearDeck={handleClearDeck}
            />
          </aside>
        </div>
      </div>

      <CardDetail
        card={selectedCard}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onAddToDeck={handleAddToDeck}
        onRemoveFromDeck={handleRemoveFromDeck}
        deckQuantity={
          selectedCard ? getDeckQuantity(selectedCard.id) : 0
        }
      />

      <Toaster />
    </div>
  );
}