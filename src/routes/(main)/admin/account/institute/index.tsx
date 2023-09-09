import { Suspense, lazy } from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import GeneralLoading from '@/components/GeneralLoading';
import withConditionalRender from '@/components/hoc/withConditionalRender';
import useInstitute from '@/lib/institute/useInstitute';
import useInstitutes from '@/lib/institute/useInstitutes';

const InstituteList = lazy(() => import(/* webpackChunkName: "InstituteList" */ '@/pages/InstituteList'));
const InstituteSetting = lazy(() => import(/* webpackChunkName: "InstituteSetting" */ '@/pages/InstituteSetting'));

function InstituteListRoute() {
  const { isLoading: instituteIsLoading, error: instituteError } = useInstitutes();

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(InstituteList)({
        isLoading: instituteIsLoading.browseAll,
        noMatch: instituteError.browseAll,
      })}
    </Suspense>
  );
}

function InstituteSettingRoute() {
  const { instituteId } = useParams<{
    instituteId: string;
  }>();

  const { isLoading: instituteIsLoading, error: instituteError } = useInstitute(Number(instituteId));

  return (
    <Suspense fallback={<GeneralLoading />}>
      {withConditionalRender(InstituteSetting)({
        instituteId,
        isLoading: instituteIsLoading.read,
        noMatch: !instituteId || instituteError.read,
      })}
    </Suspense>
  );
}

export default function InstituteRoutes() {
  return (
    <Switch>
      <Route exact path="/admin/account/institute/:instituteId/setting" component={InstituteSettingRoute} />
      <Route exact path="/admin/account/institute" component={InstituteListRoute} />
    </Switch>
  );
}
