// 상품명에서 파일명으로 변환하는 함수
// 1. 공백 그대로 두고, 2. 특수문자만 제거
export function prizeNameToImageFile(name: string): string {
  // 특수문자만 제거, 공백은 유지
  return `/${name.replace(/[^\w가-힣 ]/g, "")}.png`;
}
