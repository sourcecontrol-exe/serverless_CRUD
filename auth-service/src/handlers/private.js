export async function handler(event, context) {
  return {
    statusCode: 200,
    headers: {
        /* Required for CORS support to work */
      'Access-Control-Allow-Origin': '*',
        /* Required for cookies, authorization headers with HTTPS */
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      message: "hello this is me form another side",
      event,
      context,
    }),
  };
}
