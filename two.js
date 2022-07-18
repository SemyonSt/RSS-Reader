//Сэму и Фродо надо держаться вместе. Проверьте, нет ли между ними других персонажей.

const solution = (persons) => {
	for(let i = 0; i <= persons.length; i+=1){
        if(persons[i] === "Sam" && persons[i+1] === "Frodo"){
            return true
        }
        if(persons[i] === "Frodo" && persons[i+1] === "Sam"){
            return true
        }
    }
    return false
};

solution(["Sam","Frodo","Troll","Balrog","Human"])
solution(["Orc","Frodo","Treant","Saruman","Sam"])
