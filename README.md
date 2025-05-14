# News App

A modern news application built with React Native and Expo, featuring article browsing, search functionality, and detailed article views.

## Features

- 📰 Browse latest news articles
- 🔍 Search functionality
- 📱 Responsive design
- 🎨 Modern UI with smooth animations
- 🔄 Pull-to-refresh
- 📱 Safe area handling
- 🔗 Article sharing

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Emulator

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

## Running the App

1. Start the development server:

```bash
npm start
# or
yarn start
```

2. Choose your preferred way to run the app:
   - Press `i` to run on iOS simulator
   - Press `a` to run on Android emulator
   - Scan the QR code with Expo Go app on your physical device

## Development

- The app uses Expo Router for navigation
- Components are organized in the `src/components` directory
- Services and API calls are in the `src/services` directory
- Hooks and utilities are in the `src/hooks` directory

## Project Structure

```
├── app/                    # Expo Router pages
├── src/
│   ├── components/        # Reusable components
│   ├── services/         # API and business logic
│   ├── hooks/           # Custom hooks
│   └── utils/           # Utility functions
├── assets/              # Images and other static assets
└── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
