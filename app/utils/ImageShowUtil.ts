export function ImageShowUtil(imgData) {
 return `${process.env.NEXT_PUBLIC_IMG_URL}${imgData.split("/")[1]}`;
}
