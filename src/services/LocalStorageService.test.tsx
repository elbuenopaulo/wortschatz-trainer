import React from 'react'
import LocalStorageService from './LocalStorageService'


describe('LocalStorageServoce', () => {
    const mockWordPaitList = [{key: 1, english: 'dog', german: 'Hund'}, {key: 2, english: 'flower', german: 'Blume'}]

    beforeEach(() => {
    localStorage.clear();
    });

    test('create and receive example localstorage', () => {
    expect(LocalStorageService.getListOrCreateDefault()).toStrictEqual(mockWordPaitList);
    });

    test('delete list from localstorage', () => {
        window.localStorage.setItem('List', JSON.stringify(mockWordPaitList));
        LocalStorageService.deleteList();
    expect(window.localStorage.getItem('List')).toBe(null);
    });

    test('save list to localstorage', () => {
        LocalStorageService.saveList(mockWordPaitList);
        const localData = window.localStorage.getItem('List');
    expect(JSON.parse(localData as string)).toStrictEqual(mockWordPaitList);
    });
});