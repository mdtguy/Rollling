
let uploadedImage = null;

document.getElementById('imageUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      uploadedImage = img;
      drawInvoice();
    };
    img.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

['customerName', 'itemType', 'quantity', 'price', 'invoiceDate'].forEach(id => {
  document.getElementById(id).addEventListener('input', drawInvoice);
});

function drawInvoice() {
  if (!uploadedImage) return;

  const name = document.getElementById('customerName').value.trim();
  const item = document.getElementById('itemType').value.trim();
  const quantity = parseFloat(document.getElementById('quantity').value) || 0;
  const price = parseFloat(document.getElementById('price').value) || 0;
  const date = document.getElementById('invoiceDate').value;
  const total = quantity * price;

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = uploadedImage.width;
  canvas.height = uploadedImage.height;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(uploadedImage, 0, 0);

  ctx.font = `${Math.floor(canvas.width * 0.035)}px Tahoma`;
  ctx.fillStyle = 'black';
  ctx.textAlign = 'right';
  ctx.direction = 'rtl';

  let x = canvas.width - 40;
  let y = 60;
  const lineHeight = 40;

  if (name) ctx.fillText(`اسم الزبون: ${name}`, x, y), y += lineHeight;
  if (item) ctx.fillText(`نوع المادة: ${item}`, x, y), y += lineHeight;
  if (quantity) ctx.fillText(`الكمية: ${quantity}`, x, y), y += lineHeight;
  if (price) ctx.fillText(`السعر: ${price} د.ع`, x, y), y += lineHeight;
  if (quantity && price) ctx.fillText(`المجموع: ${total} د.ع`, x, y), y += lineHeight;
  if (date) ctx.fillText(`التاريخ: ${date}`, x, y);

  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.href = canvas.toDataURL('image/png');
  downloadBtn.style.display = 'inline-block';
}
