PRODUCT REQUIREMENTS DOCUMENT
KAMCUR SPACE
Good Coffee. Good People. Good Space.
(PRD v1.0) (Frontend Project) (Three.js Experience)
Informasi	Detail
Produk	KAMCUR SPACE Website
Platform	Responsive Web
Jenis	Coffee Shop Landing Page
Bahasa	HTML, CSS, JavaScript
3D Engine	Three.js
Animation	GSAP
Backend	Tidak diperlukan
Integrasi sosial	Instagram
Status	Product Planning


1. Product Overview
1.1 Latar Belakang
KAMCUR SPACE membutuhkan media digital yang dapat merepresentasikan identitas brand, memperkenalkan produk, dan memberikan informasi kepada calon pelanggan.

Website akan menjadi digital storefront yang mempertemukan identitas visual, informasi produk, suasana coffee shop, dan pengalaman interaktif.

Pendekatan desain menggunakan karakter budaya anak muda dengan perpaduan visual editorial, fotografi humanis, tipografi ekspresif, serta animasi 3D berbasis Three.js.
1.2 Product Vision
Membangun website coffee shop yang memiliki karakter visual kuat, mudah digunakan, dan memberikan pengalaman digital yang merepresentasikan suasana KAMCUR SPACE.
1.3 Product Goals
1. Memperkuat identitas digital KAMCUR SPACE.
2. Memperkenalkan menu dan produk unggulan.
3. Menampilkan suasana dan karakter coffee shop.
4. Meningkatkan kunjungan ke Instagram dan lokasi usaha.
5. Memberikan pengalaman interaktif melalui objek 3D.
6. Menghasilkan website yang responsif dan ringan.
2. Target Audience
Segmen	Kebutuhan
Gen Z	Tempat nongkrong dan eksplorasi kopi
Mahasiswa	Informasi tempat, menu, dan harga
Young Professionals	Tempat bersantai dan bekerja
Coffee Enthusiasts	Informasi produk dan karakter kopi
Pengunjung Baru	Lokasi, jam operasional, dan suasana


3. Product Scope
In Scope
Landing page responsif

Interactive 3D coffee object

Menu showcase

Brand storytelling

Photo gallery

Instagram integration

Location and contact
Out of Scope
Online payment

E-commerce checkout

Customer authentication

Database dan backend

Admin dashboard
4. Functional Requirements
ID	Fitur	Deskripsi	Prioritas
FR-01	Navigation	Navigasi antar-section	Must
FR-02	Hero Experience	Headline dan visual 3D	Must
FR-03	3D Interaction	Rotasi dan floating objek kopi	Must
FR-04	About	Informasi brand	Must
FR-05	Menu	Daftar menu dan harga	Must
FR-06	Gallery	Foto interior dan aktivitas	Must
FR-07	Social Media	Tautan Instagram	Must
FR-08	Location	Alamat dan Google Maps	Must
FR-09	Animation	Scroll dan entrance animation	Should
FR-10	Responsive	Adaptasi desktop dan mobile	Must
FR-11	Loading Screen	Transisi awal website	Should
FR-12	Reduced Motion	Alternatif animasi untuk pengguna yang membatasi gerakan	Should


5. Information Architecture
Website menggunakan single-page architecture dengan navigasi berbasis section.
Website Structure
KAMCUR SPACE

Main Website

Footer

Brand Identity · Social Links · Copyright
5.1 Detail setiap halaman
Karena menggunakan single-page architecture, seluruh konten utama berada dalam satu halaman.

A. Home / Hero
- Logo KAMCUR SPACE.
- Navigasi utama.
- Headline utama.
- Deskripsi singkat brand.
- CTA Explore Our Menu.
- CTA Find Our Space.
- Objek kopi 3D sebagai visual utama.
- Indikator scroll.
B. About KAMCUR
- Brand introduction.
- Filosofi KAMCUR SPACE.
- Foto aktivitas pengunjung.
- Informasi karakter coffee shop.
C. Menu
- Kategori Coffee.
- Kategori Non-Coffee.
- Signature Drinks.
- Nama produk.
- Deskripsi produk.
- Harga.
- Foto produk.
Fitur filter kategori bersifat opsional untuk versi awal.

