import React from 'react';
import { usePagination, DOTS } from '../../hooks/usePagination';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

interface PaginationProps {
  onPageChange(page: number | string): void;
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      margin: '1.5rem auto',
    },
    button: {
      margin: '0 0',
      padding: '0 0',
      minWidth: '2.5rem',
      minHeight: '2.5rem',
      borderRadius: '50%',
    },
    currentButton: {
      margin: '0 0',
      padding: '0 0',
      minWidth: '2.5rem',
      minHeight: '2.5rem',
      borderRadius: '50%',

      backgroundColor: '#eee',
      pointerEvents: 'none',
    },

    icon: {
      color: '#777',
      fontSize: '2rem',
    },
  })
);

export const Pagination: React.FC<PaginationProps> = (props) => {
  const classes = useStyles();

  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className={classes.root}>
      {currentPage !== 1 && (
        <Button className={classes.button} onClick={onPrevious}>
          <ChevronLeft className={classes.icon} />
        </Button>
      )}
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <Button className={classes.button}>&#8230;</Button>;
        }

        if (pageNumber === currentPage) {
          return (
            <Button className={classes.currentButton}>{pageNumber}</Button>
          );
        }
        return (
          <Button
            className={classes.button}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        );
      })}

      {currentPage !== lastPage && (
        <Button className={classes.button} onClick={onNext}>
          <ChevronRight className={classes.icon} />
        </Button>
      )}
    </div>
  );
};
