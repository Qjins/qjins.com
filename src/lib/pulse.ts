import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface Pulse {
  updated: string;
  label: string;
  values: number[];
  ok: boolean;
}

/** pulse.json을 읽는다. 없거나 깨져도 빌드가 죽지 않게 fallback을 돌려준다. */
export function loadPulse(): Pulse {
  try {
    // 프로젝트 루트 기준 절대경로 — 빌드 시 이 모듈은 번들 청크로 옮겨져서
    // import.meta.url 상대경로가 깨진다 (로컬은 우연히 통과해도 CI에서 깨짐)
    const raw = readFileSync(join(process.cwd(), 'src/data/pulse.json'), 'utf-8');
    const data = JSON.parse(raw);
    if (!Array.isArray(data.values) || data.values.length < 2 || !data.values.every((v: unknown) => typeof v === 'number')) {
      throw new Error('invalid shape');
    }
    return { updated: String(data.updated ?? ''), label: String(data.label ?? ''), values: data.values, ok: true };
  } catch {
    return { updated: '', label: 'no signal', values: Array(30).fill(1), ok: false };
  }
}

/** 값 배열 → SVG polyline points 문자열 */
export function toPoints(values: number[], width: number, height: number, pad = 4): string {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = (width - pad * 2) / (values.length - 1);
  return values
    .map((v, i) => {
      const x = pad + i * step;
      const y = height - pad - ((v - min) / span) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}
