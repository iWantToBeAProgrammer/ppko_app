export default function DashboardPage() {
  return (
    <div className=" px-4 space-y-4 sm:mt-0 mt-8">
      <div className="name-profile-card flex items-center px-8 py-4 shadow-md w-full rounded-lg bg-white">
        <div className="initial-username text-2xl font-semibold tracking-wide w-16 h-16 rounded-full bg-white border border-foreground p-2 flex items-center justify-center">
          JS
        </div>
        <h3 className="username ms-4 text-xl font-semibold tracking-wide">
          Juan Stevenson
        </h3>
      </div>
      <div className="data-information-card p-8 shadow-md rounded-lg">
        <h1 className="text-lg font-semibold mb-4">Informasi Data</h1>

        <div className="grid grid-flow-row sm:grid-cols-2 grid-cols-1">
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Nama Depan
            </label>
            <h4 className="font-semibold mb-4">Juan</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Nama Belakang
            </label>
            <h4 className="font-semibold mb-4">Stevenson</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Alamat Email
            </label>
            <h4 className="font-semibold mb-4">juanstevenson10@gmail.com</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              No. Handphone
            </label>
            <h4 className="font-semibold mb-4">08232311232</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Jenis Kelamin
            </label>
            <h4 className="font-semibold mb-4">Laki-laki</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Pekerjaan
            </label>
            <h4 className="font-semibold mb-4">Ibu Rumah Tangga</h4>
          </div>
        </div>
      </div>
      <div className="address-card p-8 shadow-md rounded-lg">
        <h1 className="text-lg font-semibold mb-4">Alamat</h1>
        <div className="grid grid-flow-row sm:grid-cols-2 grid-cols-1">
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">Dusun</label>
            <h4 className="font-semibold mb-4">Klodran</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">Desa</label>
            <h4 className="font-semibold mb-4">Gemawang</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Alamat Lengkap
            </label>
            <h4 className="font-semibold max-w-lg text-justify">
              Jln raya gemawang - muncar rt 03 Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Nostrum debitis sunt doloribus totam
              illum repellat libero non tempora fugit laborum quo eius earum
              impedit aperiam dolorum, velit perspiciatis facere molestiae!
            </h4>
          </div>
        </div>
      </div>
      <div className="data-information-card p-8 shadow-md rounded-lg bg-white">
        <h1 className="text-lg font-semibold mb-4">Data Anak</h1>
        <div className="grid grid-flow-row sm:grid-cols-2 grid-cols-1">
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Nama Depan
            </label>
            <h4 className="font-semibold mb-4">Adtya Eka</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Nama Belakang
            </label>
            <h4 className="font-semibold mb-4">Nerayan</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Jenis Kelamin
            </label>
            <h4 className="font-semibold mb-4">Laki-laki</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Tingi Badan
            </label>
            <h4 className="font-semibold mb-4">90 cm</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Tanggal Lahir
            </label>
            <h4 className="font-semibold mb-4">19/04/2006</h4>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-label text-muted-foreground">
              Riwayat Kesehatan
            </label>
            <h4 className="font-semibold mb-4">Normal</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
