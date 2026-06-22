"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

type Percent = `${number}%`;

export type RetroMenuItemId =
  | "match_buddies"
  | "sortile_cluster"
  | "vet_nut"
  | "pirate_squid"
  | "pegiquiz";

type PercentBox = {
  top: Percent;
  left: Percent;
  width: Percent;
};

export type RetroMenuItem = {
  id: RetroMenuItemId;
  projectId: string;
  alt: string;
  imageSrc: string;
  imageBox: PercentBox;
  hitbox: PercentBox & {
    height: Percent;
  };
  arrowTop: Percent;
};

type RetroMenuProps = {
  onItemClick?: (item: RetroMenuItem) => void;
};

const asset = (fileName: string) => `/assets/${encodeURIComponent(fileName)}`;

const backgroundSrc = asset("Portfolio 3 Figma Menu Background.png");
const titleSrc = asset("main menu.png");
const arrowSrc = asset("\u2192.png");

const menuItems: RetroMenuItem[] = [
  {
    id: "match_buddies",
    projectId: "match-buddies",
    alt: "Match Buddies Playard Studio",
    imageSrc: asset("match buddies (playard studio).png"),
    // Tweak imageBox top/left/width to fine-tune the visible PNG placement.
    imageBox: { top: "36.5%", left: "15.4%", width: "78.8%" },
    // Tweak hitbox coordinates separately if you want larger click targets.
    hitbox: { top: "35.2%", left: "13.2%", width: "82%", height: "8.5%" },
    // Tweak arrowTop to align the cursor PNG with this row.
    arrowTop: "36.6%",
  },
  {
    id: "sortile_cluster",
    projectId: "sortile-cluster",
    alt: "Sortile Cluster Playard Studio",
    imageSrc: asset("sortile cluster (playard studio).png"),
    imageBox: { top: "47.8%", left: "15.4%", width: "81.6%" },
    hitbox: { top: "46.6%", left: "13.2%", width: "84%", height: "8.5%" },
    arrowTop: "47.9%",
  },
  {
    id: "vet_nut",
    projectId: "vet-nut",
    alt: "Vet Nut",
    imageSrc: asset("vet nut.png"),
    imageBox: { top: "59.2%", left: "15.4%", width: "23.2%" },
    hitbox: { top: "58%", left: "13.2%", width: "34%", height: "8.5%" },
    arrowTop: "59.3%",
  },
  {
    id: "pirate_squid",
    projectId: "pirate-squid",
    alt: "Pirate Squid",
    imageSrc: asset("pirate squid.png"),
    imageBox: { top: "70.4%", left: "15.4%", width: "32.4%" },
    hitbox: { top: "69.2%", left: "13.2%", width: "42%", height: "8.5%" },
    arrowTop: "70.5%",
  },
  {
    id: "pegiquiz",
    projectId: "pegiquiz",
    alt: "Pegiquiz",
    imageSrc: asset("pegiquiz.png"),
    imageBox: { top: "81.8%", left: "15.4%", width: "23.8%" },
    hitbox: { top: "80.6%", left: "13.2%", width: "34%", height: "8.5%" },
    arrowTop: "81.9%",
  },
];

export default function RetroMenu({ onItemClick }: RetroMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const hoveredItem = menuItems[hoveredIndex] ?? menuItems[0];

  const handleClick = (item: RetroMenuItem) => {
    console.log("Retro menu item clicked:", item.id);
    onItemClick?.(item);
  };

  return (
    <div className="retro-menu relative mx-auto aspect-video w-full overflow-hidden bg-white">
      <Image
        src={backgroundSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 object-cover"
      />

      <div className="retro-menu-crt absolute">
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: "14.2%",
            left: "50%",
            width: "78%",
            transform: "translateX(-50%)",
          } satisfies CSSProperties}
        >
          {/* Tweak title width/top above to align main menu.png with the CRT. */}
          <Image
            src={titleSrc}
            alt="Main menu"
            width={1062}
            height={210}
            priority
            className="h-auto w-full object-contain"
          />
        </div>

        <div
          className="absolute"
          style={{
            top: hoveredItem.arrowTop,
            left: "9.8%",
            width: "4.7%",
          }}
        >
          {/* Tweak left/width above to align the arrow PNG with the menu rows. */}
          <Image
            src={arrowSrc}
            alt=""
            width={122}
            height={100}
            priority
            className="h-auto w-full object-contain"
          />
        </div>

        {menuItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={item.alt}
            aria-pressed={index === hoveredIndex}
            className="absolute border-0 bg-transparent p-0"
            style={item.hitbox as CSSProperties}
            onMouseEnter={() => setHoveredIndex(index)}
            onFocus={() => setHoveredIndex(index)}
            onClick={() => handleClick(item)}
          />
        ))}

        {menuItems.map((item) => (
          <div
            key={`${item.id}-image`}
            className="pointer-events-none absolute"
            style={item.imageBox as CSSProperties}
          >
            <Image
              src={item.imageSrc}
              alt=""
              width={980}
              height={100}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
