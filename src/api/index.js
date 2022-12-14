import { createClient } from 'contentful';

export const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
});

export const fetchImages = async () => {
  const { items } = await client.getEntries({
    content_type: 'xray',
    select: 'fields',
  });

  return { items };
};
