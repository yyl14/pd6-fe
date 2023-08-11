import { Suspense, lazy } from 'react';

const FileDownload = lazy(() => import(/* webpackChunkName: "FileDownload" */ '@/pages/FileDownloading'));

export default function FileDownloading() {
  return (
    <Suspense fallback={<></>}>
      <FileDownload />
    </Suspense>
  );
}
