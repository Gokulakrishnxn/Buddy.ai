// Ready Player Me API utilities
export const RPM_API_KEY = 'sk_live_ppiG1xZB7E_DMUZCkMvctMz3ILvsmZlycyv8';
export const RPM_API_BASE = 'https://api.readyplayer.me/v1';

/**
 * Get avatar URL from Ready Player Me
 * @param userId - User ID or avatar ID
 * @returns Avatar GLB URL
 */
export async function getAvatarUrl(userId?: string): Promise<string> {
  // If you have a specific avatar ID, use it
  // Otherwise, use a default sample avatar
  if (userId) {
    try {
      const response = await fetch(`${RPM_API_BASE}/avatars/${userId}`, {
        headers: {
          'Authorization': `Bearer ${RPM_API_KEY}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.glbUrl || data.url;
      }
    } catch (error) {
      console.error('Error fetching avatar:', error);
    }
  }
  
  // Default sample avatar URL
  // Replace this with your own Ready Player Me avatar URL
  return 'https://models.readyplayer.me/64c6a4b2e5b0c800a80fc4bc.glb';
}

/**
 * Create a new Ready Player Me avatar
 * @param avatarData - Avatar configuration
 * @returns Avatar URL
 */
export async function createAvatar(avatarData: any): Promise<string> {
  try {
    const response = await fetch(`${RPM_API_BASE}/avatars`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RPM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(avatarData),
    });
    
    if (response.ok) {
      const data = await response.json();
      return data.glbUrl || data.url;
    }
  } catch (error) {
    console.error('Error creating avatar:', error);
  }
  
  throw new Error('Failed to create avatar');
}

