# Prompt Vision Gallery

A modern, interactive gallery for discovering and sharing AI-generated art prompts. Built with React, Vite, and Firebase.

![Prompt Vision Gallery](https://images.unsplash.com/photo-1675271591211-6029fe4066d1?q=80&w=800&auto=format&fit=crop)

## Features

- **Browse Gallery**: Explore a curated collection of AI artworks and their prompts.
- **Search & Filter**: Easily find prompts by keywords or filter by AI model (Midjourney, DALL-E, etc.).
- **User Uploads**: Submit your own AI art with prompts, descriptions, and model details.
- **Admin Moderation**: Admins can review, approve, or reject user submissions via a dedicated dashboard.
- **Copy Prompts**: One-click copy functionality for prompts.
- **Email Gating**: Optional email collection for high-value prompts.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS and shadcn/ui.
- **Dark Mode**: Sleek dark-themed interface.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React
- **Backend**: Firebase (Firestore, Authentication)
- **Image Storage**: Cloudinary

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/codeXsahil/ai-prompt-gallery.git
   cd prompt-vision-gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configuration**
   The project uses Firebase for data and Cloudinary for image storage.
   - **Firebase**: Create a project at [firebase.google.com](https://firebase.google.com). Enable Firestore and Authentication (Anonymous & Email/Password).
   - **Cloudinary**: Create an account at [cloudinary.com](https://cloudinary.com).
   
   Update `src/lib/firebase.ts` with your credentials:
   ```typescript
   export const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };

   export const cloudinaryConfig = {
     cloudName: "YOUR_CLOUD_NAME",
     uploadPreset: "YOUR_UPLOAD_PRESET"
   };
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Usage

### For Users
- Visit the home page to browse artworks.
- Click "Upload Your Artwork" to submit your own creations.
- Use the search bar or filters to find specific styles or models.

### For Admins
- Navigate to `/admin` to access the dashboard.
- Login with admin credentials (setup in Firebase Auth).
- Review pending submissions in the table.
- Click the **Check** icon to approve or **X** icon to reject submissions.
- Approved submissions will automatically appear in the public gallery.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

- **Developer**: [Sahil Gupta](https://instagram.com/sahilgupta.pvtt)
- **Project Link**: [https://github.com/codeXsahil/ai-prompt-gallery](https://github.com/codeXsahil/ai-prompt-gallery)
