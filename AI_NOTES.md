## AI Usage

AI tools were used during the development process for:
- architecture suggestions
- code refactoring ideas

### Parts AI Helped With

- Refactoring large components into reusable components
- Creating utility functions (`getFilteredProducts`)
- Generating README sections

### Parts Reviewed or Changed Manually

All generated code was manually:
- reviewed
- styled

### Example of an AI Suggestion That Was Rejected

One AI suggestion was to use global state management (Context API) for favorites and compare functionality.

This solution was intentionally rejected because:
- the project size is relatively small
- local component state was simpler and easier to maintain
- prop drilling was minimal
- using Context API would add unnecessary complexity for the current scope

Instead, localStorage and local state were used directly.