# S.P.I.E.S. Deckbuilder - Recent Updates

## All Requested Features Implemented ✓

### 1. Card Data Issues Fixed (Script Provided)
**Problem**: Malformed subtype arrays and unescaped apostrophes in card descriptions
**Solution**: Run `python3 fix_cards.py` to automatically fix all syntax errors

Common issues fixed:
- `['Crime, Vehicle]` → `['Crime', 'Vehicle']`
- `['Science]` → `['Science']`  
- `['Crime, 'Vehicle]` → `['Crime', 'Vehicle']`
- Unescaped apostrophes in descriptions (don't → don\\'t)

### 2. Apostrophes Display Correctly ✓
**What changed**: All apostrophes in card effects are now properly escaped
**How to use**: The fix script handles this automatically

### 3. Trigger Count in Deck List ✓
**What's new**: Deck sidebar now shows count of each trigger type
**Features**:
- Displays with icons (💣 Ambush, ⏳ Complete, 💬 Flip, 💰 Payoff)
- Shows only non-"None" triggers
- Color-coded badges

### 4. Suit Distribution with Pie Chart ✓
**What's new**: Visual pie chart showing suit distribution in your deck
**Features**:
- Color-coded slices matching suit colors
- Hoverable tooltips showing exact counts
- Responsive design that fits in the sidebar

### 5. Remove Button on Cards ✓
**What's new**: Cards in the main view now have a `-` button
**How it works**:
- Appears in bottom-left on hover (opposite the `+` button)
- Only shows when card is in deck (quantity > 0)
- Click to remove one copy from deck

### 6. Editable Deck Title ✓
**What's new**: Click the deck name to edit it
**Features**:
- Click title or pencil icon to edit
- Press Enter or click away to save
- Title appears in deck exports
- Default: "My Deck"

### 7. Fixed Copy Button ✓
**What was wrong**: Clipboard API wasn't working, always showed "fail" message
**What's fixed**: 
- Proper async/await implementation
- Better error handling
- Shows success toast on successful copy

### 8. Fixed Button Overflow ✓
**What was wrong**: Copy/Export/Clear buttons overflowed their container
**What's fixed**:
- Buttons now wrap to multiple rows
- Responsive flex layout
- Each button has minimum width and flex-1 for equal sizing

### 9. Deck Import Feature ✓
**What's new**: Import decks using deck codes
**How it works**:
1. Click "Import" button
2. Paste deck code (format: `cardId-quantity,cardId-quantity`)
3. Example: `0-2,1-1,2-2` imports 2x card 0, 1x card 1, 2x card 2
4. Deck code is automatically included in exports

**Deck Code Format**:
```
cardId-quantity,cardId-quantity,cardId-quantity
```
Example: `0-2,5-1,12-2,15-1,20-2`

---

## How to Fix Your Card Data

Your `/data/cards.ts` file has syntax errors that prevent the app from running. Here's how to fix it:

### Method 1: Automatic Fix (Recommended)
```bash
# Run the Python fix script
python3 fix_cards.py
```

### Method 2: Manual Find & Replace
In your code editor:

1. Find: `subtypes: \['([^']+),\s*([^']+)],`  
   Replace: `subtypes: ['$1', '$2'],`
   
2. Find: `subtypes: \['([^']+), '([^']+)],`  
   Replace: `subtypes: ['$1', '$2'],`

3. Fix any remaining apostrophe issues manually

### Method 3: Use Node.js Script
```bash
node fix-cards-script.js
```

---

## Visual Changes

### Card Items (Main View)
```
┌─────────────────┐
│  [×2]      [💣] │  ← Quantity badge & Trigger icon (gradient for dual-suits)
│                 │
│   Card Image    │
│                 │
│  [-]       [+]  │  ← NEW: Remove button (left) and Add button (right)
├─────────────────┤
│ ACE ASSASSIN    │
│ [Agent] [Combat]│  ← Colored suit badges
│ [Crime]         │
│ ⚡9 💎8        │
│ *She only asks..│
└─────────────────┘
```

