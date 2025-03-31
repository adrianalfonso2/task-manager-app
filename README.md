# Task Manager App

A simple task management application that was built with React Native and Expo. This app allows users to add tasks, mark them as complete, delete them, and switch between light and dark themes.

## Features

- Add new tasks with descriptions
- Mark tasks as complete 
- Delete tasks
- Task list display showing both complete and incomplete tasks
- Visual feedback for task interactions (haptic feedback)
- Task statistics with progress tracking
- Dark/Light mode toggle

## Screenshots



## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI (install with `npm install -g expo-cli`)

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd task-manager-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

### Running the App

After starting the development server with `npx expo start`, you'll have several options to run the app:

- Press `w` to open in a web browser
- Press `a` to open in an Android emulator (requires Android Studio setup)
- Press `i` to open in an iOS simulator (requires Xcode, macOS only)
- Scan the QR code with the Expo Go app on your mobile device

## How to Use

### Task Management

1. **Add a task**: Enter a task description in the input field at the top and press the add button or hit return
2. **Mark as complete**: Tap on the checkbox next to a task to toggle its completion status
3. **Delete a task**: Tap the trash icon to delete a task
4. **View statistics**: The app displays statistics showing total tasks, completed tasks, and overall progress

### Theme Switching

- **Toggle between themes**: Tap the moon/sun icon in the top-right corner to switch between dark and light modes
  - Moon icon indicates you're in light mode and can switch to dark mode
  - Sun icon indicates you're in dark mode and can switch to light mode

## App Architecture

### State Management

- **React Context API**: Used for global state management without external libraries
  - `TaskContext`: Manages the task list state and operations
  - `ThemeContext`: Manages the theme state and toggling

### Component Structure

- **Main Components**:
  - `TaskInput`: Input field for adding new tasks
  - `TaskList`: Container for rendering all tasks
  - `TaskItem`: Individual task component with toggle and delete controls
  - `TaskStats`: Displays task completion statistics and progress bar
  - `ThemeToggle`: Button for switching between light and dark modes

## Third-Party Libraries

| Library | Purpose |
|---------|---------|
| React Native | Core framework for building cross-platform mobile apps |
| Expo | Development platform providing tools and services for React Native |
| Expo Haptics | Provides haptic feedback for user interactions |
| Expo Vector Icons | Icon library including Ionicons for UI elements |
| React Navigation | Tab-based navigation system |
| React Native Reanimated | Powers animations in the app |

## Troubleshooting

### Common Issues

- **App not starting**: Try clearing the cache with `npx expo start --clear`
- **Dependencies issues**: Ensure all dependencies are installed with `npm install`
- **Web version issues**: For best experience, use a mobile device or emulator

## Future Enhancements

- Task categories/tags
- Due dates for tasks
- Task priority levels
- Data persistence using AsyncStorage
- Search and filter functionality
- Push notifications for task reminders
