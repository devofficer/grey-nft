import axios from 'axios';
import FormData from 'form-data';

import { PINATA_API_KEY, PINATA_SECRET_API_KEY, PINATA_API } from 'config/settings';

export const pinJSONToIPFS = JSONBody => {
  const url = `${PINATA_API}/pinJSONToIPFS`;
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    })
    .then(function (response) {
      const x = response.data.IpfsHash;
      return x;
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const pinFileToIPFS = file => {
  const url = `${PINATA_API}/pinFileToIPFS`;

  let data = new FormData();
  data.append('file', file);

  return axios
    .post(url, data, {
      maxContentLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    })
    .then(function (response) {
      const y = response.data.IpfsHash;
      return y;
    })
    .catch(function (error) {
      console.log(error);
    });
};
