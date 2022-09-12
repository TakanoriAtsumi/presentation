'use strict'
// 1行目に記載している 'use strict' は削除しないでください
///////////////////////////////////////////////////////////////////////////////////////////////////
const h1 = document.getElementsByTagName("h1");
const h2 = document.getElementsByTagName("h2");
const h3 = document.getElementsByTagName("h3");
const p = document.getElementsByTagName("p");
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
* @param 無し
* @returns {string} 今日の日付
*/
function getTimedate() {
    let result = 0;
    const youbi = ["日", "月", "火", "水", "木", "金", "土"];

    const date1 = new Date();
    const date2 = date1.getFullYear() + "年" +
        (date1.getMonth() + 1) + "月" +
        date1.getDate() + "日"
    youbi[date1.getDay()] + "曜日" // 0は日曜日～6は土曜日
    // console.log(date2);
    result = date2;
    return result
}

h1[0].after("更新日時：", getTimedate())
///////////////////////////////////////////////////////////////////////////////////////////////////
function geth2add0() {
    // console.log(getTypes());
    h2[0].after(getTypes());
}
function geth2add1() {
    // console.log(getNamesMaxHp());
    h2[1].after(getNamesMaxHp());
}
function geth2add2() {
    // console.log(getNamesMaxCp());
    h2[2].after(getNamesMaxCp());
}
function geth3add0() {
    p[0].after(getBattleName());
    p[1].after(getBattleWiner());
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
* @param 無し
* @returns {array} ポケモンのType持つ配列
*/
function getTypes() {
    let result = {};
    let resultTypes = [];

    for (const element of allPokemon) {
        // console.log("element.Resistant",element.Resistant);
        for (const Typess of element.Types) {
            // console.log("Weaknessess:",Weaknessess);
            if (result[String(Typess)] === undefined) {
                // console.log("Weaknessess:",Weaknessess);
                result[String(Typess)] = 1;
            } else {
                result[String(Typess)] = result[String(Typess)] + 1;
            }
        }
    }
    // console.log("result",result);
    for (const element in result) {
        // console.log(element);
        resultTypes.push(element)
    }

    return resultTypes;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
* @param 無し
* @returns {array} MaxHpを与えられた名前を持つポケモンの配列
*/
function getNamesMaxHp() {
    let result = [];
    let resultName = [];

    for (const element of allPokemon) {
        result.push(element.MaxHP);
    }
    result.sort((a, b) => b - a);
    // console.log("MaxHp:", result);
    for (let i = 0; i < 5; i++) {
        for (const element of allPokemon) {
            if (element.MaxHP === result[i]) {
                resultName.push(element.Name)
            }
        }
    }

    return resultName;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
* @param 無し
* @returns {array} MaxCpを与えられた名前を持つポケモンの配列
*/
function getNamesMaxCp() {
    let result = [];
    let resultName = [];

    for (const element of allPokemon) {
        result.push(element.MaxCP);
    }
    result.sort((a, b) => b - a);
    // console.log("MaxCp:", result);
    for (let i = 0; i < 5; i++) {
        for (const element of allPokemon) {
            if (element.MaxCP === result[i]) {
                resultName.push(element.Name)
            }
        }
    }

    return resultName;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
* @param {number} max - 最大値
* @returns {number} ランダム値
*/
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
let name1;
let name2;
/**
* @param 無し
* @returns {String} バトルメンバー
*/
function getBattleName() {
    let num = getRandomInt(allPokemon.length);
    let num2 = getRandomInt(allPokemon.length);
    
    if (num < 10) {
        num = String("00" + num);
    } else {
        num = String("0" + num);
    }
    // console.log("num1:", num);
    if (num2 < 10) {
        num2 = String("00" + num2);
    } else {
        num2 = String("0" + num2);
    }
    // console.log("num2:", num2);

    for (const element of allPokemon) {
        if (element.Number === String(num)) {
            name1 = element.Name;
        } else if (element.Number === String(num2)) {
            name2 = element.Name;
        }
    }

    return name1 + "  vs  " + name2;
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/**
* @param 無し
* @returns {String} バトル勝者
*/
function getBattleWiner() {
    let num1 = []; //名前,MaxHp,Fast Attack(s),Special Attack(s)
    let num2 = []; //名前,MaxHp,Fast Attack(s),Special Attack(s)

    // console.log(getRandomInt(2));

    for (const element of allPokemon) {
        if (element.Name == name1) {
            num1.push(element.Name)
            num1.push(element.MaxHP)
            num1.push(element["Fast Attack(s)"][getRandomInt(2)].Damage)
            num1.push(element["Special Attack(s)"][getRandomInt(3)].Damage)
            // num1.push(element["Fast Attack(s)"][0].Damage)
            // num1.push(element["Special Attack(s)"][0].Damage)
        } else if (element.Name == name2) {
            num2.push(element.Name)
            num2.push(element.MaxHP)
            num2.push(element["Fast Attack(s)"][getRandomInt(2)].Damage)
            num2.push(element["Special Attack(s)"][getRandomInt(3)].Damage)
            // num2.push(element["Fast Attack(s)"][0].Damage)
            // num2.push(element["Special Attack(s)"][0].Damage)
        }
    }
    console.log("num1:", num1);
    console.log("num2:", num2);
    //初回攻撃
    num2[1] = num2[1] - num1[2];
    num1[1] = num1[1] - num2[2];
    console.log(num1[0] + " HP:", num1[1]);
    console.log(num2[0] + " HP:", num2[1]);

    while (1) {
        num2[1] = num2[1] - num1[2];
        num1[1] = num1[1] - num2[2];
        console.log(num1[0] + " HP:", num1[1]);
        console.log(num2[0] + " HP:", num2[1]);
        if (num1[1] <= 0) {
            return "勝者：" + num2[0];
        } else if (num2[1] <= 0) {
            return "勝者：" + num1[0];
        }
    }
    return "失敗";
}

///////////////////////////////////////////////////////////////////////////////////////////////////
h2[0].addEventListener("click", geth2add0);
h2[1].addEventListener("click", geth2add1);
h2[2].addEventListener("click", geth2add2);
h3[0].addEventListener("click", geth3add0);
