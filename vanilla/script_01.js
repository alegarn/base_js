const entrepreneurs = [
    { first: 'Steve', last: 'Jobs', year: 1955 },
    { first: 'Oprah', last: 'Winfrey', year: 1954 },
    { first: 'Bill', last: 'Gates', year: 1955 },
    { first: 'Sheryl', last: 'Sandberg', year: 1969 },
    { first: 'Mark', last: 'Zuckerberg', year: 1984 },
    { first: 'Beyonce', last: 'Knowles', year: 1981 },
    { first: 'Jeff', last: 'Bezos', year: 1964 },
    { first: 'Diane', last: 'Hendricks', year: 1947 },
    { first: 'Elon', last: 'Musk', year: 1971 },
    { first: 'Marissa', last: 'Mayer', year: 1975 },
    { first: 'Walt', last: 'Disney', year: 1901 },
    { first: 'Larry', last: 'Page', year: 1973 },
    { first: 'Jack', last: 'Dorsey', year: 1976 },
    {first: 'Evan', last: 'Spiegel', year: 1990 },
    {first:'Brian', last: 'Chesky', year: 1981 },
    {first:'Travis', last: 'Kalanick', year: 1976 },
    {first:'Marc', last: 'Andreessen', year: 1971 },
    {first:'Peter', last: 'Thiel', year: 1967 }
    ];
    
/* Sors une array qui ne contient que le prénom et le nom des entrepreneurs*/

function first(entrepreneurs) {

    function appendNameLastName(name,last) {
        let fullName = [name, last];
        onlyNameLastName.push(fullName);
        
    };

    let onlyNameLastName = new Array ;

    entrepreneurs.forEach(element => {
        appendNameLastName(element.first, element.last);
    });

    console.log(onlyNameLastName);
};

/* Pour chaque entrepreneur, remplace la date de naissance par l'âge de l'entrepreneur
qu'il aurait aujourd'hui. */

function replaceDateToAge(year) {
    return(today.getFullYear() - year)
};


function second(entrepreneurs) {
    let ageNewArray = new Array;
    let today = new Date();

    entrepreneurs.forEach(element => {
        let age = replaceDateToAge(element.year)
        let entrepreneurInfos = [element.first, element.last, age]
        ageNewArray.push(entrepreneurInfos)
    });

    console.log(ageNewArray);
};


/* Les clés first et last manquent de lisibilité, remplace-les par firstName et lastName */

function third(entrepreneurs) {
    let renameNewArray = new Array;
    let today = new Date();

    entrepreneurs.forEach(element => {
        let currentAge = replaceDateToAge(element.year)
        let entrepreneurInfosHash = {firstName:element.first, lastName:element.last, age:currentAge}
        renameNewArray.push(entrepreneurInfosHash)
    });

    console.log(renameNewArray);
};

/* Filtre dans cette liste les entrepreneurs qui sont nés dans les années 70 */
function fourth(entrepreneur) {
    
    let bornIn70 = new Array;

    entrepreneurs.forEach(element => {

        let year = element.year;

        if ((year <= 1979) && (year >= 1970 )) {
            bornIn70.push(element);
        } else {
            console.log(`${element.year}: ${element.first} ${element.last} Hors concours`);
        };

    });

    console.log(bornIn70);
};


