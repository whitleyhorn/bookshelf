import * as auth from 'auth-provider'
const apiURL = process.env.REACT_APP_API_URL

async function client(
  endpoint,
  {token, headers: customHeaders, ...customConfig} = {},
) {
  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  const response = await window.fetch(`${apiURL}/${endpoint}`, config)
  if (response.status === 401) {
    await auth.logout()
    window.location.assign(window.location)
    return Promise.reject({message: 'Please authenticate'})
  }
  const data = await response.json()
  if (response.ok) {
    return data
  } else {
    return Promise.reject(data)
  }
}

export {client}
