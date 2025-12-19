export function ImageShowUtil(imgData) {

     console.log(imgData)
 return `${process.env.NEXT_PUBLIC_IMG_URL}${imgData.split("/")[1]}`;
}