D. The Space
- Foto interior.
- Foto pengunjung.
- Detail suasana.
- Galeri horizontal.
- Caption editorial.
E. Social Culture
- Instagram profile.
- Link menuju postingan atau profil.
- Visual komunitas.
- Konten aktivitas KAMCUR.
F. Visit Us
- Alamat coffee shop.
- Jam operasional.
- Google Maps.
- Tombol Instagram.
- Informasi kontak.
6. UI/UX Design Requirements
6.1 Design Direction
Aspek	Ketentuan
Visual	Editorial, playful, clean
Layout	Asimetris terkontrol
Typography	Bold dan oversized
Photography	Human-centered
Whitespace	Luas dan terstruktur
Shape	Rounded dan organic
Motion	Smooth dan natural
Interaction	Subtle, responsive


6.2 Color System
6.3 Typography
- Heading: Space Grotesk.
- Display: Archivo Black.
- Body: Inter.
- Editorial accent: Playfair Display.
Gunakan kombinasi ukuran font yang kontras. Hindari terlalu banyak jenis font dalam satu section.
7. Three.js Experience Requirements
Three.js merupakan elemen pembeda utama KAMCUR SPACE. Implementasinya harus tetap mendukung fungsi utama website.
7.1 3D Objects
Coffee Cup

Objek utama hero.

Coffee Beans

Elemen dekoratif.

Coffee Splash

Elemen transisi.

Coffee Packaging

Objek pendukung branding.
7.2 Interaction Specification
Interaksi	Perilaku
Initial Load	Objek masuk dengan animasi
Idle	Floating perlahan
Mouse Movement	Rotasi mengikuti pointer
Scroll	Perubahan posisi objek
Hover	Reaksi visual ringan
Mobile	Gerakan otomatis ringan
Page Exit	Transisi halus


7.3 Technical Requirements
- Menggunakan Three.js untuk WebGL rendering.
- Model 3D menggunakan format GLB/GLTF.
- Menggunakan requestAnimationFrame untuk rendering loop.
- Menggunakan IntersectionObserver untuk mengelola animasi berdasarkan section.
- Menggunakan GSAP dan ScrollTrigger untuk timeline dan scroll animation.
- Menggunakan lazy loading untuk model 3D.
- Memiliki fallback visual apabila WebGL tidak tersedia.
- Menghentikan atau mengurangi animasi saat objek tidak terlihat.
- Mendukung prefers-reduced-motion.
7.4 3D Performance Target
Parameter	Target
Desktop	55–60 FPS
Mobile	30–60 FPS
Model utama	GLB terkompresi
Texture	Optimized
Initial Loading	Prioritaskan konten 2D
Fallback	Static product image


Target performa merupakan sasaran pengembangan, bukan hasil pengujian yang sudah tercapai.
8. Technical Architecture
8.1 Technology Stack
Frontend Architecture
HTML5

Semantic structure

CSS3

Responsive styling

JavaScript

Interaction logic

Three.js

3D rendering

GSAP

Motion animation

Responsive

Multi-device support
8.2 Project Folder Structure
kamcur-space/
│
├── index.html
│
├── assets/
│   ├── images/
│   ├── models/
│   │   ├── coffee-cup.glb
│   │   ├── coffee-beans.glb
│   │   └── coffee-splash.glb
│   ├── textures/
│   └── icons/
│
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── animation.css
│
├── js/
│   ├── main.js
│   ├── three-scene.js
│   ├── interactions.js
│   └── animations.js
│
└── README.md

