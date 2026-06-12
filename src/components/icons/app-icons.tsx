import type { SVGProps } from "react";

type AppIconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string;
  mono?: boolean;
};

export function WhatsAppIcon({
  size = 24,
  title = "WhatsApp",
  mono = false,
  ...props
}: AppIconProps) {
  const glyphColor = mono ? "currentColor" : "#ffffff";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role={title ? "img" : "presentation"}
      aria-label={title}
      {...props}
    >
      {!mono && <rect width="24" height="24" rx="6" fill="#25D366" />}
      <path
        fill={glyphColor}
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"
      />
    </svg>
  );
}

export function PhoneAppIcon({ size = 24, title = "Call", ...props }: AppIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? "img" : "presentation"} aria-label={title} {...props}>
      <rect width="64" height="64" rx="18" fill="#1ec75d" />
      <path
        fill="#fff"
        d="M43.8 39.6c-1.6-1.3-3.5-2.4-5.3-3.3-1.4-.7-2.7-.4-3.6.8l-1.4 1.8c-.5.7-1.4.9-2.2.6-3.9-1.6-7-4.7-8.6-8.6-.3-.8-.1-1.7.6-2.2l1.8-1.4c1.2-.9 1.5-2.2.8-3.6-.9-1.8-2-3.7-3.3-5.3-1-1.2-2.6-1.6-4-.9l-3.2 1.5c-1.4.7-2.2 2.2-1.9 3.7 1.8 12.3 11.5 22 23.8 23.8 1.5.2 3-.6 3.7-1.9l1.5-3.2c.7-1.4.3-3-1-4Z"
      />
    </svg>
  );
}

export function MessageAppIcon({ size = 24, title = "Message", ...props }: AppIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? "img" : "presentation"} aria-label={title} {...props}>
      <rect width="64" height="64" rx="18" fill="#0a84ff" />
      <path
        fill="#fff"
        d="M32 14c-11 0-20 7.2-20 16.2 0 5.3 3.2 10 8.1 13L18.5 51l8.5-4.8c1.6.3 3.3.5 5 .5 11 0 20-7.2 20-16.2S43 14 32 14Zm-8.6 19.2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm8.6 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm8.6 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"
      />
    </svg>
  );
}

export function GoogleMapsIcon({ size = 24, title = "Map", ...props }: AppIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? "img" : "presentation"} aria-label={title} {...props}>
      <rect width="64" height="64" rx="18" fill="#ffffff" />
      <path fill="#34a853" d="M14 46.5 31 14l8 11-16 27H17a3 3 0 0 1-3-3v-2.5Z" />
      <path fill="#fbbc04" d="M39 25 31 14h16a3 3 0 0 1 3 3v12l-11-4Z" />
      <path fill="#4285f4" d="M23 52h24a3 3 0 0 0 3-3V29L39 25 23 52Z" />
      <path fill="#ea4335" d="M32 10c-8.1 0-14.7 6.4-14.7 14.3 0 10.5 14.7 27.7 14.7 27.7s14.7-17.2 14.7-27.7C46.7 16.4 40.1 10 32 10Z" />
      <circle cx="32" cy="24.5" r="5.2" fill="#fff" />
    </svg>
  );
}

export function MobileMoneyIcon({ size = 24, title = "Payment", ...props }: AppIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role={title ? "img" : "presentation"} aria-label={title} {...props}>
      <rect width="64" height="64" rx="18" fill="#ffcc22" />
      <rect x="13" y="17" width="38" height="30" rx="5" fill="#101010" />
      <path fill="#ff5a2c" d="M18 25h28v5H18z" />
      <path fill="#fff" d="M18 35h13v4H18zM35 35h11v4H35z" />
      <circle cx="46" cy="44" r="7" fill="#25D366" />
      <path fill="#fff" d="m43.2 44.2 1.8 1.9 4-4 1.5 1.5-5.5 5.4-3.3-3.3 1.5-1.5Z" />
    </svg>
  );
}