# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Known Issues & Fixes to Prioritize
- ~~Ads: `src/components/AdComponent.tsx` injects AdSense without loading the Google script; add the loader, gate ads in development, and add a real consent/opt-in flow (currently only mentioned in Privacy).~~
- ~~Analytics/Consent: Privacy page claims Google Analytics usage, but no GA code or consent handling exists; either implement analytics with consent or update the copy.~~
- ~~Persistence: FastList writes to `localStorage` without guards; wrap in try/catch and provide a fallback for SSR/restrictive browsers.~~
- ~~Validation: Inputs are not trimmed, so blank/whitespace items can be added; `handleSubmit` uses `any` for the event and should be typed.~~
- ~~Accessibility/UX: Buttons lack aria labels, the form has no labels, nav uses inline styles, and there are no explicit focus/active states beyond defaults.~~
- ~~Type/Enum coupling: `AlertType.NULL` is an empty string; consider a nullable/union type instead to avoid ambiguity.~~
- ~~Mobile reuse: Extract list/domain logic, validation, and storage behind adapters so platform-specific UI can reuse it cleanly.~~
- ~~Outdated stack: CRA 4 + React 17 + `react-router-dom@6.30.1` still uses `ReactDOM.render`; move to `createRoot` or upgrade to a modern setup (Vite or CRA 5/React 18).~~
- ~~Testing: Only default scripts exist; add coverage for add/edit/delete/clear/persist behaviors.~~
- ~~Security/SEO: No Helmet/meta handling, CSP, service worker, or environment separation for ad/analytics keys.~~

## Mobile App Plan (Android-first)
- Platform: Start with an Expo-managed React Native app (Android focus first; add iOS later). Android publisher setup is cheaper and quicker than Apple’s paid developer program.
- Shared logic: Extract list types, validation (trim/duplicate checks), filtering, and consent/state logic into a shared module (e.g., `src/shared`). Keep platform-specific UI and storage separate.
- Storage abstraction: Add a storage interface; use `localStorage` on web and `AsyncStorage` on mobile via an adapter so persistence behavior stays consistent.
- UI port: Rebuild FastList with React Native primitives (`View`, `Text`, `TextInput`, `Pressable`, `FlatList`) and `@expo/vector-icons`. Replace chips/toggles with touch-friendly components and add proper focus/active states.
- Navigation & consent: Use `@react-navigation/native` for screens. Implement consent and ads with native-friendly options (e.g., AdMob via `expo-ads-admob` or other SDKs) and platform-appropriate consent flows (IAB/TCF where required).
- Testing & CI: Keep unit tests for shared logic; add React Native testing (e.g., `@testing-library/react-native`) and device/Emulator smoke tests. Wire CI to build Android APK/AAB (Play Store later) and optionally run EAS build for distribution.
