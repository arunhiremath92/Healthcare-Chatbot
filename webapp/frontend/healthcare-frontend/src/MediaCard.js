import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        src="https://upload.wikimedia.org/wikipedia/commons/5/5b/Star_of_life2.svg"
        alt="emergency medical services"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Rod of Asclepius
        </Typography>
        <Typography variant="body2" color="text.secondary">
        The Rod of Asclepius is the dominant symbol for professional healthcare associations in the United States. One survey found that 62% of professional healthcare associations used the rod of Asclepius as their symbol 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}