# Random Student Picker

> **Status:** completed vanilla-JavaScript learning tool. It is a small local classroom utility, not a maintained service or data-collection product.

The page animates a random pick from an in-memory roster, removes selected entries to avoid repeats, and includes an edit mode for excluding entries before selection.

## What it demonstrates

- DOM construction from an in-memory array.
- Event-driven edit and selection modes.
- Selection without replacement.
- Sequential CSS-class and position animations using promises.
- Empty-state and disabled-control handling.

## Run locally

No dependencies or build step are required:

```bash
open index.html
```

Edit the privacy-safe sample names at the top of `script.js` to use a different local roster. Do not commit a real class or employee roster without permission.

## Scope

The picker stores nothing, sends no network requests, and has no authentication or backend. It intentionally has no package, release stream, hosted demo, or CI workflow. A future deployment should retain the sample roster and accept user-provided names locally rather than publishing personal data.
