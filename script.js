// --- CEK LOGIN --- //
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "login.html";
}

// --- LOGOUT --- //
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      window.location.href = "login.html";
    });
  }
});

// Daftar contoh gambar (ganti sesuai kebutuhan)
const images = [
  {
    id: 1,
    url: "https://picsum.photos/id/1015/1600/1000",
    title: "Pagi di Pegunungan",
    category: "Alam",
  },
  {
    id: 2,
    url: "https://picsum.photos/id/1016/1600/1000",
    title: "Kota di Senja",
    category: "Kota",
  },
  {
    id: 3,
    url: "https://picsum.photos/id/1011/1600/1000",
    title: "Lembah Berkabut",
    category: "Alam",
  },
  {
    id: 4,
    url: "https://picsum.photos/id/1005/1600/1000",
    title: "Jalan Kota",
    category: "Kota",
  },
  {
    id: 5,
    url: "https://picsum.photos/id/1025/1600/1000",
    title: "Kucing Stylish",
    category: "Anime",
  },
  {
    id: 6,
    url: "https://picsum.photos/id/1024/1600/1000",
    title: "Pantai Sunyi",
    category: "Alam",
  },
  {
    id: 7,
    url: "https://picsum.photos/id/1036/1600/1000",
    title: "Gedung Modern",
    category: "Kota",
  },
  {
    id: 8,
    url: "https://picsum.photos/id/1043/1600/1000",
    title: "Langit Warna",
    category: "Anime",
  },
  {
    id: 9,
    url: "https://picsum.photos/id/1056/1600/1000",
    title: "Hutan Hijau",
    category: "Alam",
  },
  {
    id: 10,
    url: "https://picsum.photos/id/1060/1600/1000",
    title: "Neon Night",
    category: "Kota",
  },
];

const gallery = document.getElementById("gallery");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalCaption = document.getElementById("modalCaption");
const modalCategory = document.getElementById("modalCategory");
const downloadBtn = document.getElementById("downloadBtn");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

// Membuat kartu galeri
function buildCard(item, index) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <img src="${item.url}" alt="${item.title}" loading="lazy" />
    <div class="meta">
      <div>
        <div class="title">${item.title}</div>
        <div class="cat">${item.category}</div>
      </div>
      <div class="actions">
        <button class="icon-btn" data-action="zoom" data-index="${index}" aria-label="Zoom ${
    item.title
  }">🔍</button>
        <a class="icon-btn" href="${item.url}" download="${safeFilename(
    item.title
  )}.jpg">⬇</a>
      </div>
    </div>`;
  return card;
}

// Fungsi bantu untuk nama file
function safeFilename(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// Render galeri
function renderGallery(list) {
  gallery.innerHTML = "";
  list.forEach((it, idx) => gallery.appendChild(buildCard(it, idx)));
}

// Modal
function openModal(index) {
  currentIndex = index;
  const item = images[currentIndex];
  modalImage.src = item.url;
  modalImage.alt = item.title;
  modalCaption.textContent = item.title;
  modalCategory.textContent = item.category;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  closeBtn.focus();
}
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
}
function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  openModal(currentIndex);
}
function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  openModal(currentIndex);
}
async function downloadCurrent() {
  const item = images[currentIndex];
  try {
    const res = await fetch(item.url);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeFilename(item.title)}.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch {
    window.open(item.url, "_blank");
  }
}

// Event handler
document.addEventListener("click", (e) => {
  const zoom = e.target.closest('[data-action="zoom"]');
  if (zoom) {
    const idx = Number(zoom.getAttribute("data-index"));
    openModal(idx);
  }
});
closeBtn.addEventListener("click", closeModal);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);
downloadBtn.addEventListener("click", downloadCurrent);

document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("open")) {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  }
});

// Tombol acak & filter
function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}
document.getElementById("shuffleBtn").addEventListener("click", () => {
  const copy = [...images];
  shuffleArray(copy);
  renderGallery(copy);
});
document.getElementById("filterBtn").addEventListener("click", () => {
  const filtered = images.filter((i) => i.category === "Alam");
  renderGallery(filtered);
});
document.getElementById("viewAll").addEventListener("click", (e) => {
  e.preventDefault();
  alert("Fitur Unduh Semua belum diimplementasikan dalam demo.");
});

// Klik luar modal
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Inisialisasi awal
renderGallery(images);
