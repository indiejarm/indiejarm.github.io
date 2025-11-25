# Quick Fix for Card Data Errors

Your `/data/cards.ts` file has syntax errors that prevent the app from building. I've created scripts to fix them automatically.

## Option 1: Node.js Fix (Recommended)

Run this command in your terminal:

```bash
node fix-cards-now.js
```

This will:
- Fix all malformed `subtypes` arrays
- Fix missing quotes in subtype declarations
- Save the corrected file

## Option 2: Python Fix

If you prefer Python:

```bash
python3 quick_fix.py
```

## What Gets Fixed

The scripts fix these syntax errors:

1. **Malformed arrays**: `['Crime, Vehicle]` → `['Crime', 'Vehicle']`
2. **Mixed quotes**: `['Crime, 'Vehicle]` → `['Crime', 'Vehicle']`
3. **Missing quotes**: `['Science]` → `['Science']`

## After Running the Fix

1. Restart your dev server
2. The app should now build successfully
3. All 166 cards will be available
4. All new features will work!

## If You Still Get Errors

If you see other errors after running the fix:

1. Check the terminal output for the specific error
2. Open `/data/cards.ts` and go to the line number mentioned
3. Look for:
   - Unescaped quotes in `description` fields
   - Missing commas between object properties
   - Unclosed brackets or braces

## Manual Fix Alternative

If the scripts don't work, you can use Find & Replace in your editor:

1. Open `/data/cards.ts`
2. Press Ctrl+H (or Cmd+H on Mac)
3. Find: `subtypes: \['([^']+),\s*([^']+)\],`
4. Replace: `subtypes: ['$1', '$2'],`
5. Click "Replace All"

Then repeat for single values:
1. Find: `subtypes: \['([^']+)\],`
2. Replace: `subtypes: ['$1'],`
3. Click "Replace All"

---

Need help? Check the error message and look for the line number mentioned. The error usually points to the exact location of the problem.
