import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Card } from './ui/card';
import { Separator } from './ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { CardType, CardSuit, CardTrigger, CardSubtype } from '../types/card';
import { Search, Bomb, Hourglass, MessageSquare, DollarSign, Minus } from 'lucide-react';

export interface FilterState {
  searchname: string;
  searcheffect: string;
  types: CardType[];
  suits: CardSuit[];
  subtypes: CardSubtype[];
  triggers: CardTrigger[];
  intelRange: [number, number];
  strengthRange: [number, number];
}

interface CardFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const types: CardType[] = ['Agent', 'Item', 'Order', 'Facility'];
const suits: CardSuit[] = ['Charm', 'Combat', 'Search', 'Stealth', 'System', 'Transport'];
const subtypes: CardSubtype[] = ['Animal', 'Business', 'Crime', 'Gadget', 'Law', 'Military', 'Politics', 'Press', 'Science', 'Vehicle'];
const triggers: { value: CardTrigger; icon: typeof Bomb }[] = [
  { value: 'Ambush', icon: Bomb },
  { value: 'Complete', icon: Hourglass },
  { value: 'Flip', icon: MessageSquare },
  { value: 'Payoff', icon: DollarSign },
  { value: 'None', icon: Minus },
];

export function CardFilters({ filters, onFiltersChange }: CardFiltersProps) {
  const toggleType = (type: CardType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    onFiltersChange({ ...filters, types: newTypes });
  };

  const toggleSuit = (suit: CardSuit) => {
    const newSuits = filters.suits.includes(suit)
      ? filters.suits.filter((e) => e !== suit)
      : [...filters.suits, suit];
    onFiltersChange({ ...filters, suits: newSuits });
  };

  const toggleSubtype = (subtype: CardSubtype) => {
    const newSubtypes = filters.subtypes.includes(subtype)
      ? filters.subtypes.filter((s) => s !== subtype)
      : [...filters.subtypes, subtype];
    onFiltersChange({ ...filters, subtypes: newSubtypes });
  };

  const toggleTrigger = (trigger: CardTrigger) => {
    const newTriggers = filters.triggers.includes(trigger)
      ? filters.triggers.filter((t) => t !== trigger)
      : [...filters.triggers, trigger];
    onFiltersChange({ ...filters, triggers: newTriggers });
  };

  return (
    <Card className="p-4 space-y-4">
      <div>
        <h3 className="mb-3">Filters</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by Name..."
            value={filters.searchname}
            onChange={(e) => onFiltersChange({ ...filters, searchname: e.target.value })}
            className="pl-9"
          />
        </div>
        <div className="relative">
          <h3 className="mb-3"> </h3>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by effect..."
            value={filters.searcheffect}
            onChange={(e) => onFiltersChange({ ...filters, searcheffect: e.target.value })}
            className="pl-9"
          />
        </div>
      </div>

      <Separator />

      <Accordion type="multiple" defaultValue={['type', 'suit', 'subtype', 'trigger', 'strength', 'intel']} className="w-full">
        <AccordionItem value="type">
          <AccordionTrigger className="text-sm py-2">Card Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {types.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.types.includes(type)}
                    onCheckedChange={() => toggleType(type)}
                  />
                  <label htmlFor={`type-${type}`} className="text-sm capitalize cursor-pointer">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="suit">
          <AccordionTrigger className="text-sm py-2">Suit</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {suits.map((suit) => (
                <div key={suit} className="flex items-center gap-2">
                  <Checkbox
                    id={`suit-${suit}`}
                    checked={filters.suits.includes(suit)}
                    onCheckedChange={() => toggleSuit(suit)}
                  />
                  <label htmlFor={`suit-${suit}`} className="text-sm capitalize cursor-pointer">
                    {suit}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="subtype">
          <AccordionTrigger className="text-sm py-2">Subtype</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {subtypes.map((subtype) => (
                <div key={subtype} className="flex items-center gap-2">
                  <Checkbox
                    id={`subtype-${subtype}`}
                    checked={filters.subtypes.includes(subtype)}
                    onCheckedChange={() => toggleSubtype(subtype)}
                  />
                  <label htmlFor={`subtype-${subtype}`} className="text-sm capitalize cursor-pointer">
                    {subtype}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="trigger">
          <AccordionTrigger className="text-sm py-2">Trigger</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pt-2">
              {triggers.map(({ value, icon: Icon }) => (
                <div key={value} className="flex items-center gap-2">
                  <Checkbox
                    id={`trigger-${value}`}
                    checked={filters.triggers.includes(value)}
                    onCheckedChange={() => toggleTrigger(value)}
                  />
                  <label htmlFor={`trigger-${value}`} className="text-sm capitalize cursor-pointer flex items-center gap-2">
                    <Icon className="w-3 h-3" />
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="strength">
          <AccordionTrigger className="text-sm py-2">
            Strength: {filters.strengthRange[0]} - {filters.strengthRange[1]}
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2">
              <Slider
                min={0}
                max={10}
                step={1}
                value={filters.strengthRange}
                onValueChange={(value) =>
                  onFiltersChange({ ...filters, strengthRange: value as [number, number] })
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="intel">
          <AccordionTrigger className="text-sm py-2">
            Intel: {filters.intelRange[0]} - {filters.intelRange[1]}
          </AccordionTrigger>
          <AccordionContent>
            <div className="pt-4 pb-2">
              <Slider
                min={0}
                max={10}
                step={1}
                value={filters.intelRange}
                onValueChange={(value) =>
                  onFiltersChange({ ...filters, intelRange: value as [number, number] })
                }
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}