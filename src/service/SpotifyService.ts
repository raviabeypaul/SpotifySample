
import SpotifyWebApi from 'spotify-web-api-node';
import { TracksReponse } from '../dtos/SpotifyDto';
export class SpotifyService {
    token: string = "";
    clientId = '7022bfd96ba540a9a983ca6db55bc88e';
    clientSecret = 'd48818990e4548bd9200a81e4fced073'
    spotifyApi = new SpotifyWebApi({
        clientId: this.clientId,
        clientSecret: this.clientSecret
    });

    generateToken = async () => {
        let res = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',

            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`
        },)
        let response: any = await res.json()
        this.token = response.access_token;
        this.spotifyApi.setAccessToken(this.token)
        console.log(response)
    }

    search = async (query: string, offset: number): Promise<TracksReponse> => {
        let limit = 20;
        let res: any = await this.spotifyApi.search(query, ['track', 'album', 'show', 'playlist', 'show', 'episode'])
        return res.body
    }


    getTrack = async () => {
    }

    generateRandomString =  (length : number)=> {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
        for (var i = 0; i < length; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      };
}