8.3 Architecture Flow
#chatgpt-mermaid-_r_c4_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-_r_c4_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-_r_c4_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-_r_c4_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-_r_c4_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-_r_c4_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-_r_c4_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-_r_c4_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-_r_c4_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-_r_c4_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-_r_c4_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-_r_c4_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-_r_c4_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-_r_c4_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-_r_c4_ p{margin:0;}#chatgpt-mermaid-_r_c4_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-_r_c4_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-_r_c4_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-_r_c4_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-_r_c4_ .label text,#chatgpt-mermaid-_r_c4_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-_r_c4_ .node rect,#chatgpt-mermaid-_r_c4_ .node circle,#chatgpt-mermaid-_r_c4_ .node ellipse,#chatgpt-mermaid-_r_c4_ .node polygon,#chatgpt-mermaid-_r_c4_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-_r_c4_ .rough-node .label text,#chatgpt-mermaid-_r_c4_ .node .label text,#chatgpt-mermaid-_r_c4_ .image-shape .label,#chatgpt-mermaid-_r_c4_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-_r_c4_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-_r_c4_ .rough-node .label,#chatgpt-mermaid-_r_c4_ .node .label,#chatgpt-mermaid-_r_c4_ .image-shape .label,#chatgpt-mermaid-_r_c4_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-_r_c4_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-_r_c4_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-_r_c4_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-_r_c4_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-_r_c4_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-_r_c4_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-_r_c4_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-_r_c4_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-_r_c4_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-_r_c4_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-_r_c4_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-_r_c4_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-_r_c4_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-_r_c4_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-_r_c4_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-_r_c4_ .icon-shape,#chatgpt-mermaid-_r_c4_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-_r_c4_ .icon-shape p,#chatgpt-mermaid-_r_c4_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-_r_c4_ .icon-shape .label rect,#chatgpt-mermaid-_r_c4_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-_r_c4_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-_r_c4_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-_r_c4_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-_r_c4_ [data-look="neo"].node rect,#chatgpt-mermaid-_r_c4_ [data-look="neo"].cluster rect,#chatgpt-mermaid-_r_c4_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-_r_c4_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-_r_c4_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-_r_c4_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-_r_c4_-gradient);stroke-width:1px;}#chatgpt-mermaid-_r_c4_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-_r_c4_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-_r_c4_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-_r_c4_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-_r_c4_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-_r_c4_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-_r_c4_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-_r_c4_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-_r_c4_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-_r_c4_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-_r_c4_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-_r_c4_ .node tspan[font-weight="normal"],#chatgpt-mermaid-_r_c4_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-_r_c4_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-_r_c4_ .node rect,#chatgpt-mermaid-_r_c4_ .node circle,#chatgpt-mermaid-_r_c4_ .node ellipse,#chatgpt-mermaid-_r_c4_ .node polygon,#chatgpt-mermaid-_r_c4_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-_r_c4_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-_r_c4_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-_r_c4_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-_r_c4_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-_r_c4_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}index.htmlCSS Design SystemJavaScript ControllerGSAP AnimationThree.js SceneGLB / GLTF ModelsWebGL RendererNavigation & InteractionsInstagramGoogle Maps




Tidak ada database atau API backend yang wajib digunakan. Informasi menu, alamat, dan jam operasional dapat ditulis langsung dalam konten statis.
9. Non-Functional Requirements
ID	Kategori	Persyaratan
NFR-01	Performance	Optimasi gambar dan model 3D
NFR-02	Responsive	Desktop, tablet, mobile
NFR-03	Accessibility	Semantic HTML dan keyboard navigation
NFR-04	Compatibility	Browser modern
NFR-05	SEO	Metadata dan heading terstruktur
NFR-06	Security	HTTPS dan sumber aset tepercaya
NFR-07	Maintainability	Pemisahan file dan modular JavaScript
NFR-08	Reliability	Fallback jika WebGL gagal
NFR-09	Usability	CTA dan navigasi jelas


