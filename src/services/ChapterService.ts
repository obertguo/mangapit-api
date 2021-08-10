import axios from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';

class ChapterService{
    private $: CheerioAPI;

    private constructor(document: any){
        this.$ = cheerio.load(document);
    }

    private static fetchPageByURL(url: string): Promise<ChapterService>{
        return new Promise((resolve, reject) =>{
            axios.get(url).then(res => {
                if(cheerio.load(res.data)('title').text().startsWith('404')) reject('Chapter not found');
                resolve(new ChapterService(res.data));
            }).catch(err => {
                reject(err);
            });
        });
    }

    public static fetchPageByID(storyID: string, chapter: string): Promise<ChapterService>{
        //https://read.mangabat.com/read-INSERT_ID_HERE-chap-INSERT_CHAPTER_NUMBER
        //The website has multiple domains - very annoying
        const url1 = `https://mkklcdnv6temp.com/read-${storyID}-chap-${chapter}`;
        const url2 = `https://read.mangabat.com/read-${storyID}-chap-${chapter}`;
        const url3 = `https://m.mangabat.com/read-${storyID}-chap-${chapter}`;

        return new Promise(async (resolve, reject) =>{     
            this.fetchPageByURL(url1).then(res => resolve(res)).catch((err) => {
                this.fetchPageByURL(url2).then(res => resolve(res)).catch((err) =>{
                    this.fetchPageByURL(url3).then(res => resolve(res)).catch(err => {
                        reject(err);
                    });
                });
            }); 
        });
    }

    public getChapterImageLinks(): string[] {
        let links: string[] = [];

        this.$('.container-chapter-reader').find('img').each((i, el) =>{
            //img link is protected by cloudflare 
            //a get request to the link is needed with the referer header prop set to the manga's domain https://mkklcdnv6temp.com or mangabat or mangakakalot, etc
            const link = this.$(el).attr('src'); 
            links.push(link || '');
        });

        return links;
    }

    public static getImageBuffer(imageLink: string): Promise<Buffer>{
        return new Promise((resolve, reject) =>{
            axios({
                method: 'get',
                url: imageLink,
                responseType: 'arraybuffer',
                headers:{
                    Referer: 'https://mkklcdnv6temp.com/'
                }
            }).then(res =>{
                resolve(res.data);
            }).catch(err =>{
                reject(err);
            });
        });
    }

    public getTitle(): string {
        return this.$('.panel-chapter-info-top').find('h1').text();
    }

    public getStoryLink(): string{
        const link = this.$('.panel-breadcrumb').find('a').get(1);
        return this.$(link).attr('href') || '';
    }

    public getPreviousChapterLink(): string {
        //When no prev link, the string is 0 in size
        let link: string = '';
        this.$('.navi-change-chapter-btn').find('a').each((i, el) =>{
            if(this.$(el).text() === 'PREV CHAPTER'){
                link = this.$(el).attr('href') || '';
            }
        }); 
        return link;
    }

    public getNextChapterLink(): string {
        //When no next link, the string is 0 in size
        let link: string = '';

        this.$('.navi-change-chapter-btn').find('a').each((i, el) =>{
            if(this.$(el).text() === 'NEXT CHAPTER'){
                link = this.$(el).attr('href') || '';
            }
        }); 
        return link;
    }
}

export default ChapterService;