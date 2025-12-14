# Buddy - AI Assistant with 3D Avatar

Buddy is a modern AI chat assistant built with Next.js, featuring an interactive 3D avatar powered by Ready Player Me and Three.js. Experience conversations with a personalized 3D avatar that brings your AI assistant to life.

![Buddy AI Assistant](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🤖 **AI Chat Interface** - Clean, modern chat interface for conversations with your AI assistant
- 🎭 **3D Avatar Integration** - Interactive 3D avatars powered by Ready Player Me
- 🎨 **Avatar Customization** - Create and customize your avatar directly in the app
- 🎬 **Smooth Animations** - Auto-rotating 3D avatar with gentle animations
- 🎯 **Interactive Controls** - Orbit controls for viewing your avatar from different angles
- 📱 **Responsive Design** - Beautiful UI that works on desktop and mobile devices
- 🌙 **Dark Mode** - Built-in dark theme for comfortable viewing
- ⚡ **Modern Stack** - Built with Next.js 16, React 19, and TypeScript

## 🚀 Tech Stack

### Core Framework
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Geist Font** - Modern typography

### 3D Graphics
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Ready Player Me** - Avatar creation and management

### Additional Libraries
- **date-fns** - Date utility functions
- **class-variance-authority** - Component variant management
- **clsx** - Conditional class names

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 18+ 
- **npm**, **yarn**, **pnpm**, or **bun**

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/buddy.git
cd buddy
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Ready Player Me (Optional)

If you want to use Ready Player Me for avatar creation:

1. Sign up at [Ready Player Me](https://readyplayer.me/)
2. Get your API key from the dashboard
3. Update the API key in `lib/ready-player-me.ts`:
   ```typescript
   export const RPM_API_KEY = 'your-api-key-here';
   ```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
buddy/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page component
├── components/
│   ├── avatar-3d.tsx        # 3D avatar component
│   ├── chat-area.tsx        # Chat message display
│   ├── chat-input.tsx       # Message input component
│   ├── ready-player-me-avatar.tsx  # Avatar creator
│   └── ui/                  # Reusable UI components
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── dialog.tsx
│       └── ...
├── lib/
│   ├── ready-player-me.ts   # Ready Player Me API utilities
│   └── utils.ts             # Utility functions
├── public/                  # Static assets
└── package.json
```

## 🎮 Usage

### Creating an Avatar

1. Click the **Profile** button (top right of the avatar section)
2. Select **"Edit Avatar"** or **"Upload Photo"** from the dropdown
3. Use the Ready Player Me avatar creator to customize your avatar
4. Once created, your avatar will appear in the 3D viewer

### Chatting with Buddy

1. Type your message in the input field at the bottom
2. Press Enter or click Send
3. Buddy will respond with helpful information

### Avatar Controls

- **Auto-rotation**: The avatar automatically rotates for a dynamic view
- **Mouse Interaction**: Click and drag to rotate the avatar manually
- **Zoom**: Zoom controls are disabled for a consistent view

## 🎨 Customization

### Changing Avatar URL

Update the avatar URL in `app/page.tsx`:

```tsx
const [avatarUrl, setAvatarUrl] = useState<string>('your-avatar-url-here');
```

### Modifying Avatar Animation

Edit `components/avatar-3d.tsx` to customize animations:

```tsx
// Change rotation speed
autoRotateSpeed={0.5}  // Adjust this value

// Modify animation in useFrame
useFrame((state) => {
  if (meshRef.current) {
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
  }
});
```

### Styling

The project uses Tailwind CSS. Modify styles in:
- `app/globals.css` - Global styles
- Component files - Inline Tailwind classes

## 🚢 Deployment

### Deploy to Vercel

The easiest way to deploy Buddy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure the build
4. Deploy!

### Other Platforms

Buddy can be deployed to any platform that supports Next.js:
- **Netlify** - Automatic Next.js detection
- **AWS Amplify** - Full Next.js support
- **Railway** - Simple deployment
- **Docker** - Containerized deployment

## 🐛 Troubleshooting

### Avatar Not Loading

1. Check browser console for errors
2. Verify the avatar URL is valid and accessible
3. Check CORS settings if loading from external source
4. The component will automatically show a fallback state

### Build Errors

1. Ensure all dependencies are installed: `npm install`
2. Clear `.next` folder and rebuild: `rm -rf .next && npm run build`
3. Check Node.js version (requires 18+)

### Ready Player Me Issues

1. Verify your API key is correct
2. Check Ready Player Me service status
3. Ensure your subdomain is correctly configured

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Ready Player Me](https://readyplayer.me/) - Avatar platform
- [Three.js](https://threejs.org/) - 3D graphics library
- [Radix UI](https://www.radix-ui.com/) - Accessible UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ using Next.js and Three.js