9.1 SEO Requirements
- Title: KAMCUR SPACE | Coffee, People & Good Space.
- Meta description yang menjelaskan karakter coffee shop.
- Open Graph image.
- Favicon dan brand logo.
- Alt text untuk foto.
- Structured data LocalBusiness apabila data bisnis sudah terverifikasi.
- URL canonical sesuai domain produksi.
9.2 Performance dan Accessibility
Target pengujian Core Web Vitals:
- LCP maksimal 2,5 detik.
- INP maksimal 200 ms.
- CLS maksimal 0,1.
Target tersebut diukur pada persentil ke-75 berdasarkan pengalaman pengguna nyata setelah website dipublikasikan.
10. User Journey
Alur utama pengunjung ketika membuka website:
#chatgpt-mermaid-_r_bt_{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;fill:rgb(13, 13, 13);}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#chatgpt-mermaid-_r_bt_ .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-_r_bt_ .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#chatgpt-mermaid-_r_bt_ .error-icon{fill:rgb(243, 243, 243);}#chatgpt-mermaid-_r_bt_ .error-text{fill:rgb(13, 13, 13);stroke:rgb(13, 13, 13);}#chatgpt-mermaid-_r_bt_ .edge-thickness-normal{stroke-width:1px;}#chatgpt-mermaid-_r_bt_ .edge-thickness-thick{stroke-width:3.5px;}#chatgpt-mermaid-_r_bt_ .edge-pattern-solid{stroke-dasharray:0;}#chatgpt-mermaid-_r_bt_ .edge-thickness-invisible{stroke-width:0;fill:none;}#chatgpt-mermaid-_r_bt_ .edge-pattern-dashed{stroke-dasharray:3;}#chatgpt-mermaid-_r_bt_ .edge-pattern-dotted{stroke-dasharray:2;}#chatgpt-mermaid-_r_bt_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-_r_bt_ .marker.cross{stroke:rgb(143, 143, 143);}#chatgpt-mermaid-_r_bt_ svg{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:16px;}#chatgpt-mermaid-_r_bt_ p{margin:0;}#chatgpt-mermaid-_r_bt_ .label{font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";color:rgb(13, 13, 13);}#chatgpt-mermaid-_r_bt_ .cluster-label text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-_r_bt_ .cluster-label span{color:rgb(13, 13, 13);}#chatgpt-mermaid-_r_bt_ .cluster-label span p{background-color:transparent;}#chatgpt-mermaid-_r_bt_ .label text,#chatgpt-mermaid-_r_bt_ span{fill:rgb(13, 13, 13);color:rgb(13, 13, 13);}#chatgpt-mermaid-_r_bt_ .node rect,#chatgpt-mermaid-_r_bt_ .node circle,#chatgpt-mermaid-_r_bt_ .node ellipse,#chatgpt-mermaid-_r_bt_ .node polygon,#chatgpt-mermaid-_r_bt_ .node path{fill:rgb(222, 234, 251);stroke:rgb(83, 154, 248);stroke-width:1px;}#chatgpt-mermaid-_r_bt_ .rough-node .label text,#chatgpt-mermaid-_r_bt_ .node .label text,#chatgpt-mermaid-_r_bt_ .image-shape .label,#chatgpt-mermaid-_r_bt_ .icon-shape .label{text-anchor:middle;}#chatgpt-mermaid-_r_bt_ .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#chatgpt-mermaid-_r_bt_ .rough-node .label,#chatgpt-mermaid-_r_bt_ .node .label,#chatgpt-mermaid-_r_bt_ .image-shape .label,#chatgpt-mermaid-_r_bt_ .icon-shape .label{text-align:center;}#chatgpt-mermaid-_r_bt_ .node.clickable{cursor:pointer;}#chatgpt-mermaid-_r_bt_ .root .anchor path{fill:rgb(143, 143, 143)!important;stroke-width:0;stroke:rgb(143, 143, 143);}#chatgpt-mermaid-_r_bt_ .arrowheadPath{fill:rgb(143, 143, 143);}#chatgpt-mermaid-_r_bt_ .edgePath .path{stroke:rgb(143, 143, 143);stroke-width:1px;}#chatgpt-mermaid-_r_bt_ .flowchart-link{stroke:rgb(143, 143, 143);fill:none;}#chatgpt-mermaid-_r_bt_ .edgeLabel{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-_r_bt_ .edgeLabel p{background-color:rgb(252, 252, 252);}#chatgpt-mermaid-_r_bt_ .edgeLabel rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-_r_bt_ .labelBkg{background-color:rgba(252, 252, 252, 0.5);}#chatgpt-mermaid-_r_bt_ .cluster rect{fill:rgb(243, 243, 243);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-_r_bt_ .cluster text{fill:rgb(13, 13, 13);}#chatgpt-mermaid-_r_bt_ .cluster span{color:rgb(13, 13, 13);}#chatgpt-mermaid-_r_bt_ div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";font-size:12px;background:rgb(243, 243, 243);border:1px solid rgba(0, 0, 0, 0.1);border-radius:2px;pointer-events:none;z-index:100;}#chatgpt-mermaid-_r_bt_ .flowchartTitleText{text-anchor:middle;font-size:18px;fill:rgb(13, 13, 13);}#chatgpt-mermaid-_r_bt_ rect.text{fill:none;stroke-width:0;}#chatgpt-mermaid-_r_bt_ .icon-shape,#chatgpt-mermaid-_r_bt_ .image-shape{background-color:rgb(252, 252, 252);text-align:center;}#chatgpt-mermaid-_r_bt_ .icon-shape p,#chatgpt-mermaid-_r_bt_ .image-shape p{background-color:rgb(252, 252, 252);padding:2px;}#chatgpt-mermaid-_r_bt_ .icon-shape .label rect,#chatgpt-mermaid-_r_bt_ .image-shape .label rect{opacity:0.5;background-color:rgb(252, 252, 252);fill:rgb(252, 252, 252);}#chatgpt-mermaid-_r_bt_ .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#chatgpt-mermaid-_r_bt_ .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#chatgpt-mermaid-_r_bt_ .node .neo-node{stroke:rgb(83, 154, 248);}#chatgpt-mermaid-_r_bt_ [data-look="neo"].node rect,#chatgpt-mermaid-_r_bt_ [data-look="neo"].cluster rect,#chatgpt-mermaid-_r_bt_ [data-look="neo"].node polygon{stroke:url(#chatgpt-mermaid-_r_bt_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-_r_bt_ [data-look="neo"].swimlane.cluster rect{filter:none;}#chatgpt-mermaid-_r_bt_ [data-look="neo"].node path{stroke:url(#chatgpt-mermaid-_r_bt_-gradient);stroke-width:1px;}#chatgpt-mermaid-_r_bt_ [data-look="neo"].node .outer-path{filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-_r_bt_ [data-look="neo"].node .neo-line path{stroke:rgb(83, 154, 248);filter:none;}#chatgpt-mermaid-_r_bt_ [data-look="neo"].node circle{stroke:url(#chatgpt-mermaid-_r_bt_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-_r_bt_ [data-look="neo"].node circle .state-start{fill:#000000;}#chatgpt-mermaid-_r_bt_ [data-look="neo"].icon-shape .icon{fill:url(#chatgpt-mermaid-_r_bt_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-_r_bt_ [data-look="neo"].icon-shape .icon-neo path{stroke:url(#chatgpt-mermaid-_r_bt_-gradient);filter:drop-shadow( 1px 2px 2px rgba(185,185,185,1));}#chatgpt-mermaid-_r_bt_ .node text{font-size:14px;font-weight:600;letter-spacing:normal;fill:rgb(0, 79, 153);}#chatgpt-mermaid-_r_bt_ .edgeLabels text{font-size:13px;font-weight:600;letter-spacing:-0.08px;fill:rgb(0, 79, 153);}#chatgpt-mermaid-_r_bt_ .node tspan[font-weight="normal"],#chatgpt-mermaid-_r_bt_ .edgeLabels tspan[font-weight="normal"]{font-weight:600;}#chatgpt-mermaid-_r_bt_ .edgeLabel .label rect{opacity:1;rx:13px;ry:13px;fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-width:1px;}#chatgpt-mermaid-_r_bt_ .node rect,#chatgpt-mermaid-_r_bt_ .node circle,#chatgpt-mermaid-_r_bt_ .node ellipse,#chatgpt-mermaid-_r_bt_ .node polygon,#chatgpt-mermaid-_r_bt_ .node path{fill:rgb(229, 243, 255);stroke:rgba(0, 0, 0, 0.1);stroke-width:1px;}#chatgpt-mermaid-_r_bt_ .node rect{rx:16px;ry:16px;}#chatgpt-mermaid-_r_bt_ .mermaid-decision .label-container{fill:rgb(245, 250, 255);stroke:rgb(206, 219, 229);stroke-dasharray:2,2;}#chatgpt-mermaid-_r_bt_ .edgePaths .flowchart-link{stroke:rgb(143, 143, 143);stroke-width:1px;stroke-linecap:round;stroke-linejoin:round;}#chatgpt-mermaid-_r_bt_ .marker{fill:rgb(143, 143, 143);stroke:rgb(143, 143, 143);}#chatgpt-mermaid-_r_bt_ :root{--mermaid-font-family:-apple-system-body,ui-sans-serif,-apple-system,system-ui,"Segoe UI",Helvetica,"Apple Color Emoji",Arial,sans-serif,"Segoe UI Emoji","Segoe UI Symbol";}Pengunjung membuka websiteHero & Brand IntroductionMelihat 3D Coffee ExperiencePilihan PengunjungExplore MenuDiscover The SpaceAbout KAMCURMelihat Produk & HargaMelihat GalleryMengenal BrandVisit Us / InstagramMengunjungi KAMCUR SPACE




