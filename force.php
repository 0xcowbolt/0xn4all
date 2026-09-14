<?php
$file = '.htaccess';
$message = '';
$content = '';

// Memproses aksi ketika tombol ditekan
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        $action = $_POST['action'];

        // Aksi Lihat
        if ($action === 'lihat') {
            if (file_exists($file)) {
                $content = file_get_contents($file);
                $message = "<p style='color: blue;'>✅ File ditemukan. Berikut adalah isinya:</p>";
            } else {
                $message = "<p style='color: orange;'>⚠️ <b>Info:</b> File $file tidak ditemukan di direktori ini.</p>";
            }
        } 
        // Aksi Hapus
        elseif ($action === 'hapus') {
            if (file_exists($file)) {
                if (unlink($file)) {
                    $message = "<p style='color: green;'>✅ <b>Sukses:</b> File $file berhasil dihapus permanen.</p>";
                } else {
                    $message = "<p style='color: red;'>❌ <b>Gagal:</b> Tidak dapat menghapus file $file. Periksa hak akses (permission) file atau folder.</p>";
                }
            } else {
                $message = "<p style='color: orange;'>⚠️ <b>Info:</b> File $file sudah tidak ada.</p>";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelola File .htaccess</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 30px; background-color: #f9f9f9; }
        .container { background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 800px; }
        .btn { padding: 10px 15px; border: none; cursor: pointer; border-radius: 5px; color: white; font-weight: bold; margin-right: 10px; font-size: 14px; }
        .btn-view { background-color: #007bff; }
        .btn-delete { background-color: #dc3545; }
        .btn:hover { opacity: 0.8; }
        pre { background: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 5px; overflow-x: auto; font-family: Consolas, monospace; line-height: 1.5; }
    </style>
</head>
<body>

<div class="container">
    <h2>Kelola File .htaccess</h2>
    <p>Pilih aksi yang ingin dilakukan terhadap file <code>.htaccess</code> yang berada di folder yang sama dengan script ini.</p>
    
    <form method="POST">
        <button type="submit" name="action" value="lihat" class="btn btn-view">👁️ Lihat Isi .htaccess</button>
        <!-- Tambahan alert javascript agar tidak terhapus karena salah klik -->
        <button type="submit" name="action" value="hapus" class="btn btn-delete" onclick="return confirm('⚠️ PERINGATAN: Apakah Anda yakin ingin menghapus file .htaccess? Ini bisa merusak routing atau pengaturan website Anda!');">🗑️ Hapus .htaccess</button>
    </form>

    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;">

    <?php
    // Menampilkan pesan sukses/gagal
    if (!empty($message)) {
        echo $message;
    }

    // Menampilkan isi file .htaccess dalam kotak kode jika tombol lihat ditekan
    if (!empty($content)) {
        echo "<pre>" . htmlspecialchars($content) . "</pre>";
    }
    ?>
</div>

</body>
</html>