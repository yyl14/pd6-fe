import useReduxStateShape from '../../../hooks/useReduxStateShape';
import useSubmitLang from '../../../lib/submitLang/useSubmitLang';
import CustomTable from '../../ui/CustomTable';
import PageTitle from '../../ui/PageTitle';

/* This is a level 4 component (page component) */
export default function SubmissionLanguageHome() {
  const { submitLangs } = useSubmitLang();
  const [submitLangById, submitLangIds] = useReduxStateShape(submitLangs);

  return (
    <>
      <PageTitle text="Submission Language" />
      <CustomTable
        hasSearch={false}
        data={submitLangIds.map((id) => {
          const item = submitLangById[id];
          const temp = { ...item };
          if (item.is_disabled === true) {
            temp.is_disabled = 'Disabled';
          } else if (item.is_disabled === false) {
            temp.is_disabled = 'Enabled';
          }
          temp.path = `submitlang/${item.id}/setting`;
          return temp;
        })}
        columns={[
          {
            id: 'name',
            label: 'Language',
            align: 'center',
            width: '150px',
          },
          {
            id: 'version',
            label: 'Version',
            align: 'center',
            width: '128px',
          },
          {
            id: 'is_disabled',
            label: 'Status',
            align: 'center',
            width: '214px',
          },
        ]}
        columnComponent={[null, null, null]}
        hasLink
        linkName="path"
      />
    </>
  );
}
