# CommTracker - Communication Tracking Calendar Application

A React-based calendar application for tracking and managing company communications.

## Features

- Admin Module for managing companies and communication methods
- Dashboard with real-time communication tracking
- Color-coded notifications for overdue and due communications
- Multi-select functionality for batch communication logging
- Comprehensive company profiles with contact information

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Lucide React for icons
- Vite for build tooling

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── admin/         # Admin module components
│   └── dashboard/     # Dashboard components
├── pages/             # Main page components
├── types/            # TypeScript interfaces
└── utils/            # Utility functions
```

## Features Implementation

### Admin Module
- Company management (CRUD operations)
- Communication method configuration
- Sequence and mandatory flag management

### Dashboard
- Real-time communication tracking
- Color-coded status indicators
- Multi-select company actions
- Communication logging

### Notifications
- Overdue communication alerts
- Due today reminders
- Interactive notification panel

## Known Limitations

1. Currently uses in-memory state management (would need backend integration)
2. Calendar view implementation pending
3. Reporting and analytics features not implemented

## Future Improvements

1. Integration with backend services
2. Implementation of calendar view
3. Addition of reporting and analytics features
4. Enhanced data visualization
5. Export functionality for reports

## Testing

Run tests using:
```bash
npm run test
```

## License

MIT License