import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

type ProfileCardProps = {
  header: string;
  content: string;
};

export const ProfileCard = (props: ProfileCardProps) => {
  const { header, content } = props;

  return (
    <Grid item>
      <Card sx={{ maxWidth: 200 }}>
        <CardMedia
          component='img'
          height='100'
          image='/static/images/cards/contemplative-reptile.jpg'
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h6' component='div'>
            {header}
          </Typography>
          {content}
        </CardContent>
      </Card>
    </Grid>
  );
};
