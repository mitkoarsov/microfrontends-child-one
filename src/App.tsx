import {
  useEffect,
  useSyncExternalStore,
  useState,
  type ReactElement,
  type FC,
} from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  getAppsState,
  subscribeGlobal,
  updateAppName,
  updateAppBgColor,
} from "shell/global";

import type { AppsState } from "shell/global";
import { localStore, increment, type LocalState } from "./local-store";

const GlobalPanel: FC = (): ReactElement => {
  const apps: AppsState = useSyncExternalStore<AppsState>(
    subscribeGlobal,
    getAppsState,
    getAppsState
  );

  const [name, setName] = useState<string>(apps.app1.name);
  const [bg, setBg] = useState<string>(apps.app1.bgColor);

  useEffect((): void => {
    setName(apps.app1.name);
    setBg(apps.app1.bgColor);
  }, [apps]);

  return (
    <Paper sx={{ p: 2, bgcolor: apps.app1.bgColor }}>
      <Typography variant="h6" gutterBottom>
        App1 – Global Controls
      </Typography>
      <Stack direction="row" spacing={2}>
        <TextField
          size="small"
          label="App1 Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          size="small"
          label="Background"
          value={bg}
          onChange={(e) => setBg(e.target.value)}
        />
        <Button variant="contained" onClick={() => updateAppName("app2", name)}>
          Save Name
        </Button>
        <Button variant="outlined" onClick={() => updateAppBgColor("app2", bg)}>
          Save BG
        </Button>
      </Stack>
    </Paper>
  );
};

const LocalPanel: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const clicks = useSelector((s: LocalState) => s.app1Local.clicks);
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        App1 – Local State
      </Typography>
      <Typography>Clicks: {clicks}</Typography>
      <Button
        sx={{ mt: 1 }}
        variant="contained"
        onClick={() => dispatch(increment())}
      >
        Increment (local only)
      </Button>
    </Paper>
  );
};

export default function App1(): ReactElement {
  return (
    <Provider store={localStore}>
      <Box sx={{ display: "grid", gap: 2 }}>
        <Typography variant="h5">App1</Typography>
        <GlobalPanel />
        <LocalPanel />
      </Box>
    </Provider>
  );
}
