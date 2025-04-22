# FIG Artistic Gymnastics World Cup App

A responsive React application for displaying information and results for the FIG Artistic Gymnastics World Cup events.

## Features

- **Responsive Design** - Optimized for both mobile and desktop
- **Live Scoring** - Real-time display of competition scores
- **Comprehensive Results** - Detailed breakdown of athlete performances
- **Interactive Filtering** - Filter results by apparatus, category, and more
- **Multiple Views** - Live, Startlist, Schedule, Results, and Medals

## Tech Stack

- **React** - Frontend library
- **Vite** - Build tool and development server
- **Chakra UI v2** - Component library
- **Zustand** - State management
- **React Router** - Navigation (future implementation)

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/fig-gymnastics-app.git
   cd fig-gymnastics-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

## Project Structure

```
fig-gymnastics-app/
├── public/
│   ├── mock-data/    # Mock JSON data
│   └── assets/       # Static assets like images
├── src/
│   ├── components/   # UI components
│   ├── store/        # Zustand store
│   ├── utils/        # Utility functions
│   ├── hooks/        # Custom React hooks
│   ├── theme/        # Chakra UI theme
│   ├── App.jsx       # Main application component
│   └── main.jsx      # Application entry point
└── ...configuration files
```

## Views

1. **Live View** - Real-time competition scores
2. **Startlist View** - Upcoming competitors
3. **Schedule View** - Event schedule
4. **Results View** - Competition results with filtering
5. **Medals View** - Medal standings by country

## Development

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Responsive Design

The application is built with a mobile-first approach, with specific optimizations for:

- Mobile phones (< 768px)
- Tablets (768px - 1024px)
- Desktop (> 1024px)

## Future Enhancements

- Live data integration with websockets
- User authentication for admin functions
- Athlete profile detail pages
- Search functionality
- Event notifications
- Multi-language support

## License

MIT
