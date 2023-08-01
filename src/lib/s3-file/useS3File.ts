import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import getFileLink from './fetchers';
import getTextFromUrl from '../../function/getTextFromUrl';

const useS3File = (uuid: string) => {
    const getFileLinkSWR = useSWRMutation(`/s3-file/${uuid}/url`, 
        toSWRMutationFetcher(getFileLink));

    const downloadFile = async (fileName: string, file_uuid: string, asAttachment: boolean) => {
        const res = getFileLink({
            s3_file_uuid: file_uuid, 
            filename: fileName, 
            as_attachment: asAttachment
        })
        if((await res).ok) {
            fetch((await res).data.data.url).then((t) =>
            t.blob().then((b) => {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(b);
                a.setAttribute('download', fileName);
                a.click();
            }),
        )}
    }

    const getFileContent = async (fileName: string, file_uuid: string, asAttachment: boolean) => {
        const res = getFileLink({
            s3_file_uuid: file_uuid, 
            filename: fileName, 
            as_attachment: asAttachment
        })
        const { data } = (await res).data;
        const code = await getTextFromUrl(data.url);
        return code;
    }
  
    return {
        downloadFile,
        getFileContent,
  
        isLoading: {
            getFileLink: getFileLinkSWR.isMutating,
        },
  
        error: {
            getFileLink: getFileLinkSWR.error,
        },
    };
};
  
export default useS3File;