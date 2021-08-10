# mangapit-api

`BaseURL` https://mangareaderapi.herokuapp.com

| ROUTE | METHOD |
|-------|--------|
| /searchstory | POST |
| /chapter/:storyID/:chapterNumber | GET | 
| /chapter/getImageBuffer | POST |
| /story/:storyID | GET | 

---------------------------------------
# /searchstory 
`Method` POST\
`Body`
```
interface searchBody {
  searchword: searchKeyword 
}
```
`Response`
Returns an array of StorySearchResultResponse and a 200 OK if results are found or a 400 BAD REQUEST
```
interface StorySearchResultResponse {
    id: string
    url_story: string
    name: string
    nameunsigned: string
    lastchapter: string
    image: string
    author: string
}
```
---------------------------------------
# /chapter/:storyID/:chapterNumber
`Method` GET\
`Response` Returns a ChapterResponse and a 200 OK if chapter information is found or a 400 BAD REQUEST
```
interface ChapterResponse{
    imageLinks: string[],
    title: string,
    storyID: string
    previousChapterNumber: string,
    nextChapterNumber: string
}
```
---------------------------------------
# /chapter/getImageBuffer
`Method` POST\
`Body` 
``` 
interface getImageBufferBody{
  imageBufferLink: string
}
```
`Response` Returns a img/jpeg base64 encoded url and a 200 OK if the chapter image can be parsed or a 400 BAD REQUEST
```
getImageBufferResponse: string
```
---------------------------------------
# /story/:storyID
`Method` GET\
`Response` Returns story information and a 200 OK if the story is found or a 400 BAD REQUEST 
```
export interface StoryResponse{
    storyID: string,
    title: string,
    author: string,
    altTitle: string,
    chapters: Chapter[],
    genres: string[],
    status: string,
    description: string,
    lastUpdated: string,
    image: string
}

interface Chapter{
    title: string,
    uploaded: string,
    chapterNumber: string
}
```


