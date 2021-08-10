import axios from 'axios';
import url from 'url';
import { Story } from '../types';
import Utils from '../Utils';

const search = (searchword: string): Promise<Story[]> =>{

    return new Promise((resolve, reject) =>{
         //Site uses form url encoded format, where searchword = keyword 
        const params = new url.URLSearchParams({'searchword': searchword});

        axios.post('https://mkklcdnv6temp.com/getstorysearchjson', params.toString()).then(res =>{
            let stories: Story[];
            stories = res.data;
            
            if(stories.length === 0) reject("No results found");

            stories = stories.map(el => {
                //Remove link formatting and retrieve id based on url
                return {
                    ...el,
                    id: Utils.getStoryID(el.url_story),
                    name: el.name.split('<span style="color: #FF530D;font-weight: bold;">').join('').split('</span>').join(''),
                    author: el.author.split('<span style="color: #FF530D;font-weight: bold;">').join('').split('</span>').join(''),
                }
            });

            resolve(stories);
        }).catch(err => {
            reject(err);
        });
    });
   

    //Data returns array of search items
    //Response ex: 
    /*
        [
            {
                id: '35715',
                url_story: 'https://mkklcdnv6temp.com/read-ou392961',
                name: 'Someday Will I Be the Grea<span style="color: #FF530D;font-weight: bold;">test</span> Alchemist?',
                nameunsigned: 'wy924603',
                lastchapter: 'Chapter 4',
                image: 'https://avt.mkklcdnv6temp.com/32/q/22-1603780885.jpg',
                author: 'Maru KOGITSUNE,Taro SASAKAMA'
            }
        ]
  */
}

export default search;