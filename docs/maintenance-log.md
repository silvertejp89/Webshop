# Maintenance log

Every fix made during the 2026 maintenance and security review, one row per commit. The original group version is tagged [`v1-2024`](https://github.com/silvertejp89/Webshop/releases/tag/v1-2024).

| Date | What | Why (risk or problem) | Before | After | How it was verified | Commit |
| --- | --- | --- | --- | --- | --- | --- |
| 2026-11-09 | Tagged the original version | Keep the group's version intact for comparison | – | Tag `v1-2024` | Tag visible under Releases | – |

## Known issues to fix

- Production build only contains `index.html`, which redirects to `home.html` that is not built.
- `checkout.html` points to `src/ts/pages/checkout.ts`, but the folder is `Pages`.
- The logo file name has the wrong letter case.
- The remove button in the cart is created but never added to the card.
- Checkout validation rejects valid email addresses and names with å, ä, ö.
- Two `CartProduct` classes, test files and `.orig` files left over.
- Product data written with `innerHTML`; cart read from localStorage without error handling.
