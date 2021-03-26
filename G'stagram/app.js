// import  "./style.css";



const apiUrl = 'https://graph.facebook.com/v10.0/';
const igUserId = '17841401872952396';
const accessToken = 'EAAD9x0LEfOwBAHjYgsClLxmjcEhRhC8rVPZAjs2j5WptRPCkZAwMypNzZCxyIu0TEz9WZBZCNZA69kCGVartEvFV2R59ZBLZAmc10ZBt6tGGM5ZCzAMjCghIZARptjR2UyjMBXplfIq9obz8swAr6ZAWSMOJMiESjQRs368SV49CIQRnLsVPZBXjGzWbpTYuqUVCvqXoLWI34oUcoQZAxZCE5SVDj5nqXcJDgOeUcudph4t79B9CmQl0iiPav6S';

document.addEventListener('DOMContentLoaded', () => {
  _getMyMeida();
});

function _getMyMeida(url = '') {
  // Get the Instagram Business Account's Media Objects
  const api = url || `${apiUrl}${igUserId}/media?fields=caption,children,comments_count,id,like_count,media_type,media_url,thumbnail_url&access_token=${accessToken}`;

  fetch(api)
    .then(response => {
      return response.json();
    })
    .then(data => {
      if (data.data !== undefined) {
        _createTile(data.data, (url === '') ? true : false);

        if (data.paging !== undefined && data.paging.next !== undefined) {
          _getMyMeida(data.paging.next);
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function _createTile(media, insert) {
  const container = document.querySelector('.container');
  const fragment = document.createDocumentFragment();

  media.forEach((item, i) => {
    const tile = document.createElement('div')
    tile.classList.add('tile');

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = item.thumbnail_url || item.media_url;
    figure.appendChild(img);

    const caption = document.createElement('figcaption');
    caption.textContent = item.caption;
    figure.appendChild(caption);
    tile.appendChild(figure);

    fragment.appendChild(tile);
  });

  if (insert) {
    container.insertBefore(fragment, null);
  } else {
    container.appendChild(fragment);
  }
}
