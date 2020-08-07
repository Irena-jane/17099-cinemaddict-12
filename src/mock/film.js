import {getRandomInteger, generateDate, getRandomString, getRandomUniqueStringArr} from "../utils";
import {generateComment} from "./comment";

const titles = [
  `Лес`,
  `Стажёр старой школы`,
  `Уборка со страстью`,
  `Буду счастлива, если вы умрёте`,
  `Лицом к лицу`,
  `Жена, которую я знаю`
];

const posters = [
  `popeye-meets-sinbad.png`,
  `the-dance-of-life.jpg`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `made-for-each-other.png`
];

const genresList = [
  `медицина`,
  `романтика`,
  `комедия`,
  `драма`,
  `бизнес`,
  `детектив`,
  `научная фантастика`,
  `исторический`,
  `приключения`,
  `спорт`,
  `мистика`,
  `фэнтези`,
  `дружба`,
  `школа`,
  `боевик`,
  `триллер`
];

const originals = [
  `Memories of the Alhambra`,
  `The King's Avatar`,
  `The World Owes Me A First Love`,
  `Unique Lady`,
  `Love & The Emperor`
];

const directors = [
  `Ан Гиль Хо`,
  `О Чон Рок`,
  `Ю Дже Вон`,
  `и Ын Джин`,
  `Ли Сан Ёп`,
];

const writers = [
  `Сон Джэ Чон`,
  `Чон Чхан Гын`,
  `Ли Сон Ён`,
  `Сон Хе Джин`,
  `Им Со Ра`,
  `Ян Хи Сын`
];

const actors = [
  `Кан Чжи Хван`,
  `Пэк Чжин Хи`,
  `Ли Чон Сок`,
  `Пак Хэ Чжин`,
  `Хван Чжон Ым`,
  `Чо Бо А`,
  `Пак Сон Ун`,
  `Чжи Сон`
];

const countries = [
  `South Korea`,
  `China`,
  `Japan`,
  `Taiwan`
];

const ages = [
  `18+`,
  `0+`,
  `12+`,
  `10+`,
  `16+`,
  `семейный`
];

const generateRating = () => {
  const int = getRandomInteger(1, 10);
  const float = int >= 10 ? 0 : getRandomInteger(1, 9);
  return int + float / 10;
};

const generateDescription = () => {
  const text = `Десять лет назад главный герой Ха Рип (Чон Кён Хо), чтобы стать успешным композитором, заключает сделку с Дьяволом и продаёт ему душу. За отведенное ему время он получает то, что желал. Но совсем скоро срок действия контракта закончится, и ему придётся возвращать долги. Раньше я думал, что компания - вещь обезличенная. Считал, что на каждое решении у компании есть веские причины, и что влиять на них вне моих возможностей. И всё же я был неправ. Просто так мне было удобно оправдывать своё нежелание что-либо менять. Компания - это, в первую очередь, люди. История начинается в Гранаде, Испания, в архитектурном комплексе Альгамбра. Ю Джин У (Хён Бин) - генеральный директор инвестиционной компании. В нем силен дух авантюризма и желание побеждать, однако в своей работе он руководствуется здравым смыслом. Загадочный бар на колесах появляется только поздно вечером в необычных местах. Гости, которые случайно забредают в это таинственное место, сталкиваются со сверхъестественными вещами. Кан Сан Хёк (Пак Хэ Чжин) – топ-менеджер крупной компании. Прекрасен внешне, обладает блестящим умом и острыми инстинктами. Но не помнит ничего о своем детстве и испытывает сильнейшие фантомные боли`;

  const textArr = text.split(`. `);

  const newTextArr = Array(getRandomInteger(1, 5)).fill().map(() => getRandomString(textArr));
  // const newTextArr = getRandomUniqueStringArr(textArr);
  const newText = newTextArr.join(`. `) + `.`;
  return newText;
};

const generateDuration = () => {
  let min = getRandomInteger(30, 180);
  const hours = Math.floor(min / 60);
  min = min % 60;
  return `${hours}h ${min}m`;
};

const generateComments = (releaseDate) => {
  return Array(getRandomInteger(0, 5)).fill({})
    .map(() => generateComment(releaseDate))
    .sort((a, b) => a.date - b.date);
};
const getIsWatched = () => {
  return Boolean(getRandomInteger(0, 1));
};
const getIsInWatchlist = (isWatched) => {
  return isWatched ? false : Boolean(getRandomInteger(0, 1));
};

export const generateFilm = () => {
  const title = getRandomString(titles);
  const poster = `./images/posters/` + getRandomString(posters);
  const description = generateDescription();
  const genres = getRandomUniqueStringArr(genresList);
  const date = generateDate();
  const isWatched = getIsWatched();
  const isInWatchlist = getIsInWatchlist(isWatched);
  const isFavorite = isWatched ? Boolean(getRandomInteger(0, 1)) : false;
  return {
    title,
    poster,
    description,
    rating: generateRating(),
    date,
    duration: generateDuration(),
    genres,
    original: getRandomString(originals),
    director: getRandomString(directors),
    age: getRandomString(ages),
    country: getRandomString(countries),
    writers: getRandomUniqueStringArr(writers, 3, 2),
    actors: getRandomUniqueStringArr(actors, 5, 3),
    isWatched,
    isInWatchlist,
    isFavorite,
    comments: generateComments(date)
  };
};
