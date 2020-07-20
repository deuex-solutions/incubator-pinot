import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'rgba(66, 133, 244, 0.1)',
      borderBottom: '1px #BDCCD9 solid',
      minHeight: '0 !important',
      '& .MuiAccordionSummary-content.Mui-expanded':{
        margin: 0
      }
    },
    heading: {
      fontWeight: 600,
      letterSpacing: '1px',
      fontSize: '1rem',
      color: '#4285f4'
    },
    details: {
      flexDirection: 'column',
      padding: '0'
    }
  }),
);

type Props = {
  headerTitle: string;
  showSearchBox: boolean;
  searchValue?: string;
  handleSearch?: Function;
  recordCount?: number
  children: any;
};

export default function SimpleAccordion({
  headerTitle,
  showSearchBox,
  searchValue,
  handleSearch,
  recordCount,
  children
}: Props) {
  const classes = useStyles();

  return (
    <Accordion
      defaultExpanded={true}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel1a-content-${headerTitle}`}
        id={`panel1a-header-${headerTitle}`}
        className={classes.root}
      >
        <Typography className={classes.heading}>{`${headerTitle.toUpperCase()} ${recordCount !== undefined ? ` - (${recordCount})` : ''}`}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.details}>
        {showSearchBox ?
          <SearchBar
            // searchOnRight={true}
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
          : null
        }
        {children}
      </AccordionDetails>
    </Accordion>
  );
}