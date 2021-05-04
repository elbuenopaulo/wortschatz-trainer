import { WordPair } from "../types/WordPair";

export default class LocalStorageHelper {

    //returns localStorage, if no localstorage is found creates small example and returns it
    public static getListOrCreateDefault(): WordPair[] {
        const localWordList = window.localStorage.getItem('List');
        
        if(localWordList === null) {
            const exampleWords = [{key: 1, english: 'dog', german: 'Hund'}, {key: 2, english: 'flower', german: 'Blume'}]
            window.localStorage.setItem('List', JSON.stringify(exampleWords))
            return exampleWords;
        } else {
            return JSON.parse(localWordList);
        }
    }

    public static saveList(wordPairList: WordPair[]) {
        window.localStorage.setItem('List', JSON.stringify(wordPairList));
    }

    public static deleteList() {
        window.localStorage.removeItem('List');
    }
}