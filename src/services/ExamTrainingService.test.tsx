import React from 'react'
import { Languages } from '../types/Languages';
import ExamTrainingService from './ExamTrainingService'


describe('LocalStorageServoce', () => {
    const mockWordPair = {key: 1, english: 'dog', german: 'Hund'};
    const mockWordOne = 'dog';
    const mockWordTwo = 'cat';

    test('check if word is true', () => {
    expect(ExamTrainingService.checkWord(mockWordOne, mockWordOne)).toBe(true);
    expect(ExamTrainingService.checkWord(mockWordOne, mockWordTwo)).toBe(false);
    });

    test('receive other language', () => {
    expect(ExamTrainingService.getOtherLanguage(mockWordPair, Languages.ENGLISH)).toBe(mockWordPair.german);
    expect(ExamTrainingService.getOtherLanguage(mockWordPair, Languages.GERMAN)).toBe(mockWordPair.english);
    });
});