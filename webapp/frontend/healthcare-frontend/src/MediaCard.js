import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const styles = {
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9,
    marginTop:'30'
  }
};

export default function MediaCard({title, imageSrc, description}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        src={imageSrc}
        height='150'
        objectFit='trim'
        alt="emergency medical services"
        
      />
       <CardContent>
        <Typography gutterBottom variant="h5" component="div"> {title}</Typography>
        <Typography variant="body2" color="text.secondary"> {description} </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}