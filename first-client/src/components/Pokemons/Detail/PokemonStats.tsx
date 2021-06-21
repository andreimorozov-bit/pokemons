import Grid from '@material-ui/core/Grid';
import { PokemonDetail } from './types';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
  tableContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  tableCell: {
    padding: '0.5rem 1rem',
    fontWeight: 500,
    fontSize: '1rem',
    textAlign: 'right',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  },
  tableHead: {
    display: 'table-cell',
    padding: '0.5rem 1rem',
    color: '#777',
    fontWeight: 500,
    textAlign: 'right',
    fontSize: '1rem',
    borderBottom: '1px solid rgba(224, 224, 224, 1)',
  },
});

interface PokemonStatsProps {
  data: PokemonDetail;
}

export const PokemonStats: React.FC<PokemonStatsProps> = ({ data }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant='h5'>Stats</Typography>
      <TableContainer className={classes.tableContainer}>
        <TableBody>
          {data.stats.map((item) => {
            return (
              <TableRow>
                <TableHead component='th' className={classes.tableHead}>
                  {item.stat.name}
                </TableHead>
                <TableCell className={classes.tableCell}>
                  {item.baseStat}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableHead component='th' className={classes.tableHead}>
              weight
            </TableHead>
            <TableCell className={classes.tableCell}>{data.weight}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead component='th' className={classes.tableHead}>
              height
            </TableHead>
            <TableCell className={classes.tableCell}>{data.height}</TableCell>
          </TableRow>
        </TableBody>
      </TableContainer>
    </div>
  );
};
