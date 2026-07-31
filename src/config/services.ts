/**
 * 서브도메인 규칙:
 *   <이름>.qjins.com — 실제 서비스 (zone: 'app', 서비스마다 이름 붙임)
 *   lab.qjins.com    — 실험, 데모, 프로토타입 (zone: 'lab')
 *   api.qjins.com    — 공용 API (zone: 'api')
 *
 * 서비스 목록은 src/data/services.json (CMS에서 편집 가능).
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

import data from '../data/services.json';

export const services: Service[] = data.list as Service[];
