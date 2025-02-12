# Water Down Sports Betting Assistant

A React application that helps users analyze and optimize their sports betting slips by finding lower-risk alternatives while maintaining potential profits.

## Features

- 🎯 Bet Slip Analysis: Upload and analyze betting slips via OCR
- 📊 Alternative Bets: Find lower-risk betting options
- 🔄 Real-time Odds Integration: Connect to live odds API
- 📱 Responsive Design: Works on desktop and mobile
- 🔒 Authentication: Google sign-in integration
- 🎨 Modern UI: Built with shadcn components

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui Components
- Tesseract.js for OCR
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js 16+
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd water-down-betting
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```env
VITE_ODDS_API_KEY=your_odds_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

4. Start development server:
```bash
npm run dev
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── auth/          # Authentication components
│   ├── bet-analyzer/  # Bet analysis components
│   ├── water-down/    # Water down feature components
│   └── ui/           # shadcn components
├── lib/              # Utility functions and API
├── pages/           # Route pages
└── types/           # TypeScript types
```

## Key Components

### BetSlipUploader
- Handles image upload
- Supports drag & drop
- Validates file types

### WaterDownPage
- Main feature page
- Processes bet slip images
- Shows alternative bets

### BetCard
- Displays individual bets
- Allows odds adjustment
- Shows alternative options

## Development Workflow

1. **Feature Development**
   - Create component in appropriate directory
   - Add to relevant page
   - Test in isolation using storyboards

2. **Testing**
   - Test OCR with various bet slip formats
   - Verify odds calculations
   - Check responsive design

3. **Deployment**
   - Build production version
   - Deploy static assets
   - Update documentation

## API Integration

### Odds API
- Endpoint: `https://api.the-odds-api.com/v4`
- Used for fetching live odds
- Rate limited - check usage

### OCR Processing
- Uses Tesseract.js
- Optimized for bet slip format
- Supports multiple sportsbooks

## Styling

- Uses Tailwind CSS
- Follows shadcn/ui design system
- Dark mode support
- Responsive breakpoints

## Authentication

- Google OAuth integration
- Protected routes
- Session management
- Mock auth for development

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## License

MIT License - see LICENSE file

## Support

For support, email [support@email.com]

## Roadmap

- [ ] Add more sportsbook integrations
- [ ] Implement parlay optimization
- [ ] Add bet history tracking
- [ ] Enhanced analytics dashboard
- [ ] Mobile app version
