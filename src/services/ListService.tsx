
export default class ListService {

    //removes item from list and returns the new list
    public static removeItemFormlist(key: any, list: any[]): any[] {
        
        let newList = list.filter((item) => { 
            return item.key !== key;
        });
        
        return newList;
    }

    //sorts list depending on which key is passed, sorted list is then returned
    public static sortList(key: any, list: any[]): any[] {
        list.sort(function(a,b) {
            if(a[key as keyof typeof a] > b[key as keyof typeof b]) {
                return 1;
            }
            if(b[key as keyof typeof b] > a[key as keyof typeof a]) {
                return -1;
            }
            return 0
        })

        return list;
    }
}