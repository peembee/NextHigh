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
  points?: string;
  rankTitle?: string;
  image?: string;
  alt?: string;
  imageTitle?: string;
  username?: string;
  colorPoints?: string;
};

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    header,
    points,
    rankTitle,
    image,
    imageTitle,
    alt,
    username,
    colorPoints,
  } = props;

  return (
    <Grid item>
      <Card
        sx={{
          Width: 200,
          transition: 'transform 0.3s',
          '&:hover': { transform: 'scale(1.1)' },
        }}
      >
        <CardMedia
          component='img'
          height='auto'
          image={image}
          alt={alt}
          sx={{ maxHeight: 250 }}
        />
        <CardContent
          sx={{
            backgroundColor: '#090947',
            backgroundImage: 'linear-gradient(315deg, #090947 0%, #5a585a 74%)',
          }}
        >
          {username && (
            <Typography
              pt={1}
              sx={{
                textAlign: 'center',
                marginBottom: '1rem',
                backgroundColor: 'rgba(255, 255, 260, 0.05)',
                padding: '0.5rem',
                borderRadius: '0.5rem',
              }}
              variant='h5'
              component='div'
              color={'whitesmoke'}
            >
              {username}
            </Typography>
          )}
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
            {imageTitle}
          </Typography>
          <Divider sx={{ bgcolor: 'white', height: '2px' }} />
          <Typography
            pt={1}
            sx={{ textAlign: 'center' }}
            variant='h6'
            component='div'
            color={'whitesmoke'}
          >
            {header}
          </Typography>

          <Typography
            pb={1}
            sx={{ textAlign: 'center' }}
            variant='h5'
            component='div'
            color={'whitesmoke'}
          >
            {rankTitle}
          </Typography>
          <Divider sx={{ bgcolor: 'white', height: '2px' }} />
          <Typography
            variant='h6'
            pt={1}
            sx={{
              color: colorPoints ? colorPoints : 'rgba(255, 255, 255, 0.6)',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {points}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

ProfileCard.defaultProps = {
  image: null,
  rankTitle: 'Unknown',
  points: null,
  imageTitle: null,
  header: null,
  alt: null,
  username: null,
  colorPoints: null,
};
