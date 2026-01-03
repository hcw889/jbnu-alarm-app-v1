import { FiRefreshCw, FiEye, FiEyeOff } from 'react-icons/fi';

interface HomeHeaderProps {
  includeRead: boolean;
  refreshing: boolean;
  onToggleIncludeRead: () => void;
  onRefresh: () => void;
}

export default function HomeHeader({
  includeRead,
  refreshing,
  onToggleIncludeRead,
  onRefresh,
}: HomeHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-100 bg-white px-5">
      <h1 className="text-xl font-bold text-gray-800">📢 전북대 알리미</h1>
      <div className="flex items-center gap-2">
        {/* 읽음 필터 버튼 */}
        <button
          onClick={onToggleIncludeRead}
          className={`rounded-full p-2 transition-all hover:bg-gray-100 ${
            includeRead ? 'text-blue-500' : 'text-gray-600'
          }`}
          aria-label={includeRead ? '읽은 공지 포함 중' : '안 읽은 공지만 보기'}
          title={includeRead ? '읽은 공지도 함께 보는 중' : '안 읽은 공지만 보는 중'}
        >
          {includeRead ? <FiEye size={20} /> : <FiEyeOff size={20} />}
        </button>

        {/* 새로고침 버튼 */}
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className={`rounded-full p-2 transition-all hover:bg-gray-100 ${
            refreshing ? 'animate-spin text-blue-500' : 'text-gray-600'
          }`}
          aria-label="새로고침"
        >
          <FiRefreshCw size={20} />
        </button>
      </div>
    </header>
  );
}
