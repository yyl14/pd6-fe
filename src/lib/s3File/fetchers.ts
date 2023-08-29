import getTextFromUrl from '@/function/getTextFromUrl';

import api from '../api';

export const getFileLink = api.path('/s3-file/{s3_file_uuid}/url').method('get').create();

export const downloadFile = async ({
  fileName,
  file_uuid,
  asAttachment = true,
}: {
  fileName: string;
  file_uuid: string;
  asAttachment?: boolean;
}) => {
  const { data } = await getFileLink({
    s3_file_uuid: file_uuid,
    filename: fileName,
    as_attachment: asAttachment,
  });

  const res = await fetch(data.data.url);
  const blob = await res.blob();

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.setAttribute('download', fileName);
  a.click();
};

export const getFileContent = async ({
  fileName,
  file_uuid,
  asAttachment = true,
}: {
  fileName: string;
  file_uuid: string;
  asAttachment?: boolean;
}) => {
  try {
    const { data } = await getFileLink({
      s3_file_uuid: file_uuid,
      filename: fileName,
      as_attachment: asAttachment,
    });

    const content = (await getTextFromUrl(data.data.url)) as string;
    return content;
  } catch (err) {
    return null;
  }
};
