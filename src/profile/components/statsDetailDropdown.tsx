import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { useState } from 'react';
import { PongDropdown } from './pongDropdown';
import { QuizzesDropdown } from './quizzesDropdown';
import { PongResultResponse } from '../../services/API/response/pongResultResponse';
import { QuizResultResponse } from '../../services/API/response/quizResultResponse';

type StatsDetailDropdownProps = {
  pongResults: PongResultResponse[];
  quizResults: QuizResultResponse[];
};

export const StatsDetailDropdown = (props: StatsDetailDropdownProps) => {
  const { pongResults, quizResults } = props;
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
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
            Ping Pong Stats
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PongDropdown pongResults={pongResults ?? []} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel2bh-content'
          id='panel2bh-header'
        >
          <Typography sx={{ color: 'text.secondary' }}>Quiz Stats</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <QuizzesDropdown quizResults={quizResults ?? []} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
