addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const awemeId = url.searchParams.get('aweme_id');
  if (!awemeId) {
    return new Response('Missing aweme_id parameter', { status: 400 });
  }
  const apiUrl = `https://douyin.wtf/api/douyin/web/fetch_one_video?aweme_id=${awemeId}`;

  const apiResponse = await fetch(apiUrl, {
    headers: {
      'accept': 'application/json'
    }
  });

  const response = new Response(apiResponse.body, apiResponse);
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}
