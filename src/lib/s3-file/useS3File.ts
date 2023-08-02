import useSWRMutation from 'swr/mutation';
import toSWRMutationFetcher from '../../function/toSWRMutationFetcher';
import getFileLink from './fetchers';
import getTextFromUrl from '../../function/getTextFromUrl';

type OnErrorType = () => void | null;

const useS3File = (uuid: string) => {
    const getFileLinkSWR = useSWRMutation(`/s3-file/${uuid}/url`, 
        toSWRMutationFetcher(getFileLink));

    const downloadFile = async (fileName: string, file_uuid: string, asAttachment: boolean, onError: OnErrorType) => {
        try {
            const res = getFileLink({
                s3_file_uuid: file_uuid, 
                filename: fileName, 
                as_attachment: asAttachment
            })
            fetch((await res).data.data.url).then((t) =>
                t.blob().then((b) => {
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(b);
                    a.setAttribute('download', fileName);
                    a.click();
                }),
            )
        } catch(err) {
            if(onError){
                onError();
            }
        }
    }

    const getFileContent = async (fileName: string, file_uuid: string, asAttachment: boolean) => {
        try {
            const res = getFileLink({
                s3_file_uuid: file_uuid, 
                filename: fileName, 
                as_attachment: asAttachment
            })
            const { data } = (await res).data;
            const code = await getTextFromUrl(data.url);
            return code;
        } catch(err) {
            return null;
        }
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