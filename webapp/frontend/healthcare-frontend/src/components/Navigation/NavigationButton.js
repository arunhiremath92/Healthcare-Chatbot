import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const images = [
    {
        url: 'https://jamaicahospital.org/newsletter/wp-content/uploads/2015/04/RX-Symbol-177245590.jpg',
        title: 'Prescription Refill',
        width: '33%',
        section: "/prescription-refill",
    },
    {
        url: 'https://telehealth.hhs.gov/assets/img/hero.svg',
        title: 'Telehealth',
        width: '33%',
        section: "/telehealth",
    },
    {
        url: 'https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/alt-5ae892611bf1a-5168-68b2575aab38f2c97ce8846381d07044@1x.jpg',
        title: 'Search Providers',
        width: '33%',
        section: "/provider-search",
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
        opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
        opacity: 0,
        },
        '& .MuiTypography-root': {
        border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

export default function NavigationButton() {
    let navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
        {images.map((image) => (
            <ImageButton
            focusRipple
            onClick={() => { navigate(image.section) }}
            key={image.title}
            style={{
                width: image.width,
            }}
            >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
                <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                sx={{
                    position: 'relative',
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
                >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
                </Typography>
            </Image>
            </ImageButton>
        ))}
        </Box>
    );
}
