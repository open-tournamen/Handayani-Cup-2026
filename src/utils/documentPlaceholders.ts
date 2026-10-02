/**
 * Generates lightweight, clean sample SVG Data URLs for KTP & BPJS Ketenagakerjaan
 * so initial sample teams have realistic document previews out-of-the-box.
 */

export function generateSampleKtpDataUrl(name: string, nik: string, birthDate: string): string {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
  <defs>
    <linearGradient id="ktpBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="50%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#0369a1" />
    </linearGradient>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Card Background -->
  <rect width="600" height="380" rx="20" fill="url(#ktpBg)" />
  <rect width="600" height="380" rx="20" fill="url(#grid)" />

  <!-- Header -->
  <text x="300" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">REPUBLIK INDONESIA</text>
  <text x="300" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#f0f9ff" text-anchor="middle" letter-spacing="1">PROVINSI DKI JAKARTA / KARTU IDENTITAS</text>

  <!-- NIK Bar -->
  <rect x="40" y="74" width="520" height="32" rx="6" fill="rgba(15, 23, 42, 0.4)" />
  <text x="55" y="96" font-family="monospace, monospace" font-size="18" font-weight="bold" fill="#fef08a" letter-spacing="3">NIK : ${nik || '3174000000000000'}</text>

  <!-- Details Area -->
  <g font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#ffffff" font-weight="bold">
    <text x="50" y="135">Nama</text>
    <text x="160" y="135">: ${name.toUpperCase() || 'PEMAIN'}</text>

    <text x="50" y="165">Tempat/Tgl Lahir</text>
    <text x="160" y="165">: JAKARTA, ${birthDate || '2009-01-01'}</text>

    <text x="50" y="195">Jenis Kelamin</text>
    <text x="160" y="195">: LAKI-LAKI</text>

    <text x="50" y="225">Alamat</text>
    <text x="160" y="225">: JL. GARUDA NUSANTARA NO. 10</text>

    <text x="50" y="255">Agama</text>
    <text x="160" y="255">: ISLAM</text>

    <text x="50" y="285">Status / Pekerjaan</text>
    <text x="160" y="285">: PELAJAR / ATLET SEPAK BOLA</text>

    <text x="50" y="315">Kewarganegaraan</text>
    <text x="160" y="315">: WNI</text>

    <text x="50" y="345">Berlaku Hingga</text>
    <text x="160" y="345">: SEUMUR HIDUP</text>
  </g>

  <!-- Photo Box -->
  <rect x="440" y="125" width="115" height="150" rx="8" fill="#e2e8f0" stroke="#ffffff" stroke-width="3"/>
  <rect x="440" y="125" width="115" height="150" rx="8" fill="#0284c7" opacity="0.2"/>
  <circle cx="497" cy="175" r="28" fill="#94a3b8" />
  <path d="M 465 245 C 465 215, 530 215, 530 245 Z" fill="#94a3b8" />
  <text x="497" y="265" font-family="system-ui, -apple-system, sans-serif" font-size="10" font-weight="bold" fill="#64748b" text-anchor="middle">PAS FOTO</text>

  <!-- Hologram / Chip Stamp -->
  <rect x="450" y="295" width="95" height="40" rx="6" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" stroke-dasharray="2 2" />
  <text x="497" y="318" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">CHIP e-KTP RESMI</text>
</svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function generateSampleBpjsDataUrl(name: string, nik: string): string {
  const kpjNumber = `26${nik.slice(-8)}001`;
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
  <defs>
    <linearGradient id="bpjsBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#047857" />
      <stop offset="40%" stop-color="#059669" />
      <stop offset="100%" stop-color="#064e3b" />
    </linearGradient>
    <linearGradient id="accentGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fbbf24" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
  </defs>

  <!-- Card Background -->
  <rect width="600" height="380" rx="20" fill="url(#bpjsBg)" />

  <!-- Decorative Wave -->
  <path d="M 0 280 Q 200 230 400 310 T 600 260 L 600 380 L 0 380 Z" fill="rgba(255,255,255,0.08)" />
  <rect x="0" y="0" width="600" height="12" fill="url(#accentGold)" rx="6" />

  <!-- BPJS Brand Header -->
  <g transform="translate(45, 42)">
    <rect width="36" height="36" rx="8" fill="#ffffff" />
    <path d="M 18 8 L 28 28 L 8 28 Z" fill="#047857" />
    <circle cx="18" cy="20" r="4" fill="#fbbf24" />
    <text x="50" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#ffffff" letter-spacing="1">BPJS Ketenagakerjaan</text>
    <text x="50" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="bold" fill="#a7f3d0" letter-spacing="1.5">KARTU KEPESERTAAN ATLET &amp; PELINDUNG TURNAMEN</text>
  </g>

  <!-- KPJ Number Box -->
  <rect x="45" y="105" width="510" height="42" rx="8" fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.2)" />
  <text x="65" y="132" font-family="monospace, monospace" font-size="20" font-weight="bold" fill="#34d399" letter-spacing="3">KPJ: ${kpjNumber}</text>

  <!-- Details -->
  <g font-family="system-ui, -apple-system, sans-serif" fill="#ffffff">
    <text x="50" y="185" font-size="11" font-weight="600" fill="#a7f3d0">NAMA PESERTA / ATLET</text>
    <text x="50" y="210" font-size="16" font-weight="bold">${name.toUpperCase() || 'NAMA PESERTA'}</text>

    <text x="50" y="250" font-size="11" font-weight="600" fill="#a7f3d0">NOMOR INDUK KEPENDUDUKAN (NIK)</text>
    <text x="50" y="272" font-size="15" font-family="monospace, monospace" font-weight="bold">${nik || '3174000000000000'}</text>

    <text x="50" y="315" font-size="11" font-weight="600" fill="#a7f3d0">PROGRAM PERLINDUNGAN</text>
    <text x="50" y="335" font-size="13" font-weight="bold">JKK (Jaminan Kecelakaan Kerja) &amp; JKM (Jaminan Kematian)</text>
  </g>

  <!-- Security QR Badge -->
  <rect x="445" y="180" width="105" height="145" rx="10" fill="#ffffff" />
  <!-- Mini QR pattern placeholder -->
  <rect x="460" y="195" width="75" height="75" fill="#064e3b" rx="4" />
  <rect x="470" y="205" width="20" height="20" fill="#ffffff" />
  <rect x="505" y="205" width="15" height="15" fill="#ffffff" />
  <rect x="470" y="240" width="15" height="15" fill="#ffffff" />
  <circle cx="497" cy="232" r="5" fill="#34d399" />
  <text x="497" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="bold" fill="#047857" text-anchor="middle">STATUS AKTIF</text>
  <text x="497" y="310" font-family="system-ui, -apple-system, sans-serif" font-size="8" fill="#64748b" text-anchor="middle">TERVERIFIKASI</text>
</svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
