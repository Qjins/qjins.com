/**
 * 서브도메인 규칙:
 *   <이름>.qjins.com — 실제 서비스 (zone: 'app', 서비스마다 이름 붙임)
 *   lab.qjins.com    — 실험, 데모, 프로토타입 (zone: 'lab')
 *   api.qjins.com    — 공용 API (zone: 'api')
 *
 * 서비스 추가 = 이 배열에 항목 하나. 홈(한/영)이 이걸 읽어서 렌더링한다.
 */
export type Zone = 'app' | 'lab' | 'api';
export type ServiceStatus = 'live' | 'wip' | 'archived';

export interface Service {
  name: string;
  description: { ko: string; en: string };
  url: string;
  /** works 슬러그 — 있으면 카드가 서비스 대신 works 상세로 연결된다 */
  work?: string;
  zone: Zone;
  status: ServiceStatus;
}

export const services: Service[] = [
  {
    name: 'QRA',
    description: {
      ko: '여러 컴퓨터를 브라우저에서 관리하고 원격 화면을 조작하는 웹 기반 원격 제어 플랫폼',
      en: 'Web-based remote access platform — manage machines and control their screens from the browser',
    },
    url: 'https://qra.qjins.com',
    work: 'qra',
    zone: 'app',
    status: 'live',
  },
];
