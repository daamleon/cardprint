const Fitur = () => {
  return (
    <section
      id="fitur"
      className="bg-white text-black py-16 px-8 w-full flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold mb-6 text-center">
    Feature
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
        <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">🎨 Live Preview</h3>
          <p className="text-gray-700">
            Lihat hasil e-Card Anda secara langsung sebelum disimpan.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">🖨️ Export PDF</h3>
          <p className="text-gray-700">
            Cetak dan simpan e-Card dalam format PDF dengan mudah.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-xl shadow-md text-center">
          <h3 className="text-xl font-semibold mb-2">🔄 Kustomisasi Bebas</h3>
          <p className="text-gray-700">
            Ubah warna, teks, dan elemen sesuai keinginan Anda.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Fitur;
