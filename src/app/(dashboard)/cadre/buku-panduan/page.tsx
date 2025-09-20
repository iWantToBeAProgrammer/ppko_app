export default function KaderBukuPanduanPage() {
  return (
    <div className="p-4">
      <h1 className="font-semibold text-4xl">Buku Panduan Kader</h1>
      <p className="text-muted-foreground mt-2">
        Panduan ini bertujuan untuk membantu kader dalam memahami tugas dan
        tanggung jawab mereka.
      </p>
      <div style={{ position: "relative", paddingTop: "125%", height: 0 }} className="mt-8 shadow-lg rounded-lg overflow-hidden">
        <iframe
          src="/assets/files/Buku%20Panduan%20Kader.pdf"
          
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>
    </div>
  );
}
