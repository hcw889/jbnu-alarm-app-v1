import axios from "axios";

// 백엔드 API 주소 (나중에 배포할 때 여기만 바꾸면 됨)
const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5초 이상 응답 없으면 에러
  headers: {
    "Content-Type": "application/json",
  },
});

// 공지사항 데이터 타입 정의 (백엔드 모델과 일치)
export interface Notice {
  id: number;
  title: string;
  link: string;
  date: string;
  category: string;
  crawled_at: string;
}

// API 함수들 정리
export const fetchNotices = async (page: number = 0, limit: number = 20) => {
  const response = await api.get<Notice[]>("/notices", {
    params: { skip: page * limit, limit },
  });
  return response.data;
};

// 수동 크롤링 트리거
export const triggerCrawl = async () => {
  return api.post("/notices/crawl");
};

export default api;
