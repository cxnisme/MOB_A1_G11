# AI use disclosure

The group designed and implemented this mobile application from its assignment work and its own HTML design prototype. Generative AI supported the team with explanations, debugging, review, and selected implementation/documentation suggestions; it did not generate the complete project. The group is responsible for reviewing assisted changes and understanding the final app.

## Claude (Anthropic)

- Used for explanations about React Native, TypeScript, Git, and the Windows setup; debugging questions; and guidance while adapting the group's own HTML prototype to React Native.
- Assistance covered selected application source and design files, including `App.tsx`, `src/theme.ts`, `src/types.ts`, and files under `src/`. This is not a claim that AI authored the complete application.
- The HTML prototype, visual direction, assignment decisions, and acceptance of the final implementation belong to the group.

## GitHub Copilot (VS Code)

- Used to help complete the README and this disclosure, configure Expo's SDK-compatible lint tooling, diagnose the lint failure in `src/components/Dock.tsx`, and run the automated project checks.
- The focused dock change replaces render-time `ref.current` access with a stable, lazily initialized animation value.

## Verification

- Automated checks run in this workspace: `npm run lint`, `npx tsc --noEmit`, `npx expo-doctor` (21/21 checks), and `npx expo export --platform android`. Results are in `TEST_LOG.md`.
- Manual device test: the group reports launching the app in Expo Go on Android while the phone and computer were on the same local network. Device model, Expo Go version, and step-by-step manual results were not recorded here. Supplied screenshots are in `../Screenshots/`.
- AI tools did not perform the group's phone test, sign the group's evidence, or replace members' live explanation of their work.
