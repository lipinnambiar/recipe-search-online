import { TIMEOUT_SEC } from '../config';

// Utility function for timeout Promise rejection
export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// fetch api untility function
export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`${data.message} (${data.status})`);
    }
    return data;
  } catch (error) {
    throw error;
  }
};