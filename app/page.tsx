"use client";

import { useEffect, useState } from "react";
import { fetchNotices, triggerCrawl, Notice } from "@/lib/api";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // 한국어 설정
import relativeTime from "dayjs/plugin/relativeTime"; // '방금 전' 기능
import { FiRefreshCw, FiExternalLink } from "react-icons/fi"; // 아이콘

// Dayjs 설정
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // 크롤링 중 표시
  const [tab, setTab] = useState<"all" | "homepage" | "csai">("all");

  // 데이터 가져오기 함수
  const loadNotices = async () => {
    setLoading(true);
    try {
      // MVP라 일단 100개 긁어와서 클라이언트 필터링 (나중엔 API로 필터링 추천)
      const data = await fetchNotices(0, 100);
      setNotices(data);
    } catch (error) {
      console.error("Failed to load notices", error);
    } finally {
      setLoading(false);
    }
  };

  // 수동 크롤링 & 새로고침
  const handleRefresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      await triggerCrawl(); // 1. 크롤링 요청
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 2. 1초 대기 (DB저장 시간 벌기)
      await loadNotices(); // 3. 목록 다시 불러오기
    } catch (error) {
      alert("크롤링 실패!");
    } finally {
      setRefreshing(false);
    }
  };

  // 첫 접속 시 로딩
  useEffect(() => {
    loadNotices();
  }, []);

  // 탭 필터링 로직
  const filteredNotices = notices.filter((notice) => {
    if (tab === "all") return true;
    return notice.category === tab; // 'homepage' or 'csai'
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-10">
      {/* --- 모바일 컨테이너 (앱처럼 보이기) --- */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl border-x border-gray-100 relative">
        {/* 1. 헤더 */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-5 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">📢 전북대 알리미</h1>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`p-2 rounded-full hover:bg-gray-100 transition-all ${
              refreshing ? "animate-spin text-blue-500" : "text-gray-600"
            }`}
          >
            <FiRefreshCw size={20} />
          </button>
        </header>

        {/* 2. 탭 메뉴 */}
        <div className="flex border-b border-gray-100 bg-white">
          {["all", "homepage", "csai"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
                tab === t
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t === "all" ? "전체" : t === "csai" ? "컴인지" : "학교공지"}
              {/* 활성 탭 밑줄 애니메이션 */}
              {tab === t && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-blue-600" />
              )}
            </button>
          ))}
        </div>

        {/* 3. 공지사항 리스트 */}
        <ul className="divide-y divide-gray-50">
          {loading ? (
            // 로딩 스켈레톤 UI
            [...Array(5)].map((_, i) => (
              <li key={i} className="p-5 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/4"></div>
              </li>
            ))
          ) : filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => (
              <li
                key={notice.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <a
                  href={notice.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {/* 카테고리 배지 */}
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase tracking-wider ${
                        notice.category === "csai"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {notice.category.toUpperCase()}
                    </span>
                    {/* 날짜 (오늘이면 빨간색 강조) */}
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      {notice.date}
                      {/* 오늘 날짜랑 같으면 New 표시 */}
                      {notice.date === dayjs().format("YYYY-MM-DD") && (
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      )}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-[15px] font-medium text-gray-800 leading-snug line-clamp-2 mb-1">
                    {notice.title}
                  </h3>

                  {/* 하단 정보 (몇 시간 전) */}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">
                      {dayjs(notice.crawled_at).fromNow()} 수집됨
                    </span>
                    <FiExternalLink className="text-gray-300" size={14} />
                  </div>
                </a>
              </li>
            ))
          ) : (
            // 데이터 없을 때
            <div className="py-20 text-center text-gray-400">
              <p>표시할 공지사항이 없어요 😢</p>
              <button
                onClick={handleRefresh}
                className="text-blue-500 text-sm mt-2 underline"
              >
                데이터 새로고침
              </button>
            </div>
          )}
        </ul>
      </div>
    </main>
  );
}
