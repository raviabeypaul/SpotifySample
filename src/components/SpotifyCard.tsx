import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Item } from '../dtos/SpotifyDto';
import Player from './Player';
export type SpotifyCardProps = {
    item: Item;
    token: string;
    uri : string;
    onPlay: (item: Item) => void
}

export const SpotifyCard = (props: SpotifyCardProps) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Card onClick={()=>{props.onPlay(props.item)}}
         style={{ height: 200, display:'flex', flexDirection:'row', justifyContent:'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                        {props.item.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {props.item.artists[0].name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {new Date(props.item.duration_ms).toISOString().slice(14, 19)}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton aria-label="previous">
                        {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                        {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                    </IconButton>
                </Box>
            </Box>

            <CardMedia
                component="img"
                sx={{ width: 'auto', backgroundColor:'yellow',  }}
                image={props.item.album.images[0].url}
                alt="Live from space album cover"
            />
            
        </Card>

        
                <Player token={props.token} trackUri={props.item.uri }></Player>
            
        </Box>
    );
}
