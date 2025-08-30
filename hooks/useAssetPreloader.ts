
import { useState, useEffect } from 'react';

const useAssetPreloader = (assetUrls: string[], minDisplayTime: number = 1500): boolean => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const preloadAssets = async () => {
      const assetPromises = assetUrls.map(url => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = url;
          // Resolve regardless of whether it loads or fails, so one broken image doesn't block the app
          img.onload = () => resolve();
          img.onerror = () => {
              console.warn(`Failed to preload image: ${url}`);
              resolve(); 
          };
        });
      });
      
      const minTimePromise = new Promise(resolve => setTimeout(resolve, minDisplayTime));

      try {
        await Promise.all([...assetPromises, minTimePromise]);
      } catch (error) {
        console.error("Asset preloading error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (assetUrls.length > 0) {
      preloadAssets();
    } else {
      setTimeout(() => setIsLoading(false), minDisplayTime);
    }
  }, [assetUrls, minDisplayTime]);

  return isLoading;
};

export default useAssetPreloader;
