//Создайте функцию, которая принимает 2 числа и проверяет
// равен ли квадратный корень первого числа кубическому корню второго числа.

const solution = (first, second) => {
	//return Math.sqrt(first)  === Math.cbrt(second)
    return Math.pow(first, 1/2) === Math.pow(second, 1/3)
};



solution(4, 8)
solution(16, 48)

//Удалите каждый n-ый элемент из массива.

const t = (num, list) => {
    return list.filter((_, i) => (i + 1) % num != 0)
};

t(2, [0,1,2,3,4,5,6,7,8,9])
t(5, [0,1,2,3])
