# Taskly

Taskly is a mobile application built with React Native and Expo for managing tasks. Current features include a shopping list and a car wash reminder.

## Features

### Shopping List
- Add items to the list.
- Mark items as complete.
- Delete items from the list.
- Items are saved locally.

### Car Wash Reminder
- Tracks time until the next car wash (14-day cycle).
- Sends a notification when a car wash is due.
- Keeps a history of completed car washes.
- Data is saved locally.

### Idea Screen
The application includes an "Idea" screen, which is currently a placeholder and may be developed further in the future.

## Technologies Used
- React Native
- Expo
- TypeScript
- Expo Router (for navigation)
- AsyncStorage (for local data storage)
- `date-fns` (for date/time utilities)
- Expo Notifications (for scheduling reminders)

## Setup and Running
1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd taskly
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
    Alternatively, if you use Yarn:
    ```bash
    yarn install
    ```
3.  **Run the application:**
    ```bash
    npm start
    ```
    Or:
    ```bash
    expo start
    ```
    This will open the Expo developer tools in your browser. You can then choose to run the app on:
    *   An Android emulator or connected device.
    *   An iOS simulator or connected device.
    *   In a web browser.

## Linting
To check the code for linting issues, run:
```bash
npm run lint
```
