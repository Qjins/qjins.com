/**
 * 서브도메인 규칙:
 *   app.qjins.com — 실제 서비스 (서비스마다 이름 붙임, 예: todo.qjins.com)
 *   lab.qjins.com — 실험, 데모, 프로토타입
 *   api.qjins.com — 공용 API
 *
 * 서비스 추가 = 이 배열에 항목 하나. 홈과 works가 이걸 읽어서 렌더링한다.
 */
export type Zone = 'app' | 'lab' | 'api';
export type ServiceStatus = 'live' | 'wip' | 'archived';

export interface Service {
  name: string;
  description: string;
  url: string;
  zone: Zone;
  status: ServiceStatus;
}

export const services: Service[] = [
  // 예시 — 첫 서비스가 생기면 주석을 풀고 값을 바꾸세요:
  // {
  //   name: 'pulse',
  //   description: '데이터 파이프라인 상태 대시보드',
  //   url: 'https://pulse.qjins.com',
  //   zone: 'app',
  //   status: 'wip',
  // },
];
