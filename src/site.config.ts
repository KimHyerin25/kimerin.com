// 사이트 전체에서 쓰는 기본 정보. 여기만 고치면 헤더/푸터/홈 소개가 바뀝니다.
export const site = {
  name: 'Nicole Kim',
  title: 'Nicole Kim — Music, Arts & Projects',
  description:
    '보컬과 작곡, VR·메타버스 전시, 그리고 다양한 프로젝트를 오가며 활동하는 Nicole Kim의 포트폴리오.',
  url: 'https://kimerin.com',
  email: 'hello@kimerin.com', // 원하는 연락용 이메일로 바꿔주세요
  intro: [
    '음악과 예술, 그리고 기술 사이에서 활동합니다.',
    '무대에서는 노래하고, 뮤지컬을 위해 곡을 쓰고, VR과 메타버스 공간에서 전시를 만들며, 그 사이의 프로젝트들을 기록합니다.',
  ],
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/' }, // 본인 프로필 URL로 교체
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'YouTube', href: 'https://youtube.com/' },
  ],
};

export const categories = [
  {
    slug: 'music',
    label: 'Music',
    ko: '음악',
    blurb: '보컬, 뮤지컬 작곡, 공연과 음반 작업.',
  },
  {
    slug: 'arts',
    label: 'Arts',
    ko: '예술',
    blurb: 'VR·메타버스 전시, 미디어 아트, 공간 기획.',
  },
  {
    slug: 'project',
    label: 'Project',
    ko: '프로젝트',
    blurb: '협업, 리서치, 그 외 만들고 실험한 것들.',
  },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];
