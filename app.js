(function () {
    "use strict";

    const monthMap = new Map([
        ["1 - Siječanj",    { female: "Samodeklarirana",        male: "Samodeklarirani" }],
        ["2 - Veljača",     { female: "Samodopadna",            male: "Samodopadni" }],
        ["3 - Ožujak",      { female: "Stupidna",               male: "Stupidni" }],
        ["4 - Travanj",     { female: "Zlosretna",              male: "Zlosretni" }],
        ["5 - Svibanj",     { female: "Wannabe",                male: "Wannabe" }],
        ["6 - Lipanj",      { female: "Bitno manje nekorektna", male: "Bitno manje nekorektni" }],
        ["7 - Srpanj",      { female: "Neozbiljna",             male: "Neozbiljni" }],
        ["8 - Kolovoz",     { female: "Samodeklarirana",        male: "Samodeklarirani" }],
        ["9 - Rujan",       { female: "Drugorazredna",          male: "Drugorazredni" }],
        ["10 - Studeni",     { female: "Nasilna",                male: "Nasilni" }],
        ["11 - Listopad",    { female: "Sveprisutna",            male: "Sveprisutni" }],
        ["12 - Prosinac",    { female: "Propala",                male: "Propali" }],
    ]);

    const dayMap = new Map([
        [1,     { female: "agitatorica", male: "agitator" }],
        [2,     { female: "mediokritet", male: "mediokritet" }],
        [3,     { female: "guslarica", male: "guslar" }],
        [4,     { female: "mudroslovka", male: "mudroslov" }],
        [5,     { female: "drukerica", male: "druker" }],
        [6,     { female: "ništarija", male: "ništarija" }],
        [7,     { female: "nježna dušica", male: "nježna dušica" }],
        [8,     { female: "predvnodnica kabale", male: "predvodnik kabale" }],
        [9,     { female: "political freeloaderica", male: "political freeloader" }],
        [10, {
            female: "sedma najutjecajnija feministica na svijetu",
            male: "sedmi najutjecajniji feminist na svijetu"
        }],
        [11,    { female: "arhetipska ljevičarka", male: "arhetipski ljevičar" }],
        [12,    { female: "narikača", male: "narikač" }],
        [13,    { female: "fejkerica", male: "fejker" }],
        [14,    { female: "a, zapravo tabula rasa", male: "slučaj, zapravo tabula rasa" }],
        [15,    { female: "svjedokinja optužbe", male: "svjedok optužbe" }],
        [16,    { female: "ometačica", male: "ometač" }],
        [17,    { female: "provokatorica", male: "provokator" }],
        [18,    { female: "i isprazna poput dekora u slovenskoj", male: "i isprazni dekor kluba u slovenskoj" }],
        [19,    { female: "seoska kockarošica", male: "seoski kockaroš" }],
        [20,    { female: "šaka jada", male: "šakojadnik" }],
        [21,    { female: "vojna lekarka", male: "vojni lekar" }],
        [22,    { female: "politička kukavica", male: "politički kukavica" }],
        [23,    { female: "crvenokošuljašica", male: "crvenokošuljaš" }],
        [24,    { female: "uskokova manekenka", male: "uskokov maneken" }],
        [25,    { female: "a, zapravo biskup", male: "biskup" }],
        [26,    { female: "priležnica", male: "priležnik" }],
        [27,    { female: "hroma daba", male: "hromi daba" }],
        [28,    { female: "izdavačica preludija u fetvu", male: "izdavač preludija u fetvu" }],
        [29,    { female: "mufljuzica", male: "mufljuz" }],
        [30,    { female: "konjokradica", male: "konjokradica" }],
        [31,    { female: "folirantica", male: "folirant" }]
    ]);

    let dd_month, dd_day, dd_gender;

    document.addEventListener("DOMContentLoaded", () => {
        dd_month = document.getElementById("dd_month");
        dd_month.innerHTML = getMonthOptions(monthMap);
        dd_month.addEventListener("change", handleChangeMonth);
        
        dd_day = document.getElementById("dd_day");
        dd_day.addEventListener("change", computeName);

        dd_gender = document.getElementById("dd_gender");
        dd_gender.addEventListener("change", computeName);

        document.getElementById("btn_rnd").addEventListener("click", handleRndName);

        handleChangeMonth();
    });

    const handleRndName = () => {
        const rndGender = (Math.floor(Math.random() * 11) % 2 == 0) == 0 ? "female" : "male";
        const rndMonth = Math.floor(Math.random() * 11) + 1;
        const rndMonthMapPair = Array.from(monthMap).filter(x => x[0].startsWith(rndMonth)).reverse()[0];
        const daysOptions = getDaysOptions(rndMonth).split("/");
        const rndDayNumber = Math.floor(Math.random() * (daysOptions.length - 1)) + 1;

        dd_gender.value = rndGender;
        dd_month.value = rndMonthMapPair[0];
        dd_day.value = rndDayNumber;

        computeName();
    };

    const handleChangeMonth = () => {
        dd_day.innerHTML = getDaysOptions(Number(dd_month.value.split(" -")[0]));
        computeName();
    };

    const computeName = () => {
        const monthNamePart = monthMap.get(dd_month.value)[dd_gender.value];
        let dayNamePart;
        try {
            dayNamePart = dayMap.get(Number(dd_day.value))[dd_gender.value];
        } catch (error) {
            console.log(error);
        }

        document.getElementById("span_name").innerHTML = `${monthNamePart} ${dayNamePart}`;
    };

    const getMonthOptions = (monthMap) =>
        Array.from(monthMap)
            .map(x => `<option value='${x[0]}'>${x[0]}</option>`)
            .join("");

    const getDaysOptions = (monthNumber) => {
        let daysMax = 31;

        switch (monthNumber) {
            case 2:
                daysMax = 29;
                break;
            case 4: case 6: case 9: case 11:
                daysMax = 30;
                break;
        }

        return Array.from(new Array(daysMax).keys())
            .map(x => `<option value='${(x+1)}'>${(x+1)}.</option>`)
            .join("")
    };
})();
