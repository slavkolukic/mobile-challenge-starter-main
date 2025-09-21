# Studyflash Hiring Challenge: Starting Point

## Intro

Welcome! Use this repo as the starting point for your submission to the **Studyflash** mobile developer hiring challenge. You’ll build a simple streaming AI chatbot that mimics the look and feel of **ChatGPT**

---

## Getting started

- **pnpm** installed
- Gemini API key (provided as part of the challenge)

Create `.env.local` in the project root:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=provided_key_here
```

---

## Running in Expo

1. Install deps:

   ```bash
   pnpm install
   ```

2. Start the dev server:

   ```bash
   npx expo
   ```

3. Open the app:
   - **iOS Simulator:** press `i` in the terminal.
   - **Real device:** install **Expo Go**, scan the QR code.

---

## Expo SDK note (real devices)

- The latest Expo Go app on real devices does not run SDK 53.
- This repo includes a branch with upgraded Expo to run on real devices with the current Expo Go.
- To use it:

---

## Notes and known limitations

- Animated streaming text can be further optimized using React Native Skia for high-performance text effects. See `react-native-skia` by Shopify: [github.com/Shopify/react-native-skia](https://github.com/Shopify/react-native-skia).
- Markdown rendering is not implemented. It can be added using `@expensify/react-native-live-markdown`: [github.com/Expensify/react-native-live-markdown](https://github.com/Expensify/react-native-live-markdown).
- Known bug: the weather widget currently interferes with scrolling to the precise message offset and scrolling past the content is possible. This can be fixed with additional layout measurement and offset calculations, but I ran out of time for that.
- Android: I didn’t run the Android app, but everything should be fine there given the current setup.
- Model behavior: when the weather widget is invoked, the model responds only with temperature and location for that tool-driven message.
