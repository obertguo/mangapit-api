import axios from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';
import { Chapter } from '../types';
import Utils from '../Utils';

class StoryService{
    private $: CheerioAPI;

    private constructor(document: any){
        this.$ = cheerio.load(document);
    }

    private static async fetchPageByURL(url: string): Promise<StoryService>{
        return new Promise((resolve, reject) =>{
            axios.get(url).then(res => {
                if(cheerio.load(res.data)('title').text().startsWith('404')) reject('Chapter not found');
                resolve(new StoryService(res.data));
            }).catch(err => {
                reject(err);
            });
        });
    }

    public static fetchPageByID(storyID: string): Promise<StoryService>{
        //https://read.mangabat.com/read-INSERT_ID_HERE
        //The website has multiple domains - very annoying
        const url1 = `https://mkklcdnv6temp.com/read-${storyID}`;
        const url2 = `https://read.mangabat.com/read-${storyID}`;
        const url3 = `https://m.mangabat.com/read-${storyID}`;

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

    public getTitle(): string{
        return this.$('.story-info-right').find('h1').text();
    }

    public getAltTitle(): string{
        const tableVal = this.$('.table-value').get(0);
        return this.$(tableVal).text();
    }

    public getAuthor(): string{
        const tableVal = this.$('.table-value').get(1);
        return this.$(tableVal).text();
    }

    public getStoryStatus(): string{
        const tableVal = this.$('.table-value').get(2);
        return this.$(tableVal).text();
    }

    public getGenres(): string[]{
        const tableVal = this.$('.table-value').get(3);
        return this.$(tableVal).text().trim().split(' - ');
    }

    public getLastUpdated(): string {
        const tableVal = this.$('.stre-value').get(0);
        return this.$(tableVal).text().split(',').join(' ').split('-')[0];
    }

    public getDescription(): string{
        return this.$('#panel-story-info-description').text().split(':')[1];
    }

    public getChapters(): Chapter[] {
        let chapters: Chapter[] = [];
        
        this.$('.row-content-chapter').find('li').each((i, el) =>{
            const chapter: Chapter = {
                title: this.$(el).find('a').text()!, 
                chapterNumber: Utils.getChapterNumber(this.$(el).find('a').attr('href')!), 
                uploaded: this.$(el).find('span').text().split(',').join(' ')
            };

            chapters.push(chapter);
        });
        return chapters;
    }

    public getImageURL(): string{
        return this.$('.info-image').find('img').attr('src')!;
    }
}

export default StoryService