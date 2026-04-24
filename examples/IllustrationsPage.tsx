import { useMemo, useState } from "react";
import ghost from "../assets/illustrations/ghost.svg";
import ghostSad from "../assets/illustrations/ghost-sad.svg";
import celebration from "../assets/illustrations/celebration.svg";
import send from "../assets/illustrations/send.svg";
import trash from "../assets/illustrations/trash.svg";
import rocket from "../assets/illustrations/rocket.svg";
import user from "../assets/illustrations/user.svg";
import coins from "../assets/illustrations/coins.svg";
import error from "../assets/illustrations/error.svg";
import cloudCheck from "../assets/illustrations/cloud-check.svg";
import success from "../assets/illustrations/success.svg";
import reject from "../assets/illustrations/reject.svg";

type IllustrationEntry = {
  name: string;
  src: string;
};

const ALL_ILLUSTRATIONS: IllustrationEntry[] = [
  { name: "ghost", src: ghost },
  { name: "ghost-sad", src: ghostSad },
  { name: "celebration", src: celebration },
  { name: "send", src: send },
  { name: "trash", src: trash },
  { name: "rocket", src: rocket },
  { name: "user", src: user },
  { name: "coins", src: coins },
  { name: "error", src: error },
  { name: "cloud-check", src: cloudCheck },
  { name: "success", src: success },
  { name: "reject", src: reject },
];

const SIZE_OPTIONS = [120, 160, 240] as const;
type IllusSize = (typeof SIZE_OPTIONS)[number];

export function IllustrationsPage() {
  const [size, setSize] = useState<IllusSize>(160);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL_ILLUSTRATIONS;
    return ALL_ILLUSTRATIONS.filter((i) => i.name.includes(q));
  }, [query]);

  return (
    <>
      <section className="page-section">
        <h2>Illustrations</h2>
        <p style={{ color: "#51596A", marginTop: 0 }}>
          {ALL_ILLUSTRATIONS.length} brand illustrations with multi-color stroke detail. Unlike
          icons, these are not monochrome — the palette is fixed (brand blue, pink, green, purple)
          and should not be recolored. Files live in{" "}
          <code>assets/illustrations/*.svg</code>.
        </p>
      </section>

      <section className="page-section">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
            padding: 16,
            background: "#f7f8fc",
            border: "1px solid #d5d7db",
            borderRadius: 6,
            fontFamily: "Rubik, sans-serif",
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ color: "#51596A" }}>Search</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. ghost, cloud, success"
              style={{
                fontFamily: "inherit",
                fontSize: 13,
                padding: "6px 10px",
                border: "1px solid #d5d7db",
                borderRadius: 4,
                background: "#ffffff",
                minWidth: 220,
              }}
            />
          </label>

          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{ color: "#51596A" }}>Size</span>
            <div
              style={{
                display: "inline-flex",
                border: "1px solid #d5d7db",
                borderRadius: 4,
                overflow: "hidden",
                background: "#ffffff",
              }}
            >
              {SIZE_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  style={{
                    padding: "6px 12px",
                    border: "none",
                    borderLeft: s === SIZE_OPTIONS[0] ? "none" : "1px solid #d5d7db",
                    background: s === size ? "#2E384D" : "transparent",
                    color: s === size ? "#ffffff" : "#2E384D",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 13,
                    fontWeight: s === size ? 500 : 400,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <span style={{ color: "#51596A", fontSize: 13, marginLeft: "auto" }}>
            Showing {filtered.length} of {ALL_ILLUSTRATIONS.length}
          </span>
        </div>
      </section>

      <section className="page-section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${size + 40}px, 1fr))`,
            gap: 16,
          }}
        >
          {filtered.map(({ name, src }) => (
            <IllustrationTile key={name} name={name} src={src} size={size} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div
            style={{
              padding: 32,
              textAlign: "center",
              color: "#51596A",
              fontFamily: "Rubik, sans-serif",
              fontSize: 14,
              border: "1px dashed #d5d7db",
              borderRadius: 6,
            }}
          >
            No illustrations match “{query}”.
          </div>
        )}
      </section>
    </>
  );
}

function IllustrationTile({
  name,
  src,
  size,
}: {
  name: string;
  src: string;
  size: number;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: 16,
        background: "#ffffff",
        border: "1px solid #d5d7db",
        borderRadius: 6,
      }}
      title={name}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
        }}
      >
        <img
          src={src}
          alt={name}
          width={size}
          height={size}
          style={{ width: size, height: size, objectFit: "contain" }}
        />
      </div>
      <span
        style={{
          fontSize: 12,
          color: "#51596A",
          fontFamily: "Rubik, sans-serif",
          textAlign: "center",
          wordBreak: "break-word",
          lineHeight: 1.3,
        }}
      >
        {name}
      </span>
    </div>
  );
}
