const API_URL = '/api/cookies';

export const saveCookie = async (name, value, time = 3600) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, value: value, time: time })
        });
        const data = await response.json();
        return data.status ? true : false;
    } catch (error) {
        console.error('Error in the request:', error);
        return false;
    }
}

export const deleteCookie = async(name) => {
    try {
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name })
        });
        const data = await response.json();
        return data.status ? true : false;
    } catch (error) {
        console.error('Error in the request:', error);
        return false;
    }
};

export const getCookie = async (name) => {
    try {
      const url = new URL(API_URL, window.location.origin);
      url.searchParams.append('name', name);
      const response = await fetch(url.toString());
      if (response.status !== 200) {
        return {ok: false, message: 'Something went wrong. Please try again later.'};
      } else {
        const data = await response.json();
        return {ok: true, data: data};
      }
    } catch (error) {
      console.error('Error in the request:', error);
      return {ok: false, message: 'Something went wrong. Please try again later.'};
    }
  };