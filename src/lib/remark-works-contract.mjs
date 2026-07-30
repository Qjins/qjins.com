/**
 * works 콘텐츠 계약:
 * 1) 네 개의 H2 섹션이 모두 있어야 빌드가 통과한다. 특히 "뭐가 안 됐나"가 없으면 실패.
 * 2) "뭐가 안 됐나" 섹션은 <aside class="failed">로 감싸서 눈에 띄게 렌더링한다.
 */
const REQUIRED = ['무슨 문제였나', '어떤 접근을 골랐나', '뭐가 안 됐나', '결국 어떻게 됐나'];
const FAILED = '뭐가 안 됐나';

function headingText(node) {
  let out = '';
  for (const child of node.children ?? []) {
    if (child.type === 'text' || child.type === 'inlineCode') out += child.value;
    else out += headingText(child);
  }
  return out.trim();
}

export function worksContract() {
  return (tree, file) => {
    const path = file.history?.[0] ?? file.path ?? '';
    if (!path.includes('/src/content/works/')) return;

    const h2 = (n) => n.type === 'heading' && n.depth === 2;
    const titles = tree.children.filter(h2).map(headingText);

    for (const required of REQUIRED) {
      if (!titles.some((t) => t.includes(required))) {
        throw new Error(
          `[works 계약 위반] ${path}\n` +
            `  "## ${required}" 섹션이 없습니다. works 문서는 네 섹션이 전부 있어야 합니다:\n` +
            REQUIRED.map((s) => `  ## ${s}`).join('\n')
        );
      }
    }

    const start = tree.children.findIndex((n) => h2(n) && headingText(n).includes(FAILED));
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
