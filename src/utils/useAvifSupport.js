import { useEffect, useState } from 'react';

export default function useAvifSupport() {
  const [avifSupported, setAvifSupported] = useState(true); // default to true for modern browsers

  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Safari lies about AVIF support – force disable it
    if (isSafari || isIOS) {
      setAvifSupported(false);
      return;
    }

    // Real AVIF support check
    const img = new Image();
    img.src =
      'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAG1pZjFhdmlmAAACAG1ldGEAAACUaWxpc3QAAABodGlwMAAAAANhdmlmAAACAG1pZjFhdmlmAAACAG1ldGEAAACUaWxpc3QAAA==';

    img.onload = () => setAvifSupported(true);
    img.onerror = () => setAvifSupported(false);
  }, []);

  return avifSupported;
}