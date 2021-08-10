export interface Story{
    id: string,
    url_story: string,
    name: string,
    nameunsigned: string,
    lastchapter: string,
    image: string,
    author: string
}

export interface Chapter{
    title: string,
    uploaded: string,
    chapterNumber: string
}

export interface ChapterResponse{
    imageLinks: string[],
    title: string,
    storyID: string,
    previousChapterNumber: string,
    nextChapterNumber: string
}

export interface StoryResponse{
    storyID: string,
    title: string,
    author: string,
    altTitle: string,
    chapters: Chapter[],
    genres: string[],
    status: string,
    description: string,
    lastUpdated: string
}

export interface SearchResponse{
    id: string
    url_story: string
    name: string
    nameunsigned: string
    lastchapter: string
    image: string
    author: string
}