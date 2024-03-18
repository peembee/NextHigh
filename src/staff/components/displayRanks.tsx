import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useFetchUser } from '../../pingPong/queries/useQueries/useFetchUser';
import { UserDataFetcher } from './userDataFetcher';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { useEffect, useState } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export const DisplayRanks = () => {
  const [cards, setCards] = useState<EmployeeResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState<
    'right' | 'left' | undefined
  >('left');
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const cardsPerPage = 3;

  const fetchAllUsers = useFetchUser();

  const handleNextPage = () => {
    setSlideDirection('left');
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setSlideDirection('right');
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    if (fetchAllUsers.data && fetchAllUsers.data.length > 0) {
      setCards(fetchAllUsers.data);
    }
  }, [fetchAllUsers.data]);

  return (
    <>
      <Box sx={{ overflowX: 'auto' }}>
        <Typography
          gutterBottom
          variant='h4'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '10px',
            color: 'rgb(13, 12, 72)',
            fontWeight: 'bold',
          }}
        >
          Top Ranker
        </Typography>
        <Grid
          container
          spacing={5}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {fetchAllUsers.data && fetchAllUsers.data.length > 0 ? (
            fetchAllUsers.data
              .sort((a, b) => b.empPoints - a.empPoints) // Sortera i fallande ordning baserat på empPoints
              .slice(0, 3) // Hämta de tre första elementen
              .map((user: EmployeeResponse, index) => (
                <Grid item key={user.personID}>
                  <UserDataFetcher user={user} highScorePlace={index + 1} />
                </Grid>
              ))
          ) : (
            <CircularProgress size={24} />
          )}
        </Grid>

        <Typography
          gutterBottom
          variant='h4'
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '80px',
            paddingBottom: '10px',
            color: 'rgb(13, 12, 72)',
            fontWeight: 'bold',
          }}
        >
          All Ranks
        </Typography>

        {/* md och uppåt skärmar */}
        {isMdUp && (
          <>
            {fetchAllUsers.data && fetchAllUsers.data.length > 0 ? (
              <Grid
                container
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
                pt={11}
                pb={20}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    height: '400px',
                  }}
                >
                  <IconButton
                    disabled={currentPage === 0}
                    onClick={handlePrevPage}
                    sx={{ margin: 5 }}
                  >
                    <NavigateBeforeIcon />
                  </IconButton>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {fetchAllUsers.data
                      .sort((a, b) => b.empPoints - a.empPoints)
                      .map((card: EmployeeResponse, index) => (
                        <Box
                          key={card.personID}
                          sx={{
                            display: currentPage === index ? 'block' : 'none',
                          }}
                        >
                          <Slide
                            direction={slideDirection}
                            in={currentPage === index}
                          >
                            <Stack
                              spacing={2}
                              direction={'row'}
                              alignContent={'center'}
                              justifyContent={'center'}
                            >
                              {cards
                                .slice(
                                  currentPage * cardsPerPage,
                                  currentPage * cardsPerPage + cardsPerPage
                                )
                                .map((card: EmployeeResponse) => (
                                  <UserDataFetcher
                                    key={card.personID}
                                    user={card}
                                  />
                                ))}
                            </Stack>
                          </Slide>
                        </Box>
                      ))}
                  </Box>
                  <IconButton
                    sx={{ margin: 5 }}
                    disabled={
                      currentPage >=
                      Math.ceil((cards.length || 0) / cardsPerPage) - 1
                    }
                    onClick={handleNextPage}
                  >
                    <NavigateNextIcon />
                  </IconButton>
                </Box>
              </Grid>
            ) : (
              <CircularProgress size={24} />
            )}
          </>
        )}

        {/* xs skärmar: */}
        {!isMdUp && (
          <>
            <Grid
              container
              spacing={5}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                paddingBottom: { xs: '60px' },
              }}
            >
              {fetchAllUsers.data && fetchAllUsers.data.length > 0 ? (
                fetchAllUsers.data
                  .sort((a, b) => b.empPoints - a.empPoints)
                  .map((user: EmployeeResponse) => (
                    <Grid item key={user.personID}>
                      <UserDataFetcher user={user} />
                    </Grid>
                  ))
              ) : (
                <CircularProgress size={24} />
              )}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};
