import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { AddPingPongGame } from '../components/addPingPongGame';
import { DisplayAllPongRanks } from '../components/displayAllPongRanks';
import { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AllPingPongTable } from '../components/allPingPongTable';

export const PingPong = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <AddPingPongGame />
          </Grid>
          <Grid item xs={12}>
            <DisplayAllPongRanks />
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
                    Ping Pong Result
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <AllPingPongTable />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
