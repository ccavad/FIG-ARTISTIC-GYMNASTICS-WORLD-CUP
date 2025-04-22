# FIG Artistic Gymnastics World Cup App

A responsive React application for displaying information and results for the FIG Artistic Gymnastics World Cup events, featuring interactive animations and real-time data visualization.

## Features

- **Responsive Design** - Optimized for both mobile and desktop with adaptive layouts
- **Live Scoring** - Real-time display of competition scores with attention-grabbing animations
- **Interactive Results Tables** - Animated results with sorting and filtering capabilities
- **Dynamic Filtering** - Filter results by apparatus, category, age group and more with fluid transitions
- **Comprehensive Views** - Live, Startlist, Schedule, Results, and Medals with seamless transitions
- **Motion Feedback** - Subtle animations provide feedback for user interactions
- **Score Highlighting** - Visual emphasis on changing scores and rankings
- **Expandable Cards** - Interactive athlete cards with smooth expand/collapse animations

## Tech Stack

- **React** - Frontend library
- **Vite** - Fast build tool and development server
- **Chakra UI v2** - Component library for consistent styling
- **Zustand** - Lightweight state management
- **Framer Motion** - Animation library for fluid transitions
- **Mock Data** - Simulated competition data (ready for API integration)

## Getting Started

### Prerequisites

- Node.js 16+ and Yarn

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/ccavad/FIG-ARTISTIC-GYMNASTICS-WORLD-CUP.git
   cd FIG-ARTISTIC-GYMNASTICS-WORLD-CUP
   ```

2. Install dependencies

   ```bash
   yarn
   ```

3. Start the development server
   ```bash
   yarn dev
   ```

## Project Structure

```
fig-gymnastics-app/
├── public/
│   ├── mock-data/    # Mock JSON data for competitions
│   └── assets/       # Static assets like images
├── src/
│   ├── components/   # UI components
│   │   ├── layout/     # Layout components (Header, Navigation)
│   │   ├── ui/         # Reusable UI components
│   │   └── views/      # Main view components
│   ├── store/        # Zustand store for state management
│   ├── utils/        # Utility functions
│   ├── hooks/        # Custom React hooks
│   ├── theme/        # Chakra UI theme configuration
│   ├── App.jsx       # Main application component
│   └── main.jsx      # Application entry point
└── ...configuration files
```

## Animation Features

The application uses Framer Motion to create a dynamic and engaging user experience:

- **Page Transitions** - Smooth transitions between different views
- **Staggered Animations** - Elements appear in sequence for a natural flow
- **Interactive Elements** - Hover and click animations provide feedback
- **Status Highlights** - "Go" status athletes receive attention with pulsing effects
- **Score Updates** - Score changes are highlighted with subtle animations
- **Expandable Cards** - Smooth expand/collapse animations for athlete details
- **Medal Animations** - Interactive medal icons with hover effects
- **Filter Animations** - Dynamic filter tags with enter/exit animations

## Views

1. **Live View** - Real-time competition scores with status indicators
2. **Startlist View** - Upcoming competitors organized by apparatus
3. **Schedule View** - Event schedule with date and time information
4. **Results View** - Competition results with detailed scoring breakdown
5. **Medals View** - Medal standings by country with interactive medal counts

## Development

### Building for Production

```bash
yarn build
```

### Preview Production Build

```bash
yarn preview
```

## Responsive Design

The application is built with a mobile-first approach, with specific optimizations for:

- Mobile phones (< 768px)
- Tablets (768px - 1024px)
- Desktop (> 1024px)

## Future Enhancements

- Live data integration with WebSockets for real-time updates
- Authentication for administrators and judges
- Athlete profile detail pages with performance history
- Advanced filtering and search functionality
- Performance analytics and statistics
- Multi-language support for international competitions
- Dark/light theme toggle
- Offline support with service workers

## License

MIT
