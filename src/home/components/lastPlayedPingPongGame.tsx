import { CircularProgress, Grid, Typography } from '@mui/material';
import { useFetchPongResult } from '../../pingPong/queries/useQueries/useFetchPongResult';
import { useEffect, useState } from 'react';
import { PongResultResponse } from '../../services/API/response/pongResultResponse';
import dayjs from 'dayjs';
import { DisplayLatestMatch } from './displayLatestMatch';
import { EmployeeResponse } from '../../services/API/response/employeeResponse';
import { useFetchUser } from '../../pingPong/queries/useQueries/useFetchUser';

export type PlayerData = {
  points: number;
  username: string;
  imageUrl: string;
  personID: number;
};

export const LastPlayedPingPongGame = () => {
  const [latestMatch, setLatestMatch] = useState<PongResultResponse>();

  const [winner, setWinner] = useState<PlayerData>();
  const [defeated, setDefeated] = useState<PlayerData>();

  const pongResult = useFetchPongResult();

  const fetchPlayers = useFetchUser();

  useEffect(() => {
    if (fetchPlayers.data && latestMatch) {
      fetchPlayers.data.forEach((item: EmployeeResponse) => {
        if (latestMatch?.username === item.username) {
          if (latestMatch.myPoints > latestMatch.opponentPoints) {
            const setPlayer: PlayerData = {
              personID: item.personID,
              points: latestMatch.myPoints,
              username: item.username,
              imageUrl: item.imageURL || '',
            };
            setWinner(setPlayer);
          } else {
            const setPlayer: PlayerData = {
              personID: item.personID,
              points: latestMatch.myPoints,
              username: item.username,
              imageUrl: item.imageURL || '',
            };
            setDefeated(setPlayer);
          }
        } else if (latestMatch?.opponentUsername === item.username) {
          if (latestMatch.opponentPoints > latestMatch.myPoints) {
            const setPlayer: PlayerData = {
              personID: item.personID,
              points: latestMatch.opponentPoints,
              username: item.username,
              imageUrl: item.imageURL || '',
            };
            setWinner(setPlayer);
          } else {
            const setPlayer: PlayerData = {
              personID: item.personID,
              points: latestMatch.opponentPoints,
              username: item.username,
              imageUrl: item.imageURL || '',
            };
            setDefeated(setPlayer);
          }
        }
      });
    }
  }, [fetchPlayers.data, latestMatch]);

  useEffect(() => {
    if (pongResult.data && pongResult.data.length > 0) {
      const sortedData = [...pongResult.data].sort(
        (a: PongResultResponse, b: PongResultResponse) =>
          dayjs(b.matchDate).valueOf() - dayjs(a.matchDate).valueOf()
      );
      setLatestMatch(sortedData[0]);
    }
  }, [pongResult.data]);

  return (
    <Grid container>
      <Grid item xs={12} display={'flex'} justifyContent={'center'}>
        {pongResult.isLoading && !latestMatch && !winner && !defeated && (
          <CircularProgress sx={{ position: 'absolute' }} />
        )}
        {pongResult.data &&
        pongResult.data.length > 0 &&
        fetchPlayers.data &&
        fetchPlayers.data.length > 0 &&
        latestMatch &&
        winner &&
        defeated ? (
          <>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  gutterBottom
                  variant='h4'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingBottom: '10px',
                    color: 'grey',
                    fontWeight: 'bold',
                  }}
                >
                  Last Played Game
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <DisplayLatestMatch
                  winner={winner}
                  defeated={defeated}
                  matchDate={latestMatch?.matchDate || ''}
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <Typography
            gutterBottom
            variant='h4'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '10px',
              color: 'grey',
              fontWeight: 'bold',
            }}
          >
            No data to display
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};
