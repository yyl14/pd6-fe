import CustomTable from '@/components/CustomTable';
import PageTitle from '@/components/PageTitle';
import useReduxStateShape from '@/hooks/useReduxStateShape';
import useSubmitLangs from '@/lib/submitLang/useSubmitLangs';

type SubmitLangSettingDataSchema = {
  id: number;
  name: string;
  version: string;
  is_disabled: boolean;
};

type SubmitLangSettingTableDataSchema = SubmitLangSettingDataSchema & {
  isDisabled: string;
  path: string;
};

export default function SubmitLang() {
  const { submitLangs } = useSubmitLangs();
  const [submitLangById, submitLangIds] = useReduxStateShape<SubmitLangSettingDataSchema>(submitLangs);

  return (
    <>
      <PageTitle text="Submission Language" />
      <CustomTable
        hasSearch={false}
        data={submitLangIds.map((id) => {
          const item = submitLangById[id];
          const temp = { ...item } as SubmitLangSettingTableDataSchema;
          if (item.is_disabled === true) {
            temp.isDisabled = 'Disabled';
          } else if (item.is_disabled === false) {
            temp.isDisabled = 'Enabled';
          }
          temp.path = `/admin/system/submitlang/${item.id}/setting`;
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
            id: 'isDisabled',
            label: 'Status',
            align: 'center',
            width: '214px',
          },
        ]}
        hasLink
        linkName="path"
        buttons={false}
      />
    </>
  );
}
