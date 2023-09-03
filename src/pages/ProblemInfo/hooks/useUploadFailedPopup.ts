import { useState } from 'react';

export interface UploadFailureType {
  filename: string;
  reason: string;
}

const useUploadFailedPopup = () => {
  const [uploadFailures, setUploadFailures] = useState<UploadFailureType[]>([]);
  const [showUploadFailPopup, setShowUploadFailPopup] = useState(false);

  return {
    showUploadFailPopup,
    setShowUploadFailPopup,
    uploadFailures,
    setUploadFailures,
  };
};

export default useUploadFailedPopup;
