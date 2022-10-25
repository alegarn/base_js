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

function onlyNames(entrepreneurs) {
    let onlyNameLastName = entrepreneurs.map((item) => [item.first, item.last]) ;
    console.log(onlyNameLastName);
};


/* Pour chaque entrepreneur, remplace la date de naissance par l'âge de l'entrepreneur
qu'il aurait aujourd'hui. */

function replaceDateToAge(today, year) {
    return(today.getFullYear() - year)
};


function dateToAge(entrepreneurs) {
    let today = new Date();
    let ageNewArray = entrepreneurs.map(element =>  [element.first, element.last, replaceDateToAge(today, element.year)]);
    console.log(ageNewArray);
};

/* Les clés first et last manquent de lisibilité, remplace-les par firstName et lastName */

function firstNameLastName(entrepreneurs) {
    let today = new Date();

    let renameNewArray = entrepreneurs.map(element => {
        let currentAge = replaceDateToAge(today, element.year);
        return({firstName:element.first, lastName:element.last, age:currentAge});
    });

    console.log(renameNewArray);
};


/* Filtre dans cette liste les entrepreneurs qui sont nés dans les années 70 */
function fromYearSeventies(entrepreneurs) {
    let bornIn70 = entrepreneurs.filter(element => (element.year <= 1979) && (element.year >= 1970 ));
    console.log(bornIn70);
};


fromYearSeventies(entrepreneurs);