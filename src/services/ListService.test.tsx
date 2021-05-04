import React from 'react'
import { Languages } from '../types/Languages';
import ListService from './ListService'


describe('LocalStorageServoce', () => {
    const mockWordPairtList = [{key: 1, english: 'dog', german: 'Hund'}, {key: 2, english: 'flower', german: 'Blume'},{key: 3, english: 'zebra', german: 'Zebra'},{key: 4, english: 'ant', german: 'Ameise'}]
    const mockSortedWordPairtList = [{key: 4, english: 'ant', german: 'Ameise'},{key: 1, english: 'dog', german: 'Hund'}, {key: 2, english: 'flower', german: 'Blume'},{key: 3, english: 'zebra', german: 'Zebra'}]
    const mockRemovedWordPairtList = [{key: 1, english: 'dog', german: 'Hund'}, {key: 2, english: 'flower', german: 'Blume'},{key: 4, english: 'ant', german: 'Ameise'}]
    const mockKey = 3;
    const mockLanguage = Languages.ENGLISH;

    test('remove an item from the list', () => {
    expect(ListService.removeItemFormlist(mockKey, mockWordPairtList)).toEqual(mockRemovedWordPairtList);
    });

    test('sort list in english', () => {
    expect(ListService.sortList(mockLanguage, mockWordPairtList)).toEqual(mockSortedWordPairtList);
    });
});