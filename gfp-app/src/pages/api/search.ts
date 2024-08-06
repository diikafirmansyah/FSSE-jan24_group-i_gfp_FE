// pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  id: number;
  name: string;
};

type SearchResponse = Data[];

export default async function handler(req: NextApiRequest, res: NextApiResponse<SearchResponse>) {
  const data: Data[] = [
    { id: 1, name: 'Cupang' },
    { id: 2, name: 'Louhan' },
    { id: 3, name: 'Arwana' },
    // Tambahkan lebih banyak data di sini
  ];

  const query = (req.query.q as string).toLowerCase();
  const results = data.filter(item => item.name.toLowerCase().includes(query));

  res.status(200).json(results);
}
