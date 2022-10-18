export const parseCurrentURL = () => {
    const urlParts = {};

    [urlParts.page, urlParts.task, urlParts.id, urlParts.action] = location.hash.slice(2).split('/');

    return urlParts;
};

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

export const calculationRequiredCalories = (sex, weight, height, age, ratio) => {
    if (sex === 'female') {
        return Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
        return Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
};