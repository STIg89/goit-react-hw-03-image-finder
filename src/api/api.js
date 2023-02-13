import axios from 'axios';

const API_KEY = '29527006-ad6e7c34d6702116665004a30';
const BASE_URL = 'https://pixabay.com/api/';

const getImages = async (value, page, per_page) => {
  const options = {
    params: {
      q: value,
      page: page,
      per_page: per_page,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      key: API_KEY,
    },
  };
  const response = await axios.get(`${BASE_URL}`, options);
  if (response.status !== 200) {
    console.log('fetch error');
    return;
  }
  return await response.data;
};

export default getImages;
