import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NavButtons from './NavButtons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

export default function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid item sm={12}>
        <Paper className={classes.paper}>
          <NavButtons />
        </Paper>
      </Grid>
    </div>
  );
}
