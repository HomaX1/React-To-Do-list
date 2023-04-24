import OptionObject from './OptionObjectInterface';

async function Request(url:string, options: OptionObject) {
  return await fetch(url, {
    method: options.method,
    body: options.body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
}

export default Request;