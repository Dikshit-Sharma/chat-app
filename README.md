# Chat Hub

## Live Demo: https://chat-hub-211502.web.app/
### Testing Account:
- **Email: 211502@juitsolan.in   Password: dikshit123
- **Email: 211503@juitsolan.in   Password: dikshit123
- **User Names: Tarisha Kaplex, Vipul, Aaryan, Vipu

## Features

- **Real-Time Messaging**: Chat instantly with other users in real-time.
- **User Authentication**: Secure user authentication powered by Firebase Authentication.
- **Profile Management**: Users can customize their profiles, including avatars and display names.
- **File Sharing**: Share files with other users within the chat interface.
- **Responsive Design**: Optimized for use on desktop and mobile devices.

## Technologies Used

- **React**: Frontend user interface development.
- **Firebase**: Backend services including authentication, real-time database, and file storage.
- **HTML & CSS**: Frontend styling and layout.
- **JavaScript**: Programming language for frontend interactivity and backend logic.
- **React Router**: Client-side routing for single-page application behavior.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/chat-hub.git`
2. Navigate to the project directory: `cd chat-hub`
3. Install dependencies: `npm install`
4. Set up Firebase:
   - Create a Firebase project at [firebase.google.com](https://console.firebase.google.com/)
   - Enable Authentication, Realtime Database, and Storage services
   - Copy your Firebase configuration keys
5. Create a `.env` file in the root directory and add your Firebase configuration:

```plaintext
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_AUTH_DOMAIN=your-auth-domain
REACT_APP_PROJECT_ID=your-project-id
REACT_APP_STORAGE_BUCKET=your-storage-bucket
REACT_APP_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_APP_ID=your-app-id
```

6.Start the development server: npm start

## Usage

- Register or login with your email and password.
- Customize your profile with an avatar and display name.
- Start chatting with other users in real-time.
- Share files by clicking on the file upload button within the chat interface.
