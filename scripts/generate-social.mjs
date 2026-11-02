import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#020617"/><stop offset="1" stop-color="#0b2037"/></linearGradient><linearGradient id="metal" x2="1" y2="1"><stop stop-color="#3b526b"/><stop offset="1" stop-color="#142337"/></linearGradient><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#294763" stroke-opacity=".3"/></pattern></defs>
<rect width="1200" height="630" fill="url(#bg)"/><rect width="1200" height="630" fill="url(#grid)"/>
<circle cx="965" cy="300" r="220" fill="none" stroke="#06b6d4" stroke-opacity=".15"/><circle cx="965" cy="300" r="180" fill="none" stroke="#0066ff" stroke-opacity=".2" stroke-dasharray="4 9"/>
<rect x="60" y="57" width="45" height="45" rx="12" fill="#0f172a" stroke="#22d3ee"/><path d="M73 68h19v23H73zM68 73h5m-5 8h5m-5 8h5m19-16h5m-5 8h5m-5 8h5M78 74h9m-9 6h6m-6 6h9" fill="none" stroke="#22d3ee" stroke-width="2"/>
<g font-family="DejaVu Sans,sans-serif"><text x="121" y="78" fill="#f1f5f9" font-size="19" font-weight="700" letter-spacing="1">CHATTOGRAM TRUST</text><text x="122" y="98" fill="#8ba7c1" font-size="10" letter-spacing="2">PLC &amp; AUTOMATION TECHNOLOGY</text>
<rect x="62" y="167" width="237" height="30" rx="5" fill="#063443" stroke="#155e75"/><circle cx="79" cy="182" r="3" fill="#22d3ee"/><text x="91" y="186" fill="#67e8f9" font-size="10" letter-spacing="1">PRACTICAL. INDUSTRY-READY.</text>
<text x="59" y="270" fill="#f1f5f9" font-size="53" font-weight="700" letter-spacing="-2">Master PLC, SCADA &amp;</text><text x="59" y="336" fill="#f1f5f9" font-size="53" font-weight="700" letter-spacing="-2">Industrial</text><text x="59" y="402" fill="#22d3ee" font-size="53" font-weight="700" letter-spacing="-2">Automation.</text>
<text x="63" y="450" fill="#a2b7cd" font-size="18">Hands-on technical training at GEC, Chattogram.</text>
<rect x="62" y="493" width="186" height="45" rx="7" fill="#0066ff"/><text x="84" y="521" fill="white" font-size="14" font-weight="700">EXPLORE COURSES</text><rect x="260" y="493" width="196" height="45" rx="7" fill="#f97316"/><text x="283" y="521" fill="#020617" font-size="14" font-weight="700">ENROLL WITH bKash</text>
<text x="63" y="588" fill="#819eb9" font-size="12">+880 1646-241953  ·  O.R Nizam Road, GEC, Chattogram</text></g>
<g transform="translate(770 198)"><rect x="0" y="0" width="337" height="225" rx="10" fill="url(#metal)" stroke="#526b85"/><path d="M17 31h303M17 193h303" stroke="#718096" stroke-width="6"/><rect x="22" y="51" width="45" height="118" rx="3" fill="#cbd5e1"/><rect x="30" y="68" width="29" height="42" fill="#e2e8f0"/><path d="M44 75v25" stroke="#1e3a5f" stroke-width="7"/><rect x="79" y="51" width="29" height="118" rx="3" fill="#cbd5e1"/><path d="M94 69v27" stroke="#1e3a5f" stroke-width="7"/><rect x="127" y="39" width="137" height="143" rx="5" fill="#1c293a" stroke="#64748b"/><rect x="137" y="51" width="117" height="27" fill="#334155"/><text x="146" y="69" font-family="DejaVu Sans,sans-serif" font-size="12" fill="#e2e8f0" font-weight="700">TRUST · PLC</text><rect x="139" y="92" width="77" height="48" fill="#071c2a" stroke="#3a6177"/><path d="M148 104h24v15h30M148 128h18v-9h36" fill="none" stroke="#22d3ee" stroke-width="2"/><circle cx="233" cy="97" r="3" fill="#22d3ee"/><circle cx="246" cy="97" r="3" fill="#22d3ee"/><circle cx="233" cy="113" r="3" fill="#f97316"/><rect x="280" y="52" width="35" height="115" rx="3" fill="#263a50"/><path d="M287 67h21m-21 15h21m-21 15h21m-21 15h21m-21 15h21m-21 15h21" stroke="#0f172a" stroke-width="5"/><path d="M156 38V-26h130v65M174 183v43h125v-44" fill="none" stroke="#0066ff" stroke-width="3"/><path d="M189 38V-10h112v49" fill="none" stroke="#f97316" stroke-width="2"/></g>
<rect x="869" y="435" width="222" height="58" rx="8" fill="#0b1a2d" stroke="#2b536e"/><circle cx="889" cy="455" r="4" fill="#22d3ee"/><text x="903" y="459" fill="#e2e8f0" font-family="DejaVu Sans,sans-serif" font-size="12" font-weight="700">LEARN. BUILD. AUTOMATE.</text><text x="887" y="479" fill="#8daac2" font-family="DejaVu Sans,sans-serif" font-size="10">20 skills. One practical learning path.</text>
</svg>`;
await writeFile("public/social-card.svg", svg);
await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile("public/social-card.png");
console.log(
  "Generated public/social-card.svg and public/social-card.png (1200 × 630).",
);
