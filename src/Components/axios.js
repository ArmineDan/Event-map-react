import axios from  'axios';

const MY_TOKEN='HFFUQDV3VRQZ75KZ555R';
const AuthStr = 'Bearer '.concat(MY_TOKEN);
const URL ="https://www.eventbriteapi.com/v3/events/search/?expand=organizer,venue&token=HFFUQDV3VRQZ75KZ555R";

export function getEventsCoordinates(lacation){
    return new Promise ((resolve, reject)=>{
        axios.get(URL, { headers: { "Authorization": AuthStr, "Content-Type": "application/json" } }).then(response => {
          const res=[];
          //console.log(response.data.events)
            for(let el of response.data.events){
              // console.log(el.description.text)
                if(el.venue.address.city === lacation){
                    const decr= el.description.text;
                    const obj={...el.venue, decr};
                    res.push(obj)
                }}
            resolve(res)
        }).catch((error) => {
                reject(error)
            });

    })
}
