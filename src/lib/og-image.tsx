export const ogImageSize = { width: 1200, height: 630 };

interface OgImageContentProps {
  badge: string;
  title: string;
  titleAccent?: string;
  subtitle: string;
  tags?: string[];
}

export function OgImageContent({ badge, title, titleAccent, subtitle, tags = [] }: OgImageContentProps) {
  return (
    <div
      style={{
        background: "#14100b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(202,164,86, 0.18) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(202, 164, 86, 0.12) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(202,164,86, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(202,164,86, 0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          padding: "0 80px",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            color: "#caa456",
            letterSpacing: "3px",
            textTransform: "uppercase",
            padding: "6px 16px",
            borderRadius: "9999px",
            border: "1px solid rgba(202,164,86, 0.4)",
            background: "rgba(202,164,86, 0.08)",
            fontWeight: "600",
          }}
        >
          {badge}
        </div>

        <div
          style={{
            fontSize: titleAccent ? "82px" : "58px",
            fontWeight: "bold",
            color: "#ffffff",
            letterSpacing: "-2px",
            lineHeight: titleAccent ? "0.88" : "1.1",
            textAlign: "center",
          }}
        >
          {title}
        </div>
        {titleAccent && (
          <div
            style={{
              fontSize: "82px",
              fontWeight: "bold",
              color: "#caa456",
              letterSpacing: "-2px",
              lineHeight: "0.88",
              textAlign: "center",
            }}
          >
            {titleAccent}
          </div>
        )}

        <div
          style={{
            fontSize: "20px",
            color: "#d6d2c9",
            marginTop: "16px",
            maxWidth: "760px",
            textAlign: "center",
            lineHeight: "1.4",
            fontWeight: "500",
          }}
        >
          {subtitle}
        </div>

        {tags.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "12px",
            }}
          >
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  fontSize: "12px",
                  color: "#ece9e4",
                  padding: "6px 14px",
                  border: "1px solid rgba(202,164,86, 0.3)",
                  borderRadius: "9999px",
                  background: "rgba(20, 16, 11, 0.7)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
