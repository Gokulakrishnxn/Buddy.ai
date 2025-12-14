# 3D Avatar Integration with Ready Player Me

This project uses Ready Player Me for 3D avatar rendering with Three.js.

## Setup

1. **Get Your Avatar URL:**
   - Visit https://readyplayer.me/me
   - Create or select your avatar
   - Copy the GLB model URL

2. **Update Avatar URL:**
   - Open `components/avatar-3d.tsx`
   - Replace `DEFAULT_AVATAR_URL` with your Ready Player Me avatar URL

## API Key

The Ready Player Me API key is stored in:
- `components/avatar-3d.tsx` (for reference)
- `lib/ready-player-me.ts` (for API calls)

**API Key:** `sk_live_ppiG1xZB7E_DMUZCkMvctMz3ILvsmZlycyv8`

## Features

- ✅ 3D avatar rendering with Three.js
- ✅ Auto-rotation animation
- ✅ Interactive orbit controls (disabled zoom/pan)
- ✅ Fallback to 2D avatar if 3D fails
- ✅ Smooth animations

## Customization

### Change Avatar
Update the `avatarUrl` prop in `app/page.tsx`:
```tsx
<Avatar3D avatarUrl="YOUR_READY_PLAYER_ME_AVATAR_URL" />
```

### Animation Settings
Modify animation in `components/avatar-3d.tsx`:
- `autoRotateSpeed`: Rotation speed (default: 0.5)
- `useFrame`: Custom animation logic

### Lighting
Adjust lights in the Canvas:
- `ambientLight`: Overall brightness
- `directionalLight`: Main light source
- `pointLight`: Additional lighting

## Troubleshooting

If the 3D avatar doesn't load:
1. Check browser console for errors
2. Verify the avatar URL is valid
3. Check CORS settings
4. The component will automatically fallback to 2D avatar

## Next Steps

For talking head animation:
- Integrate Rhubarb Lip Sync
- Use Oculus Lipsync SDK
- Implement facial animation based on audio

