/**
 * works 콘텐츠 계약 (ko/en 공통):
 * 1) 네 개의 H2 섹션(배경/설계/시행착오/결과)이 모두 있어야 빌드가 통과한다.
 * 2) 시행착오 섹션은 <aside class="failed">로 감싼다.
 */
const CONTRACTS = {
  ko: {
    required: ['배경', '설계', '시행착오', '결과'],
    failed: '시행착오',
  },
  en: {
    required: ['Background', 'Design', 'Trial and error', 'Outcome'],
    failed: 'Trial and error',
  },
};

const normalize = (s) => s.replace(/[‘’]/g, "'").trim();

function headingText(node) {
  let out = '';
  for (const child of node.children ?? []) {
    if (child.type === 'text' || child.type === 'inlineCode') out += child.value;
    else out += headingText(child);
  }
  return normalize(out);
}

export function worksContract() {
  return (tree, file) => {
    const path = file.history?.[0] ?? file.path ?? '';
    if (!path.includes('/src/content/works/')) return;
    const contract = path.includes('/works/en/') ? CONTRACTS.en : CONTRACTS.ko;

    const h2 = (n) => n.type === 'heading' && n.depth === 2;
    const titles = tree.children.filter(h2).map(headingText);

    for (const required of contract.required) {
      if (!titles.some((t) => t.includes(normalize(required)))) {
        throw new Error(
          `[works 계약 위반] ${path}\n` +
            `  "## ${required}" 섹션이 없습니다. works 문서는 네 섹션이 전부 있어야 합니다:\n` +
            contract.required.map((s) => `  ## ${s}`).join('\n')
        );
      }
    }

    const start = tree.children.findIndex((n) => h2(n) && headingText(n).includes(normalize(contract.failed)));
    if (start === -1) return;
    let end = tree.children.length;
    for (let i = start + 1; i < tree.children.length; i++) {
      if (h2(tree.children[i])) { end = i; break; }
    }
    const section = tree.children.slice(start, end);
    tree.children.splice(start, end - start, {
      type: 'failedSection',
      data: { hName: 'aside', hProperties: { className: ['failed'] } },
      children: section,
    });
  };
}
