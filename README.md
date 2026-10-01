# MOB_A1_G11 - Musanze Safe Market Field Inspection

SWE 3409 Mobile Application Development, Assignment 1. React Native, Expo and TypeScript.

| Project detail | Value |
|---|---|
| Group number / code | MOB_A1_G11 / MOB-G11-7889 |
| Group leader | NIWENIRINGIYE Christian (25/27889) |
| Repository | https://github.com/cxnisme/MOB_A1_G11 |
| Group code source | `src/config.ts` |
| Final commit | Run `git rev-parse HEAD` after the final push |

## Members and roles

| Member | Name | Registration no. | GitHub username | Role |
|---|---|---|---|---|
| 1 | IHIMBAZWE Angelique | 24/26926 | Angelique-123 | Product and UX lead |
| 2 | RUDASINGWA Theogene | 25/27330 | rudasingwatheogene1 | Interface engineer |
| 3 | IGIRANEZA Alain Providence | 25/28075 | alain143 | State and navigation engineer |
| 4 | Bullen Ladu Martin | 24/23862 | ladumartinbullen-cmyk | Device integration and QA lead |
| 5 | NIWENIRINGIYE Christian | 25/27889 | cxnisme | Release and evidence lead |

## App workflow

- Browse six sample market zones; search by name or stall code and filter by category.
- Start an inspection from a zone to prefill its stall code and category.
- Enter a vendor alias and contact, choose a risk level, provide consent, and attach an evidence photo from the camera or gallery.
- Review the validated inspection before saving it.
- Browse saved records and open a record's detail view.

The app uses `MOB-G11-7889` in its headers and saved inspection records. See [AI use disclosure](evidence/AI_USE.md) and [verification log](evidence/TEST_LOG.md).

## Setup and run

Requirements verified here: Node.js 24.19.0, npm 11.17.0, Expo SDK 57.0.26.

```powershell
npm ci
npx expo start --lan
```

Open Expo Go on Android and scan the terminal QR code. The phone and development computer must be on the same local network. The group reports testing this flow in Expo Go on Android over the same network; the phone model and Expo Go version were not recorded.

## Automated checks

```powershell
npx tsc --noEmit
npx expo-doctor
npx expo export --platform android
```

TypeScript, Expo Doctor, and Android export results from the current Windows environment are recorded in [evidence/TEST_LOG.md](evidence/TEST_LOG.md). A temporary lint setup was used during development and then removed; lint tooling is not included in this project. Android export verifies that the JavaScript bundle can be produced; it is not a signed APK or Play Store release.

## Validation rules

- Stall code: `MSZ-` followed by exactly three digits (for example, `MSZ-104`).
- Fictional Rwanda mobile number: `+250 7XX XXX XXX` or `07X XXX XXXX`; after `7`, the next digit is 2, 3, 8, or 9.
- Vendor alias: 3 to 30 letters, numbers, or spaces.
- Consent and an evidence photo are required before review.

## Evidence screenshots

The supplied Android screenshots are preserved in [Screenshots](Screenshots/):

- [Screen 1](Screenshots/WhatsApp%20Image%202026-09-30%20at%205.03.35%20PM.jpeg)
- [Screen 2](Screenshots/WhatsApp%20Image%202026-09-30%20at%205.03.36%20PM%20%281%29.jpeg)
- [Screen 3](Screenshots/WhatsApp%20Image%202026-09-30%20at%205.03.36%20PM.jpeg)

## Known limitations

- Inspections are kept in memory and are lost when the app closes; persistence and a backend are outside this prototype.
- Camera permission is requested at capture time. Gallery selection uses the system picker.
- The XDR light-filter overlay can be disabled with `XDR_FILTER_ENABLED` in `src/theme.ts`.

## AI assistance

AI support was limited to explanations, debugging/review assistance, selected implementation suggestions, and documentation. It did not generate the complete project. The group remains responsible for its implementation and should be able to explain it; see [evidence/AI_USE.md](evidence/AI_USE.md).
