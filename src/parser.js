export default (data) => {
  const parser = new DOMParser();
  const dom = parser.parseFromString(data, 'application/xml');
  const parseError = dom.querySelector('parsererror');
  if (parseError) {
    const error = new Error('Parser Error');
    error.isParsingError = true;
    throw error;
  }
  const feedName = {
    title: dom.querySelector('title').textContent,
    description: dom.querySelector('description').textContent,
  };

  const domItem = dom.querySelectorAll('item');
  const feedPosts = Array.from(domItem).map((item) => {
    const titles = item.querySelector('title').textContent;
    const links = item.querySelector('link').textContent;
    const descriptions = item.querySelector('description').textContent;
    return { titles, links, descriptions };
  });
  return { feedName, feedPosts };
};
