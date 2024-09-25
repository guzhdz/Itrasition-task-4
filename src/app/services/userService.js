const API_URL = '/api/users';

export const getUser = async (userId) => {
    const messageError = "Unable to log in to your account. Please check your credentials and try again.";
    try {
      const url = new URL(API_URL, window.location.origin);
      url.searchParams.append('action', 'getUser');
      url.searchParams.append('id', userId);
      const response = await fetch(url.toString());
      if (response.status !== 200) {
        return {ok: false, message: messageError};
      } else {
        const data = (await response.json());
        if (data.length === 0) {
            return {ok: false, message: messageError};
        } else
          return {ok: true, data: data[0]};
      }
    } catch (error) {
        console.error('Error in the request:', error);
        return {ok: false, message: messageError};
    }
}

export const getUsers = async (action) => {
    try {
      const url = new URL('/api/users', window.location.origin);
      url.searchParams.append('action', action);
      const response = await fetch(url.toString());
      const data = await response.json();
      if (response.status !== 200) {
        return {ok: false, message: data.error};
      } else {
        return {ok: true, data: data};
      }
    } catch (error) {
        console.error('Error in the request:', error);
        return {ok: false, message: 'Something went wrong. Please try again later.'};
    }
  }

export const insertUser = async (user) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        });
        const data = await response.json();
        if (response.status != 200) {
            return {ok: false, message: data.error};
        }
        else {
            return {ok: true, data: data.data};
        }

    } catch (error) {
        console.error('Error in the request:', error);
        return {ok: false, message: 'Something went wrong. Please try again later.'};
    }
}

export const updateUsers = async (users) => {
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                users: users
            })
        });
        const data = await response.json();
        if (response.status != 200) {
            return {ok: false, message: data.error};
        } else {
            return {ok: true, data: data.data};
        }
    } catch (error) {
        console.error('Error in the request:', error);
        return {ok: false, message: 'Something went wrong. Please try again later.'};
    }
}

export const deleteUsers = async (ids) => {
    try {
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ids: ids
            })
        });
        if (response.status === 200) {
            return {ok: true};
        } else {
            return {ok: false, message: 'Something went wrong. Please try again later.'};
        }
    } catch (error) {
        console.error('Error in the request:', error);
        return {ok: false, message: 'Something went wrong. Please try again later.'};
    }
}