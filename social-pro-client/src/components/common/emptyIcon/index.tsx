import SanitizedHTML from '../sanitizeText';

interface EmptyIconProps {
  emptyEntity: string;
}
const EmptyIcon = ({ emptyEntity }: EmptyIconProps) => (
  <div className="flex flex-col justify-center items-center h-64">
    <div className="text-gray-400 mb-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    </div>
    <p className="text-xl font-medium text-gray-500">
      <SanitizedHTML htmlContent={`${emptyEntity} không tồn tại`} />
    </p>
    <p className="text-gray-400 mt-1">Vui lòng thử tìm kiếm với những tiêu chí khác</p>
  </div>
);

export default EmptyIcon;