11. Acceptance Criteria
Website dinyatakan memenuhi kebutuhan produk apabila kriteria berikut terpenuhi.
ID	Acceptance Criteria
AC-01	Logo dan identitas KAMCUR terlihat jelas
AC-02	Seluruh section dapat diakses
AC-03	Navigasi berfungsi dengan benar
AC-04	Model 3D dapat dirender
AC-05	Interaksi 3D berjalan sesuai perangkat
AC-06	Menu menampilkan informasi produk
AC-07	Gallery menampilkan foto yang relevan
AC-08	Instagram dapat dibuka
AC-09	Google Maps mengarah ke lokasi yang benar
AC-10	Website responsif
AC-11	Website memiliki fallback 3D
AC-12	Tidak ada error JavaScript kritis


12. Content Requirements
Bagian ini membutuhkan data asli dari pihak KAMCUR SPACE.
Konten	Kebutuhan
Logo	Logo resmi KAMCUR SPACE
Brand Story	Sejarah dan filosofi brand
Menu	Nama produk, deskripsi, harga
Product Photos	Foto minuman dan makanan
Interior	Foto tempat
Location	Alamat lengkap
Operating Hours	Jam operasional
Contact	WhatsApp atau nomor bisnis jika tersedia
Instagram	@kamcurspace_
3D Assets	Model gelas dan elemen kopi


