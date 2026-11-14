# Auto Delete Todo List

A small page for the 7 Solutions frontend challenge.

## What it does

- The left column shows a list of buttons. Each one is a fruit or a vegetable.
- Click a button to move it to its own column: Fruit or Vegetable.
- A moved button stays in its column for 5 seconds, then goes back to the bottom of the left list.
- Click a button in the Fruit or Vegetable column to send it back to the bottom of the left list right away.

## How to run

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Project structure

```
app/
  page.tsx                      The page. Passes the item data to the list.
  components/
    auto-delete-list.tsx        Shows the main list and the two columns.
    item-button.tsx             One clickable button.
  hooks/
    use-auto-return-list.ts     All the logic: moving items and the 5 second timers.
  data/
    items.ts                    The list of fruits and vegetables.
  types/
    item.ts                     The Item type and the list of item types.
```

## How it works

The logic lives in one hook, `useAutoReturnList`. The components only show data
and call the hook's functions when a button is clicked.

The hook keeps two lists in state:

- `mainList`: the buttons in the left column.
- `movedItems`: the buttons that were moved out. Each column shows only the
  items of its own type from this list.

When a button is moved out, the hook starts a 5 second timer for it. The timers
are kept in a `Map` inside a `useRef`, with the item name as the key. A ref is
used because the timers do not need to be shown on the screen, so changing
them should not cause a new render.

When a button goes back (by click or by timer), its timer is stopped and
removed from the `Map`. This matters: if an item is clicked back early and
then moved out again, the old timer must not pull it back too soon.

When the page is closed, all timers that are still running are stopped.

## Tech

- Next.js
- React
- TypeScript
- Tailwind CSS
