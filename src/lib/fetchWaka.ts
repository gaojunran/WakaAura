export function fetchWaka(pathArgs: string[], queryArgs: string[]) {
  return async () =>
    await fetch(
      `https://wakatime.com/api/v1/users/current/${pathArgs.join('/')}?${queryArgs.join('&')}`,
      {
        headers: {
          Authorization: `Basic ${btoa(process.env.WAKATIME_API_KEY!)}`,
        },
      }
    );
}
