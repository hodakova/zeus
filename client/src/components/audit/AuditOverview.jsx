export default function AuditOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div className="bg-white rounded-xl p-4.5 shadow-sm border border-gray-100">
        <h3 className="mb-2.5 text-[#244058] font-bold text-lg">Informasi Audit</h3>
        <div className="grid grid-cols-[120px_1fr] gap-3 mb-2 text-sm">
          <span className="font-semibold relative after:content-[':'] after:absolute after:top-0 after:right-0">
            Nama Audit
          </span>
          <span>Audit Energi Kelistrikan Gedung A Periode 2026</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-3 mb-2 text-sm">
          <span className="font-semibold relative after:content-[':'] after:absolute after:top-0 after:right-0">
            Status
          </span>
          <span>Aktif</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-3 mb-2 text-sm">
          <span className="font-semibold relative after:content-[':'] after:absolute after:top-0 after:right-0">
            Periode
          </span>
          <span>2026</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-3 mb-2 text-sm">
          <span className="font-semibold relative after:content-[':'] after:absolute after:top-0 after:right-0">
            Tanggal Audit
          </span>
          <span>27 Juni 2026</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-3 mb-2 text-sm">
          <span className="font-semibold relative after:content-[':'] after:absolute after:top-0 after:right-0">
            Auditor
          </span>
          <span>Asep</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4.5 shadow-sm border border-gray-100">
        <h3 className="mb-2.5 text-[#244058] font-bold text-lg">Informasi Gedung</h3>
        <div className="grid grid-cols-[120px_1fr] gap-3 mb-2 text-sm">
          <span className="font-semibold relative after:content-[':'] after:absolute after:top-0 after:right-0">
            Nama
          </span>
          <span>Gedung A</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-3 mb-2 text-sm">
          <span className="font-semibold relative after:content-[':'] after:absolute after:top-0 after:right-0">
            Lokasi
          </span>
          <span>Bandung</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-3 mb-2 text-sm">
          <span className="font-semibold relative after:content-[':'] after:absolute after:top-0 after:right-0">
            Luas
          </span>
          <span>2000 m²</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-3 mb-2 text-sm">
          <span className="font-semibold relative after:content-[':'] after:absolute after:top-0 after:right-0">
            Jumlah Lantai
          </span>
          <span>4</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4.5 shadow-sm border border-gray-100">
        <h3 className="mb-2.5 text-[#244058] font-bold text-lg">Ringkasan Audit</h3>
        <div className="grid grid-cols-[120px_1fr] gap-3 mb-2 text-sm">
          <span className="font-semibold relative after:content-[':'] after:absolute after:top-0 after:right-0">
            Data Energi
          </span>
          <span>24 Parameter</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-3 mb-2 text-sm">
          <span className="font-semibold relative after:content-[':'] after:absolute after:top-0 after:right-0">
            Kepatuhan Standar
          </span>
          <span>15 / 18 (83%)</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-3 mb-2 text-sm">
          <span className="font-semibold relative after:content-[':'] after:absolute after:top-0 after:right-0">
            Standar
          </span>
          <span>ISO 50002 dan SNI 03-6196-2000</span>
        </div>
        <div className="grid grid-cols-[120px_1fr] gap-3 mb-2 text-sm">
          <span className="font-semibold relative after:content-[':'] after:absolute after:top-0 after:right-0">
            Intensitas Konsumsi Energi
          </span>
          <span>Belum dihitung</span>
        </div>
      </div>
    </div>
  );
}