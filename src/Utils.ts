class Utils{
    //Story link: https://read.mangabat.com/read-INSERT_ID_HERE
    //e.g https://read.mangabat.com/read-vk14233

    //Chapter link: https://read.mangabat.com/read-INSERT_ID_HERE-chap-INSERT_CHAPTER_NUMBER
    //e.g., https://read.mangabat.com/read-vk14233-chap-1

    //Function to return manga id based on either the story or chapter link

    public static getStoryID(link: string): string{
        let res = link.split('read').pop();
        return res!.split('-')[1];
    }

    //Function to get chapter number on a chapter page
    public static getChapterNumber(link: string): string{
        if(link.length === 0) return '';
        
        let res = link.split('chap')[1].substr(1);
        return res;
    }
}

export default Utils;