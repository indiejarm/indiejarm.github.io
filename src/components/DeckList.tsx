import { useState } from "react";
import { DeckCard } from "../types/card";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Plus,
  Minus,
  Trash2,
  Download,
  Copy,
  Upload,
  Bomb,
  Hourglass,
  MessageSquare,
  DollarSign,
  Minus as MinusIcon,
  Pencil,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface DeckListProps {
  deck: DeckCard[];
  onAddCard: (card: DeckCard) => void;
  onRemoveCard: (card: DeckCard) => void;
  onClearDeck: () => void;
}

const suitColors = {
  Charm: "#7D053F",
  Combat: "#AE2A00",
  Search: "#0F8D70",
  Stealth: "#4B2568",
  System: "#A69D0F",
  Transport: "#3EA6AC",
};

const triggerIcons = {
  Ambush: Bomb,
  Complete: Hourglass,
  Flip: MessageSquare,
  Payoff: DollarSign,
  None: MinusIcon,
};

export function DeckList({
  deck,
  onAddCard,
  onRemoveCard,
  onClearDeck,
}: DeckListProps) {
  const [deckTitle, setDeckTitle] = useState("My Deck");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [importCode, setImportCode] = useState("");
  const [isImportOpen, setIsImportOpen] = useState(false);

  const totalCards = deck.reduce(
    (sum, card) => sum + card.quantity,
    0,
  );
  const averageIntel =
    deck.length > 0
      ? (
          deck.reduce(
            (sum, card) => sum + card.Intel * card.quantity,
            0,
          ) / totalCards
        ).toFixed(1)
      : "0";
  const averageStrength =
    deck.length > 0
      ? (
          deck.reduce(
            (sum, card) => sum + card.Strength * card.quantity,
            0,
          ) / totalCards
        ).toFixed(1)
      : "0";

  const cardsByType = deck.reduce(
    (acc, card) => {
      acc[card.type] = (acc[card.type] || 0) + card.quantity;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Count triggers
  const triggerCounts = deck.reduce(
    (acc, card) => {
      acc[card.trigger] =
        (acc[card.trigger] || 0) + card.quantity;
      return acc;
    },
    {} as Record<string, number>,
  );

  // Count suits
  const suitCounts = deck.reduce(
    (acc, card) => {
      card.suits.forEach((suit) => {
        acc[suit] = (acc[suit] || 0) + card.quantity;
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  // Prepare pie chart data
  const pieData = Object.entries(suitCounts).map(
    ([suit, count]) => ({
      name: suit,
      value: count,
      color: suitColors[suit as keyof typeof suitColors],
    }),
  );

  const generateDeckText = () => {
    if (deck.length === 0) return;

    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let deckText = `${deckTitle} - ${date}\n`;
    deckText += `${"=".repeat(50)}\n\n`;
    deckText += `Total Cards: ${totalCards} / 30\n`;
    deckText += `Average Intel: ${averageIntel}\n\n`;
    deckText += `Average Strength: ${averageStrength}\n\n`;

    // Group by type
    const cardsByTypeGroups = deck.reduce(
      (acc, card) => {
        if (!acc[card.type]) {
          acc[card.type] = [];
        }
        acc[card.type].push(card);
        return acc;
      },
      {} as Record<string, DeckCard[]>,
    );

    // Sort and format
    Object.entries(cardsByTypeGroups)
      .sort(([typeA], [typeB]) => typeA.localeCompare(typeB))
      .forEach(([type, cards]) => {
        const typeCount = cards.reduce(
          (sum, card) => sum + card.quantity,
          0,
        );
        deckText += `${type.toUpperCase()} (${typeCount})\n`;
        deckText += `${"-".repeat(30)}\n`;
        cards
          .sort(
            (a, b) =>
              a.Intel - b.Intel || a.name.localeCompare(b.name),
          )
          .forEach((card) => {
            const suitsText = card.suits.join("/");
            const subtypesText =
              card.subtypes.length > 0
                ? ` [${card.subtypes.join(", ")}]`
                : "";
            deckText += `${card.quantity}x ${card.name} (${card.Intel} ${suitsText})${subtypesText}\n`;
            deckText += `    Strength: ${card.Strength} - ${card.description}\n`;
            if (card.trigger !== "None") {
              deckText += `    Trigger: ${card.trigger}\n`;
            }
          });
        deckText += `\n`;
      });

    // Add deck code
    const deckCode = generateDeckCode();
    deckText += `\nDeck Code:\n${deckCode}\n`;

    return deckText;
  };

  const generateDeckCode = () => {
    // Format: cardId-quantity,cardId-quantity,...
    return deck
      .map((card) => `${card.id}-${card.quantity}`)
      .join(",");
  };

  const exportDeck = () => {
    if (deck.length === 0) return;

    const deckText = generateDeckText();

    // Create and download file
    const blob = new Blob([deckText!], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${deckTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Deck exported!");
  };

  const copyDeckToClipboard = async () => {
    if (deck.length === 0) return;

    try {
      const deckText = generateDeckText();
      if (!deckText) throw new Error("No deck text generated");

      await navigator.clipboard.writeText(deckText);
      toast.success("Deck copied to clipboard!");
    } catch (error) {
      console.error("Clipboard error:", error);
      toast.error("Failed to copy deck to clipboard");
    }
  };

  const importDeck = () => {
    if (!importCode.trim()) {
      toast.error("Please enter a deck code");
      return;
    }

    try {
      // Parse deck code format: cardId-quantity,cardId-quantity,...
      const entries = importCode.trim().split(",");
      const newDeck: DeckCard[] = [];

      // Import all cards from the CARDS array
      import("../data/cards").then(({ CARDS }) => {
        entries.forEach((entry) => {
          const [id, quantityStr] = entry.trim().split("-");
          const quantity = parseInt(quantityStr, 10);

          if (
            !id ||
            isNaN(quantity) ||
            quantity < 1 ||
            quantity > 2
          ) {
            throw new Error(`Invalid entry: ${entry}`);
          }

          const card = CARDS.find((c) => c.id === id);
          if (!card) {
            throw new Error(`Card not found: ${id}`);
          }

          newDeck.push({ ...card, quantity });
        });

        // Clear current deck and add new cards
        onClearDeck();
        newDeck.forEach((card) => {
          for (let i = 0; i < card.quantity; i++) {
            onAddCard(card);
          }
        });

        setIsImportOpen(false);
        setImportCode("");
        toast.success("Deck imported!");
      });
    } catch (error) {
      console.error("Import error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to import deck",
      );
    }
  };
  const Deckcode = generateDeckCode();
  return (
    <Card className="flex flex-col">
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            {isEditingTitle ? (
              <Input
                value={deckTitle}
                onChange={(e) => setDeckTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    setIsEditingTitle(false);
                }}
                autoFocus
                className="h-8"
              />
            ) : (
              <div className="flex items-center gap-2">
                <h2
                  className="cursor-pointer"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {deckTitle}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setIsEditingTitle(true)}
                >
                  <Pencil className="w-3 h-3" />
                </Button>
              </div>
            )}
            <p className="text-sm text-muted-foreground">
              {totalCards} / 30 cards
            </p>
            <p className="text-sm text-muted-foreground">
              deck code: {Deckcode}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportDeck}
            disabled={deck.length === 0}
            className="flex-1 min-w-[80px]">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Dialog
            open={isImportOpen}
            onOpenChange={setIsImportOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 min-w-[80px]"
              >
                <Upload className="w-4 h-4 mr-1" />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Import Deck</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm">Deck Code</label>
                  <Textarea
                    value={importCode}
                    onChange={(e) =>
                      setImportCode(e.target.value)
                    }
                    placeholder="Paste deck code here (e.g., 1-2,5-1,12-2)"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Format: cardId-quantity separated by commas
                  </p>
                </div>
                <Button onClick={importDeck} className="w-full">
                  Import Deck
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearDeck}
            disabled={deck.length === 0}
            className="flex-1 min-w-[80px]"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Clear
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              Average Intel
            </p>
            <p>{averageIntel}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              Average Strength
            </p>
            <p>{averageStrength}</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground">
              Total<br />
              Cards
            </p>
            <p>{totalCards}</p>
          </div>
        </div>

        {Object.keys(triggerCounts).length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              Triggers
            </p>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(triggerCounts)
                .filter(([trigger]) => trigger !== "None")
                .map(([trigger, count]) => {
                  const Icon =
                    triggerIcons[
                      trigger as keyof typeof triggerIcons
                    ];
                  return (
                    <Badge
                      key={trigger}
                      variant="secondary"
                      className="text-xs capitalize flex items-center gap-1"
                    >
                      <Icon className="w-3 h-3" />
                      {trigger}: {count}
                    </Badge>
                  );
                })}
            </div>
          </div>
        )}

        {Object.keys(suitCounts).length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Suit Distribution
            </p>
            <div className="w-full min-w-[300px] h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) =>
                      `${entry.name}: ${entry.value}`
                    }
                    outerRadius="60%"
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {Object.keys(cardsByType).length > 0 && (
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">
              Card Types
            </p>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(cardsByType).map(
                ([type, count]) => (
                  <Badge
                    key={type}
                    variant="secondary"
                    className="text-xs capitalize"
                  >
                    {type}: {count}
                  </Badge>
                ),
              )}
            </div>
          </div>
        )}
      </div>

      <Separator />

      <ScrollArea className="max-h p-4 overflow-y-auto">
        {deck.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No cards in deck</p>
            <p className="text-sm">
              Click on cards to add them
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {deck
              .sort((a, b) => a.Intel - b.Intel)
              .map((card) => (
                <div
                  key={card.id}
                  className="flex items-center gap-2 p-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{card.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{card.Intel}</span>
                      <span className="capitalize">
                        {card.type}
                      </span>
                      <span className="capitalize">
                        {card.suits.join("/")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => onRemoveCard(card)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-6 text-center text-sm">
                      {card.quantity}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => onAddCard(card)}
                      disabled={card.quantity >= 2}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}