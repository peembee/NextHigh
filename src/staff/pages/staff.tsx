import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { AppContext } from '../../contexts/appContext';
import { DisplayRanks } from '../components/displayRanks';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Quizzes } from '../components/quizzes';
import { AllQuizzesTable } from '../components/allQuizzesTable';

export const Staff = () => {
  const { user } = useContext(AppContext);
  const [expanded, setExpanded] = useState<string | false>(false);
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      {user && (
        <Box>
          <Grid container>
            <Grid item xs={12}>
              <Grid
                item
                xs={12}
                pb={10}
                display={'flex'}
                justifyContent={'center'}
                minHeight={'30rem'}
                maxHeight={'30rem'}
              >
                <Quizzes userId={user.personID} />
              </Grid>
              <Grid item xs={12}>
                <DisplayRanks />
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Accordion
                    expanded={expanded === 'panel1'}
                    onChange={handleChange('panel1')}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel1bh-content'
                      id='panel1bh-header'
                    >
                      <Typography sx={{ color: 'text.secondary' }}>
                        Quiz Result
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <AllQuizzesTable />
                    </AccordionDetails>
                  </Accordion>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
