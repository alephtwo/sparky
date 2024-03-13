import { LinearProgress, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useReducer } from "react";
import { reducer, initialState } from "./State";
import { State, UserEnteredNumber } from "./Types";
import { Box } from "@mui/system";
import AnnouncementRounded from "@mui/icons-material/AnnouncementRounded";
import { SparkyTheme } from "../sparky/SparkyTheme";
import { useTranslation } from "react-i18next";

const moneyFormatter = Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" });

interface ViewProps {
  theme: SparkyTheme;
}

export function View(props: ViewProps) {
  const { t } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { theme } = props;

  const callbacks = {
    setCrystals: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        action: "set-crystals",
        value: e.target.value,
      }),
    setTickets: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        action: "set-tickets",
        value: e.target.value,
      }),
    setTenPartTickets: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        action: "set-ten-part-tickets",
        value: e.target.value,
      }),
    setSparks: (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({
        action: "set-sparks",
        value: e.target.value,
      }),
  };

  const sparks = calculate(state);
  const percent = Math.round(sparks / 3);
  const neededToSpark = Math.max(300 - sparks, 0);
  const tenRollsToSpark = Math.ceil(neededToSpark / 10);

  return (
    <Stack spacing={1}>
      <Paper sx={styles.paper}>
        <Stack spacing={1} alignItems="center">
          <Stack spacing={1} alignItems="center" direction="row" sx={styles.fullWidth}>
            <img src={theme.crystalsIcon} style={styles.contextImage} />
            <TextField
              type="tel" // use "tel" to force mobile phones to use numpad, but not have the wonky html5 number api
              variant="outlined"
              fullWidth
              value={state.crystals}
              onChange={callbacks.setCrystals}
              label={t("crystals")}
            />
          </Stack>
          <Stack spacing={1} alignItems="center" direction="row" sx={styles.fullWidth}>
            <img src={theme.ticketsIcon} style={styles.contextImage} />
            <TextField
              type="tel" // use "tel" to force mobile phones to use numpad, but not have the wonky html5 number api
              variant="outlined"
              fullWidth
              value={state.tickets}
              onChange={callbacks.setTickets}
              label={t("tickets")}
            />
          </Stack>
          <Stack spacing={1} alignItems="center" direction="row" sx={styles.fullWidth}>
            <img src={theme.tenPartTicketsIcon} style={styles.contextImage} />
            <TextField
              type="tel" // use "tel" to force mobile phones to use numpad, but not have the wonky html5 number api
              variant="outlined"
              fullWidth
              value={state.tenPartTickets}
              onChange={callbacks.setTenPartTickets}
              label={t("tenPartTickets")}
            />
          </Stack>
          <Stack spacing={1} alignItems="center" direction="row" sx={styles.fullWidth}>
            <img src={theme.sparksIcon} style={styles.contextImage} />
            <TextField
              type="tel" // use "tel" to force mobile phones to use numpad, but not have the wonky html5 number api
              variant="outlined"
              fullWidth
              value={state.sparks}
              onChange={callbacks.setSparks}
              label={t("sparks")}
            />
          </Stack>
        </Stack>
      </Paper>
      <Paper sx={styles.paper}>
        <Stack spacing={1} alignItems="center">
          <LinearProgress variant="determinate" value={Math.min(percent, 100)} sx={{ width: "100%", height: "16px" }} />
          <Typography variant="caption">
            {sparks} / 300 ({percent}%)
          </Typography>
          <Typography variant="h6">{moneyFormatter.format(tenRollsToSpark * 3150)}</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AnnouncementRounded sx={{ pr: 1 }} color="error" />
            <Link variant="caption" href="https://www.ncpgambling.org/help-treatment/national-helpline-1-800-522-4700/">
              National Problem Gambling Helpline
            </Link>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
}

function calculate(state: State): number {
  return [
    Math.floor(toNumber(state.crystals) / 300),
    toNumber(state.tickets),
    toNumber(state.tenPartTickets) * 10,
    toNumber(state.sparks),
  ].reduce((a, x) => a + x, 0);
}

function toNumber(input: UserEnteredNumber): number {
  return input || 0;
}

const styles = {
  paper: {
    padding: 1,
  },
  contextImage: {
    maxHeight: "56px",
  },
  fullWidth: {
    width: "100%",
  },
};
