const openLibrary = {
  async search (searchKey: string) {
    const url = 'https://openlibrary.org/search.json?'

    const params = new URLSearchParams({
      q: searchKey.trim().toLowerCase().replaceAll(' ', '+'),
      fields: 'author_key,author_name,first_publish_year,language,title,key',
      limit: '20',
    })

    const response = await fetch(url + params.toString())

    const json = await response.json()
    return json
  }
}

export default openLibrary;