Instagram resmi yang menjadi referensi:

Instagram KAMCUR SPACE

Konten yang belum tersedia harus menggunakan placeholder selama pengembangan. Jangan mengarang harga, alamat, menu, atau cerita brand.
13. Development Roadmap
Saya membagi pengerjaan menjadi enam fase agar pengembangan terstruktur.
1. Phase 01. Discovery & Brand Research
   - Analisis identitas visual.
   - Riset konten Instagram.
   - Pengumpulan foto dan aset.
   - Penentuan design direction.
   (Foundation)
2. Phase 02. UI/UX Design
   - Membuat wireframe.
   - Menentukan layout.
   - Menentukan typography.
   - Menentukan color system.
   - Mendesain responsive layout.
3. Phase 03. Frontend Development
   - Implementasi HTML.
   - Styling CSS.
   - Implementasi JavaScript.
   - Pembuatan seluruh section.
   - Responsive implementation.
4. Phase 04. Three.js Development
   - Menyiapkan model 3D.
   - Membuat scene.
   - Mengatur camera dan lighting.
   - Implementasi interaksi mouse.
   - Implementasi animasi scroll.
   - Optimasi rendering.
5. Phase 05. Integration & Testing
   - Integrasi GSAP.
   - Pengujian responsive.
   - Pengujian performa.
   - Pengujian browser.
   - Pengujian fallback WebGL.
