import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useSubmitLangs from '@/lib/submitLang/useSubmitLangs';

const SubmitLangSetting = lazy(() => import(/* webpackChunkName: "SubmitLangSetting" */ '@/pages/SubmitLangSetting'));

export default function SubmitLangSettingRoute() {
  const { submitlangId } = useParams<{
    submitlangId: string;
  }>();
  const { isLoading } = useSubmitLangs();
  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(SubmitLangSetting)({
        submitLangId: submitlangId,
        isLoading: isLoading.browseAll,
      })}
    </Suspense>
  );
}
