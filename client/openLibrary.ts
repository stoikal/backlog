const openLibrary = {
  async search (searchKey: string) {
    const { public: { appName, appEmail, appVersion } } = useRuntimeConfig()

    const url = 'https://openlibrary.org/search.json?'

    const params = new URLSearchParams({
      q: searchKey.trim().toLowerCase().replaceAll(' ', '+'),
      fields: 'author_key,author_name,first_publish_year,language,title,key,type,number_of_pages_median',
      limit: '20',
    })

    const headers = new Headers({
      "User-Agent": `${appName}/${appVersion} (${appEmail})`
    })

    const response = await fetch(url + params.toString(), {
      headers,
    })

    const json = await response.json()
    return json
  }
}

export default openLibrary;
