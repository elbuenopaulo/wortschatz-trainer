import { Languages } from "../types/Languages";
import { WordPair } from "../types/WordPair";

export default class ExamTrainingService {

    //returns GERMAN or ENGLISH
    public static defineLanguage(): keyof WordPair {
        let random = Math.floor(Math.random() * 2)

        if(random === 0) {
            return Languages.GERMAN;
        } else {
            return Languages.ENGLISH;
        }
    }

    //Random word depending of a random value between 0 and the lists length
    public static defineRandomWord(listOfWordPairs: WordPair[]): WordPair {
        let random = Math.floor(Math.random() * listOfWordPairs.length);
        return listOfWordPairs[random];
    }

    public static checkWord(userInput: string, correctWord: string): boolean {
        return userInput === correctWord;
    }

    public static getOtherLanguage(wordPair: WordPair, language: keyof WordPair) {
        return wordPair[language === Languages.ENGLISH ? Languages.GERMAN : Languages.ENGLISH];
    }
}