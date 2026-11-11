import { useAudit } from "../../context/AuditContext";

export default function AuditResult() {
  const {
    totalContinuousKWh,
    totalNoncontinuousKWh,
    totalMonthlyConsumptionKWh,
    annualIke,
    ikeCategory,
  } = useAudit();

  const total = totalMonthlyConsumptionKWh || 1;
  const continuousPct = Math.round(((totalContinuousKWh || 0) / total) * 100);
  const noncontinuousPct = 100 - continuousPct;

  const monthlyData = [
    { month: "Jan", val: 5100 },
    { month: "Feb", val: 4900 },
    { month: "Mar", val: 5300 },
    { month: "Apr", val: 5200 },
    { month: "Mei", val: 5600 },
    { month: "Jun", val: 5400 },
    { month: "Jul", val: 5800 },
    { month: "Agu", val: 5750 },
    { month: "Sep", val: 5500 },
    { month: "Okt", val: 5488 },
    { month: "Nov", val: 5300 },
    { month: "Des", val: 5150 },
  ];

  const maxVal = 6500;
  const minVal = 4000;
  const svgWidth = 520;
  const svgHeight = 160;
  const paddingLeft = 60;
  const paddingRight = 20;

  const getX = (index) =>
    paddingLeft + (index / (monthlyData.length - 1)) * (svgWidth - paddingLeft - paddingRight);
  const getY = (val) =>
    svgHeight - ((val - minVal) / (maxVal - minVal)) * (svgHeight - 40) - 20;

  const pointsString = monthlyData
    .map((item, i) => `${getX(i)},${getY(item.val)}`)
    .join(" ");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
            IKE Tahunan
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#244058]">{annualIke}</span>
            <span className="text-xs text-gray-500">kWh / m² / thn</span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  annualIke <= 185
                    ? "bg-emerald-500"
                    : annualIke <= 250
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
                style={{ width: `${Math.min((annualIke / 300) * 100, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>0 (Efisien)</span>
              <span>185 (Standar SNI)</span>
              <span>300+</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
            Kategori Efisiensi
          </h3>
          <div className="text-3xl font-bold text-[#244058]">{ikeCategory}</div>
          <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Sesuai Standar SNI 03-6196
          </span>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
            Beban Kontinu (24 Jam)
          </h3>
          <div className="text-2xl font-bold text-[#244058]">
            {(totalContinuousKWh ?? 0).toLocaleString()} <span className="text-sm font-normal text-gray-500">kWh</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Kontribusi: <strong className="text-gray-700">{continuousPct}%</strong> dari total
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-gray-500 font-medium text-xs uppercase tracking-wider mb-1">
            Beban Nonkontinu
          </h3>
          <div className="text-2xl font-bold text-[#244058]">
            {(totalNoncontinuousKWh ?? 0).toLocaleString()} <span className="text-sm font-normal text-gray-500">kWh</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Kontribusi: <strong className="text-gray-700">{noncontinuousPct}%</strong> dari total
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-[#244058] font-bold text-base mb-1">
              Proporsi Penggunaan Energi
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Perbandingan Beban Kontinu vs Nonkontinu
            </p>
          </div>

          <div className="flex flex-col items-center justify-center my-2">
            <div className="relative w-44 h-44">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="transparent"
                  stroke="#f3f4f6"
                  strokeWidth="3.8"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="transparent"
                  stroke="#244058"
                  strokeWidth="3.8"
                  strokeDasharray={`${continuousPct} ${100 - continuousPct}`}
                  strokeDashoffset="0"
                  className="transition-all duration-700"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="transparent"
                  stroke="#38bdf8"
                  strokeWidth="3.8"
                  strokeDasharray={`${noncontinuousPct} ${100 - noncontinuousPct}`}
                  strokeDashoffset={`-${continuousPct}`}
                  className="transition-all duration-700"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs text-gray-400 font-medium">Total Bulanan</span>
                <span className="text-sm font-bold text-[#244058]">
                  {(totalMonthlyConsumptionKWh / 1000).toFixed(1)}k kWh
                </span>
              </div>
            </div>

            <div className="w-full mt-6 space-y-2 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#244058]"></span>
                  <span className="text-gray-600 font-medium">Beban Kontinu (24 Jam)</span>
                </div>
                <span className="font-bold text-gray-800">{continuousPct}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#38bdf8]"></span>
                  <span className="text-gray-600 font-medium">Beban Nonkontinu (Jam Kerja)</span>
                </div>
                <span className="font-bold text-gray-800">{noncontinuousPct}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-[#244058] font-bold text-base">
                Tren Konsumsi Energi Bulanan
              </h3>
              <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-medium">
                Tahun 2026
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-4">
              Fluktuasi total konsumsi daya listrik (kWh) per bulan
            </p>
          </div>

          <div className="w-full overflow-x-auto">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-48 overflow-visible">
              {[4000, 5000, 6000].map((val) => (
                <g key={val}>
                  <line
                    x1={paddingLeft}
                    y1={getY(val)}
                    x2={svgWidth - paddingRight}
                    y2={getY(val)}
                    stroke="#f3f4f6"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingLeft - 8}
                    y={getY(val) + 3}
                    textAnchor="end"
                    fill="#9ca3af"
                    fontSize="9"
                  >
                    {val} kWh
                  </text>
                </g>
              ))}

              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#244058" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#244058" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <polygon
                points={`${paddingLeft},${svgHeight} ${pointsString} ${svgWidth - paddingRight},${svgHeight}`}
                fill="url(#lineGradient)"
              />

              <polyline
                fill="none"
                stroke="#244058"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsString}
              />

              {monthlyData.map((item, i) => (
                <g key={i} className="group cursor-pointer">
                  <circle
                    cx={getX(i)}
                    cy={getY(item.val)}
                    r="4"
                    className="fill-[#244058] stroke-white stroke-2 group-hover:r-6 transition-all"
                  />
                  <text
                    x={getX(i)}
                    y={svgHeight - 4}
                    textAnchor="middle"
                    fill="#6b7280"
                    fontSize="10"
                    fontWeight="500"
                  >
                    {item.month}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 pt-3 mt-2">
            <span>Rata-rata: <strong>5.356 kWh / bulan</strong></span>
            <span>Konsumsi Tertinggi: <strong className="text-amber-600">Juli (5.800 kWh)</strong></span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#244058] font-bold text-base mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Ringkasan Temuan Audit
          </h3>
          <ul className="space-y-2.5 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>Beban kontinu (Server & Pompa) menyerap <strong className="text-gray-900">{continuousPct}%</strong> total energi secara uninterrupted.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>Sistem AC HVAC merupakan kontributor terbesar pada konsumsi jam kerja (nonkontinu).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>Faktor daya listrik tercatat pada <strong className="text-gray-900">0.92</strong>, masih memiliki ruang optimasi hingga 0.95.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h3 className="text-[#244058] font-bold text-base mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Ringkasan Rekomendasi Optimasi
          </h3>
          <ul className="space-y-2.5 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>Mengatur setpoint suhu AC gedung standar 24°C - 25°C.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>Pemasangan sensor gerak (occupancy sensor) di area nonkontinu seperti ruang rapat.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400 font-bold">•</span>
              <span>Penggantian bertahap titik lampu lama menjadi teknologi LED hemat energi.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}