export const provinces: Array<{
  province: string;
  districts: Array<{
    name: string;
    population: number;
  }>;
}> = [
  {
    province: "محافظة حلب",
    districts: [
      { name: "الباب", population: 145000 },
      { name: "السفيرة", population: 107000 },
      { name: "عفرين", population: 80000 },
      { name: "منبج", population: 72000 },
      { name: "أعزاز", population: 64000 },
      { name: "عين العرب", population: 55000 },
      { name: "جرابلس", population: 26000 },
    ],
  },
  {
    province: "محافظة ريف دمشق",
    districts: [
      { name: "دوما", population: 118000 },
      { name: "داريا", population: 76000 },
      { name: "التل", population: 60000 },
      { name: "النبك", population: 53000 },
      { name: "يبرود", population: 43000 },
      { name: "الزبداني", population: 31000 },
      { name: "قَطَنَا", population: 19000 },
      { name: "القطيفة", population: 17000 },
      { name: "عدرا", population: 50000 },
    ],
  },
  {
    province: "محافظة دمشق",
    districts: [{ name: "جوبر", population: 110000 }],
  },
  {
    province: "محافظة حماة",
    districts: [
      { name: "سلمية", population: 103000 },
      { name: "مصياف", population: 35000 },
      { name: "محردة", population: 22000 },
      { name: "السقيلبيه", population: 18000 },
      { name: "سلحب", population: 21000 },
    ],
  },
  {
    province: "محافظة الحسكة",
    districts: [
      { name: "القامشلي", population: 88000 },
      { name: "رأس العين", population: 24000 },
      { name: "المالكية", population: 19000 },
    ],
  },
  {
    province: "محافظة إدلب",
    districts: [
      { name: "معرة النعمان", population: 81000 },
      { name: "أريحة", population: 55000 },
      { name: "جسر الشغور", population: 42000 },
      { name: "معر تمصرين", population: 37000 },
      { name: "حارم", population: 22000 },
    ],
  },
  {
    province: "محافظة اللاذقية",
    districts: [
      { name: "جبلة", population: 71000 },
      { name: "الحفة", population: 18000 },
      { name: "القرداحة", population: 17000 },
    ],
  },
  {
    province: "محافظة الرقة",
    districts: [
      { name: "الثورة", population: 65000 },
      { name: "تل أبيض", population: 13000 },
    ],
  },
  {
    province: "محافظة دير الزور",
    districts: [
      { name: "البوكمال", population: 64000 },
      { name: "الميادين", population: 61000 },
    ],
  },
  {
    province: "محافظة حمص",
    districts: [
      { name: "الرستن", population: 59000 },
      { name: "تدمر", population: 56000 },
      { name: "القصير", population: 45000 },
      { name: "تلكلخ", population: 32000 },
      { name: "المخرم", population: 10000 },
    ],
  },
  {
    province: "محافظة طرطوس",
    districts: [
      { name: "الشيخ بدر", population: 48000 },
      { name: "بانياس", population: 42000 },
      { name: "صافيتا", population: 30000 },
      { name: "دريكيش", population: 13000 },
    ],
  },
  {
    province: "محافظة درعا",
    districts: [
      { name: "الصنمين", population: 28000 },
      { name: "ازرع", population: 15000 },
    ],
  },
  {
    province: "محافظة السويداء",
    districts: [{ name: "شهبا", population: 16000 }],
  },
  {
    province: "محافظة القنيطرة",
    districts: [{ name: "فيق", population: 6000 }],
  },
];