6. Phase 06. Deployment
   - Optimasi production.
   - Konfigurasi domain.
   - Deployment hosting.
   - SEO setup.
   - Final quality assurance.
   (Release)
Estimasi pengerjaan: 2 sampai 3 minggu untuk versi pertama, dengan asumsi aset brand dan model 3D tersedia tepat waktu.
14. Risk Assessment
Risiko	Dampak	Mitigasi
Model 3D terlalu berat	Loading lambat	Kompresi GLB
Performa mobile rendah	UX terganggu	Adaptive rendering
Aset brand tidak tersedia	Identitas kurang akurat	Gunakan placeholder
Animasi berlebihan	Pengunjung sulit membaca	Motion hierarchy
WebGL tidak didukung	Hero tidak tampil	Static fallback
Konten tidak akurat	Informasi menyesatkan	Validasi pemilik brand


15. Definition of Done
Pengembangan dianggap selesai apabila:
- [ ] Semua section utama sudah dibuat.
- [ ] Visual sesuai design direction.
- [ ] Seluruh konten bisnis sudah divalidasi.
- [ ] Model 3D berhasil ditampilkan.
- [ ] Animasi tidak mengganggu navigasi.
- [ ] Website berjalan di desktop dan mobile.
- [ ] Link Instagram dan lokasi berfungsi.
- [ ] Tidak terdapat error kritis.
- [ ] SEO dasar sudah diterapkan.
- [ ] Website berhasil dipublikasikan.
16. Product Decisions
Berikut keputusan awal yang menjadi pegangan selama pengembangan.
KAMCUR SPACE Product Direction
Product Identity (Youth Culture)

Visual Direction (Editorial & Humanis)

Design Language (Clean & Playful)

3D Experience (Three.js)

Animation (GSAP)

Architecture (Static Website)

Backend (None)
Core Experience

Website harus terasa seperti memasuki ruang budaya coffee shop, bukan sekadar membaca katalog produk.
17. Hal yang Masih Membutuhkan Konfirmasi
PRD ini sudah bisa menjadi dasar pengembangan. Namun, beberapa keputusan bisnis perlu divalidasi agar implementasi tidak menggunakan asumsi yang salah.

Product Discovery Checklist

1. Apakah alamat dan lokasi KAMCUR SPACE sudah tersedia?

Sudah tersedia

Belum diketahui
2. Apakah daftar menu dan harga sudah tersedia?

Sudah tersedia

Belum tersedia
3. Model 3D coffee cup yang ingin digunakan?

Custom branding KAMCUR SPACE

Realistic 3D coffee cup

Stylized 3D illustration
4. Tujuan utama tombol CTA?

Mengarah ke Instagram

Mengarah ke Google Maps

Mengarah ke WhatsApp
5. Prioritas pengembangan?

Pengalaman visual dan 3D

Informasi bisnis dan konversi pelanggan

Keduanya seimbang

[Simpan keputusan product discovery]

Rekomendasi tahap berikutnya: setelah PRD ini dikunci, lanjutkan ke Technical Design Document (TDD), kemudian UI/UX wireframe dan master prompt implementasi untuk AI coding agent. Dengan urutan ini, pengembangan tidak langsung melompat ke coding sebelum kebutuhan produk dan arsitektur teknis jelas.

Muat ulang respons