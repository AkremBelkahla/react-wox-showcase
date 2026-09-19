// Curated Unsplash nature photo IDs used across the showcase
const NATURE_PHOTO_IDS = [
  'photo-1506905925346-21bda4d32df4',
  'photo-1464822759023-fed622ff2c3b',
  'photo-1441974231531-c6227db76b6e',
  'photo-1470071459604-3b5ec3a7fe05',
  'photo-1501785888041-af3ef285b470',
  'photo-1519681393784-d120267933ba',
  'photo-1472214103451-9374bd1c798e',
  'photo-1447752875215-b2761acb3c5d',
  'photo-1475924156734-496f6cac6ec1',
  'photo-1497436072909-60f360e1d4b1',
  'photo-1469474968028-56623f02e42e',
  'photo-1470770841072-f978cf4d019e',
  'photo-1439066615861-d1af74d74000',
  'photo-1433086966358-54859d0ed716',
  'photo-1426604966848-d7adac402bff',
  'photo-1418065460487-3e41a6c84dc5',
  'photo-1518837695005-2083093ee35b',
  'photo-1507525428034-b723cf961d3e',
  'photo-1476514525535-07fb3b4ae5f1',
  'photo-1523712999610-f77fbcfc3843',
  'photo-1458668383970-8ddd3927deed',
  'photo-1505142468610-359e7d316be0',
  'photo-1518098268026-4e89f1a2cd8e',
  'photo-1465146344425-f00d5f5c8f07',
  'photo-1508739773434-c26b3d09e071',
  'photo-1502082553048-f009c37129b9',
  'photo-1518495973542-4542c06a5843',
  'photo-1483728642387-6c3bdd6c93e5',
  'photo-1470252649378-9c29740c9fa8',
  'photo-1493246507139-91e8fad9978e',
  'photo-1522383225653-ed111181a951',
  'photo-1542224566-6e85f2e6772f',
  'photo-1532274402911-5a369e4c4bb5',
];

export const natureImage = (width: number, height: number, index = 0): string => {
  const id = NATURE_PHOTO_IDS[Math.abs(index) % NATURE_PHOTO_IDS.length];
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
};
