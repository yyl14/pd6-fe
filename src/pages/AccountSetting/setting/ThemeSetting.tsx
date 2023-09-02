import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import { useState } from 'react';

import SimpleBar from '@/components/SimpleBar';
import useThemeStore from '@/stores/themeStore';
import { ThemeType } from '@/theme';

const activeThemeList = [
  {
    label: 'PDOGS 6',
    value: 'pd6New',
  },
  {
    label: 'PDOGS 6 Classic',
    value: 'pd6',
  },
  {
    label: 'DOGE',
    value: 'doge',
  },
  {
    label: 'IM Night 2021',
    value: 'IMNight2021',
  },
  {
    label: 'IM Camp 2021',
    value: 'IMCamp2021',
  },
];

export default function ThemeSetting() {
  const { theme, setTheme } = useThemeStore();

  const [showThemeSelector, setShowThemeSelector] = useState(false);

  return (
    <>
      <SimpleBar title="PDOGS Theme" buttons={<Button onClick={() => setShowThemeSelector(true)}>Change</Button>} />
      <Dialog open={showThemeSelector} onClose={() => setShowThemeSelector(false)}>
        <DialogTitle>
          <Typography variant="h4">Wow, super secret option! 🐕</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="caption">Changes of themes will only apply to the current browser.</Typography>
          <FormControl variant="outlined">
            <Select value={theme ?? 'pd6New'} onChange={(e) => setTheme(e.target.value as ThemeType)}>
              {activeThemeList.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
}
