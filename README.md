
# Monitor SPEX Assessment 🙌

## Overview

This project is a React-based web application designed to monitor and visualize incoming real-time frequency sensing data. The application simulates a data stream from IoT devices, presenting it in a synchronized chart and table format. Users can filter data, identify anomalies, and navigate through paginated entries, with real-time updates continuing for the most recent data.

## Features

### Core Functionalities
1. **Real-Time Data Visualization**
   - Uses `recharts` to display frequency data in a dynamic chart synchronized with a data table.
   - Mocked real-time data is generated using the `msw` (Mock Service Worker) module.

2. **Filtering**
   - Filter data by:
     - **Signal Strength**: Exclude entries below a threshold (e.g., >50%).
     - **Device Location or ID**: Search by specific device or location.

3. **Highlighting**
   - Automatically flags:
     - **Weak Signals**: Signal strength below 20%.

4. **Pagination with Real-Time Updates**
   - Paginated view for navigating older data.
   - Real-time updates displayed only in the "Continue" mode for the latest data.
   - API requests and data updates persist in the background for all modes.

5. **Responsive UI**
   - Built with `Tailwind CSS` for modern styling and responsiveness.

---

## Data Format

The application simulates a real-time stream with the following structure for each entry:

- **id**: Unique identifier for the data entry.
- **timestamp**: Time the data was recorded.
- **deviceId**: Unique identifier for the transmitting device.
- **frequency**: Signal frequency in Hertz (Hz).
- **signalStrength**: Signal strength as a percentage (%).
- **location**: Device location (e.g., city, country).

---

## Project Structure

```
monitor-spex-assessment/
├── public/               # Static assets
├── src/
│   ├── App.jsx           # Main application component
│   ├── components/       # Reusable UI components (Table, Filters, Charts)
│   ├── mocks/            # Mocked data and API service
│   ├── assets/           # Images and icons
│   ├── main.jsx          # Entry point
│   ├── index.css         # Global CSS
│   └── App.css           # Component-specific styles
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

---

## Installation and Setup

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Steps
1. Clone the Repository:
   ```bash
   git clone https://github.com/frank-verynice/monitor-spex-assessment
   cd monitor-spex-assessment
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3. Start the Development Server:
   ```bash
   npm run dev
   ```

4. Access the Application:
   Open your browser and navigate to `http://localhost:5173`.

---

## Usage Instructions

### Filtering Data
2. **Signal Strength**: Apply a threshold (e.g., >50%) via input fields or dropdowns.
3. **Device ID or Location**: Enter device identifiers or locations in the search bar.

### Navigation
- Use pagination controls to view older or newer data.
- Click the **Continue** button to return to real-time updates for the latest data.

---

## Technologies Used

1. **Frontend Framework**: React with functional components and hooks.
2. **Charting Library**: `recharts` for data visualization.
3. **Mocking**: `msw` (Mock Service Worker) for simulating real-time data.
4. **Styling**: Tailwind CSS for responsive and clean design.
5. **Development Tooling**: Vite for fast builds and hot module reloading.

---

## Approach

### Assumptions
1. Frequency data is transmitted as per the defined structure.
2. Real-time updates are simulated at a 1-second interval using `msw`.

### Implementation
1. **Mocked API**: Simulates data updates for realistic testing.
2. **State Management**: Uses React hooks to manage real-time data and filters.
3. **Responsive Design**: Built with Tailwind CSS to ensure usability across devices.

---

## Future Enhancements
1. **WebSocket Integration**: Replace `msw` with real-time WebSocket updates.
2. **Data Export**: Allow users to download filtered or full data sets.
3. **Advanced Analytics**: Add more detailed insights and charts (e.g., histograms, heatmaps).

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
