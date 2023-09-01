import { useState } from 'react';

const useUploadFailedPopup = () => {
  const [uploadFailedFilenames, setUploadFailedFilenames] = useState<string[]>([]);
  const [showUploadFailPopup, setShowUploadFailPopup] = useState(false);

  const addUploadFailedFilename = (filename: string) => setUploadFailedFilenames((state) => [...state, filename]);

  return {
    showUploadFailPopup,
    setShowUploadFailPopup,
    uploadFailedFilenames,
    addUploadFailedFilename,
  };
};

export default useUploadFailedPopup;
