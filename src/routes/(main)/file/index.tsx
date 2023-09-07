import { Suspense, lazy, useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import useQuery from '@/hooks/useQuery';

const FileDownload = lazy(() => import(/* webpackChunkName: "FileDownload" */ '@/pages/FileDownloading'));

export default function FileDownloading() {
  const history = useHistory();
  const [query] = useQuery();
  const filename = useMemo<string>(() => query.get('filename') as string, [query]);
  const uuid = useMemo<string>(() => query.get('uuid') as string, [query]);

  if (filename === null || uuid === null) {
    history.push('/');
  }

  return (
    <Suspense fallback={<></>}>
      <FileDownload filename={filename} uuid={uuid} />
    </Suspense>
  );
}