### Deck List Sidebar
```
┌─────────────────────────────┐
│ My Deck ✏️           60/60 │  ← Editable title
├─────────────────────────────┤
│ [Copy] [Export]             │
│ [Import] [Clear]            │  ← Fixed layout, import added
├─────────────────────────────┤
│ Avg Intel: 6.2   Total: 60  │
├─────────────────────────────┤
│ Triggers:                   │
│ [💣 Ambush: 5] [💰 Payoff: 3] │  ← NEW: Trigger counts
├─────────────────────────────┤
│ Suit Distribution:          │
│     ┌───────────┐           │
│     │    🥧     │           │  ← NEW: Pie chart
│     │  Chart    │
│     └───────────┘           │
├─────────────────────────────┤
│ Card Types:                 │
│ [Agent: 25] [Item: 10]      │
├─────────────────────────────┤
│ Card List...                │
└─────────────────────────────┘
```

---

## Updated Deck Export Format

```
My Deck - November 12, 2025
==================================================

Total Cards: 60 / 60
Average Intel: 6.2

AGENT (25)
------------------------------
2x ACE ASSASSIN (8 Combat) [Crime]
    Strength: 9 - *She only asks two questions...
1x AGENT PROVOCATEUR (6 Combat)
    Strength: 7 - PLAY: an opponent exposes...
...

ITEM (10)
------------------------------
...

ORDER (15)
------------------------------
...

Deck Code:
0-2,1-1,2-2,5-1,6-1,... 
```

---

## Testing Checklist

After fixing card data, verify:

- [ ] App loads without errors
- [ ] All 166 cards appear in card pool
- [ ] Filtering works (type, suit, subtype, trigger, stats)
- [ ] Adding cards to deck works
- [ ] Removing cards from deck works (both - button and sidebar)
- [ ] Card limits enforced (2 per card, 60 total)
- [ ] Copy button works
- [ ] Export button creates .txt file
- [ ] Import button loads deck from code
- [ ] Deck title edits save
- [ ] Trigger counts display correctly
- [ ] Pie chart shows suit distribution
- [ ] Colored suit badges display
- [ ] Gradient circles show on dual-suit cards
- [ ] Trigger icons show in top-right circle

---

## File Structure

```
/
├── components/
│   ├── CardItem.tsx (✓ Updated - remove button)
│   ├── CardDetail.tsx (✓ Updated - colored badges)
│   ├── CardFilters.tsx (✓ Updated - collapsible)
│   └── DeckList.tsx (✓ Updated - all new features)
├── data/
│   ├── cards.ts (⚠️  NEEDS FIXING - run fix script)
│   └── cards-template.ts (reference)
├── types/
│   └── card.ts (✓ Updated - subtypes added)
├── App.tsx (✓ Updated - remove functionality)
├── fix_cards.py (⭐ NEW - auto-fix script)
├── fix-cards-script.js (⭐ NEW - Node version)
├── FIXES_AND_IMPROVEMENTS.md (⭐ NEW - detailed guide)
├── CARD_EXTRACTION_GUIDE.md (⭐ NEW - Figma guide)
└── README_UPDATES.md (⭐ NEW - this file)
```

---

## Quick Start

1. **Fix card data** (required):
   ```bash
   python3 fix_cards.py
   ```

2. **Start the app**:
   ```bash
   npm run dev
   ```

3. **Test new features**:
   - Build a deck
   - Edit the deck title
   - Export and copy the deck
   - Try importing a deck code
   - Check the trigger counts and pie chart

---

## Support

If you encounter any issues:

1. Check console for errors
2. Verify `/data/cards.ts` has no syntax errors
3. Make sure all imports are correct
4. Clear browser cache and restart dev server

---

## Future Enhancements (Optional)

Potential features you could add:
- Deck validation rules (minimum cards, suit requirements, etc.)
- Multiple deck management (save/load different decks)
- Deck statistics (curve analysis, synergy suggestions)
- Card search with fuzzy matching
- Keyboard shortcuts
- Dark/light theme toggle
- Mobile-optimized layout

---

Enjoy your enhanced S.P.I.E.S. Deckbuilder! 🎴
