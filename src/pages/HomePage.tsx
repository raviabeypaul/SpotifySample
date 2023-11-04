import React, { useEffect, useRef, useState } from 'react'
import { InfiniteGridScroller } from "../components/InfiniteGridScroller"
import { Grid, TextField, TextFieldProps } from "@mui/material";
import { SpotifyService } from '../service/SpotifyService';
import { debounce } from '../utils/Debounce';
import { SpotifyCard } from '../components/SpotifyCard';
import { Item } from '../dtos/SpotifyDto';
import Player from '../components/Player';
type Props = {

}
type State = {
    tracks: any
}
export default function HomePage(props: Props, state: State) {

    const [tracks, setTracks] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item>();
    const [searchFieldValue, setSearchFieldValue] = useState('')
    const textFieldRef = useRef<TextFieldProps>(null)
    const spotifyServiceRef = useRef(new SpotifyService())
    const fetchData = async (offset: number) => {
        let response = await spotifyServiceRef.current.search(textFieldRef.current?.value as string, offset)
        setTracks([...tracks, ...response.tracks.items])
    }

    const checkIdMatch = (data: any) => {

    }


    const onItemSelected = (data: any, index: number) => {
        setSelectedItem(data)
    }



    const handleSearch = debounce((value: string) => {
        if (value !== searchFieldValue) {
            setSearchFieldValue(searchFieldValue)
            setTracks([])
            fetchData(0)
        }
    }, 1000)

    const onItemPlayed = (item: Item) => {
        setSelectedItem(item);

    }

    useEffect(()=>{
        spotifyServiceRef.current.generateToken()
    },[])

    let cardCount = 4;
    return (
        <div>
            {
                spotifyServiceRef.current?.token && selectedItem? <Player token={spotifyServiceRef.current?.token} trackUri={selectedItem.uri}></Player> : null
            }
            
            <TextField inputRef={textFieldRef} id="filled-basic" label="Enter your search here..." variant="outlined" onChange={e => handleSearch(e.target.value)} />
            <InfiniteGridScroller
                cardCount={cardCount}
                hasMore={false}
                list={tracks}
                fetchMoreData={() => { fetchData(tracks.length) }}
                key={"PlanList"}
                loader={<h4>loading..</h4>}
                element={(data, _index) => {
                    let selected = checkIdMatch(data)
                    return (
                        <Grid item xs={3} style={{ height: 300 }}>
                            <SpotifyCard
                                item={data}
                                onPlay={onItemPlayed}
                                token={spotifyServiceRef.current?.token}
                                uri={selectedItem? selectedItem.uri : ""}

                            />
                        </Grid>
                    );
                }}
            ></InfiniteGridScroller>
            
        </div>
    )
}
