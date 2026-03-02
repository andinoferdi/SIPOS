import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";

type StyledQrProps = {
  value: string;
  size?: number;
  className?: string;
  variant?: "default" | "compact";
  isExpired?: boolean;
  secondsLeft?: number;
  totalSeconds?: number;
};

const RING_ANIMATION = `
  @keyframes qr-pulse {
    0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
    50%       { opacity: 0.12; transform: translate(-50%, -50%) scale(1.1); }
  }
  .qr-pulse { animation: qr-pulse 2.5s ease-in-out infinite; }
`;

function getStatusStyle(
  secondsLeft: number | undefined,
  isExpired: boolean,
): { color: string; glow: string } {
  if (isExpired) {
    return {
      color: "var(--color-qr-expired)",
      glow: "var(--color-qr-shadow-soft)",
    };
  }
  if (secondsLeft === undefined) {
    return {
      color: "var(--color-qr-success)",
      glow: "var(--color-qr-success-glow)",
    };
  }
  if (secondsLeft < 15) {
    return {
      color: "var(--color-qr-danger)",
      glow: "var(--color-qr-danger-glow)",
    };
  }
  if (secondsLeft < 30) {
    return {
      color: "var(--color-qr-warning)",
      glow: "var(--color-qr-warning-glow)",
    };
  }
  return {
    color: "var(--color-qr-success)",
    glow: "var(--color-qr-success-glow)",
  };
}

export default function StyledQr({
  value,
  size = 190,
  className,
  variant = "default",
  isExpired = false,
  secondsLeft,
  totalSeconds = 120,
}: StyledQrProps) {
  const hasRing = secondsLeft !== undefined;
  const progress = hasRing
    ? Math.max(0, Math.min(1, secondsLeft! / totalSeconds))
    : 1;

  const pad = variant === "compact" ? 10 : 14;
  const frameSize = size + pad * 2;
  const ringGap = variant === "compact" ? 10 : 14;
  const ringSize = frameSize + ringGap * 2;
  const cx = ringSize / 2;
  const cy = ringSize / 2;
  const radius = ringSize / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1 - progress);

  const { color, glow } = getStatusStyle(secondsLeft, isExpired);

  return (
    <>
      <style suppressHydrationWarning>{RING_ANIMATION}</style>

      <div
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: ringSize, height: ringSize }}
      >
        {/* Glow bloom */}
        {!isExpired && (
          <div
            className="qr-pulse pointer-events-none absolute rounded-full"
            aria-hidden="true"
            style={{
              width: frameSize + 40,
              height: frameSize + 40,
              background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
              left: "50%",
              top: "50%",
            }}
          />
        )}

        {/* Arc ring */}
        {hasRing && (
          <svg
            className="pointer-events-none absolute inset-0"
            width={ringSize}
            height={ringSize}
            viewBox={`0 0 ${ringSize} ${ringSize}`}
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              strokeWidth={2}
              stroke="var(--color-qr-ring-track)"
            />
            <g transform={`rotate(-90 ${cx} ${cy})`}>
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                strokeWidth={2}
                stroke={color}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashoffset}
                style={{
                  transition: "stroke-dashoffset 1s linear, stroke 0.5s ease",
                  filter: isExpired ? "none" : `drop-shadow(0 0 3px ${glow})`,
                }}
              />
            </g>
          </svg>
        )}

        {/* QR frame */}
        <div
          role="img"
          aria-label="QR code"
          className={cn(
            "relative inline-flex rounded-2xl",
            variant === "compact" ? "p-2.5" : "p-3.5"
          )}
          style={{
            background: "var(--color-qr-glass-bg)",
            border: "1px solid var(--color-qr-glass-border)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: isExpired
              ? "0 4px 24px -4px var(--color-qr-shadow-soft)"
              : `0 8px 32px -8px var(--color-qr-shadow-strong), 0 0 16px -4px ${glow}`,
          }}
        >
          {/* White surface */}
          <div
            className="relative overflow-hidden rounded-[14px]"
            style={{
              background: "var(--color-qr-surface-bg)",
              border: "1px solid var(--color-qr-surface-border)",
            }}
          >
            <QRCodeSVG
              value={value || " "}
              size={size}
              level="H"
              marginSize={4}
              fgColor={isExpired ? "var(--color-qr-fg-expired)" : "var(--color-qr-fg)"}
              bgColor="transparent"
            />

            {isExpired && (
              <div
                className="absolute inset-0 flex items-center justify-center rounded-[13px]"
                style={{ background: "var(--color-qr-surface-overlay)" }}
              >
                <span
                  className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background: "var(--color-qr-badge-bg)",
                    color: "var(--color-qr-on-color)",
                    boxShadow: "0 2px 10px var(--color-qr-badge-shadow)",
                  }}
                >
                  Expired
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Seconds badge */}
        {hasRing && !isExpired && secondsLeft !== undefined && (
          <div
            className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums"
            aria-label={`${secondsLeft} seconds remaining`}
            style={{
              background: color,
              color: "var(--color-qr-on-color)",
              boxShadow: `0 2px 8px ${glow}`,
            }}
          >
            {secondsLeft}s
          </div>
        )}
      </div>
    </>
  );
}
