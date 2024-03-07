import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';

type ProfileCardProps = {
  header?: string;
  content?: string;
  rankTitle?: string;
  image?: string;
  victoryMargin?: string;
};

export const ProfileCard = (props: ProfileCardProps) => {
  const { header, content, rankTitle, image, victoryMargin } = props;

  return (
    <Grid item>
      <Card sx={{ maxWidth: 200 }}>
        <CardMedia
          component='img'
          height='200'
          image={image}
          alt='green iguana'
        />
        <CardContent
          sx={{
            backgroundColor: '#090947',
            backgroundImage: 'linear-gradient(315deg, #090947 0%, #5a585a 74%)',
          }}
        >
          <Typography
            gutterBottom
            variant='h6'
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {victoryMargin}
          </Typography>
          <Divider sx={{ bgcolor: 'white', height: '2px' }} />
          <Typography
            sx={{ textAlign: 'center' }}
            variant='h6'
            component='div'
            color={'whitesmoke'}
          >
            {header}
          </Typography>
          <Typography
            sx={{ textAlign: 'center' }}
            gutterBottom
            variant='h5'
            component='div'
            color={'whitesmoke'}
          >
            {rankTitle}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

ProfileCard.defaultProps = {
  image: null,
  rankTitle: 'Unknown',
  content: null,
  victoryMargin: null,
  header: null,
};
