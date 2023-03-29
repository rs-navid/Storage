import { base64StringToBlob } from 'blob-util';

export default function openBase64NewTab(base64Pdf) {
  var blob = base64toBlob(base64Pdf);
  const blobUrl = URL.createObjectURL(blob);
  window.open(blobUrl);
}

function base64toBlob(base64Data) {
  // const b64 = _arrayBufferToBase64(base64Data);
  const b= base64StringToBlob(base64Data, 'application/pdf');

  console.log(b);
  return b;

  // const sliceSize = 1024;
  // const byteCharacters = atob(b64);
  // const bytesLength = byteCharacters.length;
  // const slicesCount = Math.ceil(bytesLength / sliceSize);
  // const byteArrays = new Array(slicesCount);

  // for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
  //   const begin = sliceIndex * sliceSize;
  //   const end = Math.min(begin + sliceSize, bytesLength);

  //   const bytes = new Array(end - begin);
  //   for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
  //     bytes[i] = byteCharacters[offset].charCodeAt(0);
  //   }
  //   byteArrays[sliceIndex] = new Uint8Array(bytes);
  // }
  // return new Blob(byteArrays, { type: 'application/pdf' });
}
