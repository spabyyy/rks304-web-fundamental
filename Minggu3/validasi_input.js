// Validasi form register dengan event handling
const form = document.getElementById('formRegister');

const fields = ['username', 'password', 'nama', 'tanggal_lahir', 'alamat', 'telepon'];

// Aturan validasi tiap input: return string pesan error, atau '' jika valid
const rules = {
  username: (v) => {
    if (v === '') return 'Username tidak boleh kosong';
    if (v.length < 3) return 'Username minimal 3 karakter';
    return '';
  },
  password: (v) => {
    if (v === '') return 'Password tidak boleh kosong';
    if (v.length < 8) return 'Password minimal 8 karakter';
    return '';
  },
  nama: (v) => (v === '' ? 'Nama tidak boleh kosong' : ''),
  tanggal_lahir: (v) => {
    if (v === '') return 'Tanggal lahir tidak boleh kosong';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const input = new Date(v + 'T00:00:00');
    if (input > today) return 'Tanggal lahir tidak boleh melebihi hari ini';
    return '';
  },
  alamat: (v) => (v === '' ? 'Alamat tidak boleh kosong' : ''),
  telepon: (v) => {
    if (v === '') return 'Nomor telepon tidak boleh kosong';
    if (!v.startsWith('62')) return 'Nomor telepon harus diawali 62';
    return '';
  },
};

function showError(id, message) {
  const input = document.getElementById(id);
  const err = document.getElementById('err-' + id);
  if (message) {
    err.textContent = message;
    err.classList.remove('hidden');
    input.classList.add('border-red-500');
    input.classList.remove('border-slate-300');
  } else {
    err.classList.add('hidden');
    input.classList.remove('border-red-500');
    input.classList.add('border-slate-300');
  }
}

function validateField(id) {
  const value = document.getElementById(id).value.trim();
  const message = rules[id](value);
  showError(id, message);
  return message === '';
}

fields.forEach((id) => {
  const el = document.getElementById(id);
  el.addEventListener('input', () => validateField(id));
  el.addEventListener('blur', () => validateField(id));
});

form.addEventListener('submit', (e) => {
  let allValid = true;
  fields.forEach((id) => {
    if (!validateField(id)) allValid = false;
  });
  if (!allValid) {
    e.preventDefault(); 
  }
});
